import React, { createContext, useState, useEffect, useContext } from 'react';
import { authAPI } from '../services/api';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check auth status on mount
  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem('token') || sessionStorage.getItem('token');
      if (token) {
        try {
          const res = await authAPI.getMe();
          setUser(res.data.user);
        } catch (error) {
          console.error('Auth initialization failed:', error);
          localStorage.removeItem('token');
          sessionStorage.removeItem('token');
        }
      }
      setLoading(false);
    };

    initAuth();
  }, []);

  const login = async (email, password, rememberMe) => {
    try {
      const res = await authAPI.login({ email, password });
      const { token, user } = res.data;
      
      if (rememberMe) {
        localStorage.setItem('token', token);
      } else {
        sessionStorage.setItem('token', token);
      }
      
      setUser(user);
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        message: error.response?.data?.message || 'Login failed' 
      };
    }
  };

  const register = async (userData) => {
    try {
      const res = await authAPI.register(userData);
      const { token, user } = res.data;
      
      // Auto login after register, using sessionStorage by default
      sessionStorage.setItem('token', token);
      setUser(user);
      
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        message: error.response?.data?.message || 'Registration failed' 
      };
    }
  };

  const logout = async () => {
    try {
      await authAPI.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      localStorage.removeItem('token');
      sessionStorage.removeItem('token');
      setUser(null);
    }
  };

  const loginWithOTP = async (phone, otp) => {
    // Mock testing flow for OTP
    if (otp === '1234') {
      const dummyUser = {
        id: 999,
        username: 'TestUser',
        email: 'test@shortflix.com',
        phone: phone,
      };
      const dummyToken = 'dummy_otp_token_testing';
      
      sessionStorage.setItem('token', dummyToken);
      setUser(dummyUser);
      return { success: true };
    } else {
      return { success: false, message: 'Invalid OTP. For testing, please use 1234.' };
    }
  };

  const value = {
    user,
    loading,
    isAuthenticated: !!user,
    login,
    loginWithOTP,
    register,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
