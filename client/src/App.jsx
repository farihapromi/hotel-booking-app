import React from 'react'
import Navbar from './Components/Navbar'
import { useLocation } from 'react-router-dom'

const App = () => {
  const isOwnerPath=useLocation().pathname.includes('admin')
  return (
    <div>
      {/* condiitonal rendering of navabr.if it is not admin then show this navbar */}
      {!isOwnerPath &&  <Navbar/>}

      
    </div>
  )
}

export default App
