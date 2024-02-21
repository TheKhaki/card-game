import {RouterProvider} from 'react-router-dom'
import router from './routers'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Homepage from './pages/Homepage'
// import Game from './pages/Game.j'
function App() {

  return (
    <>
      <RouterProvider router={router}/>
    </>
  )
}

export default App
