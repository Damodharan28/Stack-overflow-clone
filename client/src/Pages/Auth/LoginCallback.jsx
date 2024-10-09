import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const LoginCallback = () => {
  const location = useLocation();
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const token = searchParams.get("token");
    const user = searchParams.get("user");

    if (token) {
      // Set token in local storage
      localStorage.setItem("token", token);
      console.log("Token stored in local storage:", token);
    } else {
      setError("No token found in URL.");
      return; // Exit if no token
    }

    if (user) {
      // Parse and set user data in local storage
      const userData = JSON.parse(decodeURIComponent(user));
      localStorage.setItem("user", JSON.stringify(userData));
      console.log("User data stored in local storage:", userData);
      setUserData(userData); // Update state with user data
    } else {
      setError("No user data found in URL.");
    }
  }, [location]);

  if (error) {
    return <div>Error: {error}</div>; // Display any errors
  }

  return (
    <div>
      <h1>Welcome, {userData ? userData.name : 'Guest'}</h1>
      <p>Email: {userData ? userData.email : 'Not available'}</p>
      <p>Tags: {userData && userData.tags ? userData.tags.join(', ') : 'No tags'}</p>
      {/* Additional user information can be displayed here */}
    </div>
  );
};

export default LoginCallback;
