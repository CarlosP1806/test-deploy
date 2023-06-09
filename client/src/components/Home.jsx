import React from 'react';
import { useUserData } from '../context/UserContext';

function Home() {

  const { userData } = useUserData();

  const handleLogout = async (e) => {
    await fetch(`${import.meta.env.VITE_SERVER_URL}/api/users/logout`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    window.location.assign('/login');
  }

  return (
    <>
      <h1>Welcome, {userData.username}</h1>
      <button onClick={handleLogout}>Logout</button>
    </>
  )
}

export default Home;
