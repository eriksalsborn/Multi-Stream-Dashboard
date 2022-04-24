import React from "react";
import { useLocation, Navigate, Outlet, } from 'react-router-dom';
import { getToken } from "./AuthService";

const PrivateRoute = () => {
    let token = getToken();
    let location = useLocation();
  
    if (!token) {
      // Redirect them to the /login page, but save the current location they were
      // trying to go to when they were redirected. This allows us to send them
      // along to that page after they login, which is a nicer user experience
      // than dropping them off on the home page.

      return <Navigate to="/login" state={{ from: location }} />;
    }
    
    return <Outlet />;
}

export default PrivateRoute
