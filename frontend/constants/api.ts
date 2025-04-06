import Constants from "expo-constants";

const { API_URL_DEV, API_URL_PROD, dev } = Constants.expoConfig?.extra || {};

export const BASE_URL = dev ? API_URL_DEV : API_URL_PROD;
