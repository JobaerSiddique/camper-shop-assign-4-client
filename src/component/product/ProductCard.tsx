import { NavLink } from "react-router-dom";
import { Product } from "../../types/types";

interface ProductCardProps {
  item: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({item}) => {
  const {_id,name,price,images,description} = item 
  return (
    <div>
      
        <div className="max-w-[350px] space-y-4 rounded-lg bg-white p-6 shadow-lg md:w-[350px] dark:bg-[#18181B]">
        <img width={200} height={200} className="h-[275px] w-[350px] rounded-lg object-cover" src={images[0]} alt="card navigate ui" />
        <div className="grid gap-2">
          <h1 className="text-lg font-semibold ">{name}</h1>
          <p className="text-sm text-gray-500 dark:text-white/60">{description}</p>
          <div className="text-lg font-semibold">Price : {price}<span></span></div>
        </div>
        <div >
      
        <NavLink to={`/products/${_id}`}> <button className=" rounded-md border border-black px-4 dark:border-white dark:hover:text-slate-800 dark:hover:bg-white  py-2  duration-300 hover:bg-gray-200 font-semibold">View Details</button></NavLink>
        </div>
      </div>
      </div>
    );
};

export default ProductCard;