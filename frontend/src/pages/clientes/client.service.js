import { apiClient } from '../../assets/js/axios.factory';

export function removeClient(id) {
  return apiClient().delete(`/clients/${id}`);
}

export function insertClient(obj) {
  return apiClient().post('/clients', obj);
}

export function editClient(id, data) {
  return apiClient().put(`/clients/${id}`, data);
}
