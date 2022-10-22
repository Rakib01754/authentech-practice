import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Main from '../components/Main';
import ErrorPage from '../components/ErrorPage';
import Home from '../components/Home';
import Profile from '../components/Profile';
import Wallet from '../components/Wallet'
import Login from '../components/Login';
import Register from '../components/Register'
import PrivateRoute from '../components/PrivateRoute/PrivateRoute';


const Routers = () => {
    const router = createBrowserRouter([
        {
            path: '/',
            element: <Main />,
            errorElement: <ErrorPage></ErrorPage>,
            children: [
                {
                    path: '/',
                    element: <Home></Home>
                },
                {
                    path: 'home',
                    element: <Home></Home>
                },
                {
                    path: 'profile',
                    element: <PrivateRoute><Profile></Profile></PrivateRoute>
                },
                {
                    path: 'wallet',
                    element: <PrivateRoute><Wallet></Wallet></PrivateRoute>
                },
                {
                    path: 'login',
                    element: <Login></Login>
                },
                {
                    path: 'register',
                    element: <Register></Register>
                },
            ]
        },
    ])
    return (
        <RouterProvider router={router} />
    );
};

export default Routers;