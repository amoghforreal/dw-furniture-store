import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Home, User } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useUser } from '../context/UserContext';

const Checkout = () => {
  const { cart, cartTotal } = useCart();
  const { user } = useUser();
  const navigate = useNavigate();
  const [orderStatus, setOrderStatus] = useState('Place Order'); // 'Place Order' | 'Processing' | 'Placed'

  // If cart is empty, show a safe fallback or just the first item from cart for the visual
  const firstItem = cart.length > 0 ? cart[0] : null;

  const handlePlaceOrder = () => {
    // 4) Logic: Click "Place Order" -> Change to "Placed" in 2 seconds
    if (orderStatus === 'Place Order') {
      setOrderStatus('Processing...');
      setTimeout(() => {
        setOrderStatus('Placed');
      }, 2000);
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 pb-20">
      
      {/* 1. HEADER */}
      <div className="max-w-7xl mx-auto px-8 py-6 flex items-center justify-between border-b border-gray-200 mb-8">
        {/* Left: Home Icon */}
        <Link to="/shop">
           <Home size={28} className="cursor-pointer hover:text-green-600 transition" />
        </Link>

        {/* Center: Title */}
        <h1 className="text-4xl font-normal">Payment</h1>

        {/* Right: User & Logo */}
        <div className="flex items-center gap-4">
           <Link to={user ? "/profile" : "/login"}>
              <User size={28} className="cursor-pointer hover:text-green-600 transition" />
           </Link>
           {/* 3) Logo -> Google */}
           <a href="https://www.google.com" target="_blank" rel="noreferrer">
             <div className="w-12 h-12 bg-[#4CAF50] rounded-full flex items-center justify-center text-white font-bold text-xl cursor-pointer hover:bg-green-600 transition">
               DW
             </div>
           </a>
        </div>
      </div>


      {/* 2. MAIN GRID */}
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16">
        
        {/* LEFT COLUMN: Payment Form */}
        <div>
           <h2 className="text-xl font-medium mb-6">Pay with</h2>

           {/* Payment Card Container */}
           <div className="bg-[#D8D3D0] p-6 rounded-2xl mb-8">
              
              {/* Radio: Credit Card */}
              <div className="flex items-center gap-2 mb-4">
                 <div className="w-4 h-4 rounded-full border border-black flex items-center justify-center bg-transparent">
                    <div className="w-2 h-2 rounded-full bg-black"></div>
                 </div>
                 <span className="font-medium text-sm">Credit / Debit Card</span>
              </div>

              {/* Form Inputs */}
              <div className="space-y-4 ml-1">
                 <div>
                    <label className="block text-xs text-gray-600 mb-1 ml-1">Card Number</label>
                    <input type="text" value="**** **** **** NAN" readOnly className="w-full bg-[#ECECEC] px-4 py-2 rounded-md text-sm outline-none" />
                 </div>
                 
                 <div>
                    <label className="block text-xs text-gray-600 mb-1 ml-1">Exp Date</label>
                    <input type="text" value="yy/mm" readOnly className="w-full bg-[#ECECEC] px-4 py-2 rounded-md text-sm outline-none" />
                 </div>

                 <div>
                    <label className="block text-xs text-gray-600 mb-1 ml-1">CVC</label>
                    <input type="text" value="***" readOnly className="w-full bg-[#ECECEC] px-4 py-2 rounded-md text-sm outline-none" />
                 </div>
              </div>

              {/* Radio: Bank Account */}
              <div className="flex items-center gap-2 mt-6">
                 <div className="w-4 h-4 rounded-full border border-black flex items-center justify-center bg-transparent"></div>
                 <span className="font-medium text-sm">Bank Account</span>
              </div>
           </div>

           {/* Review Order Detail (Click to go to Cart) */}
           <div>
              <h3 className="font-medium text-lg mb-4">Review Order Detail</h3>
              {firstItem ? (
                 <div 
                   onClick={() => navigate('/cart')} 
                   className="flex items-center gap-4 cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition"
                 >
                    <div className="w-16 h-16 bg-gray-100 rounded-md overflow-hidden border border-gray-200">
                       <img src={firstItem.image} alt={firstItem.name} className="w-full h-full object-cover" />
                    </div>
                    <div>
                       <p className="font-bold text-sm">Subtotal : ${cartTotal.toFixed(2)}</p>
                       <p className="text-sm text-gray-600">Estimated delivery by: 31st January, 2026</p>
                    </div>
                 </div>
              ) : (
                <p className="text-gray-500 text-sm">Your cart is empty.</p>
              )}
           </div>
        </div>


        {/* RIGHT COLUMN: Order Options */}
        <div className="border-l border-gray-200 pl-0 lg:pl-16 pt-6 lg:pt-0">
           <h2 className="text-xl font-medium mb-6">Order Options</h2>
           
           <div className="space-y-3 text-sm mb-8 font-medium">
              <div className="flex justify-between">
                 <span>subtotal:</span>
                 <span>${cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                 <span>Welcome Offer:</span>
                 <span>-</span>
              </div>
              <div className="flex justify-between">
                 <span>Shipping Price:</span>
                 <span>$0.00</span>
              </div>
              <div className="flex justify-between font-bold text-lg mt-4">
                 <span>Grand Total:</span>
                 <span>${cartTotal.toFixed(2)}</span>
              </div>
           </div>

           {/* Place Order Button */}
           <button 
             onClick={handlePlaceOrder}
             disabled={orderStatus === 'Placed'}
             className={`w-full py-4 rounded-full font-bold text-white text-lg shadow-md transition duration-300 mb-8 
               ${orderStatus === 'Placed' ? 'bg-gray-400 cursor-default' : 'bg-[#3CAA3C] hover:bg-green-700'}`}
           >
             {orderStatus}
           </button>

           {/* Promo Code */}
           <div>
              <p className="text-sm uppercase font-bold text-gray-500 mb-2">PROMO CODE</p>
              <div className="flex gap-4">
                 <input 
                   type="text" 
                   placeholder="type here." 
                   className="bg-[#E5E5E5] px-4 py-2 rounded-md flex-1 outline-none text-sm" 
                 />
                 <button className="bg-[#E5E5E5] px-6 py-2 rounded-md font-bold text-sm hover:bg-gray-300 transition">
                    Apply
                 </button>
              </div>
           </div>

        </div>

      </div>
    </div>
  );
};

export default Checkout;