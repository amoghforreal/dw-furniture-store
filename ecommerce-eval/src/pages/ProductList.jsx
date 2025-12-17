import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Heart, ArrowDown, Check } from 'lucide-react';
import { products } from '../data/mockData';
import { useUser } from '../context/UserContext';

const ProductList = () => {
  const [compareEnabled, setCompareEnabled] = useState(false);
  const [sortBy, setSortBy] = useState(null); // 'name' | 'price' | null
  const { user } = useUser();
  const navigate = useNavigate();

  // Sorting Logic
  const getSortedProducts = () => {
    let sorted = [...products];
    if (sortBy === 'name') {
      sorted.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === 'price') {
      sorted.sort((a, b) => a.price - b.price);
    }
    return sorted;
  };

  const currentProducts = getSortedProducts();

  // Scroll Down Function
  const handleScrollDown = () => {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: 'smooth'
    });
  };

  return (
    <div className="bg-white min-h-screen pb-20 font-sans text-gray-900">
      
      {/* 1. CUSTOM HEADER */}
      <div className="max-w-7xl mx-auto px-8 py-6 flex items-center justify-between">
        <div className="flex items-center w-1/3">
           <Link to="/shop" className="font-medium text-lg hover:underline">Home</Link>
           <div className="h-px bg-gray-300 w-24 ml-4 hidden md:block"></div>
        </div>
        <div className="w-1/3 flex justify-center">
          <div className="w-14 h-14 bg-[#4CAF50] rounded-full flex items-center justify-center text-white font-bold text-2xl shadow-sm">
            DW
          </div>
        </div>
        <div className="flex items-center justify-end w-1/3 gap-4">
           <div className="h-px bg-gray-300 w-24 hidden md:block"></div>
           <Link to={user ? "/profile" : "/login"}>
             <User className="cursor-pointer hover:text-green-600 transition" size={24} />
           </Link>
        </div>
      </div>

      {/* 2. FILTER BAR */}
      <div className="max-w-6xl mx-auto px-6 mb-12 flex flex-col md:flex-row justify-between items-center gap-6 mt-8">
        <div className="flex gap-4">
          <button 
            onClick={() => setSortBy('name')}
            className={`px-8 py-2 rounded-full font-medium text-sm transition shadow-sm ${sortBy === 'name' ? 'bg-[#b0a08e] text-white' : 'bg-[#C4B5A5] hover:bg-[#b0a08e]'}`}
          >
            Sort (A-Z)
          </button>
          <button 
             onClick={() => setSortBy('price')}
             className={`px-8 py-2 rounded-full font-medium text-sm transition shadow-sm ${sortBy === 'price' ? 'bg-[#b0a08e] text-white' : 'bg-[#C4B5A5] hover:bg-[#b0a08e]'}`}
          >
            Price (Low-High)
          </button>
          <button className="px-8 py-2 bg-[#C4B5A5] rounded-full font-medium text-sm hover:bg-[#b0a08e] transition shadow-sm">All filters</button>
        </div>
        <div className="flex items-center gap-3">
          <span className="font-medium text-lg">compare</span>
          <div 
            onClick={() => setCompareEnabled(!compareEnabled)}
            className={`w-14 h-7 rounded-full p-1 cursor-pointer transition-colors duration-300 flex items-center ${compareEnabled ? 'bg-[#4CAF50]' : 'bg-black'}`}
          >
            <div className={`bg-white w-5 h-5 rounded-full shadow-md transform duration-300 ${compareEnabled ? 'translate-x-7' : 'translate-x-0'}`}></div>
          </div>
        </div>
      </div>

      {/* 3. PRODUCT GRID */}
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12">
        {currentProducts.map((product) => (
          <div 
            key={product.id} 
            onClick={() => navigate(`/product/${product.id}`)}
            className="group bg-[#E5E5E5] p-8 cursor-pointer hover:shadow-xl transition-all duration-300 relative min-h-[550px] flex flex-col justify-between"
          >
            {/* Image Area */}
            <div className="h-80 w-full overflow-hidden mb-6 relative bg-gray-200">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-full object-cover transform group-hover:scale-105 transition duration-700" 
              />
            </div>

            {/* Info Area */}
            <div className="flex justify-between items-end">
              <div>
                <p className="text-xs font-bold text-gray-500 uppercase mb-2 tracking-widest">{product.category}</p>
                <h3 className="text-2xl font-bold uppercase tracking-wider mb-2">{product.name}</h3>
                
                {/* Price & Stars */}
                <div className="mb-10">
                   <span className="text-3xl font-medium block mb-2">$ {product.price}</span>
                   <div className="flex gap-1">
                     {[...Array(5)].map((_, i) => (
                       <div key={i} className={`w-3 h-3 rounded-full border border-black ${i < product.rating ? 'bg-black' : 'bg-transparent'}`}></div>
                     ))}
                   </div>
                </div>
              </div>

              {/* Status (In Stock / Not Available) */}
              <div className="text-right pb-2">
                 {product.inStock ? (
                   <div className="flex items-center gap-2 text-2xl font-light">
                     <Check size={28} /> In stock
                   </div>
                 ) : (
                   <div className="text-2xl font-light leading-tight">
                     Not<br/>Available
                   </div>
                 )}
              </div>
            </div>

            {/* Heart Icon */}
            <div 
                className="absolute bottom-8 left-8 z-10"
                onClick={(e) => {
                    e.stopPropagation();
                }}
            >
               <Heart className="text-black hover:fill-black transition cursor-pointer" size={32} />
            </div>

          </div>
        ))}
      </div>

      {/* 4. DOWN ARROW - Now Functional! */}
      <div className="flex justify-center mt-16">
        <div 
          onClick={handleScrollDown}
          className="w-16 h-16 rounded-full border border-black flex items-center justify-center cursor-pointer hover:bg-gray-100 transition animate-bounce"
        >
          <ArrowDown size={32} />
        </div>
      </div>

    </div>
  );
};

export default ProductList;