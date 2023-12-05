import axios from "axios";
import { API_URL, ERROR_STATUS } from "../../../shared/Constants";
import sessionService from "../../../shared/SessionService";

export const axiosPublic = axios.create({
  baseURL: API_URL,
});

export const instance = axios.create({
  baseURL: API_URL,
});

const handleErrors = (error) => {
  console.log("error",error)
  if (error.response) {
    if (error.response.status === ERROR_STATUS.unAuthorized) {
      console.log(error.response);
    } else if (error.response.status === ERROR_STATUS.badRequest) {
      console.log(error.response);
    } else if (error.response.status === ERROR_STATUS.notFound) {
      console.log(error.response);
    } else if (error.response.status === ERROR_STATUS.conflict) {
      console.log(error);
    } else if (error.response.status >= ERROR_STATUS.internalSeverError) {
      console.log(error.response);
    } else {
      console.log("Request Rejected");
    }
  } else if (error.request) {
    console.log("No response received");
  } else {
    console.log("Request setup error");
  }
};

export const apiWrapper = {
  get: async (url) => {
    try {
      const token= await sessionService.getToken();
      const response = await instance.get(url
        , 
        {
          headers: { Authorization: `Bearer ${token}` },
      }
      );

      return response;
    } catch (error) {
      return handleErrors(error);
    }
  },

  post: async (url, data) => {
    try {
      const token= await sessionService.getToken();
      const response = await instance.post(url, data
        , {
          headers: { Authorization: `Bearer ${token}`},
      }
      );
      return response;
    } catch (error) {
      handleErrors(error);
    }
  },

  put: async (url, data) => {
    try {
      const token= await sessionService.getToken();
      const response = await instance.put(url, data, {
        headers: { Authorization: `Bearer ${token}`},
      });
      return response;
    } catch (error) {
      handleErrors(error);
    }
  },

  delete: async (url) => {
    try {
      const token= await sessionService.getToken();
      const response = await instance.delete(url, {
        headers: { Authorization: `Bearer ${token}`},
      });
      return response;
    } catch (error) {
      handleErrors(error);
    }
  },
};

export default apiWrapper;
