import { ReactNode } from "react";
import { useAppSelector } from "../../redux/hook";
import { currentToken } from "../../redux/features/Auth/AuthSlice";
import { Navigate } from "react-router-dom";


const ProtectedRoute = ({children}:{children: ReactNode}) => {
    const token = useAppSelector(currentToken)
    
    if(!token){
        return <Navigate to ='/login' replace={true}/>
    }
    return children 
     
    
};

export default ProtectedRoute;