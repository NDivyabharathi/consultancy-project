import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Mail, Lock, AlertCircle, User } from 'lucide-react';
import NeuralBackground from '@/components/ui/flow-field-background';
import '../styles/auth.css';

export const Login: React.FC = () => {
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
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const mode = params.get('mode');
    if (mode === 'signup') {
      setIsSignup(true);
    }
    if (mode === 'login') {
      setIsSignup(false);
    }
  }, [location.search]);

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

  const resetForm = () => {
    setName('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setRole('buyer');
    setError('');
  };

  const toggleMode = () => {
    resetForm();
    setIsSignup(!isSignup);
  };

  return (
    <div className="auth-shell">
      {/* Neural Background */}
      <NeuralBackground
        color="#818cf8"
        trailOpacity={0.1}
        particleCount={600}
        speed={0.8}
      />

      {/* Login/Signup Content - Positioned on top of background */}
      <div className="auth-overlay">
        <div className="auth-card">
          <div className="auth-header">
            <h1>IntelliTextile</h1>
            <p>Textile Industry Management & Analytics</p>
          </div>

          {isSignup ? (
            // Signup Form
            <form onSubmit={handleSignup} className="auth-form">
              <h2 className="auth-title">Create Account</h2>
              
              <div className="form-group">
                <label>Full Name</label>
                <div className="input-wrapper">
                  <User size={20} />
                  <input
                    type="text"
                    placeholder="Enter your full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Email Address</label>
                <div className="input-wrapper">
                  <Mail size={20} />
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Password</label>
                <div className="input-wrapper">
                  <Lock size={20} />
                  <input
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Confirm Password</label>
                <div className="input-wrapper">
                  <Lock size={20} />
                  <input
                    type="password"
                    placeholder="Confirm your password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Role</label>
                <div className="select-wrapper">
                  <select 
                    value={role} 
                    onChange={(e) => setRole(e.target.value)}
                  >
                    <option value="buyer">Buyer</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
              </div>

              {error && (
                <div className="error-message">
                  <AlertCircle size={18} />
                  <span>{error}</span>
                </div>
              )}

              <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? 'Creating Account...' : 'Sign Up'}
              </button>

              <p style={{ textAlign: 'center', marginTop: '1rem', color: '#666' }}>
                Already have an account?{' '}
                <button
                  type="button"
                  onClick={toggleMode}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#6366f1',
                    cursor: 'pointer',
                    textDecoration: 'underline',
                    fontSize: 'inherit',
                    fontWeight: 'bold'
                  }}
                >
                  Login
                </button>
              </p>
            </form>
          ) : (
            // Login Form
            <>
              <form onSubmit={handleLogin} className="auth-form">
                <h2 className="auth-title">Login</h2>
                
                <div className="form-group">
                  <label>Email Address</label>
                  <div className="input-wrapper">
                    <Mail size={20} />
                    <input
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Password</label>
                  <div className="input-wrapper">
                    <Lock size={20} />
                    <input
                      type="password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                </div>

                {error && (
                  <div className="error-message">
                    <AlertCircle size={18} />
                    <span>{error}</span>
                  </div>
                )}

                <button type="submit" className="btn btn-primary" disabled={loading}>
                  {loading ? 'Logging in...' : 'Login'}
                </button>

                <p style={{ textAlign: 'center', marginTop: '1rem', color: '#666' }}>
                  Don't have an account?{' '}
                  <button
                    type="button"
                    onClick={toggleMode}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#6366f1',
                      cursor: 'pointer',
                      textDecoration: 'underline',
                      fontSize: 'inherit',
                      fontWeight: 'bold'
                    }}
                  >
                    Sign Up
                  </button>
                </p>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
