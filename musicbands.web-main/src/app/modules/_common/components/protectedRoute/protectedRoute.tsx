import React from "react";
import {Navigate} from "react-router-dom";
import {authQuery} from "../../../auth/stores/auth";

export const ProtectedRoute = ({children}) => {
    if (!authQuery.isAuthorized()) {
        return <Navigate to="/sign-in" replace/>;
    }

    return children;
};