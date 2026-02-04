import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import NeuralBackground from "@/components/ui/flow-field-background";
import { useAuth } from "@/context/AuthContext";
import { Mail, Lock, AlertCircle, User, X } from "lucide-react";
import {
  Layers,
  TrendingUp,
  Package,
  BarChart3,
  Calculator,
  Shield,
  Zap,
  ArrowRight,
  CheckCircle2,
  Bot,
  FileText,
  Users,
} from "lucide-react";

const features = [
  {
    icon: TrendingUp,
    title: "Demand Forecasting",
    description: "ARIMA & LSTM models predict future demand with 87%+ accuracy using historical sales patterns.",
  },
  {
    icon: Calculator,
    title: "Smart Pricing",
    description: "ML-optimized pricing recommendations based on market conditions, costs, and seasonality.",
  },
  {
    icon: Package,
    title: "Inventory Optimization",
    description: "Predict stock depletion rates and automate reorder alerts to prevent stockouts.",
  },
  {
    icon: BarChart3,
    title: "Sales Analytics",
    description: "Real-time dashboards with seasonal trend analysis and revenue insights.",
  },
  {
    icon: Shield,
    title: "Waste Reduction",
    description: "Data-driven insights to minimize overproduction and reduce operational waste.",
  },
  {
    icon: Zap,
    title: "Real-time Updates",
    description: "Live inventory tracking and instant order notifications across your business.",
  },
];

const stats = [
  { value: "50%", label: "Waste Reduction" },
  { value: "28%", label: "Sales Increase" },
  { value: "87%", label: "Forecast Accuracy" },
  { value: "3x", label: "Faster Decisions" },
];

const modules = [
  {
    icon: Users,
    title: "Role-Based Access",
    description: "Secure Admin & Buyer portals with protected routes",
  },
  {
    icon: Bot,
    title: "AI Chatbot",
    description: "NLP-powered customer support for instant assistance",
  },
  {
    icon: FileText,
    title: "Reports & Export",
    description: "Generate PDF/Excel reports for all business data",
  },
];

