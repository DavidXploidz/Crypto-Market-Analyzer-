import {BrowserRouter, Routes, Route} from 'react-router-dom'
import HomeView from './views/HomeView'
import MainLayout from './layouts/MainLayout'

export default function AppRouter() {
  return (
    <BrowserRouter>
        <Routes>
          <Route element={ <MainLayout /> }>
            <Route path='/' element={ <HomeView /> } index />
          </Route>
        </Routes>
    </BrowserRouter>
  )
}