import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ShoppingCart, User, Search } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useUser } from '../context/UserContext';

const Navbar = () => {
  const { cart } = useCart();
  const { user } = useUser();
  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
  const navigate = useNavigate();
  const location = useLocation();

  // FIX: Hide Navbar on Login, Signup, AND Product List pages
  // We check if pathname is exactly '/' or '/login' or '/products'
  const hideNavbarPaths = ['/', '/login', '/products', '/profile', '/cart', '/checkout'];
  if (hideNavbarPaths.includes(location.pathname)) {
    return null;
  }

  const handleScroll = (id) => {
    if (location.pathname !== '/shop') {
      navigate('/shop');
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) element.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const element = document.getElementById(id);
      if (element) element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="bg-[#8FA395] px-8 py-4 flex justify-between items-center sticky top-0 z-50 text-black shadow-sm">
      <button onClick={() => handleScroll('hero')} className="focus:outline-none">
        <div className="w-12 h-12 bg-[#4CAF50] rounded-full flex items-center justify-center text-white font-bold text-xl hover:scale-105 transition">
          DW
        </div>
      </button>

      <div className="hidden md:flex gap-12 font-medium text-lg">
        <button onClick={() => handleScroll('about')} className="hover:text-white transition">About</button>
        <button onClick={() => handleScroll('whats-new')} className="hover:text-white transition">What's New</button>
        <button onClick={() => handleScroll('contact')} className="hover:text-white transition">Contact Us</button>
      </div>

      <div className="flex gap-6 items-center">
        <Search size={24} className="cursor-pointer hover:text-white transition" />
        
        <Link to="/cart" className="relative hover:text-white transition">
          <ShoppingCart size={24} />
          {totalItems > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
              {totalItems}
            </span>
          )}
        </Link>

        <Link to={user ? "/profile" : "/login"} className="flex items-center gap-2 hover:text-white transition font-medium">
           {user ? <span>{user.name.split(' ')[0]}</span> : <span>Log In</span>}
           <User size={24} />
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;