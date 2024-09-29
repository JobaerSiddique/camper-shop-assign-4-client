import { useParams } from "react-router-dom";
import { useGetProductByIdQuery } from "../../redux/features/Product/productApi";
import { FaStar, FaStarHalfAlt, FaRegStar, FaCartPlus } from "react-icons/fa";
import CarouselProduct from "./CarouselProduct";
import Loading from "../../page/Shared/Loading";
import { useAppSelector } from "../../redux/hook";
import { currentUser } from "../../redux/features/Auth/AuthSlice";
import { useAddToCartMutation, useGetUserCartQuery } from "../../redux/features/Cart/CartApi";
import { useState, useEffect } from "react";
import { Button, message } from "antd";

const SingleProductInfo = () => {
  const { id } = useParams<{ id: string }>();
  const { data: product, isLoading, error } = useGetProductByIdQuery(id);
  const user = useAppSelector(currentUser);
  const { data: cartItems } = useGetUserCartQuery(undefined)
  const [addToCart, { isLoading: cartLoading }] = useAddToCartMutation();
  const [hasAddedToCart, setHasAddedToCart] = useState(false);
  const [quantitys, setQuantity] = useState(1);

  // Find if the product is already in the user's cart
  const cartItem = cartItems?.find((item: any) => item.product._id === product?.data?._id);
console.log(cartItem);
  useEffect(() => {
    // If the product is already in the cart, set the hasAddedToCart flag to true
    if (cartItem) {
      setHasAddedToCart(true);
      setQuantity(cartItem.stock); // set the quantity to the existing cart quantity
    }
  }, [cartItem]);

  if (isLoading) return <Loading />;
  if (error) return <p>{error.toString()}</p>;
  if (!product || !product.data) return <p>Product not found</p>;

  // Handle Add to Cart functionality
  const handleAddToCart = async () => {
    if (product.data.stock === 0) {
      message.error("Out of stock");
      return;
    }

   
    const currentStockInCart = cartItem ? cartItem.quantity : 0; 
  const newQuantity = currentStockInCart + quantitys; 


    if (newQuantity > product.data.stock) {
      message.error("Cannot add more than available stock");
      return;
    }

    const cartPayload = {
      user: user?.userId,
      product: product.data._id,
      quantity: newQuantity,
    };

    try {
      await addToCart(cartPayload).unwrap();
      message.success("Product added to cart");
      setHasAddedToCart(true);
    } catch (error) {
      message.error("Failed to add to cart");
    }
  };

  // Disable "Add to Cart" button if already added and stock limit is reached
  const disableAddToCart =
  hasAddedToCart && cartItem  && cartItem.quantity >= product.data.stock;

  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    return (
      <div className="flex">
        {[...Array(fullStars)].map((_, index) => (
          <FaStar key={index} className="text-yellow-500" />
        ))}
        {halfStar && <FaStarHalfAlt className="text-yellow-500" />}
        {[...Array(emptyStars)].map((_, index) => (
          <FaRegStar key={index} className="text-yellow-500" />
        ))}
      </div>
    );
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col md:flex-row space-y-4 md:space-x-6">
        {/* Product Images Carousel */}
        <div className="md:w-1/2">
          <CarouselProduct images={product.data.images} />
        </div>

        {/* Product Information */}
        <div className="md:w-1/2 mt-4 md:mt-0 text-center">
          <h1 className="text-3xl font-bold mb-4">{product.data.name}</h1>
          <p className="text-gray-600 mb-4">{product.data.description}</p>

          {/* Ratings */}
          <div className="flex justify-center items-center mb-4">
            {renderStars(product.data.ratings)}
            <span className="ml-2 text-xl font-semibold">
              {product.data.ratings.toFixed(1)}
            </span>
          </div>

          {/* Price and Stock Info */}
          <div className="text-lg font-semibold text-green-600 mb-4">
            Price: ${product.data.price.toFixed(2)}
          </div>
          <div className="text-lg font-medium mb-4">
            {product.data.stock > 0 ? (
              <span>In Stock: {product.data.stock}</span>
            ) : (
              <span className="text-red-600">Out of Stock</span>
            )}
          </div>

          {/* Category */}
          <div className="text-lg mb-4">
            Category: <span className="font-semibold">{product.data.category}</span>
          </div>

          {/* Add to Cart Button */}
          <Button
            type="primary"
            ghost
            icon={<FaCartPlus className="mr-2" />}
            onClick={handleAddToCart}
            disabled={disableAddToCart}
            loading={cartLoading}
            className="mt-6"
          >
            {disableAddToCart ? "Added to Cart" : "Add to Cart"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SingleProductInfo;
