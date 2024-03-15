"use strict";
import axios from "axios";
// import { DevSettings } from "react-native";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// Full config:  https://github.com/axios/axios#request-config
// axios.defaults.baseURL = process.env.baseURL || process.env.apiUrl || '';
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

const config = {
  //TODO: We need to import url form .env
  baseURL: "https://6a31-92-53-13-183.ngrok-free.app/api",
  timeout: 60 * 1000, // Timeout
  withCredentials: false, // Check cross-site Access-Control
  // Accept: '*/*',
};

const api = axios.create(config);
export function setAuthToken(token) {
  // console.log(api.defaults.headers['Authorization'] = token ? `Bearer ${token}` : null)
  api.defaults.headers["Authorization"] = token ? `Bearer ${token}` : null;
}

export default api;
