import axios from "axios";
import { history } from "../redux/store";

export const baseUrl = "https://hvcadminapi.testwebapps.com/";
//export const baseUrl = "https://localhost:44309/";

const baseService = axios.create({
  baseURL: baseUrl
});

baseService.addAuthToken = () => {
  //baseService.defaults.headers.common['auth-Token'] = `${localStorage.getItem('authToken')}` ||  localStorage.getItem('authToken');
  baseService.defaults.headers.common["Authorization"] =
    "Bearer " + localStorage.getItem("authToken");
};

baseService.addAuthTokenRe = token => {
  baseService.defaults.headers.common["Authorization"] = token;
};

baseService.removeAuthToken = () => {
  localStorage.removeItem("authToken");
  baseService.defaults.headers.common["Authorization"] = "";
  localStorage.clear();
  window.location.href = "/";
};

baseService.removeAuthTokenRelogin = () => {
  localStorage.removeItem("authToken");

  baseService.defaults.headers.common["auth-Token"] = "";
};

baseService.interceptors.response.use(
  config => {
    return config;
  },
  error => {
    if (
      !error.response ||
      error.response.statusText === "Unauthorized" ||
      error.response.status === 401
    ) {
      baseService.removeAuthToken();
      history.push("/login");
    }
    return window.Promise.reject(error);
  }
);

if (localStorage.getItem("authToken")) {
  baseService.addAuthToken();
}

export default baseService;
