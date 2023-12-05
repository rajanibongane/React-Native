import { axiosPublic, apiWrapper } from "./apiHandler/apiHandler";

// login
/**
 *
 * @param {object} params
 * @returns Posting object data to login api
 */
export const fetchAccounts = (params) => {
  return axiosPublic.post(`/employees/login`, params);
};

// logout
/**
 *
 *
 * @returns response of API call
 */
export const logOut = () => {
  return apiWrapper.post(`/employees/logout`);
};

/**
 *
 * @returns response of API call
 */
export const fetchAllEmployees = () => {
  return apiWrapper.get(`/employees/`);
};

/**
 *
 * @returns response of API call
 */
export const fetchEmployee = (params) => {
  return apiWrapper.get(`/employees/${params.empId}`);
};

/**
 *
 * @returns response of API call
 */
export const fetchMealEmployee = (params) => {
  return apiWrapper.get(`/meal/${params.empId}`);
};

/**
 *
 * @returns response of API call
 */
export const fetchMonthlyMealEmployee = (params) => {
  return apiWrapper.get(`/employees/${params.empId}?month=${params.currentMonth}&year=${params.currentYear}`);
};

/**
 *
 * @param {string} id
 * @param {object} params
 *
 * @returns axios post request
 */
export const postMealEmployee = (id, params) => {
  return apiWrapper.post(`/meal/${id}`, params);
};

/**
 *
 * @returns response of API call
 */
export const fetchMenu = () => {
  return apiWrapper.get(`/menu/filter`);
};

/**
 *
 * @returns response of API call
 */
export const postMenuData = (params) => {
  return apiWrapper.post(`/menu/`,params);
}