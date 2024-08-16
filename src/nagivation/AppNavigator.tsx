import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {AuthContext} from './context/AuthContext';
import AuthNav from './AuthNavigator';
import {
  getAccessToken,
  removeAccess,
  setAccessToken,
  setRefreshToken,
} from '../services/storageService';
import {ISignInResponse} from '../models/interfaces/sign-in.response';
import HomeNav from './HomeNavigator';

const AppNavigator = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const checkLoginStatus = async () => {
      const token = await getAccessToken();
      setIsLoggedIn(!!token);
      setIsLoading(false);
    };

    checkLoginStatus();
  }, [isLoggedIn]);

  const login = async (access: ISignInResponse) => {
    await setAccessToken(access.accessToken);
    await setRefreshToken(access.refreshToken);
    setIsLoggedIn(true);
  };

  const logout = async () => {
    await removeAccess();
    setIsLoggedIn(false);
  };

  if (isLoading) {
    return null;
  }

  return (
    <NavigationContainer>
      <AuthContext.Provider value={{isLoading, isLoggedIn, login, logout}}>
        {isLoggedIn ? <HomeNav /> : <AuthNav />}
      </AuthContext.Provider>
    </NavigationContainer>
  );
};

export default AppNavigator;
