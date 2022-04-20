import React from "react";
import { Navigate, Route } from 'react-router-dom';
import { getToken } from "../AuthService";

const PrivateRoute = ({component: Component, ...rest}) => {
    return (
        <Route 
            {...rest}
            render={props=> {
                return getToken() ? <Component {...props} />
                : <Navigate to="/login" />
            }
            }
        />
    )
}

export default PrivateRoute