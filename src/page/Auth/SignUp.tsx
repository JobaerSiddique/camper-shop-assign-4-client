import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useSignUpMutation } from "../../redux/features/Auth/AuthApi";
import Swal from "sweetalert2";

// Define FormData interface
interface FormData {
    name: string;
    email: string;
    password: string;
}

const SignUp: React.FC = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
    const [registers] = useSignUpMutation();
    const navigate = useNavigate();

    const onSubmit = async (data: FormData) => {
        const userInfo = {
            name: data.name,
            email: data.email,
            password: data.password,
        };

        try {
            const res = await registers(userInfo).unwrap();
            if (res) {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `${res.message}`,
                    showConfirmButton: false,
                    timer: 1500,
                });
                navigate('/login');
            }
        } catch (error) {
            // Handle error if necessary
            console.error("Registration failed:", error);
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Something went wrong!",
            });
        }
    };

    return (
        <div className="max-w-md space-y-6 rounded-lg border bg-white p-10 shadow-lg dark:border-zinc-700 dark:bg-zinc-900">
            <div className="flex flex-col space-y-1">
                <h3 className="text-3xl font-bold tracking-tight">Sign Up</h3>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">Please fill in the form to create an account.</p>
            </div>
            <div>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="space-y-2 text-sm">
                        <label className="text-sm font-medium leading-none text-zinc-700 dark:text-zinc-300">
                            Name
                        </label>
                        <input
                            {...register("name", { required: true })}
                            className="flex h-10 w-full rounded-md border px-3 py-2 focus-visible:outline-none dark:border-zinc-700"
                            placeholder="Enter name"
                            type="text"
                        />
                        {errors.name?.type === 'required' && <p className="text-red-600 font-bold my-3" role="alert">Name is required</p>}
                    </div>

                    <div className="space-y-2 text-sm">
                        <label className="text-sm font-medium leading-none text-zinc-700 dark:text-zinc-300">
                            Email
                        </label>
                        <input
                            className="flex h-10 w-full rounded-md border px-3 py-2 focus-visible:outline-none dark:border-zinc-700"
                            id="email"
                            placeholder="Enter your email"
                            {...register("email", { required: true })}
                            type="email"
                        />
                        {errors.email?.type === 'required' && <p className="text-red-600 font-bold my-3" role="alert">Email is required</p>}
                    </div>

                    <div className="space-y-2 text-sm">
                        <label className="text-sm font-medium leading-none text-zinc-700 dark:text-zinc-300" htmlFor="password_">
                            Password
                        </label>
                        <input
                            className="flex h-10 w-full rounded-md border px-3 py-2 focus-visible:outline-none dark:border-zinc-700"
                            id="password_"
                            placeholder="password"
                            {...register("password", { required: true })}
                            type="password"
                        />
                        {errors.password?.type === 'required' && <p className="text-red-600 font-bold my-3" role="alert">Password is required</p>}
                    </div>

                    <p>Already have an Account? <span><Link to='/login'>Please Log In</Link></span></p>
                    <button className="rounded-md bg-sky-500 px-4 py-2 text-white transition-colors hover:bg-sky-600 dark:bg-sky-700">Submit</button>
                </form>
            </div>
        </div>
    );
};

export default SignUp;
