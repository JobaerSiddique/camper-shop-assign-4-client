import { useState, useRef, useEffect } from 'react';
import logo from "../../image/logo.png";
import { NavLink } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux/hook';
import { currentUser, logOut } from '../../redux/features/Auth/AuthSlice';
import { Badge } from 'antd';
import { useGetUserCartQuery } from '../../redux/features/Cart/CartApi';
import { FaCartPlus } from 'react-icons/fa';

export const Navbar = () => {
    const [dropDownState, setDropDownState] = useState(false);
    const dropDownMenuRef = useRef<HTMLDivElement | null>(null); 
    const dispatch = useAppDispatch();
    
    const user = useAppSelector(currentUser);
    const { data } = useGetUserCartQuery(undefined);
    const unpaidCartItems = data?.filter((item: any) => !item.isDeleted && item.paid !== 'paid') || [];
    const totalCart = unpaidCartItems.length || 0; 

    useEffect(() => {
        const closeDropDown = (e: MouseEvent) => {
            if (dropDownMenuRef.current && !dropDownMenuRef.current.contains(e.target as Node)) {
                setDropDownState(false);
            }
        };

        document.addEventListener('mousedown', closeDropDown);

        return () => {
            document.removeEventListener('mousedown', closeDropDown);
        };
    }, []);

    const handleLogout = () => {
        dispatch(logOut());
    };

    return (
        <nav className="flex items-center justify-between bg-slate-50 px-4 py-2 mb-24 font-bold">
            {/* Logo */}
            <div className="scale-100 cursor-pointer rounded-2xl px-3 py-2 text-xl font-semibold text-white transition-all duration-200 hover:scale-110">
                <NavLink to="/">
                    <span className='flex justify-center items-center text-black'>
                        <img className='w-[15%]' src={logo} alt="" />
                        <span>Campers Shop</span>
                    </span>
                </NavLink>
            </div>

            {/* Main Nav Links */}
            <ul className="hidden items-center justify-between gap-10 md:flex">
                <NavLink to="/products">
                    <li className="group flex cursor-pointer flex-col">
                        Products<span className="mt-[2px] h-[3px] w-[0px] rounded-full bg-sky-500 transition-all duration-300 group-hover:w-full"></span>
                    </li>
                </NavLink>

                <NavLink to="/aboutUs">
                    <li className="group flex cursor-pointer flex-col">
                        About Us<span className="mt-[2px] h-[3px] w-[0px] rounded-full bg-sky-500 transition-all duration-300 group-hover:w-full"></span>
                    </li>
                </NavLink>

                <li className="group flex cursor-pointer flex-col">
                    Contact<span className="mt-[2px] h-[3px] w-[0px] rounded-full bg-sky-500 transition-all duration-300 group-hover:w-full"></span>
                </li>
                <NavLink to="/productManagement">
                    <li className="group flex cursor-pointer flex-col">
                        ProductManagement<span className="mt-[2px] h-[3px] w-[0px] rounded-full bg-sky-500 transition-all duration-300 group-hover:w-full"></span>
                    </li>
                </NavLink>
                {user ? (
                    <button onClick={handleLogout}>logOut</button>
                ) : (
                    <NavLink to="/login">
                        <li className="group flex cursor-pointer flex-col">
                            Login<span className="mt-[2px] h-[3px] w-[0px] rounded-full bg-sky-500 transition-all duration-300 group-hover:w-full"></span>
                        </li>
                    </NavLink>
                )}

                {/* Cart Icon with Badge */}
                <NavLink to="/cart">
                    <li className="group flex cursor-pointer flex-col">
                        <Badge count={totalCart} showZero>
                            <FaCartPlus className="text-xl" />
                        </Badge>
                        <span className="mt-[2px] h-[3px] w-[0px] rounded-full bg-sky-500 transition-all duration-300 group-hover:w-full"></span>
                    </li>
                </NavLink>
            </ul>

            {/* Mobile Dropdown Menu */}
            <div ref={dropDownMenuRef} onClick={() => setDropDownState(!dropDownState)} className="relative flex transition-transform md:hidden">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="cursor-pointer">
                    <line x1="4" x2="20" y1="12" y2="12" />
                    <line x1="4" x2="20" y1="6" y2="6" />
                    <line x1="4" x2="20" y1="18" y2="18" />
                </svg>

                {dropDownState && (
                    <ul className="z-10 gap-2 bg-[#393E46] absolute right-0 top-11 flex w-[200px] flex-col rounded-lg text-base">
                        <NavLink to="/products">
                            <li className="cursor-pointer px-6 py-2 text-white rounded-t-lg hover:bg-sky-600">
                                Products
                            </li>
                        </NavLink>

                        <NavLink to="/aboutUs">
                            <li className="cursor-pointer px-6 py-2 text-white hover:bg-sky-600">
                                About Us
                            </li>
                        </NavLink>

                        <li className="cursor-pointer px-6 py-2 text-white hover:bg-sky-600">
                            Contact
                        </li>
                        <NavLink to="/productManagement">
                            <li className="cursor-pointer px-6 py-2 text-white hover:bg-sky-600">
                                ProductManagement
                            </li>
                        </NavLink>
                        {user ? (
                            <button className='text-white' onClick={handleLogout}>logOut</button>
                        ) : (
                            <NavLink to="/login">
                                <li className="group flex cursor-pointer flex-col">
                                    Login<span className="mt-[2px] h-[3px] text-white w-[0px] rounded-full bg-sky-500 transition-all duration-300 group-hover:w-full"></span>
                                </li>
                            </NavLink>
                        )}

                        {/* Cart Icon in Mobile Menu */}
                        <NavLink to="/cart">
                            <li className="cursor-pointer px-6 py-2 text-white hover:bg-sky-600">
                                <Badge count={totalCart} showZero>
                                    <FaCartPlus className="text-xl" />
                                </Badge>
                            </li>
                        </NavLink>
                    </ul>
                )}
            </div>
        </nav>
    );
};
