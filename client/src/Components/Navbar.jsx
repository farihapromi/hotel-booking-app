import { useState } from 'react';
import { useRef } from 'react';
import { useEffect } from 'react';
import React from 'react';
import searchIcon from "../assets/searchIcon.svg";
import logo from "../assets/logo.svg"
import menuIcon from "../assets/menuIcon.svg"
import closeIcon from "../assets/closeIcon.svg"
import { CalendarCheck } from 'lucide-react';


<img src={searchIcon} alt="Search" />

import { Link, useLocation, useNavigate } from 'react-router-dom';
import { SignIn, useClerk, UserButton, useUser } from '@clerk/clerk-react';
const BookingIcon = () => <CalendarCheck className="w-4 h-4 text-gray-700" />;

const Navbar = () => {
    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Hotel', path: '/rooms' },
        { name: 'Experience', path: '/' },
        { name: 'About', path: '/' },
        {
            name:'Dashboard',path:'/dashboard'
        }
    ];

  
    const [isScrolled, setIsScrolled] =useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const {openSignIn}=useClerk()
    const {user}=useUser()
    const navigate=useNavigate()
    const location=useLocation()
  
   useEffect(() => {
    // diferent navabr for diffrent page
    if(location.pathname!=='/'){
        setIsScrolled(true)
        return;
    }
    else{
        setIsScrolled(false);
    }
    setIsScrolled(prev=>location.pathname!=='/'?true:prev)
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [location.pathname]);

    return (
     
            <nav className={`fixed top-0 left-0  w-full flex items-center justify-between px-4 md:px-16 lg:px-24 xl:px-32 transition-all duration-500 z-50 ${isScrolled ? "bg-white/80 shadow-md text-gray-700 backdrop-blur-lg py-3 md:py-4" : "py-4 md:py-6"}`}>

                {/* Logo */}
                <Link  to='/'>
                    <img src={logo} alt="logo" className={`h-9 ${isScrolled && "invert opacity-80"}`} />
                </Link>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-4 lg:gap-8">
                    {navLinks.map((link, i) => (
                        <a key={i} href={link.path} className={`group flex flex-col gap-0.5 ${isScrolled ? "text-gray-700" : "text-white"}`}>
                            {link.name}
                            <div className={`${isScrolled ? "bg-gray-700" : "bg-white"} h-0.5 w-0 group-hover:w-full transition-all duration-300`} />
                        </a>
                    ))}
                   {user &&  <button onClick={()=>navigate('/owner')}
                   className={`border px-4 py-1 text-sm font-light rounded-full cursor-pointer ${isScrolled ? 'text-black' : 'text-white'} transition-all`}>
                       Dashbord
                    </button>}
                </div>

                {/* Desktop Right */}
                <div className="hidden md:flex items-center gap-4">
                    <img src={searchIcon} alt="src" className={` ${isScrolled && "invert "} h-7 transition-all duration-500`}/>
                    {/* conditional loign */}
                    {
                        user ?( <UserButton>
                            <UserButton.MenuItems>
                                <UserButton.Action label="My Bookings"  labelIcon={BookingIcon}
                                onClick={()=>navigate('/my-bookings')}
                                />
                            </UserButton.MenuItems>
                        </UserButton>):( <button onClick={openSignIn}
                    className="bg-black text-white px-8 py-2.5 rounded-full ml-4 transition-all duration-500">
                        Login
                    </button>)
                    }
                   
                </div>

                {/* Mobile Menu Button */}
               
                <div className="flex items-center gap-3 md:hidden">
                   <img onClick={()=>setIsMenuOpen(!isMenuOpen)}
                   src={menuIcon} alt="menu" className={`${isScrolled&& "invert"}h-4`}/>
                    {
                    user && <UserButton>
                            <UserButton.MenuItems>
                                <UserButton.Action label="My Bookings"  labelIcon={BookingIcon}
                                onClick={()=>navigate('/my-bookings')}
                                />
                            </UserButton.MenuItems>
                        </UserButton>
                }
                </div>

                {/* Mobile Menu */}
                <div className={`fixed top-0 left-0 w-full h-screen bg-white text-base flex flex-col md:hidden items-center justify-center gap-6 font-medium text-gray-800 transition-all duration-500 ${isMenuOpen ? "translate-x-0" : "-translate-x-full"}`}>
                    <button className="absolute top-4 right-4" onClick={() => setIsMenuOpen(false)}>
                       <img src={closeIcon} alt="closeIcon" className='h-6.5'/>
                    </button>

                    {navLinks.map((link, i) => (
                        <a key={i} href={link.path} onClick={() => setIsMenuOpen(false)}>
                            {link.name}
                        </a>
                    ))}

                    <button onClick={()=>navigate('/owner')}
                    className="border px-4 py-1 text-sm font-light rounded-full cursor-pointer transition-all">
                    Dashboard
                    </button>
                    {!user && 
                    <button onClick={openSignIn}className="bg-black text-white px-8 py-2.5 rounded-full transition-all duration-500">
                        Login
                    </button>}

                </div>
            </nav>
     
    );
}
export default Navbar;