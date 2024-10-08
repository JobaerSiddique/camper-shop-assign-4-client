import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { Card, message } from "antd";
import { useCreateOrderMutation } from "../../redux/features/order/OrderApi";
import Swal, { SweetAlertIcon, SweetAlertPosition } from "sweetalert2";
import Loading from "../../page/Shared/Loading";

interface FormData {
    name: string;
    email: string;
    phone: string;
    address: string;
}

const CheckoutPage = () => {
    const location = useLocation();
    const { cartItemIds } = location.state;
    const totalPrice = Number(location.state?.totalPrice || 0);
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
    const [orders, { isLoading }] = useCreateOrderMutation();
    const navigate = useNavigate();

    const onSubmit = async (data: FormData) => {
        const order = {
            cartItemIds,
            totalPrice,
            user: {
                name: data.name,
                email: data.email,
                phone: data.phone,
                address: data.address,
            }
        };
        
        const res = await orders(order).unwrap();
        if (res.success) {
            Swal.fire({
                position: "top-center" as SweetAlertPosition,
                icon: "success" as SweetAlertIcon, 
                title: `${res.message}`,
                showConfirmButton: false,
                timer: 1500,
            });
            navigate('/success');
        } else {
            message.error(res.message);
        }
    };

    if (isLoading) {
        return <Loading />;
    }

    return (
        <>
            <Card bordered={true} style={{ width: 500 }} className="shadow-2xl mx-auto my-10">
                <h1 className="text-center text-2xl font-bold mb-6">CheckOut Page</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    {/* Name Field */}
                    <div className="form-group mb-5">
                        <label className="block text-gray-700 mb-2">Name:</label>
                        <input
                            type="text"
                            className="border border-gray-300 focus:ring-2 focus:ring-cyan-500 focus:outline-none px-4 py-2 w-full rounded-md"
                            placeholder="Enter your name"
                            {...register("name", {
                                required: {
                                    value: true,
                                    message: "Name is required",
                                }
                            })}
                        />
                        {errors.name && (
                            <p className="text-red-500 font-bold mt-2">{String(errors.name.message)}</p>
                        )}
                    </div>

                    {/* Email Field */}
                    <div className="form-group mb-5">
                        <label className="block text-gray-700 mb-2">Email:</label>
                        <input
                            type="email"
                            className="border border-gray-300 focus:ring-2 focus:ring-cyan-500 focus:outline-none px-4 py-2 w-full rounded-md"
                            placeholder="Enter your email"
                            {...register("email", {
                                required: {
                                    value: true,
                                    message: "Email is required",
                                },
                                pattern: {
                                    value: /^\S+@\S+$/i,
                                    message: "Invalid email format",
                                }
                            })}
                        />
                        {errors.email && (
                            <p className="text-red-500 font-bold mt-2">{String(errors.email.message)}</p>
                        )}
                    </div>

                    {/* Phone Number Field */}
                    <div className="form-group mb-5">
                        <label className="block text-gray-700 mb-2">Phone Number:</label>
                        <input
                            type="text"
                            className="border border-gray-300 focus:ring-2 focus:ring-cyan-500 focus:outline-none px-4 py-2 w-full rounded-md"
                            placeholder="Enter your phone number"
                            {...register("phone", {
                                required: {
                                    value: true,
                                    message: "Phone number is required",
                                },
                                pattern: {
                                    value: /^(?:\+88|01)?\d{9}$/,
                                    message: "Invalid phone number format",
                                }
                            })}
                        />
                        {errors.phone && (
                            <p className="text-red-500 font-bold mt-2">{String(errors.phone.message)}</p>
                        )}
                    </div>

                    {/* Address Field */}
                    <div className="form-group mb-5">
                        <label className="block text-gray-700 mb-2">Delivery Address:</label>
                        <input
                            type="text"
                            className="border border-gray-300 focus:ring-2 focus:ring-cyan-500 focus:outline-none px-4 py-2 w-full rounded-md"
                            placeholder="Enter your delivery address"
                            {...register("address", {
                                required: {
                                    value: true,
                                    message: "Delivery address is required",
                                }
                            })}
                        />
                        {errors.address && (
                            <p className="text-red-500 font-bold mt-2">{String(errors.address.message)}</p>
                        )}
                    </div>

                    {/* Submit Button */}
                    <input
                        type="submit"
                        value="Place Order"
                        className="w-full bg-cyan-500 hover:bg-cyan-600 text-white py-2 px-4 rounded-md transition duration-300"
                    />
                </form>
            </Card>
        </>
    );
};

export default CheckoutPage;