export default function Index() {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('buyer');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, signup } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    setLoading(true);
    try {
      await signup(name, email, password, role);
      navigate('/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Signup failed');
    } finally {
      setLoading(false);
    }
  };

  const openAuthModal = (signup: boolean) => {
    setIsSignup(signup);
    setShowAuthModal(true);
    setError('');
  };

  const closeAuthModal = () => {
    setShowAuthModal(false);
    setName('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setRole('buyer');
    setError('');
  };

  return (
    <div style={{ position: "relative", width: "100%", minHeight: "100vh" }}>
      {/* Full Page Fixed Neural Background */}
      <div style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100vh", zIndex: 0 }}>
        <NeuralBackground
          color="#818cf8"
          trailOpacity={0.1}
          particleCount={600}
          speed={0.8}
        />
      </div>

      {/* All Content on Top */}
      <div style={{ position: "relative", zIndex: 20, width: "100%" }}>
      <div
        style={{
          minHeight: "auto",
          backgroundColor: "transparent",
          fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
          background: "linear-gradient(180deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0.3) 100%)",
        }}
      >
      {/* Custom Styles */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@400;500;600&display=swap');
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes pulse {
          .nav-header {
          color: #ffffff;
          font-weight: 700;
          font-size: 18px;
          text-shadow: 0 2px 20px rgba(129, 140, 248, 0.5), 0 0 40px rgba(129, 140, 248, 0.2);
        }
        
        .hero-title {
          font-size: clamp(28px, 8vw, 64px);
          font-weight: 700;
          color: #ffffff;
          text-shadow: 0 4px 20px rgba(129, 140, 248, 0.6);
        }
        
        .text-gradient {
          background: linear-gradient(90deg, #818cf8 0%, #6366f1 100%);
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        
        .section-title {
          color: #ffffff;
          text-shadow: 0 2px 10px rgba(129, 140, 248, 0.4);
        }
        
        .feature-card {
          background: rgba(20, 20, 40, 0.4);
          border: 1px solid rgba(129, 140, 248, 0.3);
          backdrop-filter: blur(10px);
          transition: all 0.3s ease;
        }
        
        .feature-card:hover {
          background: rgba(30, 30, 60, 0.6);
          border-color: rgba(129, 140, 248, 0.7);
          box-shadow: 0 0 30px rgba(129, 140, 248, 0.3);
          transform: translateY(-5px);
        }
        
        .cta-section {
          background: linear-gradient(135deg, rgba(129, 140, 248, 0.2) 0%, rgba(99, 102, 241, 0.1) 100%);
          border-top: 1px solid rgba(129, 140, 248, 0.3);
          border-bottom: 1px solid rgba(129, 140, 248, 0.3);
        }
        
        .stat-value {
          color: #818cf8;
          font-weight: 700;
          text-shadow: 0 0 20px rgba(129, 140, 248, 0.5);
        }
        
        .stat-label {
          color: rgba(255, 255, 255, 0.8);
        }
        
        0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        .animate-fade-in-up {
          animation: fadeInUp 0.6s ease-out forwards;
        }
        
        .animate-fade-in {
          animation: fadeIn 0.5s ease-out forwards;
        }
        
        .animate-slide-in-left {
          animation: slideInLeft 0.6s ease-out forwards;
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        .delay-100 { animation-delay: 0.1s; }
        .delay-200 { animation-delay: 0.2s; }
        .delay-300 { animation-delay: 0.3s; }
        .delay-400 { animation-delay: 0.4s; }
        
        .feature-card {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .feature-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 40px -12px rgba(30, 41, 59, 0.15);
        }
        
        .gradient-text {
          background: linear-gradient(135deg, #1e3a5f 0%, #d97706 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        
        .nav-blur {
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          background: rgba(20, 20, 40, 0.6);
          border-bottom: 1px solid rgba(129, 140, 248, 0.2);
        }
        
        .hero-gradient {
          background: radial-gradient(ellipse 80% 50% at 50% -20%, rgba(129, 140, 248, 0.2) 0%, transparent 50%);
        }
        
        .stat-glow {
          text-shadow: 0 0 40px rgba(129, 140, 248, 0.5);
        }
      `}</style>

      {/* Navigation */}
      <nav
        className="nav-blur"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          borderBottom: "1px solid rgba(129, 140, 248, 0.3)",
          backgroundColor: "rgba(15, 23, 42, 0.95)",
        }}
      >
        <div
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
            padding: "0 24px",
            height: "72px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* Logo */}
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div
              style={{
                padding: "10px",
                borderRadius: "12px",
                background: "linear-gradient(135deg, #818cf8 0%, #6366f1 100%)",
                boxShadow: "0 4px 12px rgba(129, 140, 248, 0.4)",
              }}
            >
              <Layers style={{ height: "24px", width: "24px", color: "white" }} />
            </div>
            <span
              style={{
                fontSize: "22px",
                fontWeight: 700,
                fontFamily: "'Space Grotesk', sans-serif",
                color: "#ffffff",
                textShadow: "0 2px 20px rgba(129, 140, 248, 0.5)",
              }}
            >
              IntelliTextile
            </span>
          </div>

          {/* Nav Links */}
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <Button
              variant="ghost"
              onClick={() => openAuthModal(false)}
              style={{
                fontSize: "15px",
                fontWeight: 600,
                  color: "#ffffff",
                  padding: "10px 20px",
                  border: "1px solid rgba(129, 140, 248, 0.5)",
                  borderRadius: "6px",
                  backgroundColor: "rgba(129, 140, 248, 0.1)",
                  transition: "all 0.3s",
                }}
              >
                Sign In
              </Button>
            <Button
              onClick={() => openAuthModal(true)}
              style={{
                fontSize: "15px",
                fontWeight: 600,
                padding: "10px 24px",
                background: "linear-gradient(135deg, #818cf8 0%, #6366f1 100%)",
                boxShadow: "0 4px 14px rgba(129, 140, 248, 0.5)",
                border: "none",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  color: "#ffffff",
                }}
              >
                Get Started
                <ArrowRight style={{ height: "16px", width: "16px" }} />
              </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section
        className="hero-gradient"
        style={{
          paddingTop: "140px",
          paddingBottom: "100px",
          paddingLeft: "24px",
          paddingRight: "24px",
          position: "relative",
          overflow: "hidden",
          zIndex: 20,
        }}
      >
        {/* Background Pattern */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            opacity: 0.4,
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%231e3a5f' fill-opacity='0.06'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />

        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            textAlign: "center",
            position: "relative",
            zIndex: 10,
          }}
        >
          {/* Badge */}
          <div
            className="animate-fade-in"
            style={{ marginBottom: "28px" }}
          >
            <Badge
              style={{
                padding: "8px 20px",
                fontSize: "14px",
                fontWeight: 500,
                backgroundColor: "rgba(30, 58, 95, 0.1)",
                color: "#818cf8",
                border: "1px solid rgba(129, 140, 248, 0.4)",
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <Zap style={{ height: "14px", width: "14px", color: "#818cf8" }} />
              Powered by Machine Learning
            </Badge>
          </div>

          {/* Heading */}
          <h1
            className="animate-fade-in-up"
            style={{
              fontSize: "clamp(40px, 6vw, 72px)",
              fontWeight: 700,
              lineHeight: 1.1,
              marginBottom: "28px",
              fontFamily: "'Space Grotesk', sans-serif",
              color: "#ffffff",
              textShadow: "0 4px 30px rgba(129, 140, 248, 0.4)",
            }}
          >
            Smart Textile Industry
            <br />
            <span className="gradient-text">Management & Analytics</span>
          </h1>

          {/* Subheading */}
          <p
            className="animate-fade-in-up delay-100"
            style={{
              fontSize: "20px",
              lineHeight: 1.7,
              color: "#e2e8f0",
              maxWidth: "680px",
              margin: "0 auto 40px",
            }}
          >
            Transform your textile business with AI-powered demand forecasting,
            intelligent pricing, and real-time inventory optimization.
          </p>

          {/* CTA Buttons */}
          <div
            className="animate-fade-in-up delay-200"
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: "16px",
            }}
          >
            <Button
              onClick={() => openAuthModal(true)}
              style={{
                fontSize: "17px",
                fontWeight: 600,
                padding: "16px 36px",
                height: "auto",
                background: "linear-gradient(135deg, #1e3a5f 0%, #2d4a6f 100%)",
                boxShadow: "0 8px 24px rgba(30, 58, 95, 0.35)",
                border: "none",
                display: "flex",
                alignItems: "center",
                gap: "10px",
                transition: "all 0.3s ease",
                cursor: "pointer",
              }}
              >
                Start Free Trial
                <ArrowRight style={{ height: "20px", width: "20px" }} />
              </Button>
            <Button
              variant="outline"
              style={{
                fontSize: "17px",
                fontWeight: 600,
                padding: "16px 36px",
                height: "auto",
                borderColor: "rgba(129, 140, 248, 0.5)",
                color: "#818cf8",
                backgroundColor: "rgba(129, 140, 248, 0.1)",
                boxShadow: "0 2px 8px rgba(129, 140, 248, 0.2)",
              }}
            >
              Watch Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section
        style={{
          padding: "80px 24px",
          position: "relative",
          zIndex: 20,
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "40px",
            }}
          >
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className="animate-fade-in-up"
                style={{
                  textAlign: "center",
                  animationDelay: `${index * 0.1}s`,
                }}
              >
                <p
                  className="stat-glow"
                  style={{
                    fontSize: "clamp(40px, 5vw, 56px)",
                    fontWeight: 700,
                    fontFamily: "'Space Grotesk', sans-serif",
                    color: "#818cf8",
                    marginBottom: "8px",
                  }}
                >
                  {stat.value}
                </p>
                <p
                  style={{
                    fontSize: "16px",
                    color: "rgba(255, 255, 255, 0.75)",
                    fontWeight: 500,
                  }}
                >
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section
        style={{
          padding: "100px 24px",
          position: "relative",
          zIndex: 20,
        }}
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          {/* Section Header */}
          <div style={{ textAlign: "center", marginBottom: "64px" }}>
            <Badge
              style={{
                padding: "6px 16px",
                fontSize: "13px",
                fontWeight: 600,
                backgroundColor: "rgba(129, 140, 248, 0.15)",
                color: "#818cf8",
                border: "1px solid rgba(129, 140, 248, 0.3)",
                marginBottom: "16px",
              }}
            >
              FEATURES
            </Badge>
            <h2
              style={{
                fontSize: "clamp(32px, 4vw, 44px)",
                fontWeight: 700,
                fontFamily: "'Space Grotesk', sans-serif",
                color: "#ffffff",
                marginBottom: "16px",
                textShadow: "0 2px 20px rgba(129, 140, 248, 0.3)",
              }}
            >
              Everything You Need to Scale
            </h2>
            <p
              style={{
                fontSize: "18px",
                color: "#cbd5e1",
                maxWidth: "600px",
                margin: "0 auto",
                lineHeight: 1.7,
              }}
            >
              Comprehensive tools powered by machine learning to optimize every
              aspect of your textile business operations.
            </p>
          </div>

          {/* Features Grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
              gap: "28px",
            }}
          >
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="feature-card animate-fade-in-up"
                style={{
                  padding: "32px",
                  borderRadius: "20px",
                  border: "1px solid rgba(129, 140, 248, 0.3)",
                  backgroundColor: "rgba(30, 40, 70, 0.4)",
                  animationDelay: `${index * 0.1}s`,
                  backdropFilter: "blur(10px)",
                }}
              >
                <div
                  style={{
                    width: "56px",
                    height: "56px",
                    borderRadius: "14px",
                    background: "linear-gradient(135deg, rgba(129, 140, 248, 0.2) 0%, rgba(129, 140, 248, 0.05) 100%)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "20px",
                  }}
                >
                  <feature.icon
                    style={{ height: "26px", width: "26px", color: "#818cf8" }}
                  />
                </div>
                <h3
                  style={{
                    fontSize: "20px",
                    fontWeight: 600,
                    fontFamily: "'Space Grotesk', sans-serif",
                    color: "#ffffff",
                    marginBottom: "12px",
                  }}
                >
                  {feature.title}
                </h3>
                <p
                  style={{
                    fontSize: "15px",
                    color: "#cbd5e1",
                    lineHeight: 1.7,
                  }}
                >
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Modules Section */}
      <section
        style={{
          padding: "80px 24px",
          backgroundColor: "rgba(0, 0, 0, 0.4)",
          backdropFilter: "blur(8px)",
        }}
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "48px" }}>
            <h2
              style={{
                fontSize: "clamp(28px, 3vw, 36px)",
                fontWeight: 700,
                fontFamily: "'Space Grotesk', sans-serif",
                color: "#ffffff",
                marginBottom: "12px",
                textShadow: "0 2px 20px rgba(129, 140, 248, 0.2)",
              }}
            >
              Plus More Powerful Modules
            </h2>
            <p style={{ fontSize: "16px", color: "#cbd5e1" }}>
              Complete business management suite for textile enterprises
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "24px",
            }}
          >
            {modules.map((module, index) => (
              <div
                key={module.title}
                className="animate-fade-in-up"
                style={{
                  padding: "28px",
                  borderRadius: "16px",
                  backgroundColor: "rgba(0, 0, 0, 0.5)",
                  border: "1px solid rgba(129, 140, 248, 0.4)",
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "16px",
                  animationDelay: `${index * 0.1}s`,
                  backdropFilter: "blur(10px)",
                }}
              >
                <div
                  style={{
                    width: "48px",
                    height: "48px",
                    borderRadius: "12px",
                    backgroundColor: "rgba(129, 140, 248, 0.15)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <module.icon
                    style={{ height: "22px", width: "22px", color: "#818cf8" }}
                  />
                </div>
                <div>
                  <h3
                    style={{
                      fontSize: "17px",
                      fontWeight: 600,
                      color: "#ffffff",
                      marginBottom: "6px",
                    }}
                  >
                    {module.title}
                  </h3>
                  <p
                    style={{
                      fontSize: "14px",
                      color: "#cbd5e1",
                      lineHeight: 1.6,
                    }}
                  >
                    {module.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section

        style={{
          padding: "100px 24px",
          position: "relative",
          overflow: "hidden",
          zIndex: 20,
        }}
      >
        {/* Decorative Elements */}
        <div
          className="animate-float"
          style={{
            position: "absolute",
            top: "20%",
            left: "10%",
            width: "200px",
            height: "200px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(129, 140, 248, 0.15) 0%, transparent 70%)",
          }}
        />
        <div
          className="animate-float"
          style={{
            position: "absolute",
            bottom: "20%",
            right: "10%",
            width: "300px",
            height: "300px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(129, 140, 248, 0.1) 0%, transparent 70%)",
            animationDelay: "1.5s",
          }}
        />

        <div
          style={{
            maxWidth: "800px",
            margin: "0 auto",
            textAlign: "center",
            position: "relative",
            zIndex: 10,
          }}
        >
          <h2
            className="animate-fade-in-up"
            style={{
              fontSize: "clamp(32px, 4vw, 48px)",
              fontWeight: 700,
              fontFamily: "'Space Grotesk', sans-serif",
              color: "#ffffff",
              marginBottom: "20px",
            }}
          >
            Ready to Transform Your Business?
          </h2>
          <p
            className="animate-fade-in-up delay-100"
            style={{
              fontSize: "18px",
              color: "rgba(255, 255, 255, 0.8)",
              marginBottom: "36px",
              lineHeight: 1.7,
            }}
          >
            Join hundreds of textile manufacturers using IntelliTextile to make
            data-driven decisions and increase profitability.
          </p>

          <div
            className="animate-fade-in-up delay-200"
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: "16px",
              marginBottom: "32px",
            }}
          >
            <Button
              onClick={() => openAuthModal(true)}
              style={{
                fontSize: "17px",
                fontWeight: 600,
                padding: "16px 36px",
                height: "auto",
                backgroundColor: "#818cf8",
                color: "#0f172a",
                border: "none",
                boxShadow: "0 8px 24px rgba(129, 140, 248, 0.4)",
                display: "flex",
                alignItems: "center",
                gap: "10px",
                cursor: "pointer",
              }}
            >
              Get Started Free
                <ArrowRight style={{ height: "20px", width: "20px" }} />
              </Button>
          </div>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: "32px",
              fontSize: "14px",
              color: "rgba(255, 255, 255, 0.7)",
            }}
          >
            <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <CheckCircle2 style={{ height: "18px", width: "18px", color: "#818cf8" }} />
              No credit card required
            </span>
            <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <CheckCircle2 style={{ height: "18px", width: "18px", color: "#818cf8" }} />
              14-day free trial
            </span>
            <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <CheckCircle2 style={{ height: "18px", width: "18px", color: "#818cf8" }} />
              Cancel anytime
            </span>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        style={{
          padding: "48px 24px",
          backgroundColor: "rgba(15, 23, 42, 0.9)",
          borderTop: "1px solid rgba(129, 140, 248, 0.2)",
          position: "relative",
          zIndex: 20,
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "20px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div
              style={{
                padding: "8px",
                borderRadius: "10px",
                backgroundColor: "rgba(255, 255, 255, 0.1)",
              }}
            >
              <Layers style={{ height: "20px", width: "20px", color: "#f59e0b" }} />
            </div>
            <span
              style={{
                fontSize: "18px",
                fontWeight: 600,
                fontFamily: "'Space Grotesk', sans-serif",
                color: "#ffffff",
              }}
            >
              IntelliTextile
            </span>
          </div>
          <p
            style={{
              fontSize: "14px",
              color: "rgba(255, 255, 255, 0.5)",
            }}
          >
            © 2024 IntelliTextile. All rights reserved.
          </p>
        </div>
      </footer>
      </div>
      </div>

      {/* Auth Modal */}
      {showAuthModal && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "1rem",
            backdropFilter: "blur(4px)",
          }}
          onClick={closeAuthModal}
        >
          <div
            style={{
              backgroundColor: "rgba(10, 10, 15, 0.95)",
              borderRadius: "16px",
              padding: "40px",
              maxWidth: "420px",
              width: "100%",
              maxHeight: "90vh",
              overflowY: "auto",
              border: "1px solid rgba(129, 140, 248, 0.5)",
              boxShadow: "0 20px 60px rgba(0, 0, 0, 0.8), 0 0 40px rgba(129, 140, 248, 0.1)",
              position: "relative",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={closeAuthModal}
              style={{
                position: "absolute",
                top: "16px",
                right: "16px",
                background: "none",
                border: "none",
                color: "#fff",
                cursor: "pointer",
                padding: "8px",
              }}
            >
              <X size={24} />
            </button>

            {/* Header */}
            <div style={{ textAlign: "center", marginBottom: "30px" }}>
              <h1 style={{
                margin: 0,
                fontSize: "28px",
                color: "#ffffff",
                fontWeight: 700,
                textShadow: "0 2px 20px rgba(129, 140, 248, 0.5)",
              }}>
                IntelliTextile
              </h1>
              <p style={{
                margin: "8px 0 0",
                color: "#d0d0d0",
                fontSize: "14px",
              }}>
                Textile Industry Management & Analytics
              </p>
            </div>

            {/* Form */}
            {isSignup ? (
              <form onSubmit={handleSignup}>
                <h2 style={{ textAlign: "center", marginBottom: "1.5rem", fontSize: "1.5rem", color: "#e5e7eb" }}>
                  Create Account
                </h2>

                <div style={{ marginBottom: "20px" }}>
                  <label style={{ display: "block", marginBottom: "8px", color: "#f0f0f0", fontWeight: 500, fontSize: "14px" }}>
                    Full Name
                  </label>
                  <div style={{
                    display: "flex",
                    alignItems: "center",
                    border: "2px solid rgba(129, 140, 248, 0.3)",
                    borderRadius: "8px",
                    padding: "0 12px",
                    background: "rgba(20, 20, 30, 0.6)",
                  }}>
                    <User size={20} style={{ color: "#a0a0ff", marginRight: "8px" }} />
                    <input
                      type="text"
                      placeholder="Enter your full name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      style={{
                        flex: 1,
                        border: "none",
                        padding: "12px 0",
                        fontSize: "14px",
                        outline: "none",
                        background: "transparent",
                        color: "#ffffff",
                      }}
                    />
                  </div>
                </div>

                <div style={{ marginBottom: "20px" }}>
                  <label style={{ display: "block", marginBottom: "8px", color: "#f0f0f0", fontWeight: 500, fontSize: "14px" }}>
                    Email Address
                  </label>
                  <div style={{
                    display: "flex",
                    alignItems: "center",
                    border: "2px solid rgba(129, 140, 248, 0.3)",
                    borderRadius: "8px",
                    padding: "0 12px",
                    background: "rgba(20, 20, 30, 0.6)",
                  }}>
                    <Mail size={20} style={{ color: "#a0a0ff", marginRight: "8px" }} />
                    <input
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      style={{
                        flex: 1,
                        border: "none",
                        padding: "12px 0",
                        fontSize: "14px",
                        outline: "none",
                        background: "transparent",
                        color: "#ffffff",
                      }}
                    />
                  </div>
                </div>

                <div style={{ marginBottom: "20px" }}>
                  <label style={{ display: "block", marginBottom: "8px", color: "#f0f0f0", fontWeight: 500, fontSize: "14px" }}>
                    Password
                  </label>
                  <div style={{
                    display: "flex",
                    alignItems: "center",
                    border: "2px solid rgba(129, 140, 248, 0.3)",
                    borderRadius: "8px",
                    padding: "0 12px",
                    background: "rgba(20, 20, 30, 0.6)",
                  }}>
                    <Lock size={20} style={{ color: "#a0a0ff", marginRight: "8px" }} />
                    <input
                      type="password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      style={{
                        flex: 1,
                        border: "none",
                        padding: "12px 0",
                        fontSize: "14px",
                        outline: "none",
                        background: "transparent",
                        color: "#ffffff",
                      }}
                    />
                  </div>
                </div>

                <div style={{ marginBottom: "20px" }}>
                  <label style={{ display: "block", marginBottom: "8px", color: "#f0f0f0", fontWeight: 500, fontSize: "14px" }}>
                    Confirm Password
                  </label>
                  <div style={{
                    display: "flex",
                    alignItems: "center",
                    border: "2px solid rgba(129, 140, 248, 0.3)",
                    borderRadius: "8px",
                    padding: "0 12px",
                    background: "rgba(20, 20, 30, 0.6)",
                  }}>
                    <Lock size={20} style={{ color: "#a0a0ff", marginRight: "8px" }} />
                    <input
                      type="password"
                      placeholder="Confirm your password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                      style={{
                        flex: 1,
                        border: "none",
                        padding: "12px 0",
                        fontSize: "14px",
                        outline: "none",
                        background: "transparent",
                        color: "#ffffff",
                      }}
                    />
                  </div>
                </div>

                <div style={{ marginBottom: "20px" }}>
                  <label style={{ display: "block", marginBottom: "8px", color: "#f0f0f0", fontWeight: 500, fontSize: "14px" }}>
                    Role
                  </label>
                  <div style={{
                    display: "flex",
                    alignItems: "center",
                    border: "2px solid rgba(129, 140, 248, 0.3)",
                    borderRadius: "8px",
                    padding: "0 12px",
                    background: "rgba(20, 20, 30, 0.6)",
                  }}>
                    <select
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      style={{
                        flex: 1,
                        border: "none",
                        padding: "12px 0",
                        fontSize: "14px",
                        outline: "none",
                        background: "transparent",
                        color: "#ffffff",
                        fontFamily: "inherit",
                      }}
                    >
                      <option value="buyer" style={{ color: "#111827" }}>Buyer</option>
                      <option value="admin" style={{ color: "#111827" }}>Admin</option>
                    </select>
                  </div>
                </div>

                {error && (
                  <div style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    padding: "12px",
                    background: "linear-gradient(135deg, #3a2020 0%, #2a1515 100%)",
                    border: "1px solid #5a3030",
                    borderRadius: "8px",
                    color: "#ff6b6b",
                    marginBottom: "20px",
                    fontSize: "14px",
                  }}>
                    <AlertCircle size={18} />
                    <span>{error}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  style={{
                    width: "100%",
                    padding: "12px 20px",
                    background: "linear-gradient(135deg, rgba(129, 140, 248, 0.8) 0%, rgba(99, 102, 241, 0.9) 100%)",
                    color: "#ffffff",
                    border: "1px solid rgba(129, 140, 248, 0.5)",
                    borderRadius: "8px",
                    fontSize: "14px",
                    fontWeight: 600,
                    cursor: loading ? "not-allowed" : "pointer",
                    opacity: loading ? 0.5 : 1,
                  }}
                >
                  {loading ? 'Creating Account...' : 'Sign Up'}
                </button>

                <p style={{ textAlign: "center", marginTop: "1rem", color: "#666" }}>
                  Already have an account?{' '}
                  <button
                    type="button"
                    onClick={() => setIsSignup(false)}
                    style={{
                      background: "none",
                      border: "none",
                      color: "#6366f1",
                      cursor: "pointer",
                      textDecoration: "underline",
                      fontSize: "inherit",
                      fontWeight: "bold",
                    }}
                  >
                    Login
                  </button>
                </p>
              </form>
            ) : (
              <form onSubmit={handleLogin}>
                <h2 style={{ textAlign: "center", marginBottom: "1.5rem", fontSize: "1.5rem", color: "#e5e7eb" }}>
                  Login
                </h2>

                <div style={{ marginBottom: "20px" }}>
                  <label style={{ display: "block", marginBottom: "8px", color: "#f0f0f0", fontWeight: 500, fontSize: "14px" }}>
                    Email Address
                  </label>
                  <div style={{
                    display: "flex",
                    alignItems: "center",
                    border: "2px solid rgba(129, 140, 248, 0.3)",
                    borderRadius: "8px",
                    padding: "0 12px",
                    background: "rgba(20, 20, 30, 0.6)",
                  }}>
                    <Mail size={20} style={{ color: "#a0a0ff", marginRight: "8px" }} />
                    <input
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      style={{
                        flex: 1,
                        border: "none",
                        padding: "12px 0",
                        fontSize: "14px",
                        outline: "none",
                        background: "transparent",
                        color: "#ffffff",
                      }}
                    />
                  </div>
                </div>

                <div style={{ marginBottom: "20px" }}>
                  <label style={{ display: "block", marginBottom: "8px", color: "#f0f0f0", fontWeight: 500, fontSize: "14px" }}>
                    Password
                  </label>
                  <div style={{
                    display: "flex",
                    alignItems: "center",
                    border: "2px solid rgba(129, 140, 248, 0.3)",
                    borderRadius: "8px",
                    padding: "0 12px",
                    background: "rgba(20, 20, 30, 0.6)",
                  }}>
                    <Lock size={20} style={{ color: "#a0a0ff", marginRight: "8px" }} />
                    <input
                      type="password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      style={{
                        flex: 1,
                        border: "none",
                        padding: "12px 0",
                        fontSize: "14px",
                        outline: "none",
                        background: "transparent",
                        color: "#ffffff",
                      }}
                    />
                  </div>
                </div>

                {error && (
                  <div style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    padding: "12px",
                    background: "linear-gradient(135deg, #3a2020 0%, #2a1515 100%)",
                    border: "1px solid #5a3030",
                    borderRadius: "8px",
                    color: "#ff6b6b",
                    marginBottom: "20px",
                    fontSize: "14px",
                  }}>
                    <AlertCircle size={18} />
                    <span>{error}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  style={{
                    width: "100%",
                    padding: "12px 20px",
                    background: "linear-gradient(135deg, rgba(129, 140, 248, 0.8) 0%, rgba(99, 102, 241, 0.9) 100%)",
                    color: "#ffffff",
                    border: "1px solid rgba(129, 140, 248, 0.5)",
                    borderRadius: "8px",
                    fontSize: "14px",
                    fontWeight: 600,
                    cursor: loading ? "not-allowed" : "pointer",
                    opacity: loading ? 0.5 : 1,
                  }}
                >
                  {loading ? 'Logging in...' : 'Login'}
                </button>

                <p style={{ textAlign: "center", marginTop: "1rem", color: "#666" }}>
                  Don't have an account?{' '}
                  <button
                    type="button"
                    onClick={() => setIsSignup(true)}
                    style={{
                      background: "none",
                      border: "none",
                      color: "#6366f1",
                      cursor: "pointer",
                      textDecoration: "underline",
                      fontSize: "inherit",
                      fontWeight: "bold",
                    }}
                  >
                    Sign Up
                  </button>
                </p>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
