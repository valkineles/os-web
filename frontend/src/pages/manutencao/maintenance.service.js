import { apiClient } from '../../assets/js/axios.factory';

export function removeMaintenance(id) {
  return apiClient().delete(`/maintenance/${id}`);
}

export function insertMaintenance(obj) {
  return apiClient().post('/maintenance', obj);
}

export function editMaintenance(id, data) {
  return apiClient().put(`/maintenance/${id}`, data);
}
