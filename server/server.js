import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import User from './models/User.js';
import Product from './models/Product.js';
import Order from './models/Order.js';

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/intellitextile';

const formatDate = (date) =>
  date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

const ensureAdminUser = async () => {
  const adminEmail = 'admin@intellitextile.com';
  const existingAdmin = await User.findOne({ email: adminEmail });
  
  if (existingAdmin) {
    console.log('✅ Admin user already exists');
    return;
  }

  const password = await bcryptjs.hash('admin123', 10);
  await User.create({
    name: 'Admin User',
    email: adminEmail,
    password,
    role: 'admin',
  });
  console.log('✅ Admin user created successfully');
};

// Auth Endpoints
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password required' });
    }

    console.log('Login attempt for email:', email);
    const user = await User.findOne({ email: email.toLowerCase() });
    
    if (!user) {
      console.log('User not found for email:', email.toLowerCase());
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    console.log('User found, checking password...');
    const isPasswordValid = await bcryptjs.compare(password, user.password);
    
    if (!isPasswordValid) {
      console.log('Invalid password for user:', email);
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    console.log('Login successful for user:', email);
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Login failed' });
  }
});

app.post('/api/auth/signup', async (req, res) => {
  try {
    const { name, email, password, role = 'buyer' } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Name, email, and password required' });
    }

    const normalizedEmail = email.toLowerCase();
    const existingUser = await User.findOne({ email: normalizedEmail });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already registered' });
    }

    const hashedPassword = await bcryptjs.hash(password, 10);
    const newUser = await User.create({
      name,
      email: normalizedEmail,
      password: hashedPassword,
      role,
    });

    const token = jwt.sign(
      { id: newUser.id, email: newUser.email, role: newUser.role },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(201).json({
      message: 'Signup successful',
      token,
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
      },
    });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ error: 'Signup failed' });
  }
});

app.post('/api/auth/verify', (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    res.json({ valid: true, user: decoded });
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
});

// Products Endpoints
app.get('/api/products', async (req, res) => {
  const products = await Product.find().sort({ createdAt: -1 });
  res.json({
    products: products.map((p) => ({
      id: p.id,
      name: p.name,
      category: p.category,
      quantity: p.quantity,
      reorderLevel: p.reorderLevel,
      price: p.price,
      lastUpdated: p.lastUpdated,
    })),
  });
});

app.post('/api/products', async (req, res) => {
  try {
    const { name, category, quantity, reorderLevel, price } = req.body;

    if (!name || !category) {
      return res.status(400).json({ error: 'Name and category are required' });
    }

    const qty = Number(quantity);
    const reorder = Number(reorderLevel);
    const unitPrice = Number(price);

    if (Number.isNaN(qty) || qty < 0) {
      return res.status(400).json({ error: 'Quantity must be 0 or greater' });
    }

    if (Number.isNaN(reorder) || reorder < 0) {
      return res.status(400).json({ error: 'Reorder level must be 0 or greater' });
    }

    if (Number.isNaN(unitPrice) || unitPrice <= 0) {
      return res.status(400).json({ error: 'Price must be greater than 0' });
    }

    const newProduct = await Product.create({
      name: String(name).trim(),
      category: String(category).trim(),
      quantity: qty,
      reorderLevel: reorder,
      price: unitPrice,
      lastUpdated: new Date().toISOString().slice(0, 10),
    });

    res.status(201).json({
      message: 'Product created',
      product: {
        id: newProduct.id,
        name: newProduct.name,
        category: newProduct.category,
        quantity: newProduct.quantity,
        reorderLevel: newProduct.reorderLevel,
        price: newProduct.price,
        lastUpdated: newProduct.lastUpdated,
      },
    });
  } catch (error) {
    console.error('Add product error:', error);
    res.status(500).json({ error: 'Failed to add product' });
  }
});

app.delete('/api/products/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Product.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json({ message: 'Product deleted', product: { id: deleted.id } });
  } catch (error) {
    console.error('Delete product error:', error);
    res.status(500).json({ error: 'Failed to delete product' });
  }
});

// Orders Endpoints
app.get('/api/orders', async (req, res) => {
  const { buyerId } = req.query;
  const filter = buyerId ? { buyerId } : {};
  const orders = await Order.find(filter).sort({ createdAt: -1 });
  res.json({
    orders: orders.map((o) => ({
      id: o.id,
      productId: o.productId,
      productName: o.productName,
      quantity: o.quantity,
      orderDate: o.orderDate,
      status: o.status,
      totalPrice: o.totalPrice,
      buyerId: o.buyerId,
    })),
  });
});

