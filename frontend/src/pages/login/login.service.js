import { apiClient } from '../../assets/js/axios.factory';

export function insertNewUser() {
  apiClient()
    .post('/users')
    .then(resp => {
      console.log(resp);
    });
}
