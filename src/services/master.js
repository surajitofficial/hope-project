import baseService, { baseUrl } from "./baseService.js";
import axios from "axios";
export function get(obj, data) {
  return baseService.post(`/${obj}/get`, data);
}
export function getmethod(obj, method, data, param) {
  if (param) data.id = param;
  if (method) return baseService.post(`/${obj}/${method}`, data);
  else return baseService.post(`/${obj}/get`, data);
}
export function select(obj, id) {
  return baseService.get(`/${obj}/${id}`);
}
export function selectStatus(obj) {
  return baseService.get(`/${obj}/Get_VolunteerSiteStatus`);
}
export function getProfile(id) {
  return baseService.get(`/Profile/Get_Volunteer_Details?profileid=${id}`);
}
export function Get_ApplicationData(applnID) {
  return baseService.get(
    `/Profile/Get_ApplicationData?applicationID=${applnID}`
  );
}
export function getApplication(id) {
  return baseService.get(`/Profile/Get_ApplicationDetails?applicationID=${id}`);
}
export function save(obj, id, data) {
  if (!id || id === 0 || id === "0")
    return baseService.post(`/${obj}/create`, data);
  else return baseService.put(`/${obj}/update?id=${id}`, data);
}
export function saveapi(obj, data) {
  return baseService.post(`/${obj}/create`, data);
  // else return baseService.put(`/${obj}/update?id=${id}`, data);
}
export function remove(obj, id) {
  return baseService.delete(`/${obj}/${id}`);
}

export function upload(avatar) {
  var formData = new FormData();
  formData.append("avatar", avatar);

  let request = axios({
    method: "post",
    url: `${baseUrl}Document/UploadFile`,
    data: formData,
    headers: {
      "Content-Type": "multipart/form-data",
      accept: "*/*",
      Authorization: `Bearer ${localStorage.getItem("authToken")}`
    }
  });
  return request;
}
export function Get_ApplicationSteps(step, applnID) {
  return baseService.get(
    `/Profile/Get_ApplicationSteps?applicationID=${applnID}&step=` + step
  );
}
