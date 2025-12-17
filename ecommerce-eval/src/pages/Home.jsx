import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUp, Instagram, Facebook, Youtube } from 'lucide-react';
import { products } from '../data/mockData';

const Home = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="bg-white">
      
      {/* HERO SECTION (ID: hero) */}
      {/* FIX: Used a Grid layout. Image Left, Text Right on Desktop. No fixed height means no weird gaps. */}
      <section id="hero" className="bg-[#8FA395] px-8 py-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          
          {/* 1. Image Section (Left on Desktop, Bottom on Mobile) */}
          <div className="order-2 md:order-1">
             <img 
               src="https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?q=80&w=1000&auto=format&fit=crop" 
               alt="Desk Setup" 
               className="w-full h-auto object-cover rounded-3xl shadow-2xl transform hover:scale-[1.02] transition duration-500"
             />
          </div>

          {/* 2. Text Section (Right on Desktop, Top on Mobile) */}
          <div className="order-1 md:order-2 text-right md:text-left">
             <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6 text-black">
              Cozy living, made <br className="hidden md:block" /> effortlessly modern.
             </h1>
             <p className="text-xl md:text-2xl font-medium mb-8 text-gray-800">
              Discover furniture crafted for comfort, <br className="hidden md:block" />
              delivered to your doorstep with ease.
             </p>
             {/* Added a CTA button to fill space professionally */}
             <Link to="/products" className="inline-block bg-black text-white px-8 py-4 rounded-full font-bold hover:bg-gray-800 transition shadow-lg">
                Shop Collection
             </Link>
          </div>

        </div>
      </section>

      {/* ABOUT SECTION (ID: about) */}
      <section id="about" className="py-20 px-8 max-w-4xl mx-auto">
        <h2 className="text-5xl font-bold mb-8">About</h2>
        <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
          <p>
            No more long searches, showroom visits, or overwhelming decisions. Just beautifully crafted pieces, curated to match your style, delivered with a single click.
          </p>
          <p>
            We blend warmth, elegance, and functionality to create furniture that not only fills a room, but completes it.
          </p>
          <p>
            From timeless designs to trend-forward styles, each piece is made to complement your daily moments — slow mornings, movie nights, family dinners, and quiet conversations.
          </p>
          <p className="font-medium text-black">
            Because a home isn't built in a day...
          </p>
        </div>
      </section>

      {/* WHAT'S NEW SECTION (ID: whats-new) */}
      <section id="whats-new" className="py-12 px-8 max-w-7xl mx-auto">
        <div className="flex items-center gap-4 mb-8 group cursor-pointer">
          <h2 className="text-5xl font-bold">What's New</h2>
          <Link to="/products">
            <ArrowRight size={48} className="font-light hover:translate-x-2 transition duration-300" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {products.slice(0, 3).map((product) => (
            <Link to={`/product/${product.id}`} key={product.id}>
                <div className="bg-white rounded-lg p-4 shadow-sm hover:shadow-xl transition border border-gray-100 cursor-pointer h-full flex flex-col">
                   <div className="h-64 overflow-hidden rounded-md mb-4 bg-gray-100">
                     <img src={product.image} alt={product.name} className="w-full h-full object-cover transform hover:scale-105 transition duration-500" />
                   </div>
                   <div className="flex justify-between items-end mt-auto">
                      <div>
                        <h3 className="text-2xl font-medium">{product.name}</h3>
                        <p className="text-xl font-bold mt-1">${product.price}</p>
                      </div>
                      <div className="flex gap-1 mb-1">
                        <div className="w-3 h-3 rounded-full bg-black"></div>
                        <div className="w-3 h-3 rounded-full bg-black"></div>
                        <div className="w-3 h-3 rounded-full bg-black"></div>
                        <div className="w-3 h-3 rounded-full bg-gray-300"></div>
                      </div>
                   </div>
                </div>
            </Link>
          ))}
        </div>
      </section>

      {/* FOOTER / CONTACT SECTION (ID: contact) */}
      <footer id="contact" className="bg-[#7FA18A] py-16 px-8 mt-20 text-black">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-end">
          
          <div className="mb-10 md:mb-0">
             <h3 className="text-2xl font-medium mb-6 text-white">discover the best furniture on one click</h3>
             <div className="flex gap-6 mb-12">
               <Instagram size={24} className="cursor-pointer hover:text-white" />
               <Youtube size={24} className="cursor-pointer hover:text-white" />
               <Facebook size={24} className="cursor-pointer hover:text-white" />
             </div>
             
             <div className="text-xs space-y-1 opacity-70">
               <p>Privacy Policy</p>
               <p>Refund Policy</p>
               <p>Terms & Conditions</p>
               <p>shopping / delivery Policy</p>
               <p className="mt-4">© 2025, DW. All rights reserved.</p>
             </div>
          </div>

          {/* Back to Top Arrow */}
          <div className="flex flex-col items-center cursor-pointer group" onClick={scrollToTop}>
            <ArrowUp size={40} className="mb-2 group-hover:-translate-y-2 transition" />
            <span className="text-lg font-medium">Back on Top</span>
          </div>

        </div>
      </footer>

    </div>
  );
};

export default Home;