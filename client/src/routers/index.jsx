import {createBrowserRouter} from 'react-router-dom'
import Register from '../pages/Register'
import Login from '../pages/Login'
import Homepage from '../pages/Homepage'
import { Route } from 'react-router-dom'

const router = createBrowserRouter([

    {
        path: "/register",
        element: <Register />,
    },
    {
        path : "/login",
        element : <Login />
    },
    {
        path: '/',
        
        element: <Route Component={Homepage}/>
    }

])

export default router