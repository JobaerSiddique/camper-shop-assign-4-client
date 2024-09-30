import React from 'react';
import { useGetProductsQuery } from '../../redux/features/Product/productApi';
import Loading from '../../page/Shared/Loading';


interface Product {
  _id: string;
  name: string;
  price: number;
  stock: number;
  description: string;
  category: string;
  ratings: number;
  images: string[];
  isDeleted: boolean;
}


const getCategoryWithImage = (products: Product[]) => {
  const categoryMap: { [category: string]: Product } = {};
  products.forEach((product) => {
    if (!categoryMap[product.category]) {
      categoryMap[product.category] = product;
    }
  });
  return categoryMap;
};

const CategoriesSection: React.FC = () => {
  const { data, isLoading, isError } = useGetProductsQuery(undefined);

  
  const products: Product[] = data?.data ?? [];
  const activeProducts = products.filter((p) => !p.isDeleted);

  
  if (isLoading) {
    return <Loading />;
  }

 
  if (isError || !Array.isArray(activeProducts)) {
    return <div>Error loading categories</div>;
  }

  
  const categoryWithImage = getCategoryWithImage(activeProducts);

  return (
    <div className="max-w-6xl mx-auto py-10 px-4">
      <h2 className="text-3xl font-bold text-center mb-8">Product Categories</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {Object.keys(categoryWithImage).map((category, index) => {
          const product = categoryWithImage[category];
          return (
            <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="aspect-w-16 aspect-h-9">
                <img
                  className="w-full h-full object-cover"
                  src={product.images[0]} // Use the first image of the product
                  alt={category}
                />
              </div>
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2 text-center">{category}</h3>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CategoriesSection;
