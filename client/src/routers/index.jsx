import {createBrowserRouter} from 'react-router-dom'
import Register from '../pages/Register'
import Login from '../pages/Login'
import Homepage from '../pages/Homepage'
import Game from '../pages/Game'
import { Route, Routes } from 'react-router-dom'
import{Outlet} from 'react-router-dom'

const router = createBrowserRouter(
    // createRoutesFromElements(
    //     <Route path='/' Component={Homepage} />
    // ),
    [

    {
        path: "/register",
        element: <Register />,
    },
    {
        path : "/login",
        element : <Login />
    }
    // {
    //     path: '/',
    //     element: <Homepage/>
    // },
    // {
    //     path: '/play',
    //     element: <Homepage/>
    // },
    ,
    {
        path : '*',
        element: [
            <Routes>
                <Route path='/' exact Component={Homepage}/>
            </Routes>
        ]
    },
    {
        path : '/play/*',
        element: [
            <Routes>
                <Route path='/play' exact  Component={Game}/>
            </Routes>
        ]
    }

])

export default router