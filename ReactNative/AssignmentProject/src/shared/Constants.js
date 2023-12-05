export const PATHS = {
    SIGNIN:"SignIn",
    HOME :"Home",
    PROFILE:"profile",
    DRAWER :"Drawer",
    MENU : "Menu",
    CALENDAR :"Calendar",
    RESOURCES:"Resources",
    LOGOUT:"Logout",
    PROFILE:"Profile"
}
export const API_URL = "http://192.168.50.191:8000/api";

  export const APP_LOCAL_STORAGE = {
    user: "user",
    token: "token",
  };

  export const ALERT_MESSAGE = {
    loginInvalid:"Login Failed. Invalid username or password",
    loginFailed:"Unable to sign in. Please try again later.",
    logoutFailed:"Logout Failed. Please try again later."
  };

  export const ERROR_STATUS = {
    unAuthorized: 401,
    badRequest: 400,
    notFound: 404,
    conflict: 409,
    internalSeverError: 500,
    username:"Username is required",
    password:"Password is required"
  };

  export const COLOR = {
    white : "#fff",
    black:"black",
    gray:"gray",
    red:"red",
    lightOrange : "#ff751a",
    orange : "orange",
  }