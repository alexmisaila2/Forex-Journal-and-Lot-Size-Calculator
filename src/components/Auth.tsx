import React from 'react';
import { LogIn } from 'lucide-react';
import { useAuth0 } from '@auth0/auth0-react';

export default function Auth() {
  const { loginWithRedirect } = useAuth0();

  const handleLogin = async () => {
    try {
      await loginWithRedirect({
        appState: {
          returnTo: window.location.origin
        }
      });
    } catch (error) {
      console.error('Authentication Error:', error);
    }
  };

  return (
    <div className="text-center">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Forex Trading Journal</h2>
        <p className="text-gray-600 mb-8">
          Sign in to access your personal trading journal. Your data will be securely stored and accessible from any device.
        </p>
        <button
          onClick={handleLogin}
          className="w-full flex items-center justify-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <LogIn className="w-5 h-5" />
          <span>Sign In / Sign Up</span>
        </button>
      </div>
    </div>
  );
}