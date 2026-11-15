'use client';

import { createContext, useContext, useState, useEffect, useCallback } from 'react';

const AuthContext = createContext(null);

const STORAGE_KEY = 'jain_jewellers_auth_user';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) return JSON.parse(stored);
      } catch (e) {
        console.error('Failed to parse stored user:', e);
      }
    }
    return null;
  });
  const [isLoading] = useState(false);
  const [toast, setToast] = useState({ message: '', type: 'success', visible: false });

  // Sync user state with external storage changes if any
  useEffect(() => {
    const handleStorage = (event) => {
      if (event.key === STORAGE_KEY) {
        try {
          setUser(event.newValue ? JSON.parse(event.newValue) : null);
        } catch {
          setUser(null);
        }
      }
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  // Toast notification helper
  const showToast = useCallback((message, type = 'success') => {
    setToast({ message, type, visible: true });
    const timer = setTimeout(() => {
      setToast((prev) => ({ ...prev, visible: false }));
    }, 3500);
    return () => clearTimeout(timer);
  }, []);

  const hideToast = useCallback(() => {
    setToast((prev) => ({ ...prev, visible: false }));
  }, []);

  // Mock Email/Phone Login
  const login = useCallback(
    async ({ identifier }) => {
      // Small simulated latency
      await new Promise((resolve) => setTimeout(resolve, 400));

      const isEmail = identifier.includes('@');
      const mockUser = {
        name: isEmail ? identifier.split('@')[0] : 'Kanak Choudhary',
        email: isEmail ? identifier : 'choudharykanak.2005@gmail.com',
        phone: isEmail ? '+91 98765 43210' : identifier,
        avatar: (isEmail ? identifier[0] : 'K').toUpperCase(),
        provider: 'local',
        role: 'Customer',
        joinedDate: new Date().toLocaleDateString('en-IN', { month: 'short', year: 'numeric' }),
      };

      setUser(mockUser);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(mockUser));
      showToast(`Welcome back, ${mockUser.name}!`, 'success');
      return { success: true, user: mockUser };
    },
    [showToast]
  );

  // Mock Registration
  const signup = useCallback(
    async (userData) => {
      await new Promise((resolve) => setTimeout(resolve, 500));

      const fullName = `${userData.firstName.trim()} ${userData.lastName.trim()}`.trim();
      const mockUser = {
        name: fullName || 'New Customer',
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        phone: userData.phone,
        gender: userData.gender || 'Not specified',
        dob: userData.dob || '',
        avatar: (userData.firstName?.[0] || 'U').toUpperCase(),
        provider: 'local',
        role: 'Customer',
        joinedDate: new Date().toLocaleDateString('en-IN', { month: 'short', year: 'numeric' }),
      };

      setUser(mockUser);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(mockUser));
      showToast(`Registration successful! Welcome to Jain Jewellers, ${userData.firstName}.`, 'success');
      return { success: true, user: mockUser };
    },
    [showToast]
  );

  // Dummy Google Authentication (No external SDK, 100% frontend simulation)
  const loginWithGoogle = useCallback(
    async () => {
      // Simulate OAuth prompt latency
      await new Promise((resolve) => setTimeout(resolve, 600));

      const googleUser = {
        name: 'Kanak',
        fullName: 'Kanak Choudhary',
        email: 'choudharykanak.2005@gmail.com',
        phone: '+91 98765 43210',
        avatar: 'K',
        provider: 'google',
        role: 'Customer',
        joinedDate: new Date().toLocaleDateString('en-IN', { month: 'short', year: 'numeric' }),
      };

      setUser(googleUser);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(googleUser));
      showToast('Successfully signed in with Google as Kanak!', 'success');
      return { success: true, user: googleUser };
    },
    [showToast]
  );

  // Mock OTP Login
  const loginWithOtp = useCallback(
    async ({ identifier }) => {
      await new Promise((resolve) => setTimeout(resolve, 400));

      const isEmail = identifier?.includes('@');
      const mockUser = {
        name: 'Kanak Choudhary',
        email: isEmail ? identifier : 'choudharykanak.2005@gmail.com',
        phone: isEmail ? '+91 98765 43210' : (identifier || '+91 98765 43210'),
        avatar: 'K',
        provider: 'otp',
        role: 'Customer',
        joinedDate: new Date().toLocaleDateString('en-IN', { month: 'short', year: 'numeric' }),
      };

      setUser(mockUser);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(mockUser));
      showToast('Phone verified! Logged in successfully.', 'success');
      return { success: true, user: mockUser };
    },
    [showToast]
  );

  // Logout
  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem(STORAGE_KEY);
    showToast('Signed out successfully.', 'info');
  }, [showToast]);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        signup,
        loginWithGoogle,
        loginWithOtp,
        logout,
        showToast,
      }}
    >
      {children}

      {/* Global Auth Toast Notification */}
      {toast.visible && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-6 right-6 z-[100] max-w-sm px-4 py-3 bg-charcoal text-white rounded-xl shadow-2xl border border-champagne/30 text-xs sm:text-sm font-sans flex items-center gap-3 animate-in fade-in slide-in-from-bottom-3 duration-200"
        >
          <span
            className={`w-2.5 h-2.5 rounded-full shrink-0 ${
              toast.type === 'error'
                ? 'bg-red-500'
                : toast.type === 'info'
                ? 'bg-blue-400'
                : 'bg-gold'
            }`}
          />
          <span className="flex-1 leading-snug">{toast.message}</span>
          <button
            type="button"
            onClick={hideToast}
            className="text-white/60 hover:text-white text-base leading-none p-1"
            aria-label="Dismiss notification"
          >
            ×
          </button>
        </div>
      )}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
