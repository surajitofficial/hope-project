import baseService from "./baseService.js";
import axios from "axios";

export async function login(data) {
  const res = await axios.get("https://geolocation-db.com/json/");
  data.IP = res.data.IPv4;
  return baseService.post("/Account/Login", data);
}
// getData = async () => {
//     const res = await axios.get('https://geolocation-db.com/json/')
//     console.log(res.data);
//     console.log(res.data.IPv4);
//     this.setState({IP:res.data.IPv4});
//   }
export async function login2(data) {
  const res = await axios.get("https://geolocation-db.com/json/");
  data.IP = res.data.IPv4;
  // data.IP = "101010";
  // console.log("Account", data);
  // console.log("IP-Check", data.IP);
  return baseService.post("/Account/Login2", data);
  
}

export function VerifyOTP(data) {
  return baseService.post("/Account/VerifyOTP", data);
}
export function VerifyEmailPhone(data) {
  return baseService.post("/Account/VerifyEmailPhone", data);
}
export function logout() {
  return baseService.post("/Account/Logout", {});
}
export function getUser(id) {
  return baseService.get("/User/" + id);
}
export function getProfileRelatedDatas(pid) {
  return baseService.get(`/Profile/Get_Volunteer?profileId=` + pid);
}
export function getVolunteerDetails(pid) {
  return baseService.get(`/Profile/Get_Volunteer_Details?profileId=` + pid);
}
export function ForgotPasswordByEmail(email) {
  return baseService.post(`/Account/ForgotPasswordByEmail`, email);
}
export function VerifyResetPasswordOTP(values) {
  return baseService.post(`/Account/VerifyResetPasswordOTP`, values);
}
export function ForgotPassword(val) {
  return baseService.post(`/Account/ForgotPassword`, val);
}
