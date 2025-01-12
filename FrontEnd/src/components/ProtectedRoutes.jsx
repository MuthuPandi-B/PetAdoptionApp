import React from 'react';
import { Navigate } from 'react-router-dom';
import NotFound from '../pages/NotFound';

 const ProtectedRoutes = ({children,shelterOnly=false,adopterOnly=false}) => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    if (!token) {
        return <Navigate to="/login" />
      }
      if (adopterOnly && role !== "adopter") {
        return <Navigate to="/login" />
      }
      if (shelterOnly && role !== "shelter") {
        return <NotFound />
      }
    return  children
        
       
};

export default ProtectedRoutes