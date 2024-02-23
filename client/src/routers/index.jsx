import { createBrowserRouter, redirect } from "react-router-dom";
import Register from "../pages/Register";
import Login from "../pages/Login";
import Homepage from "../pages/Homepage";
import Game from "../pages/Game";
import { Route, Routes } from "react-router-dom";
import { Outlet } from "react-router-dom";

const router = createBrowserRouter(
  // createRoutesFromElements(
  //     <Route path='/' Component={Homepage} />
  // ),
  [
    {
      path: "/register",
      element: <Register />,
      loader: () => {
        if (localStorage.access_token) {
          return redirect("/");
        }
        return null;
      },
    },
    {
      path: "/login",
      element: <Login />,
      loader: () => {
        if (localStorage.access_token) {
          return redirect("/");
        }
        return null;
      },
    },
    {
      path: "/",
      element: <Homepage />,
      loader: () => {
        if (!localStorage.access_token) {
          return redirect("/login");
        }
        return null;
      },
    },
    {
      path: "/play",
      element: <Game />,
      loader: () => {
        if (!localStorage.access_token) {
          return redirect("/login");
        }
        return null;
      },
    },
    // {
    //     path : '*',
    //     element: [
    //         <Routes>
    //             <Route path='/' element={<Homepage />}/>
    //         </Routes>
    //     ]
    // },
    // {
    //     path : '/play/*',
    //     element: [
    //         <Routes>
    //             <Route path='/play' element={<Game />}/>
    //         </Routes>
    //     ]
    // }
  ]
);

export default router;
