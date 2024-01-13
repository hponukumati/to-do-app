import React, { useState, useContext } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from '../AuthContext'; // Update this path
import Navbar from './Navbar';

export default function Login() {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const { login } = useContext(AuthContext); // Assuming login method updates the auth state
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send a request to the login endpoint
      const loginResponse = await fetch(import.meta.env.VITE_BACKEND_URL+'/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
  
      const loginData = await loginResponse.json();
      console.log(loginData);
      if (!loginResponse.ok) throw new Error(loginData.message || 'Login failed');
  
      // Validate the received token
      const tokenValidationResponse = await fetch(import.meta.env.VITE_BACKEND_URL+'/auth/authenticatetoken', {
        method: 'POST',
        headers: {
          'Authorization': `${loginData.token}`,
          'Content-Type': 'application/json'
        }
      });
  
      const validationData = await tokenValidationResponse.json();
      if (!tokenValidationResponse.ok) throw new Error(validationData.message || 'Token validation failed');
  
      // Update auth context with token and user details
      login(loginData.token, formData.username, loginData.userId);
      console.log("auth Sucessful")
      navigate('/'); // Redirect to home page
    } catch (error) {
      console.error('Authentication error:', error.message);
      // Handle login or token validation errors
    }
  };

  return (
      <>
      <Navbar/>
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Sign in to your account
            </h2>
          </div>
  
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                  Username
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="username"
                    type="name"
                    required
                    value={formData.username}
                    onChange={handleChange}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
  
              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                    Password
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
  
              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Sign in
                </button>
              </div>
            </form>
  
            <p className="mt-10 text-center text-sm text-gray-500">
              Not a member?{' '}
              <Link to="/signup" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </>
    )
  }
  