import React from 'react'
import Navbar from './Components/Navbar'
import { Route, Routes, useLocation } from 'react-router-dom'
import Home from './Pages/Home'
import Footer from './Components/Footer'
import AllRooms from './Pages/AllRooms'


const App = () => {
  const isOwnerPath=useLocation().pathname.includes('admin')
  return (
    <div>
      {/* condiitonal rendering of navabr.if it is not admin then show this navbar */}
      {!isOwnerPath &&  <Navbar/>}
      <div className="min-h-[70vh]">
        <Routes>
          <Route path='/' element={<Home/>}/>
            <Route path='/rooms' element={<AllRooms/>}/>
        </Routes>
      </div>
  <Footer/>

      
    </div>
  )
}

export default App
