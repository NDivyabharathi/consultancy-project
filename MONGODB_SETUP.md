# MongoDB Setup Instructions

## Option 1: Using MongoDB Community Edition (Local)

### Windows Users:
1. Download MongoDB Community Edition from: https://www.mongodb.com/try/download/community
2. Run the installer and follow the setup wizard
3. MongoDB will install as a Windows Service and auto-start
4. Verify installation by opening Command Prompt and running: `mongosh`

### Mac Users:
```bash
# Using Homebrew
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community
```

### Linux Users:
```bash
# Ubuntu/Debian
wget -qO - https://www.mongodb.org/static/pgp/server-7.0.asc | sudo apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/7.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-7.0.list
sudo apt-get update
sudo apt-get install -y mongodb-org
sudo systemctl start mongod
```

---

## Option 2: Using MongoDB Atlas (Cloud - Recommended)

1. Go to https://www.mongodb.com/cloud/atlas
2. Sign up for a free account
3. Create a new cluster (free tier available)
4. Click "Connect" and get your connection string
5. Update the `.env` file in the `server/` folder:

```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/intellitextile?retryWrites=true&w=majority
```

---

## Running the Application

### Start MongoDB (if using local)
```bash
# Windows (if not running as service)
mongod

# Mac
brew services start mongodb-community

# Linux
sudo systemctl start mongod
```

### Start Backend Server
```bash
npm run server
```

The server will:
- Connect to MongoDB
- Auto-create admin user: `admin@intellitextile.com` / `admin123`
- Listen on http://localhost:5000

### In Another Terminal, Start Frontend
```bash
npm run dev
```

Frontend will run on http://localhost:5173

---

## Or Run Both Together
```bash
npm install concurrently
npm run dev-all
```

This starts both frontend and backend simultaneously.

---

## Testing the Authentication

### Admin Login:
- Email: `admin@intellitextile.com`
- Password: `admin123`

### Create a Buyer Account:
1. Go to signup
2. Enter your details
3. You'll be registered as a buyer

---

## Environment Variables

### Server (.env in server/ folder):
```env
MONGODB_URI=mongodb://localhost:27017/intellitextile
JWT_SECRET=your-secret-key-change-in-production
PORT=5000
```

### Frontend (.env in root if needed):
No special config needed - frontend connects to http://localhost:5000

---

## Troubleshooting

### MongoDB connection fails
- Ensure MongoDB service is running
- Check MONGODB_URI in server/.env
- Try connecting with `mongosh` to verify

### CORS errors
- Backend CORS is configured for localhost:5173
- Ensure backend is running before frontend

### Token errors
- Clear browser localStorage: DevTools > Application > Storage > Clear All
- Log in again to get fresh token

---

## API Endpoints

- `POST /api/auth/login` - Login user
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/verify` - Verify JWT token
- `GET /api/health` - Server health check
