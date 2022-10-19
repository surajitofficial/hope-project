import baseService from './baseService.js';

export function get(data) {
    return baseService.post('/Course/get', data);
}
export function select(id) {
    return baseService.get('/Course/'+id);
}
export function updatelist(id,data) {
    return baseService.put('/Course/updatelist?id='+id, data);
}
