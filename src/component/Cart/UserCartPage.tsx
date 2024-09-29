import { Button, Checkbox, InputNumber, message, Modal } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { useState } from "react";
import { useDeleteCartMutation, useGetTotalPriceQuery, useGetUserCartQuery, useUpdateCartMutation,  } from "../../redux/features/Cart/CartApi";
import { Link } from "react-router-dom";

const { confirm } = Modal;

const UserCartPage = () => {
    const { data: cartItems } = useGetUserCartQuery(undefined); 
    const { data: price } = useGetTotalPriceQuery(undefined); 
    const [deleteCart] = useDeleteCartMutation(); 
    const [updateCartQuantity] = useUpdateCartMutation(); 
    const totPrice = price?.toFixed(2)
   const disableButton = totPrice === 0
    const [localQuantity, setLocalQuantity] = useState({});
   
   
    const activeCart = cartItems ? cartItems.filter(item => !item.isDeleted) : [];

    
    const handleDeleteCart = (id) => {
        confirm({
            title: 'Are you sure you want to remove this product?',
            icon: <ExclamationCircleOutlined />,
            content: 'Once removed, you will not be able to restore this product in the cart.',
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            async onOk() {
                try {
                    const res = await deleteCart(id).unwrap();
                    console.log('Cart item deleted successfully:', res);
                } catch (error) {
                    console.error('Failed to delete cart item:', error);
                }
            },
            onCancel() {
                console.log('Cancelled delete operation.');
            },
        });
    };

    // Handle quantity change
    const handleQuantityChange =async (id, value) => {
        
        setLocalQuantity((prev) => ({
            ...prev,
            [id]: value,
        }));

      const updateInfo = {
        cartId: id,
        quantity: value,
      }
       const res= await updateCartQuantity(updateInfo).unwrap()
       if(res.success){
         message.success(`${res.message}`);
        
       }
         
    };

    return (
        <>
            <div className="grid grid-cols-1 lg:grid-cols-4 lg:gap-44 p-4">
                {/* Cart Items List */}
                <div className="col-span-3">
                    <h2 className="text-xl font-bold mb-4">Total Cart: {activeCart.length}</h2>
                    {activeCart.map((item) => (
                        <div key={item._id} className="grid grid-cols-12 gap-2 items-center mb-2 p-2 border-b">
                            <Checkbox checked={item.checked} />
                            <img src={item.product.images[0]} alt={item.product.name} className="col-span-1" />
                            <p className="col-span-3 ml-5">{item.product.name}</p>

                            {/* Quantity Controls */}
                            <InputNumber
                                className="col-span-3"
                                min={1}
                                max={item.product.stock}
                                value={localQuantity[item._id] ?? item.quantity}  // Use local quantity if available, otherwise use original quantity
                                onChange={(value) => handleQuantityChange(item._id, value)}
                            />
                            <span className="col-span-2">৳{item.product.price}</span>

                            {/* Remove Product Button */}
                            <Button
                                className="col-span-1"
                                type="primary"
                                danger
                                onClick={() => handleDeleteCart(item._id)}
                            >
                                Remove
                            </Button>
                        </div>
                    ))}
                </div>

                {/* Pricing Details */}
                <div className="col-span-1 bg-white shadow-md p-4">
                    <h3 className="text-lg font-bold">Order Summary</h3>
                    <div className="mt-2 p-2">
                        <p className="mt-2">Subtotal: ৳{totPrice}</p>
                        <p className="mt-2">Total: ৳{totPrice}</p>

                        {/* Place Order Button */}
                       <Link to="/checkout">
                       <Button
                            className="my-10"
                            type="primary"
                            block
                            disabled={disableButton}
                        >
                            Proceed to Checkout
                        </Button>
                       </Link>
                    </div>
                </div>
            </div>
        </>
    );
};

export default UserCartPage;
