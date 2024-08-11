import axios from 'axios';
import qs from 'qs';

const apiClient = axios.create({
  paramsSerializer: (params) =>
    qs.stringify(params, { arrayFormat: 'brackets' }),
});

export default apiClient;
