import axios from "axios";
import Cookies from "js-cookie";
const token = Cookies.get("token");
console.log(token);
export const api = axios.create({
  headers: {
    Authorization: `Bearer ${token}`,
  },
  withCredentials: true,
  baseURL: "http://localhost:8000",
});

// const errorHandler = (error) => {
//   const statusCode = error.response?.status;

//   // logging only errors that are not 401
//   if (statusCode && statusCode !== 401) {
//     console.error(error);
//   }

//   return Promise.reject(error);
// };

// // registering the custom error handler to the
// // "api" axios instance
// api.interceptors.response.use(undefined, (error) => {
//   return errorHandler(error);
// });
