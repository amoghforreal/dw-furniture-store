import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../../context/UserContext';

const Signup = () => {
  const navigate = useNavigate();
  const { login } = useUser();
  const [error, setError] = useState(''); // State for error messages
  
  // Form States
  const [formData, setFormData] = useState({
    firstName: '',
    surname: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(''); // Clear error when user types
  };

  const handleJoin = (e) => {
    e.preventDefault();
    
    // 1) Validation: Check if fields are empty
    if (!formData.firstName || !formData.surname || !formData.email || !formData.password) {
      setError("Please fill in all required fields.");
      return;
    }

    // 2) Logic: Logs user in -> Goes to Shop Page
    login({ 
      name: `${formData.firstName} ${formData.surname}`, 
      email: formData.email 
    });
    navigate('/shop');
  };

  // 3) Guest Logic
  const handleGuest = () => {
    navigate('/shop');
  };

  return (
    <div className="flex min-h-screen">
      {/* Left Side - Image Section */}
      <div className="hidden lg:flex w-1/2 relative bg-black">
        <img 
          src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1974&auto=format&fit=crop" 
          alt="Interior Design" 
          className="absolute inset-0 w-full h-full object-cover opacity-80"
        />
        <div className="relative z-10 flex items-center justify-center w-full h-full">
          <h1 className="text-6xl font-bold text-white tracking-tighter text-center leading-tight">
            Better Living<br />Starts Here
          </h1>
        </div>
      </div>

      {/* Right Side - Form Section */}
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-white px-8">
        <div className="w-full max-w-md bg-[#C0BDB8] p-10 rounded-3xl shadow-xl"> 
          
          <h2 className="text-4xl font-bold text-center mb-2">Sign Up</h2>
          <div className="text-center mb-6 text-sm font-medium">
            Already have an account? <Link to="/login" className="text-green-700 hover:underline">Log In</Link>
          </div>

          

          {/* Error Message Display */}
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded relative mb-4 text-center text-sm font-bold">
              {error}
            </div>
          )}

          <form onSubmit={handleJoin} className="space-y-4">
            <div className="flex gap-4">
              <input 
                name="firstName" 
                type="text" 
                placeholder="First name" 
                className="w-1/2 px-4 py-3 rounded-full border-none focus:ring-2 focus:ring-green-500 outline-none text-center"
                onChange={handleChange}
              />
              <input 
                name="surname" 
                type="text" 
                placeholder="Last Name" 
                className="w-1/2 px-4 py-3 rounded-full border-none focus:ring-2 focus:ring-green-500 outline-none text-center"
                onChange={handleChange}
              />
            </div>

            <input 
              name="email" 
              type="email" 
              placeholder="Email Address" 
              className="w-full px-4 py-3 rounded-full border-none focus:ring-2 focus:ring-green-500 outline-none text-center"
              onChange={handleChange}
            />

            <input 
              name="password" 
              type="password" 
              placeholder="Password" 
              className="w-full px-4 py-3 rounded-full border-none focus:ring-2 focus:ring-green-500 outline-none text-center"
              onChange={handleChange}
            />

            <input 
              name="confirmPassword" 
              type="password" 
              placeholder="Confirm Password" 
              className="w-full px-4 py-3 rounded-full border-none focus:ring-2 focus:ring-green-500 outline-none text-center"
              onChange={handleChange}
            />

            <button 
              type="submit" 
              className="w-full bg-[#4CAF50] text-white py-3 rounded-full font-bold hover:bg-green-600 transition shadow-md mt-4"
            >
              Join
            </button>
            {/* Continue as Guest Button (NEW) */}
            <div className="flex items-center gap-4 mb-4">
            <div className="h-px bg-gray-500 flex-1"></div>
            <span className="text-gray-600 font-bold">Or</span>
            <div className="h-px bg-gray-500 flex-1"></div>
          </div>
          <button 
            onClick={handleGuest}
            className="block w-full bg-gray-800 text-white text-center py-3 rounded-full font-bold hover:bg-gray-700 transition mb-4 shadow-md"
          >
            Continue as Guest
          </button>

          
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;