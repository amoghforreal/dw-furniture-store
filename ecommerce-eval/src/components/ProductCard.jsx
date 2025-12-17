import { Plus } from 'lucide-react';
import { useCart } from '../context/CartContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition overflow-hidden border border-gray-100 group">
      {/* Product Image */}
      <div className="relative h-64 overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
        />
        {/* Add to Cart Button (Appears on Hover) */}
        <button 
          onClick={() => addToCart(product)}
          className="absolute bottom-4 right-4 bg-black text-white p-3 rounded-full shadow-lg hover:bg-gray-800 transition transform translate-y-12 group-hover:translate-y-0"
        >
          <Plus size={20} />
        </button>
      </div>

      {/* Product Info */}
      <div className="p-4">
        <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">{product.category}</span>
        <h3 className="text-lg font-medium text-gray-900 mt-1">{product.name}</h3>
        <p className="text-gray-900 font-bold mt-2">${product.price.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default ProductCard;