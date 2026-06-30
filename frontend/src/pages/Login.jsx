import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Phone, KeyRound } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import styles from './Auth.module.css';

const Login = () => {
  const [step, setStep] = useState(1); // 1: Phone, 2: OTP
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { loginWithOTP, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/';

  // Demo background image (can be dynamically populated from backend/admin panel later)
  const bgImage = "url('https://images.unsplash.com/photo-1616530940355-351fabd9524b?q=80&w=1080&auto=format&fit=crop')";

  useEffect(() => {
    if (isAuthenticated) {
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, from]);

  const handleSendOTP = (e) => {
    e.preventDefault();
    setError('');
    
    if (!phone || phone.length < 10) {
      setError('Please enter a valid phone number');
      return;
    }

    setLoading(true);
    // Simulate API call to send OTP
    setTimeout(() => {
      setLoading(false);
      setStep(2);
    }, 800);
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!otp || otp.length !== 4) {
      setError('Please enter the 4-digit OTP');
      return;
    }

    setLoading(true);
    const result = await loginWithOTP(phone, otp);
    
    if (result.success) {
      navigate(from, { replace: true });
    } else {
      setError(result.message);
      setLoading(false);
    }
  };

  return (
    <div 
      className={styles.authContainer} 
      style={{ backgroundImage: bgImage }}
    >
      <div className={styles.authCard}>
        <div className={styles.authHeader}>
          <h2>Welcome to ShortFlix</h2>
          <p>
            {step === 1 
              ? "Enter your phone number to continue" 
              : `Enter the OTP sent to ${phone}`
            }
          </p>
        </div>

        {error && <div className={styles.errorMessage}>{error}</div>}

        {step === 1 ? (
          <form onSubmit={handleSendOTP} className={styles.authForm}>
            <div className={styles.formGroup}>
              <label>Phone Number</label>
              <div className={styles.inputWrapper}>
                <Phone className={styles.inputIcon} size={20} />
                <input 
                  type="tel" 
                  placeholder="e.g., 9876543210"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                  maxLength={15}
                  disabled={loading}
                  autoFocus
                />
              </div>
            </div>

            <button 
              type="submit" 
              className={styles.submitBtn}
              disabled={loading}
            >
              {loading ? 'Sending OTP...' : 'Send OTP'}
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerifyOTP} className={styles.authForm}>
            <div className={styles.formGroup}>
              <label>4-Digit OTP</label>
              <div className={styles.inputWrapper}>
                <KeyRound className={styles.inputIcon} size={20} />
                <input 
                  type="text" 
                  placeholder="Enter 1234 for testing"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 4))}
                  maxLength={4}
                  disabled={loading}
                  autoFocus
                  style={{ letterSpacing: '8px', fontWeight: 'bold' }}
                />
              </div>
            </div>

            <button 
              type="submit" 
              className={styles.submitBtn}
              disabled={loading}
            >
              {loading ? 'Verifying...' : 'Login securely'}
            </button>
            
            <button 
              type="button" 
              onClick={() => { setStep(1); setOtp(''); setError(''); }}
              className={styles.submitBtn}
              style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.2)', marginTop: '0' }}
              disabled={loading}
            >
              Change Phone Number
            </button>
          </form>
        )}

      </div>
    </div>
  );
};

export default Login;
