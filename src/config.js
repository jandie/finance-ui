export const API_URL_DEV = 'http://localhost:8000/';
export const API_URL_PROD = 'https://finance-api.cfapps.io/';
export const API_URL = !process.env.NODE_ENV ||
    process.env.NODE_ENV === 'development' ?
    API_URL_DEV : API_URL_PROD;