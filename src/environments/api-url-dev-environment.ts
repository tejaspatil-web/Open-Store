const baseUrl = 'http://localhost:8080';
const getwayUrl = baseUrl + '/api';

export const environment = {
  baseApiUrls: {
    userApi: getwayUrl + '/user',
    productApi: getwayUrl + '/product',
  },
};