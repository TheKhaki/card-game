import {createBrowserRouter} from 'react-router-dom'
import Register from '../pages/Register'
import Login from '../pages/Login'
import Homepage from '../pages/Homepage'

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
        element: <Homepage/>
    }

])

export default router