import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../context/UserContext';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useUser();
  
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.email && formData.password) {
      // Log the user in with a mock name based on email
      login({ 
        name: "Amogh Bajpai", 
        email: formData.email 
      });
      navigate('/shop'); // Redirects to Shop
    }
  };

  return (
    <div className="h-screen w-screen relative flex items-center justify-center overflow-hidden bg-gray-100">
      
      {/* Background Collage */}
      <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 gap-2 opacity-50 blur-sm">
         {/* Row 1 */}
         <img src="https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=800" className="w-full h-full object-cover" alt="bg-1" />
         <img src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=800" className="w-full h-full object-cover" alt="bg-2" />
         <img src="https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?q=80&w=800" className="w-full h-full object-cover" alt="bg-3" />
         
         {/* Row 2 */}
         {/* REPLACED IMG 4 WITH A KNOWN WORKING LINK */}
         <img src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=800" className="w-full h-full object-cover" alt="bg-4" />
         <img src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=800" className="w-full h-full object-cover" alt="bg-5" />
         <img src="https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=800" className="w-full h-full object-cover" alt="bg-6" />
         
         {/* Row 3 */}
         <img src="https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=800" className="w-full h-full object-cover" alt="bg-7" />
         {/* REPLACED IMG 8 WITH A KNOWN WORKING LINK */}
         <img src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=800" className="w-full h-full object-cover" alt="bg-8" />
         <img src="https://images.unsplash.com/photo-1615873968403-89e068629265?q=80&w=800" className="w-full h-full object-cover" alt="bg-9" />
      </div>

      {/* Login Card */}
      <div className="relative z-10 bg-[#FFF5F1] p-8 rounded-3xl shadow-2xl w-full max-w-sm mx-4">
        
        {/* Logo Circle */}
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-[#4CAF50] rounded-full flex items-center justify-center text-white font-bold text-xl">
            DW
          </div>
        </div>

        <h1 className="text-3xl font-bold text-center mb-8 text-black">Log In</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1 ml-1">Email address</label>
            <input 
              type="email" 
              placeholder="Email" 
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="w-full bg-[#E0E0E0] px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4CAF50] placeholder-gray-500 italic"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1 ml-1">Password</label>
            <input 
              type="password" 
              placeholder="Password" 
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              className="w-full bg-[#E0E0E0] px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4CAF50] placeholder-gray-500 italic"
              required
            />
          </div>

          <div className="text-right">
            <a href="#" className="text-xs font-bold text-black hover:underline">Forgot Password?</a>
          </div>

          <button 
            type="submit" 
            className="w-full bg-[#4CAF50] text-white py-3 rounded-full font-bold hover:bg-green-600 transition shadow-md mt-4"
          >
            Log In
          </button>

          <div className="text-center font-bold text-sm">OR</div>

          <button 
            type="button"
            className="w-full bg-[#D1D1D1] text-black py-3 rounded-full font-bold hover:bg-gray-400 transition shadow-sm"
          >
            Continue with Google
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;