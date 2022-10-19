import baseService from './baseService.js';

export function get(data) {
    return baseService.post('/VolunteerRecommendations/get', data);
}
// export function get(data) {
//     return baseService.post('/VolunteerRecommendations/get', data);
// }
// export function get(data) {
//     return baseService.post('/VolunteerRecommendations/get', data);
// }
// export function get(data) {
//     return baseService.post('/VolunteerRecommendations/get', data);
// }
export function dashboardCount(id) {
    return baseService.get(`Profile/Get_Dashboard_Count?UserId=`+id);
}