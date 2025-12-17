import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Home, Search, Heart, ShoppingCart, User, Mic, Minus, Plus } from 'lucide-react';
import { products } from '../data/mockData';
import { useCart } from '../context/CartContext';
import { useUser } from '../context/UserContext';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { user } = useUser();
  const [qty, setQty] = useState(1);
  
  const product = products.find(p => p.id === parseInt(id));

  if (!product) return <div className="p-10 text-center">Product not found</div>;

  const handleAddToCart = () => {
    // Add the specific quantity to cart (we might need to update context to handle qty payload, 
    // but for now we loop or just add once. Simple add for this demo)
    for(let i=0; i<qty; i++) {
        addToCart(product);
    }
    navigate('/cart');
  };

  const handleBuyNow = () => {
    handleAddToCart();
    navigate('/checkout'); // Direct to checkout/cart
  };

  return (
    <div className="bg-white min-h-screen pb-20 font-sans text-gray-900">
      
      {/* 1. CUSTOM HEADER (Matches Product Details Design) */}
      <div className="border-b border-gray-100 shadow-sm sticky top-0 bg-white z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center gap-6">
          {/* Logo -> Google.com as per requirement */}
          <a href="https://www.google.com" target="_blank" rel="noreferrer">
            <div className="w-12 h-12 bg-[#4CAF50] rounded-full flex items-center justify-center text-white font-bold text-xl shadow-sm cursor-pointer hover:bg-green-600 transition">
              DW
            </div>
          </a>

          {/* Home Icon */}
          <Link to="/shop">
            <Home size={28} className="text-black hover:text-green-600 transition cursor-pointer" />
          </Link>

          {/* Search Bar */}
          <div className="flex-1 bg-[#F0F0F0] rounded-full px-6 py-3 flex items-center gap-3">
             <Search size={20} className="text-gray-400" />
             <input type="text" placeholder="Search" className="bg-transparent outline-none w-full text-sm font-medium text-gray-700" />
             <Mic size={20} className="text-gray-400 cursor-pointer" />
          </div>

          {/* Right Icons */}
          <div className="flex items-center gap-6">
             <Heart size={26} className="cursor-pointer hover:text-red-500 transition" />
             <Link to="/cart">
                <ShoppingCart size={26} className="cursor-pointer hover:text-green-600 transition" />
             </Link>
             <Link to={user ? "/profile" : "/login"}>
                <User size={26} className="cursor-pointer hover:text-green-600 transition" />
             </Link>
          </div>
        </div>
      </div>

      {/* 2. MAIN CONTENT GRID */}
      <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-2 gap-16">
        
        {/* LEFT: Image */}
        <div className="bg-gray-100 rounded-lg overflow-hidden h-[500px]">
           <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
        </div>

        {/* RIGHT: Details */}
        <div>
           <div className="flex justify-between items-start mb-2">
              <div>
                 <h1 className="text-3xl font-bold uppercase tracking-wider mb-1">{product.name}</h1>
                 <p className="text-xl text-gray-600 font-medium">{product.category}</p>
                 {/* Stars */}
                 <div className="flex gap-1 mt-2">
                     {[...Array(5)].map((_, i) => (
                       <div key={i} className={`w-3 h-3 rounded-full border border-black ${i < product.rating ? 'bg-black' : 'bg-transparent'}`}></div>
                     ))}
                 </div>
              </div>
              <span className="text-3xl font-bold">${product.price.toFixed(2)}</span>
           </div>

           <div className="mb-8">
             <p className="text-sm text-gray-500">Shipping calculated at checkout</p>
             <a href="#" className="text-sm text-green-500 hover:underline">Add Address</a>
           </div>

           {/* Colour Selector */}
           <div className="flex justify-between items-center py-4 border-b border-gray-200 mb-4">
              <span className="font-bold text-lg">Colour</span>
              <span className="text-gray-600">Yellow</span>
           </div>

           {/* Quantity Selector */}
           <div className="flex justify-between items-center py-4 border-b border-gray-200 mb-8">
              <span className="font-bold text-lg">Quantity</span>
              <div className="flex items-center bg-[#C4B5A5] rounded-full px-4 py-1 gap-4">
                 <button onClick={() => setQty(q => Math.max(1, q - 1))} className="p-1"><Minus size={16} /></button>
                 <span className="font-bold">{qty}</span>
                 <button onClick={() => setQty(q => q + 1)} className="p-1"><Plus size={16} /></button>
              </div>
           </div>

           {/* Buttons */}
           <div className="space-y-4 mb-8">
              <button 
                onClick={handleAddToCart}
                className="w-full bg-[#4CAF50] text-white py-4 rounded-full font-bold text-lg hover:bg-green-600 transition shadow-sm uppercase tracking-wider"
              >
                Add to Cart
              </button>
              <button 
                onClick={handleBuyNow}
                className="w-full bg-black text-white py-4 rounded-full font-bold text-lg hover:bg-gray-800 transition shadow-sm uppercase tracking-wider"
              >
                Buy Now
              </button>
           </div>

           {/* Description */}
           <div className="mb-8">
              <h3 className="font-bold text-lg mb-2">Description</h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-6">
                {product.description} This accent chair brings a warm, cheerful touch to any room. 
                Soft, supportive cushions and smooth curves make it perfect for relaxing. 
                A modern silhouette designed to brighten your space and your mood.
              </p>
              <button className="w-full bg-[#C4B5A5] text-gray-900 py-3 rounded-full font-bold hover:bg-[#b0a08e] transition">
                Refund Policy
              </button>
           </div>
        </div>
      </div>

      {/* 3. REVIEWS SECTION */}
      <div className="max-w-6xl mx-auto px-6 mb-20">
         <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
            Review 
            <div className="flex gap-1">
               <div className="w-3 h-3 rounded-full bg-black"></div>
               <div className="w-3 h-3 rounded-full bg-black"></div>
               <div className="w-3 h-3 rounded-full bg-black"></div>
               <div className="w-3 h-3 rounded-full bg-black"></div>
            </div>
            <span className="text-gray-500 font-normal">(149)</span>
         </h3>

         <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
               <div className="flex items-center gap-2 mb-1">
                  <span className="font-bold">Jessica</span>
               </div>
               <div className="flex gap-1 mb-2">
                  {[...Array(4)].map((_, i) => <div key={i} className="w-2 h-2 rounded-full bg-black"></div>)}
               </div>
               <p className="text-gray-700">Very elegant, cozy and quality is really good.</p>
            </div>
            <div>
               <div className="flex items-center gap-2 mb-1">
                  <span className="font-bold">David</span>
               </div>
               <div className="flex gap-1 mb-2">
                  {[...Array(4)].map((_, i) => <div key={i} className="w-2 h-2 rounded-full bg-black"></div>)}
               </div>
               <p className="text-gray-700">Quality is very good.</p>
            </div>
         </div>
      </div>

    </div>
  );
};

export default ProductDetail;