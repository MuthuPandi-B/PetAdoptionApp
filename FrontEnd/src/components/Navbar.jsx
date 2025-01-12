import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const decodeJWT = (token) => {
  if (!token) {
    return null;
  }
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(atob(base64).split('').map(c => {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));
  return JSON.parse(jsonPayload);
};

const Navbar = () => {
  const navigate = useNavigate();
  const isAuthenticated = !!localStorage.getItem('token');
  const isShelter = localStorage.getItem('role') === "shelter";
  const isAdopter = localStorage.getItem('role') === "adopter";
  const isfoster = localStorage.getItem('role') === "foster";
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/');
  };

  useEffect(() => {
    const checkTokenExpiration = () => {
      const token = localStorage.getItem('token');
      if (token) {
        const decodedToken = decodeJWT(token);
        const currentTime = Date.now() / 1000;
        if (decodedToken.exp < currentTime) {
          handleLogout(); // Token expired, log out the user
        }
      }
    };

    checkTokenExpiration();
    const intervalId = setInterval(checkTokenExpiration, 60000); // Check every minute

    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, []);

  return (
    <div>
      <nav className='bg-gray-700 p-4 text-white'>
        <div className='container mx-auto flex justify-between items-center'>
          <div className='flex gap-3'><img className='w-8 h-8 rounded-full' src="assets/logo.png" alt="Logo Image" />
          <h1 className='text-2xl font-bold'>Adopt-A-Pet</h1></div>
          <div className='flex items-center md:hidden'>
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)} 
              className='text-white focus:outline-none'
            >
              <svg className='w-6 h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M4 6h16M4 12h16m-7 6h7'></path>
              </svg>
            </button>
          </div>
          <ul className={`flex-col md:flex-row md:flex md:space-x-4 ${isMenuOpen ? 'flex' : 'hidden'} md:block`}>
            <li>
              <Link to='/' className='hover:text-gray-300'>Home</Link>
            </li>
            {isAdopter && <li>
              <Link to='/userappointments' className='hover:text-gray-300'>Appointments</Link>
            </li>}
            {isAdopter && <li>
              <Link to='/application/user' className='hover:text-gray-300'>Application</Link>
            </li>}
            {isShelter && <li>
              <Link to='/application/all' className='hover:text-gray-300'>Applications</Link>
            </li>}
            {isShelter && <li>
              <Link to='/allappointments' className='hover:text-gray-300'>Appointments</Link>
            </li>}
            {isAdopter && <li>
              <Link to='/createApplication' className='hover:text-gray-300'>Create Application</Link>
            </li>}
            
            {isAdopter && <li>
              <Link to='/appointments/schedule' className='hover:text-gray-300'>Create Appointment</Link>
            </li>}
            {isShelter && <li>
              <Link to='/createpet' className='hover:text-gray-300'>Create Pet</Link>
            </li>}
            {isShelter && <li>
              <Link to='/fosterpets/create' className='hover:text-gray-300'>Create Foster Pet</Link>
            </li>}
            {isShelter && <li>
              <Link to='shelter/fosteringpets' className='hover:text-gray-300'>Foster Pet</Link>
            </li>}
            {isfoster && <li>
              <Link to='/foster/fosteringpets' className='hover:text-gray-300'>Foster-ReadyPets</Link>
            </li>}
            {isAdopter && <li>
              <Link to='/favorites' className='hover:text-gray-300'>Favorite Pets</Link>
            </li>}
            {isShelter && <li>
              <Link to='/message' className='hover:text-gray-300'>Messages</Link>
            </li>}
            {isfoster && <li>
              <Link to='/fosteredpets' className='hover:text-gray-300'>My Pets</Link>
            </li>}
            {isfoster && <li>
              <Link to='/message' className='hover:text-gray-300'>Messages</Link>
            </li>}
            {isAuthenticated && <li>
              <button onClick={handleLogout} className='hover:text-red-500'>Logout</button>
            </li>}
            {!isAuthenticated && <li>
              <Link to='/login' className='hover:text-gray-300'>Login</Link>
            </li>}
            {!isAuthenticated && <li>
              <Link to='/register' className='hover:text-gray-300'>Register</Link>
            </li>}
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;

           
          
           
          
          
            
           
          
           
           
    
