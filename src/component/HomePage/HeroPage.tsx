import { Button } from "antd";


const HeroPage = () => {
    return (
        <div className="relative bg-hero-pattern bg-cover bg-center h-screen  flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-5xl font-bold mb-4">Welcome to Campers Shop</h1>
          <p className="text-lg mb-6">Your one-stop shop for all camping needs</p>
          <Button type="primary" className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3">
            Shop Now
          </Button>
        </div>
      </div>
    );
};

export default HeroPage;