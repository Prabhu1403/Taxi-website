import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaUserAlt } from "react-icons/fa";
import { useLocation } from 'react-router-dom';
const Navbar = () => {

  const location = useLocation()
  const [clickBar, setClickBar] = useState(false)
  const navigate = useNavigate()

  return (
    <>
      <nav className="flex sticky top-0  w-full items-center  md:items-center h-16 bg-fuchsia-100 justify-between md:justify-around ">
        <div className="  font-bold md:text-2xl text-2xl  ">
          <h2 className="text-center">
            Taxi <span className="text-green-600">Booking</span>
          </h2>
        </div>

        <div className="text-2xl md:ml-16 md:hidden block " onClick={() => setClickBar((prev) => !prev)}>
          <GiHamburgerMenu />
        </div>


        <ul className="md:flex md:text-[18px] md:font-semibold  hidden  ">
          <Link to={'/'}><li className={`ml-16 cursor-pointer hover:text-green-600 ${location.pathname === '/' ? 'underline text-green-600' : null}`}>Home</li></Link>
          <Link to={'/services'}><li className={`ml-16  cursor-pointer hover:text-green-600 ${location.pathname === '/services' ? 'underline text-green-600' : null}`}>
            Service
          </li></Link>
          <Link to={'/about'}><li className={`ml-16 cursor-pointer hover:text-green-600 ${location.pathname === '/about' ? 'underline text-green-600' : null}`}>About</li></Link>
        </ul>


        <button onClick={() => navigate('/adminlogin')} className="md:ml-18  hidden  bg-green-600 py-1 px-3 md:py-2 rounded-lg text-white md:px-2 md:font-semibold md:flex md:justify-center md:items-center gap-2 hover:bg-white hover:text-green-600 cursor-pointer ">
          {" "}
          <FaUserAlt />
          Admin Login
        </button>

      </nav>
      {
        clickBar && (
          <ul className=" lg:hidden  bg-fuchsia-200 text-center p-2   ">
            <Link to={'/'}><li className={`  cursor-pointer hover:text-green-600 text-xl p-2 font-semibold ${location.pathname === '/' ? 'underline text-green-600' : null}`}>
              Home
            </li></Link>
            <Link to={'/services'}><li className={`  cursor-pointer hover:text-green-600 p-2 text-xl font-semibold ${location.pathname === '/services' ? 'underline text-green-600' : null}`}>
              Service
            </li></Link>
            <Link to={'/about'}><li className={`  cursor-pointer hover:text-green-600 p-2 text-xl font-semibold ${location.pathname === '/about' ? 'underline text-green-600' : null}`}>About</li></Link>

            <Link to={'/adminlogin'}>
              <button className="md:ml-18 mx-auto bg-green-600 py-1 px-3 md:py-2 rounded-lg text-white md:px-2 md:font-semibold flex justify-center items-center gap-2 hover:bg-white hover:text-green-600 cursor-pointer ">
                {" "}
                <FaUserAlt />
                Admin Login
              </button></Link>
          </ul>

        )
      }

    </>
  )
}

export default Navbar
