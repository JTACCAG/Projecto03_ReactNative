import AsyncStorage from '@react-native-async-storage/async-storage';

const getAccessToken = async () => {
  return await AsyncStorage.getItem('accessToken');
};

const getRefreshToken = async () => {
  return await AsyncStorage.getItem('refreshToken');
};

const setAccessToken = async (token: string) => {
  await AsyncStorage.setItem('accessToken', token);
};

const setRefreshToken = async (token: string) => {
  await AsyncStorage.setItem('refreshToken', token);
};

const removeAccess = async () => {
  await AsyncStorage.removeItem('accessToken');
  await AsyncStorage.removeItem('refreshToken');
};

export {
  getAccessToken,
  getRefreshToken,
  setRefreshToken,
  setAccessToken,
  removeAccess,
};
