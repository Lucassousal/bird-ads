import axios from "axios";
import Cookies from "js-cookie";
import qs from "qs";
import { Params } from "react-router-dom";

const BASE_URL = import.meta.env.VITE_REACT_API_URL

const http = axios.create({
  baseURL: BASE_URL ,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

const apiPost = async (
  endpoint: string,
  body: {name?:string; email: string; password: string; state?:string; token?: string }
) => {
  
  if (!body.token) {
    const token = Cookies.get("token");
    if (token) {
      body.token = token;
    }
  }

  try {
    const response = await http.post(endpoint, body);

    if (response.data.notallowed) {
      window.location.href = "/";
      return;
    }

    return response.data;
  } catch (error) {
    console.error(error);
  }
};

const apiPut = async (
  endpoint: string,
  body: any
) => {
  
  if (!body.token) {
    const token = Cookies.get("token");
    if (token) {
      body.token = token;
    }
  }

  try {
    const response = await http.put(endpoint, body);

    if (response.data.notallowed) {
      window.location.href = "/";
      return;
    }

    return response.data;
  } catch (error) {
    console.error(error);
  }
};

const apiGet = async (endpoint: string, body: {sort?:string, limit?:number, token?:string, id?:string} = {}) => {
  if (!body.token) {
    const token = Cookies.get("token");
    if (token) {
      body.token = token;
    }
  }

  try {
    const response = await http.get(`${endpoint}?${qs.stringify(body)}`);

    if (response.data.notallowed) {
      window.location.href = "/";
      return;
    }

    return response.data;

  } catch (error) {
    console.error(error);
  }
};

const apiFile = async (endpoint:string, body:globalThis.FormData) => {

  if (!body.get('token')) {
    const token = Cookies.get("token");
    if (token) {
      body.append('token',token)
    }
  }

  try {
    const response = await http.post(endpoint, body, {
      headers:{
        'Content-Type':'multipart/form-data'
      }
    });

    if (response.data.notallowed) {
      window.location.href = "/signin";
      return;
    }

    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export const Api = {
  login: async (email: string, password: string) => {
    try {
      const response = await apiPost("/user/signin", { email, password });
      return response;
    } catch (error) {
      console.error(error);
    }
  },
  register: async (name:string, email:string, password:string, stateLoc:string) => {
    try{
      const response = await apiPost('/user/signup', {name, email, password, state:stateLoc})
      return response
    }catch(error){
      console.error(error)
    }
  },
  getStates:async () => {
    try{
      const response = await apiGet('/states')
      return response.states

    }catch(error){
      console.error(error)
    }
  },
  getCategories:async () => {
    try{
      const response = await apiGet('/categories')
      return response.categories
    }catch(error){
      console.error(error)
    }
  },
  getAds: async (body:{sort?:string, limit?:number, q?:string|null, cat?:string|null, state?:string|null, offset?:number}) => {
    const response = await apiGet('/ad/list', body)
    return response
  },
  getAd: async(params:Params<string>) => {
    try{
      const response = await apiGet(`/ad/item`, {id: params.id})
      return response
    }catch(error){
      console.error(error)
    }
  },
  addAd: async (data:globalThis.FormData) => {
    const response = await apiFile('ad/add', data)
    return response
  },
  getMe: async () => {
    const response = await apiGet('user/me')
    return response
  },
  updateImageAd: async (data:globalThis.FormData, id:string) => {
    const response = await apiFile(`ad/${id}`, data)
    return response
  },
  updateInfoAd: async (data, id:string) => {
    const response = await apiPost(`ad/${id}`, data)
    return response
  },
  updateUserInfo: async (data) => {
    const response = await apiPut(`user/me`, data)
    return response
  },
  
};

const useApi = () => Api;

export { useApi };
