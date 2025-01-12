import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();
  const isAuthenticated = !!localStorage.getItem("token");
  const isShelter = localStorage.getItem("role") === "shelter";
  const handleNavigateToMessages = () => {
    navigate("/message");
  };

  return (
    <footer className="bg-gray-700 text-white p-4">
      <div className="container mx-auto flex justify-center items-center relative">
        <div className="flex space-x-4">
          <Link to="/" className="hover:text-gray-300">
            Home
          </Link>
          
          {isShelter ? (
            <li className="list-none">
              <Link to="/contact/messages" className="hover:text-gray-300">
                Contact Messages
              </Link>
            </li>
          ) : null}
          {!isShelter ? (
            <li className="list-none">
              <Link to="/contact" className="hover:text-gray-300">
                Contact
              </Link>
            </li>
          ) : null}
          <li className="list-none"> <Link to='/reviews' className='hover:text-gray-300 '>User Reviews</Link> </li>
          <Link to="/about" className="hover:text-gray-300">
            About
          </Link>
        </div>
        {isAuthenticated && (
          <div className="mt-6  absolute right-0 top-1/2 transform -translate-y-1/2">
            <button
              onClick={handleNavigateToMessages}
              className="text-blue-500 hover:underline"
            >
              <img
                src="/assets/message.png"
                alt="Message"
                className="w-6 h-6 md:w-10 md:h-10 rounded-full"
              />{" "}
              {/* Add your message icon path */}
            </button>
          </div>
        )}
      </div>
      <div className="text-center mt-4">
        <p>
          &copy; {new Date().getFullYear()} Adopt-A-Pet Platform. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
