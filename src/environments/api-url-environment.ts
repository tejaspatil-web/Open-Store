const baseUrl = 'https://open-store-woad.vercel.app';
const getwayUrl = baseUrl + '/api';

export const environment = {
  baseApiUrls: {
    userApi: getwayUrl + '/user',
    productApi: getwayUrl + '/product',
  },
};
