import React from 'react'
import Home from './pages/Home'
import { Routes, Route } from 'react-router-dom';
import Service from './Components/Service/Service';
import Navbar from './Components/Navbar/Navbar';
import BookingForm from './Components/BookingForm/BookingForm';
import AdminLogin from './Components/AdminLogin/AdminLogin';

import Vehicles from './pages/Vehicles';
import Success from './pages/Success';
import AdminDashboard from './pages/AdminDashboard';
import About from './Components/About/About';

const App = () => {
  return (
    <>

      <div className='w-full'>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/services' element={<Service />} />
          <Route path='/booking' element={<BookingForm />} />
          <Route path='/adminlogin' element={<AdminLogin />} />
          <Route path='/vehicles' element={<Vehicles />} />
          <Route path='/success' element={<Success />} />
          <Route path='/admin' element={<AdminDashboard />} />
          <Route path='/about' element={<About />} />
        </Routes>
      </div>




    </>
  )
}

export default App
