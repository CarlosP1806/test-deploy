import React from 'react';
import { useEffect, useState, useContext } from "react";
import dotenv from 'dotenv';
dotenv.config();

const UserDataContext = React.createContext();

export function useUserData() {
  return useContext(UserDataContext);
}

export function UserDataProvider({ children }) {
  const [userData, setUserData] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);

  const getUserData = async () => {
    try { 
      const checkAuth = await fetch(`${process.env.SERVER_URL}/api/users/check`);
      const { isAuthenticated } = await checkAuth.json();

      if(!isAuthenticated) {
        setLoadingUser(false);
        return false;
      }

      setLoadingUser(true);
      const response = await fetch(`${process.env.SERVER_URL}/api/users/me`);
      const currentUser = await response.json();

      setUserData(currentUser);
      setLoadingUser(false);
    } catch(err) {
      console.error(err);
    }
  }

  useEffect(() => {
    getUserData();
  }, [])

  return (
    <UserDataContext.Provider value={{ userData, loadingUser }}>
      {children} 
    </UserDataContext.Provider>
  )
}
