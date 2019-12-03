import { apiClient } from '../../assets/js/axios.factory';

export function removeService(id) {
  return apiClient().delete(`/services/${id}`);
}

export function insertService(obj) {
  return apiClient().post('/services', obj);
}

export function editService(id, data) {
  return apiClient().put(`/services/${id}`, data);
}
