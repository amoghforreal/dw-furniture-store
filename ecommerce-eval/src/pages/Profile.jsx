import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ShoppingBag, User, Facebook, Instagram, Youtube, ArrowLeft, Eye, EyeOff } from 'lucide-react';
import { useUser } from '../context/UserContext';

const Profile = () => {
  const { user, logout, updateUser } = useUser();
  const navigate = useNavigate();
  
  // Tab State: 'account' | 'security' | 'address' | 'orders'
  const [activeTab, setActiveTab] = useState('account');
  const [saveStatus, setSaveStatus] = useState('Save Changes');
  
  // Local Form States
  const [formData, setFormData] = useState({
    firstName: '',
    surname: '',
    email: '',
    address: '',
    password: ''
  });
  
  const [showPassword, setShowPassword] = useState(false);

  // Initialize form with User Context data
  useEffect(() => {
    if (user) {
      const nameParts = user.name.split(' ');
      setFormData({
        firstName: nameParts[0] || '',
        surname: nameParts.slice(1).join(' ') || '',
        email: user.email || '',
        address: user.address || '',
        password: user.password || ''
      });
    }
  }, [user]);

  const handleLogout = () => {
    logout();
    navigate('/'); // Redirect to Signup page
  };

  const handleSave = () => {
    // 1. Update Context (Global State)
    const fullName = `${formData.firstName} ${formData.surname}`.trim();
    
    updateUser({
        name: fullName,
        email: formData.email,
        address: formData.address
    });

    // 2. Visual Feedback
    setSaveStatus('Saved!');
    setTimeout(() => {
        setSaveStatus('Save Changes');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 flex flex-col justify-between">
      
      {/* 1. CUSTOM HEADER */}
      {/* FIX: Added 'border-b-2 border-gray-300' for a visible separation line */}
      <div className="border-b-2 border-gray-300 py-4 px-8 flex items-center justify-between sticky top-0 bg-white z-50">
        
        {/* Left: Back Button Logic */}
        <div 
          onClick={() => navigate(-1)} 
          className="flex items-center gap-2 cursor-pointer hover:text-green-600 transition"
        >
           <ArrowLeft size={20} />
           <span className="text-lg font-normal">Back</span>
        </div>

        {/* Center: Logo */}
        <a href="https://www.google.com" target="_blank" rel="noreferrer">
           <div className="w-12 h-12 bg-[#4CAF50] rounded-full flex items-center justify-center text-white font-bold text-xl cursor-pointer hover:bg-green-600 transition">
             DW
           </div>
        </a>

        {/* Right: Icons */}
        <div className="flex items-center gap-6 text-black">
           <Search size={20} className="cursor-pointer" />
           <div className="flex items-center gap-2 cursor-pointer text-green-700 font-bold transition">
              <User size={20} />
              {/* Dynamic Name Display - Updates when you click Save */}
              <span className="text-sm">Hi, {user?.name ? user.name.split(' ')[0] : 'User'}</span>
           </div>
           <ShoppingBag size={20} className="cursor-pointer" />
        </div>
      </div>


      {/* 2. MAIN CONTENT */}
      <div className="max-w-6xl mx-auto px-8 w-full flex-grow pt-10 pb-20">
         
         <div className="flex items-center gap-2 text-sm text-gray-500 mb-8">
            <span className="hover:underline cursor-pointer" onClick={() => navigate('/shop')}>Home</span> &gt; <span>My Account</span>
         </div>

         <h1 className="text-4xl font-medium mb-12">My Account</h1>

         <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            
            {/* LEFT SIDEBAR (TABS) */}
            <div className="space-y-4 text-lg">
               <p 
                 onClick={() => setActiveTab('account')}
                 className={`cursor-pointer transition ${activeTab === 'account' ? 'font-bold text-black border-l-4 border-green-500 pl-2' : 'text-gray-500 hover:text-black'}`}
               >
                 My Account
               </p>
               
               <p 
                 onClick={() => setActiveTab('security')}
                 className={`cursor-pointer transition ${activeTab === 'security' ? 'font-bold text-black border-l-4 border-green-500 pl-2' : 'text-gray-500 hover:text-black'}`}
               >
                 Security
               </p>
               
               <p 
                 onClick={() => setActiveTab('address')}
                 className={`cursor-pointer transition ${activeTab === 'address' ? 'font-bold text-black border-l-4 border-green-500 pl-2' : 'text-gray-500 hover:text-black'}`}
               >
                 Addresses
               </p>
               
               <p 
                 onClick={() => setActiveTab('orders')}
                 className={`cursor-pointer transition ${activeTab === 'orders' ? 'font-bold text-black border-l-4 border-green-500 pl-2' : 'text-gray-500 hover:text-black'}`}
               >
                 Orders
               </p>

               <div className="pt-10">
                 <button 
                   onClick={handleLogout}
                   className="border border-black px-10 py-3 uppercase text-sm font-medium tracking-wider hover:bg-black hover:text-white transition"
                 >
                   Log Out
                 </button>
               </div>
            </div>

            {/* RIGHT CONTENT AREA */}
            <div className="md:col-span-2 max-w-lg space-y-6">
               
               {/* --- TAB: ACCOUNT --- */}
               {activeTab === 'account' && (
                 <>
                    <div className="space-y-4">
                        <label className="text-xs font-bold text-gray-500 uppercase">First Name</label>
                        <input 
                          type="text" 
                          value={formData.firstName}
                          onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                          className="w-full bg-[#D9D9D9] px-6 py-4 rounded-xl text-center text-lg outline-none focus:ring-2 focus:ring-green-500"
                          placeholder="First Name"
                        />

                        <label className="text-xs font-bold text-gray-500 uppercase">Last Name</label>
                        <input 
                          type="text" 
                          value={formData.surname}
                          onChange={(e) => setFormData({...formData, surname: e.target.value})}
                          className="w-full bg-[#D9D9D9] px-6 py-4 rounded-xl text-center text-lg outline-none focus:ring-2 focus:ring-green-500"
                          placeholder="Last Name"
                        />

                        <label className="text-xs font-bold text-gray-500 uppercase">Email</label>
                        <input 
                          type="email" 
                          value={formData.email}
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                          className="w-full bg-[#D9D9D9] px-6 py-4 rounded-xl text-center text-lg outline-none focus:ring-2 focus:ring-green-500"
                          placeholder="Email Address"
                        />
                    </div>
                    <button 
                      onClick={handleSave}
                      className={`w-full py-4 rounded-xl text-white font-bold text-lg shadow-md transition duration-300 mt-4 ${saveStatus === 'Saved!' ? 'bg-gray-500' : 'bg-[#388E3C] hover:bg-green-700'}`}
                    >
                      {saveStatus}
                    </button>
                 </>
               )}

               {/* --- TAB: SECURITY --- */}
               {activeTab === 'security' && (
                 <div className="space-y-6">
                    <h3 className="text-2xl font-bold">Login Details</h3>
                    <div className="relative">
                        <label className="text-xs font-bold text-gray-500 uppercase mb-1 block">Your Password</label>
                        
                        {/* Logic: If Guest (no password), show disabled box. Else show password with Eye toggle. */}
                        {(!user.password) ? (
                            <input 
                              type="text"
                              value="No password for guests"
                              disabled
                              className="w-full bg-[#E0E0E0] px-6 py-4 rounded-xl text-lg outline-none text-gray-500 italic cursor-not-allowed"
                            />
                        ) : (
                            <>
                                <input 
                                  type={showPassword ? "text" : "password"}
                                  value={formData.password}
                                  readOnly
                                  className="w-full bg-[#E0E0E0] px-6 py-4 rounded-xl text-lg outline-none text-gray-800"
                                />
                                <div 
                                  className="absolute right-4 top-8 cursor-pointer text-gray-500 hover:text-black p-1"
                                  onClick={() => setShowPassword(!showPassword)}
                                >
                                   {showPassword ? <EyeOff size={24} /> : <Eye size={24} />}
                                </div>
                            </>
                        )}
                    </div>
                    <p className="text-sm text-gray-500">
                        {user.password ? "This is the password you used to sign up." : "You are currently using a guest session."}
                    </p>
                 </div>
               )}

               {/* --- TAB: ADDRESS --- */}
               {activeTab === 'address' && (
                 <div className="space-y-6">
                    <h3 className="text-2xl font-bold">Manage Addresses</h3>
                    <div>
                        <label className="text-xs font-bold text-gray-500 uppercase mb-1 block">Shipping Address</label>
                        <textarea 
                          rows="4"
                          value={formData.address}
                          onChange={(e) => setFormData({...formData, address: e.target.value})}
                          className="w-full bg-[#D9D9D9] px-6 py-4 rounded-xl text-lg outline-none focus:ring-2 focus:ring-green-500"
                          placeholder="Enter your full delivery address here..."
                        />
                    </div>
                    <button 
                      onClick={handleSave}
                      className="w-full bg-[#388E3C] text-white py-4 rounded-xl font-bold text-lg shadow-md hover:bg-green-700 transition"
                    >
                      Save Address
                    </button>
                 </div>
               )}

               {/* --- TAB: ORDERS --- */}
               {activeTab === 'orders' && (
                 <div className="space-y-6">
                    <h3 className="text-2xl font-bold">Your Orders</h3>
                    <div className="bg-[#F0F0F0] p-8 rounded-xl text-center">
                        <p className="text-gray-600 mb-2">Total orders placed yet:</p>
                        <h2 className="text-5xl font-bold text-green-600">{user.orders ? user.orders.length : 0}</h2>
                    </div>
                 </div>
               )}

            </div>

         </div>
      </div>


      {/* 3. CUSTOM FOOTER (Profile Page Specific) */}
      <div className="bg-[#7FA18A] text-white py-16 px-8">
         <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-end">
            
            <div className="space-y-8">
               <p className="text-lg font-normal">discover the best furnitures on one click</p>
               <div className="flex gap-6 text-black">
                  <Facebook size={20} className="cursor-pointer hover:text-white transition" />
                  <Instagram size={20} className="cursor-pointer hover:text-white transition" />
                  <Youtube size={20} className="cursor-pointer hover:text-white transition" />
               </div>
               <p className="text-black text-sm pt-4">© 2025, DW. All rights reserved.</p>
            </div>

            <div className="flex gap-16 text-right mt-10 md:mt-0 text-white text-sm leading-loose">
               <div>
                  <h4 className="text-black font-medium mb-2">Legal</h4>
                  <p className="cursor-pointer hover:underline">Shopping Policy</p>
                  <p className="cursor-pointer hover:underline">Refund Policy</p>
                  <p className="cursor-pointer hover:underline">Privacy Policy</p>
                  <p className="cursor-pointer hover:underline">Terms & Conditions</p>
               </div>
               <div>
                  <h4 className="text-black font-medium mb-2">Company</h4>
                  <p className="cursor-pointer hover:underline">Contact Us</p>
               </div>
            </div>

         </div>
      </div>

    </div>
  );
};

export default Profile;