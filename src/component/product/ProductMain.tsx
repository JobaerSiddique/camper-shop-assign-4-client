import { useState } from "react";
import { useGetProductsQuery } from "../../redux/features/Product/productApi";

import ProductCard from "./ProductCard";
import Loading from "../../page/Shared/Loading";
import { useAppSelector } from "../../redux/hook";
import { currentUser } from "../../redux/features/Auth/AuthSlice";
import { Product } from "../../types/types";


const ProductMain = () => {
    
  
   const [searchQuery, setSearchQuery] = useState("");
   const [selectedCategory, setSelectedCategory] = useState("");
   const [priceRange, setPriceRange] = useState([0, 1000]);
   const [sortOrder, setSortOrder] = useState(""); // 'asc' or 'desc'
//    const [filteredData, setFilteredData] = useState([]);
console.log(priceRange)
const query = {
    search: searchQuery,
    category: selectedCategory,
    minPrice: priceRange[0],
    maxPrice: priceRange[1],
    sort: sortOrder,
  };
  console.log({query})
   const {data,isLoading} = useGetProductsQuery(query)
  
  const user = useAppSelector(currentUser)
  console.log(user)
   const handleClearFilters = () => {
     setSearchQuery("");
     setSelectedCategory("");
     setPriceRange([0, 1000]);
     setSortOrder("");
   };
   if(isLoading){
    return <Loading/>
   }

   if(!data){
    return <p>No Data Found</p>
   }

   
    return (
        <div className="my-8">
            <div className="mb-4 flex flex-col md:flex-row md:justify-between items-center gap-5">
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="p-2 border rounded"
        />
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="ml-2 p-2 border rounded"
        >
           <option value="">All Categories</option>
          {data?.data?.map((item: Product)=> <option key={item.category} value={item.
category}>{item.category}</option>)}
        </select>
        <input
          type="range"
          min="0"
          max="1000"
          value={priceRange[1]}
          onChange={(e) => setPriceRange([0, Number(e.target.value)])}
          className="ml-2"
        />
        <span className="ml-2">${priceRange[1]}</span>
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="ml-2 p-2 border rounded"
        >
          <option value="">Sort by Price</option>
          <option value="asc">Low to High</option>
          <option value="desc">High to Low</option>
        </select>
        <button
          onClick={handleClearFilters}
          className="ml-2 p-2 border rounded bg-red-500 text-white"
        >
          Clear
        </button>
      </div>  
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  justify-center items-center gap-10">
               {data?.data?.map(item=><ProductCard key={item._id} item={item}
               
               />)}
            </div>
        </div>
    );
};

export default ProductMain;