import AsyncStorage from '@react-native-async-storage/async-storage';
import { APP_LOCAL_STORAGE } from './Constants';

const SessionService = {
  // Method to store token in AsyncStorage
  setToken: async (accessToken) => {
    try {
      await AsyncStorage.setItem(APP_LOCAL_STORAGE.token, accessToken.toString());
    } catch (error) {
      console.error('Error storing token:', error);
    }
  },

  // Method to store user data in AsyncStorage
  setUser: async (userData) => {
    try {

      await AsyncStorage.setItem(APP_LOCAL_STORAGE.user, JSON.stringify(userData));
    } catch (error) {
      console.error('Error storing user data:', error);
    }
  },

  // Method to retrieve token from AsyncStorage
  getToken: async () => {
    try {
      
      const token = await AsyncStorage.getItem(APP_LOCAL_STORAGE.token);
      return  token;
    } catch (error) {
      return null;
    }
  },

  // Method to retrieve user data from AsyncStorage
  getUser: async () => {
    try {
      const userData = await AsyncStorage.getItem(APP_LOCAL_STORAGE.user);
      return JSON.parse(userData);
    } catch (error) {
      console.error('Error retrieving user data:', error);
      return null;
    }
  },

  // Method to clear user data and token from AsyncStorage
  clearSession: async () => {
    try {
     await AsyncStorage.clear();
    } catch (error) {
      console.error('Error clearing session:', error);
    }
  },
};

export default SessionService;