app.post('/api/orders', async (req, res) => {
  try {
    const { productId, quantity, buyerId, status } = req.body;

    if (!productId || !quantity) {
      return res.status(400).json({ error: 'Product and quantity are required' });
    }

    const qty = Number(quantity);
    if (Number.isNaN(qty) || qty <= 0) {
      return res.status(400).json({ error: 'Quantity must be greater than 0' });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    if (product.quantity < qty) {
      return res.status(400).json({ error: 'Insufficient stock' });
    }

    product.quantity -= qty;
    product.lastUpdated = new Date().toISOString().slice(0, 10);
    await product.save();

    const totalPrice = qty * product.price;
    const order = await Order.create({
      productId: product.id,
      productName: product.name,
      quantity: qty,
      orderDate: new Date().toISOString().slice(0, 10),
      status: status || 'confirmed',
      totalPrice,
      buyerId: buyerId || undefined,
    });

    res.status(201).json({
      message: 'Order created',
      order: {
        id: order.id,
        productId: order.productId,
        productName: order.productName,
        quantity: order.quantity,
        orderDate: order.orderDate,
        status: order.status,
        totalPrice: order.totalPrice,
        buyerId: order.buyerId,
      },
    });
  } catch (error) {
    console.error('Create order error:', error);
    res.status(500).json({ error: 'Failed to create order' });
  }
});

// Analytics Endpoints
app.get('/api/sales-trends', async (req, res) => {
  const since = new Date();
  since.setDate(since.getDate() - 30);

  const orders = await Order.find({ createdAt: { $gte: since } });
  const trendMap = new Map();

  orders.forEach((order) => {
    const dateLabel = formatDate(new Date(order.createdAt));
    const current = trendMap.get(dateLabel) || { date: dateLabel, sales: 0, revenue: 0 };
    current.sales += 1;
    current.revenue += order.totalPrice;
    trendMap.set(dateLabel, current);
  });

  
  const salesTrends = Array.from(trendMap.values());
  res.json({ salesTrends });
});

app.get('/api/inventory-alerts', async (req, res) => {
  const alerts = [];
  const products = await Product.find({});
  const since = new Date();
  since.setDate(since.getDate() - 30);
  const recentOrders = await Order.find({ createdAt: { $gte: since } });

  const salesByProduct = recentOrders.reduce((acc, order) => {
    acc[order.productId] = (acc[order.productId] || 0) + order.quantity;
    return acc;
  }, {});

  products.forEach((product) => {
    if (product.quantity <= product.reorderLevel) {
      const totalSold = salesByProduct[product.id] || 0;
      const avgDailySales = totalSold / 30;
      const estimatedDepletion = avgDailySales > 0
        ? `${Math.max(1, Math.ceil(product.quantity / avgDailySales))} days`
        : 'N/A';

      alerts.push({
        productId: product.id,
        productName: product.name,
        currentStock: product.quantity,
        reorderLevel: product.reorderLevel,
        estimatedDepletion,
      });
    }
  });

  res.json({ inventoryAlerts: alerts });
});

app.get('/api/demand-forecasts', async (req, res) => {
  const since = new Date();
  since.setDate(since.getDate() - 21);
  const orders = await Order.find({ createdAt: { $gte: since } });

  const demandByProduct = orders.reduce((acc, order) => {
    acc[order.productName] = (acc[order.productName] || 0) + order.quantity;
    return acc;
  }, {});

  const forecasts = Object.entries(demandByProduct).flatMap(([product, total]) => {
    const weekly = Math.round(total / 3);
    return ['Week 1', 'Week 2', 'Week 3'].map((week, index) => ({
      product,
      week,
      predictedDemand: weekly,
      confidence: 0.82 - index * 0.03,
    }));
  });

  res.json({ forecasts });
});

app.get('/api/waste-analysis', async (req, res) => {
  const products = await Product.find({});
  const orders = await Order.find({});

  const soldByProduct = orders.reduce((acc, order) => {
    acc[order.productName] = (acc[order.productName] || 0) + order.quantity;
    return acc;
  }, {});

  const wasteData = products.map((product) => {
    const sold = soldByProduct[product.name] || 0;
    const produced = product.quantity + sold;
    const waste = Math.max(produced - sold - product.quantity, 0);
    const percentage = produced > 0 ? (waste / produced) * 100 : 0;
    return {
      product: product.name,
      produced,
      sold,
      waste,
      percentage: Number(percentage.toFixed(2)),
    };
  });
  res.json({ wasteData });
});


// Health Check
app.get('/api/health', async (req, res) => {
  const users = await User.countDocuments();
  res.json({ status: 'Server is running', users });
});

const startServer = async () => {
  await mongoose.connect(MONGODB_URI);
  await ensureAdminUser();

  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log('✅ MongoDB Connected');
  });
};

startServer().catch((error) => {
  console.error('Failed to start server:', error);
  process.exit(1);
});
