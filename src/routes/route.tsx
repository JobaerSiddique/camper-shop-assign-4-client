import { createBrowserRouter } from "react-router-dom";

import MainLayout from "../component/layout/MainLayout";
import Product from "../page/ProductPage";
import SingleProductInfo from "../component/product/SingleProductInfo";
import Login from "../page/Auth/Login";
import About from "../page/About";
import HomePage from "../page/HomePage";
import UserCartPage from "../component/Cart/UserCartPage";
import SignUp from "../page/Auth/SignUp";
import CheckOutPage from "../component/CheckOutPage/CheckOutPage";
import SuccessPage from "../component/CheckOutPage/SuccessPage";
import ProductManagement from "../component/ProductManagement/ProductManagement";




const router = createBrowserRouter([
    {
        path:'/',
        element:<MainLayout/>,
        children:[
            {
                path:"/",
                element:<HomePage/>
            },
            {
                path:'/products',
                element:<Product/>
            },
            
            {
                path:'/products/:id',
                element:<SingleProductInfo/>
               
                
            },
            {
                path:'/aboutUs',
                element:<About/>
               
                
            },
            {
                path:'/cart',
                element:<UserCartPage/>
               
                
            },
            {
        
                path:'/login',
                element: <Login/>,
            },
            {
        
                path:'/signUp',
                element: <SignUp/>,
            },
            {
        
                path:'/checkout',
                element: <CheckOutPage/>,
            },
            {
        
                path:'/success',
                element: <SuccessPage/>,
            },
            {
        
                path:'/productManagement',
                element: <ProductManagement/>,
            }
           
        ]
    },
    
])



export default router;