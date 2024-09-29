import { Outlet } from "react-router-dom";

import Footer from "../../page/Shared/Footer";
import { Navbar } from "../../page/Shared/Navbar";

const MainLayout = () => {
    return (
       <>
       <Navbar/>
       <div className=" min-h-screen container mx-auto  flex justify-center items-center">
        <Outlet/>
       </div>
       <Footer/>
       </>
    );
};

export default MainLayout;