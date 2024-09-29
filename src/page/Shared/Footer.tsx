import { FaFacebook } from "react-icons/fa";
import { FaSquareXTwitter,FaSquareInstagram } from "react-icons/fa6";

const Footer = () => {
    return (
        <footer className="flex flex-col ">
        <div className="flex flex-col items-center justify-around gap-5 bg-gray-300 py-8 dark:bg-gray-500 dark:text-white md:flex-row md:gap-0">
            <div className="flex flex-col items-center">
                <h5 className="text-2xl font-bold">Campers E-commerce Shop</h5>
                <p className="text-sm mt-2 font-bold">123 New Market ,Dhaka,Bangladesh</p>
               
            </div>
            <div className="flex gap-10 mt-2">
                    <a href="#" className="cursor-pointer hover:underline text-xl hover:bg-sky-500 hover:rounded-full"><FaFacebook /></a>
                    <a href="#" className="cursor-pointer hover:underline text-xl hover:bg-sky-500 hover:rounded-full"><FaSquareXTwitter /></a>
                    <a href="#" className="cursor-pointer hover:underline text-xl hover:bg-sky-500 hover:rounded-full"><FaSquareInstagram /></a>
                </div>
            <nav className="lg:text-lg p-5 ">
                <ul className="flex h-full items-center justify-center gap-3">
                    <li>
                        <a href="#" className="cursor-pointer hover:underline">Home</a>
                    </li>
                    <li>
                        <a href="#" className="cursor-pointer hover:underline">Contact</a>
                    </li>
                    <li>
                        <a href="#" className="cursor-pointer hover:underline">About</a>
                    </li>
                    <li>
                        <a href="#" className="cursor-pointer hover:underline">Terms of Service</a>
                    </li>
                    <li>
                        <a href="#" className="cursor-pointer hover:underline">Privacy Policy</a>
                    </li>
                </ul>
            </nav>
        </div>
        <aside className="bg-gray-500 py-5 text-center text-sm text-white dark:bg-gray-800">
            <p>&copy; 2024 Campers Shop. All Rights Reserved.</p>
        </aside>
    </footer>
    );
};

export default Footer;