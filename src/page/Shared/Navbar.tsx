import { useState, useRef, useEffect } from 'react';
import logo from "../../image/logo.png";
import {  NavLink } from 'react-router-dom';
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
        window.location.reload(); 
    };

    return (
        <nav className="flex items-center justify-between bg-slate-50 px-4 py-2 mb-24 font-bold">
            {/* Logo */}
            <div className="scale-100 cursor-pointer rounded-2xl px-3 py-2 text-xl font-semibold text-white transition-all duration-200 hover:scale-110">
                <NavLink to="/">
                    <span className='flex justify-center items-center text-black'>
                        <img className='w-[15%]' src={logo} alt="Campers Shop Logo" />
                        <span>Campers Shop</span>
                    </span>
                </NavLink>
            </div>

            {/* Desktop Menu */}
            <ul className="hidden md:flex items-center justify-between gap-10">
                <NavLink
                    to="/"
                    className={({ isActive }) =>
                        isActive ? "text-sky-500" : "group flex cursor-pointer flex-col"
                    }
                >
                    <li className="group flex cursor-pointer flex-col">
                        Home
                        <span className="mt-[2px] h-[3px] w-[0px] rounded-full bg-sky-500 transition-all duration-300 group-hover:w-full"></span>
                    </li>
                </NavLink>
                <NavLink
                    to="/products"
                    className={({ isActive }) =>
                        isActive ? "text-sky-500" : "group flex cursor-pointer flex-col"
                    }
                >
                    <li className="group flex cursor-pointer flex-col">
                        Products
                        <span className="mt-[2px] h-[3px] w-[0px] rounded-full bg-sky-500 transition-all duration-300 group-hover:w-full"></span>
                    </li>
                </NavLink>
                <NavLink
                    to="/aboutUs"
                    className={({ isActive }) =>
                        isActive ? "text-sky-500" : "group flex cursor-pointer flex-col"
                    }
                >
                    <li className="group flex cursor-pointer flex-col">
                        About Us
                        <span className="mt-[2px] h-[3px] w-[0px] rounded-full bg-sky-500 transition-all duration-300 group-hover:w-full"></span>
                    </li>
                </NavLink>
                <NavLink
                    to="/productManagement"
                    className={({ isActive }) =>
                        isActive ? "text-sky-500" : "group flex cursor-pointer flex-col"
                    }
                >
                    <li className="group flex cursor-pointer flex-col">
                        Product Management
                        <span className="mt-[2px] h-[3px] w-[0px] rounded-full bg-sky-500 transition-all duration-300 group-hover:w-full"></span>
                    </li>
                </NavLink>

                {/* Login/Logout */}
                {user ? (
                    <button onClick={handleLogout} className="text-black">Logout</button>
                ) : (
                    <NavLink
                        to="/login"
                        className={({ isActive }) =>
                            isActive ? "text-sky-500" : "group flex cursor-pointer flex-col"
                        }
                    >
                        <li className="group flex cursor-pointer flex-col">
                            Login
                            <span className="mt-[2px] h-[3px] w-[0px] rounded-full bg-sky-500 transition-all duration-300 group-hover:w-full"></span>
                        </li>
                    </NavLink>
                )}

                {/* Cart */}
                <NavLink
                    to="/cart"
                    className={({ isActive }) =>
                        isActive ? "text-sky-500" : "group flex cursor-pointer flex-col"
                    }
                >
                    <li className="group flex cursor-pointer flex-col">
                        <Badge count={totalCart} showZero>
                            <FaCartPlus className="text-xl" />
                        </Badge>
                        <span className="mt-[2px] h-[3px] w-[0px] rounded-full bg-sky-500 transition-all duration-300 group-hover:w-full"></span>
                    </li>
                </NavLink>
            </ul>

            {/* Mobile Menu */}
            <div ref={dropDownMenuRef} onClick={() => setDropDownState(!dropDownState)} className="relative md:hidden flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="cursor-pointer">
                    <line x1="4" x2="20" y1="12" y2="12" />
                    <line x1="4" x2="20" y1="6" y2="6" />
                    <line x1="4" x2="20" y1="18" y2="18" />
                </svg>

                {/* Dropdown Menu */}
                {dropDownState && (
                    <ul className="z-10 absolute right-0 top-11 bg-[#393E46] flex flex-col w-[200px] gap-2 rounded-lg text-base">
                        <NavLink
                            to="/"
                            onClick={() => setDropDownState(false)}
                            className={({ isActive }) =>
                                isActive ? "text-sky-500" : "px-6 py-2 text-white hover:bg-sky-600"
                            }
                        >
                            Home
                        </NavLink>
                        <NavLink
                            to="/products"
                            onClick={() => setDropDownState(false)}
                            className={({ isActive }) =>
                                isActive ? "text-sky-500" : "px-6 py-2 text-white hover:bg-sky-600"
                            }
                        >
                            Products
                        </NavLink>
                        <NavLink
                            to="/aboutUs"
                            onClick={() => setDropDownState(false)}
                            className={({ isActive }) =>
                                isActive ? "text-sky-500" : "px-6 py-2 text-white hover:bg-sky-600"
                            }
                        >
                            About Us
                        </NavLink>
                        <NavLink
                            to="/productManagement"
                            onClick={() => setDropDownState(false)}
                            className={({ isActive }) =>
                                isActive ? "text-sky-500" : "px-6 py-2 text-white hover:bg-sky-600"
                            }
                        >
                            Product Management
                        </NavLink>

                        {/* Login/Logout */}
                        {user ? (
                            <button className="text-white px-6 py-2 hover:bg-sky-600" onClick={() => {
                                handleLogout();
                                setDropDownState(false);
                            }}>
                                Logout
                            </button>
                        ) : (
                            <NavLink
                                to="/login"
                                onClick={() => setDropDownState(false)}
                                className={({ isActive }) =>
                                    isActive ? "text-sky-500" : "px-6 py-2 text-white hover:bg-sky-600"
                                }
                            >
                                Login
                            </NavLink>
                        )}

                        {/* Cart */}
                        <NavLink
                            to="/cart"
                            onClick={() => setDropDownState(false)}
                            className={({ isActive }) =>
                                isActive ? "text-sky-500" : "px-6 py-2 text-white hover:bg-sky-600"
                            }
                        >
                            <Badge count={totalCart} showZero>
                                <FaCartPlus className="text-xl" />
                            </Badge>
                        </NavLink>
                    </ul>
                )}
            </div>
        </nav>
    );
};
