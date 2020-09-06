import React from 'react'
import { Route, Redirect } from 'react-router-dom'; 
const currentLogin = localStorage.getItem('isLogIn');

const ProtectedRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (
        localStorage.getItem('isLogIn') === true
        ? <Component {...props} />
        : <Redirect to="/login"/>
    )} />
);

export default ProtectedRoute
