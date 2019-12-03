import { apiClient } from '../../assets/js/axios.factory';

export function removeProduct(id) {
  return apiClient().delete(`/products/${id}`);
}

export function insertProduct(obj) {
  return apiClient().post('/products', obj);
}

export function editProduct(id, data) {
  return apiClient().put(`/products/${id}`, data);
}
