import {RouterProvider} from 'react-router-dom'
import router from './routers'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Homepage from './pages/Homepage'
// import Game from './pages/Game.j'
import HistoryProvider from './context/HistoryContext'
function App() {

  return (
    <>
    <HistoryProvider>
      <RouterProvider router={router}/>
    </HistoryProvider>
    </>
  )
}

export default App
