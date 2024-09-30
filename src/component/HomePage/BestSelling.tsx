import React from 'react';
import { useGetProductsQuery } from '../../redux/features/Product/productApi';
import { Link } from 'react-router-dom'; // For navigation
import Loading from '../../page/Shared/Loading';


interface Product {
  _id: string;
  name: string;
  price: number;
  description: string;
  images: string[];
  stock: number;
  category: string;
  ratings: number;
  isDeleted?: boolean; // Optional property
}

const BestSelling: React.FC = () => {
  
  const { data, isLoading, isError } = useGetProductsQuery({});

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <div>Error loading products</div>;
  }

  // Destructure the product data and select the first 3 products
  const products: Product[] = data?.data ?? [];
  const activeProduct = products.filter(p => !p.isDeleted); // Filtering out deleted products
  const recommendedProducts = activeProduct.slice(0, 3); 

  return (
    <div className="max-w-6xl mx-auto py-10 px-4">
      <h2 className="lg:text-3xl font-bold text-center mb-8">Best Selling / Recommended Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {recommendedProducts.map((product) => (
          <div key={product._id} className="bg-white rounded-lg shadow-md overflow-hidden">
            {/* Product Image */}
            <div className="aspect-w-16 aspect-h-9">
              <img
                className="w-full h-full object-cover"
                src={product.images[0]} // Display the first image of the product
                alt={product.name}
              />
            </div>
            {/* Product Info */}
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2 text-center">{product.name}</h3>
              <p className="text-gray-600 text-center mb-4">${product.price}</p>
              <p className="text-sm text-gray-500 text-center">{product.description}</p>
            </div>
          </div>
        ))}
      </div>
      {/* View More Button */}
      <div className="text-center mt-8">
        <Link to="/products" className="inline-block bg-yellow-400 text-black py-3 px-8 rounded-lg font-semibold shadow-lg hover:bg-yellow-300 transition-colors">
          View More
        </Link>
      </div>
    </div>
  );
};

export default BestSelling;
