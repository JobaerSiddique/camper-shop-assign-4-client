import React from 'react';
import { Link } from 'react-router-dom';

const HeroSection: React.FC = () => {
  return (
    <section className="relative w-full h-screen bg-cover bg-center" style={{ backgroundImage: `url('https://c0.wallpaperflare.com/preview/7/882/486/market-supermarket-grocery-store-shop.jpg')` }}>
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
        <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
          Welcome to <span className="text-blue-500">Camper Shop House</span>
        </h1>
        <p className="text-lg md:text-2xl text-gray-200 mb-8">
          Discover the best camping gear and outdoor equipment.
        </p>
        <Link to="/products"
       
          className="inline-block bg-blue-500 text-black py-3 px-8 rounded-lg font-semibold shadow-lg hover:bg-yellow-300 transition-colors"
        >
          Shop Now
        </Link>
      </div>
    </section>
  );
};

export default HeroSection;
