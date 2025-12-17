import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, Search, Heart, Trash2, Home, ArrowRight, User, Mic } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { products } from '../data/mockData';
import { useUser } from '../context/UserContext';

const Cart = () => {
  const { cart, removeFromCart, cartTotal, addToCart } = useCart();
  const { user } = useUser();
  const navigate = useNavigate();

  // Recommendations (taking last 2 items from mockData as per design)
  const recommendations = products.slice(4, 6); 

  const handleAddToBag = (product) => {
    addToCart(product);
    // Requirement: Scroll to navbar
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="bg-white min-h-screen font-sans text-gray-900 pb-20">
      
      {/* 1. CUSTOM HEADER */}
      <div className="bg-[#D9D0C7] text-xs font-medium py-1 px-8 flex justify-end gap-4 text-gray-700">
         <span>Help</span>
         <span>|</span>
         <span className="flex items-center gap-1">Hi, {user ? user.name.split(' ')[0] : 'User'} <User size={12}/></span>
      </div>

      <div className="border-b border-gray-100 shadow-sm sticky top-0 bg-white z-50 py-4 px-8 flex items-center justify-between gap-8">
          {/* Left: Logo & Home */}
          <div className="flex items-center gap-8">
            <a href="https://www.google.com" target="_blank" rel="noreferrer">
              <div className="w-12 h-12 bg-[#4CAF50] rounded-full flex items-center justify-center text-white font-bold text-xl cursor-pointer hover:bg-green-600 transition">
                DW
              </div>
            </a>
            <Link to="/shop">
               <Home size={28} className="cursor-pointer hover:text-green-600 transition" />
            </Link>
            <div className="hidden md:flex gap-6 font-medium text-sm">
                <span>New & Featured</span>
                <span>Category</span>
            </div>
          </div>

          {/* Center: Search */}
          <div className="flex-1 max-w-lg bg-[#F0F0F0] rounded-full px-4 py-2 flex items-center gap-3">
             <Search size={18} className="text-gray-400" />
             <input type="text" placeholder="Search" className="bg-transparent outline-none w-full text-sm text-gray-700" />
             <Mic size={18} className="text-gray-400 cursor-pointer" />
          </div>

          {/* Right: Icons */}
          <div className="flex items-center gap-6">
             <ShoppingBag size={28} className="cursor-pointer text-black" />
             <Heart size={28} className="cursor-pointer hover:text-red-500 transition" />
          </div>
      </div>


      {/* 2. MAIN CART CONTENT */}
      <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-3 gap-16">
        
        {/* Left Column: Cart Items */}
        <div className="lg:col-span-2 space-y-8">
          {cart.length === 0 ? (
             <div className="text-center py-20 text-gray-500">Your cart is empty</div>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="flex gap-8 items-start">
                <div className="w-48 h-48 bg-gray-100 rounded-md overflow-hidden">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 space-y-2">
                   <div className="flex justify-between items-start">
                      <h3 className="font-bold text-xl uppercase tracking-wider">{item.name}</h3>
                      <span className="font-bold text-xl">${item.price.toFixed(2)}</span>
                   </div>
                   <p className="text-gray-600">{item.category}</p>
                   <p className="text-gray-600">Colour: {item.color || 'Standard'}</p>
                   <p className="text-gray-600">Dimension:</p>
                   <p className="text-gray-600">Quantity: {item.qty}</p>
                   
                   <div className="flex gap-4 mt-4 text-black">
                      <Heart size={20} className="cursor-pointer hover:text-red-500" />
                      <Trash2 
                        size={20} 
                        className="cursor-pointer hover:text-red-500" 
                        onClick={() => removeFromCart(item.id)}
                      />
                   </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Right Column: Summary */}
        <div>
           <h2 className="text-2xl font-medium mb-6">Summary</h2>
           <p className="font-bold text-sm mb-6">Do you have a promo code?</p>
           
           <div className="space-y-3 mb-6 text-sm">
              <div className="flex justify-between">
                 <span>Subtotal:</span>
                 <span>${cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                 <span>Shipping price :</span>
                 <span>$0.00</span>
              </div>
              <div className="flex justify-between">
                 <span>Estimated Tax:</span>
                 <span>-</span>
              </div>
              <div className="h-px bg-gray-300 my-2"></div>
              <div className="flex justify-between font-bold text-lg">
                 <span>Total:</span>
                 <span>${cartTotal.toFixed(2)}</span>
              </div>
           </div>

           <div className="space-y-4">
              <button 
                onClick={() => navigate('/checkout')}
                className="w-full bg-[#3CAA3C] text-white py-3 rounded-full font-bold shadow-md hover:bg-green-700 transition"
              >
                Checkout
              </button>
              <button 
                onClick={() => navigate('/checkout')}
                className="w-full bg-[#D9D9D9] text-black py-3 rounded-full font-bold shadow-sm hover:bg-gray-400 transition"
              >
                PayPal
              </button>
           </div>
        </div>
      </div>


      {/* 3. FOOTER: PEOPLE ALSO SEARCH FOR */}
      <div className="max-w-6xl mx-auto px-6 mt-12">
         <div 
           className="flex items-center gap-2 mb-6 cursor-pointer group w-fit"
           onClick={() => navigate('/products')} // Requirement: Go back to product list
         >
            <h3 className="font-medium text-lg">People also search for</h3>
            <ArrowRight size={20} className="group-hover:translate-x-1 transition" />
         </div>

         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {recommendations.map((item) => (
               <div key={item.id} className="flex gap-6 items-center">
                  <div 
                    className="w-32 h-40 bg-gray-100 overflow-hidden cursor-pointer"
                    onClick={() => navigate(`/product/${item.id}`)} // Requirement: Go to detail page
                  >
                     <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                     <h4 className="font-bold uppercase text-sm mb-1">{item.name}</h4>
                     <p className="text-sm text-gray-600 mb-1">{item.description}</p>
                     <div className="flex gap-1 mb-2">
                        {[...Array(4)].map((_, i) => <div key={i} className="w-3 h-3 rounded-full bg-black"></div>)}
                     </div>
                     <button 
                       onClick={() => handleAddToBag(item)}
                       className="bg-[#C4B5A5] text-xs font-bold px-6 py-2 rounded-full hover:bg-[#b0a08e] transition"
                     >
                        Add to Bag
                     </button>
                  </div>
               </div>
            ))}
         </div>
      </div>

    </div>
  );
};

export default Cart;