import React, { useState } from 'react';

const Login = () => {
  const [isSignup, setIsSignup] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-yellow-50 py-10 px-2">
      <div className="w-full max-w-md bg-white/90 rounded-3xl shadow-2xl p-8 sm:p-10 border border-gray-100 relative">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-extrabold text-gray-800 mb-2 drop-shadow-sm">
            {isSignup ? 'Create Account' : 'Welcome Back!'}
          </h2>
          <p className="text-gray-500 text-sm">
            {isSignup ? 'Sign up to get started with Aruzz.' : 'Login to your Aruzz account.'}
          </p>
        </div>

        <form className="space-y-5">
          {isSignup && (
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-1" htmlFor="name">Full Name</label>
              <input type="text" id="name" name="name" autoComplete="name" className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none bg-white" placeholder="Your Name" />
            </div>
          )}
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-1" htmlFor="email">Email</label>
            <input type="email" id="email" name="email" autoComplete="email" className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none bg-white" placeholder="you@email.com" />
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-1" htmlFor="password">Password</label>
            <input type="password" id="password" name="password" autoComplete={isSignup ? 'new-password' : 'current-password'} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none bg-white" placeholder="••••••••" />
          </div>
          {isSignup && (
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-1" htmlFor="confirm">Confirm Password</label>
              <input type="password" id="confirm" name="confirm" autoComplete="new-password" className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none bg-white" placeholder="••••••••" />
            </div>
          )}
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition-all duration-200 active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-400 mt-2"
          >
            {isSignup ? 'Sign Up' : 'Login'}
          </button>
        </form>

        <div className="flex items-center my-6">
          <div className="flex-grow border-t border-gray-200" />
          <span className="mx-3 text-gray-400 text-xs">OR</span>
          <div className="flex-grow border-t border-gray-200" />
        </div>
        <button
          className="w-full flex items-center justify-center gap-2 py-2 px-4 border border-gray-200 rounded-lg bg-white hover:bg-gray-50 text-gray-700 font-medium shadow-sm transition-all duration-200"
          type="button"
        >
          <svg className="w-5 h-5" viewBox="0 0 48 48"><g><circle fill="#fff" cx="24" cy="24" r="24"/><path fill="#4285F4" d="M35.6 24.1c0-.7-.1-1.4-.2-2.1H24v4.1h6.5c-.3 1.4-1.3 2.6-2.7 3.4v2.8h4.4c2.6-2.4 4.1-5.9 4.1-10.3z"/><path fill="#34A853" d="M24 36c3.6 0 6.6-1.2 8.8-3.2l-4.4-2.8c-1.2.8-2.7 1.3-4.4 1.3-3.4 0-6.2-2.3-7.2-5.3h-4.5v3.3C15.2 33.8 19.3 36 24 36z"/><path fill="#FBBC05" d="M16.8 26c-.3-.8-.5-1.6-.5-2.5s.2-1.7.5-2.5v-3.3h-4.5C11.5 20.2 11 22 11 24s.5 3.8 1.3 5.3l4.5-3.3z"/><path fill="#EA4335" d="M24 18.7c1.9 0 3.6.6 4.9 1.7l3.7-3.7C30.6 14.8 27.6 13.5 24 13.5c-4.7 0-8.8 2.2-11.2 5.5l4.5 3.3c1-3 3.8-5.3 7.2-5.3z"/></g></svg>
          Continue with Google
        </button>

        <div className="mt-6 text-center">
          <span className="text-gray-600 text-sm">
            {isSignup ? 'Already have an account?' : "Don't have an account?"}
          </span>
          <button
            type="button"
            className="ml-2 text-blue-600 hover:underline font-semibold text-sm focus:outline-none"
            onClick={() => setIsSignup((v) => !v)}
          >
            {isSignup ? 'Login' : 'Sign Up'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
