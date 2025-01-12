import React from "react";
const NotFound = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
        <img
          src="https://admiral.digital/wp-content/uploads/2023/08/404_page-not-found.png"
          alt="Page Not Found"
          className="h-96"
        />
        <h1 className="text-center" >Access denied.</h1>
      </div>
    );
};

export default NotFound;