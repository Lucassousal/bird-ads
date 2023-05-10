import axios from "axios";
import Cookies from "js-cookie";
import qs from "qs";

const http = axios.create({
  baseURL: "http://alunos.b7web.com.br:501",
  timeout: 5000,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

const apiPost = async (
  endpoint: string,
  body: { email: string; password: string; token?: string }
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

const apiGet = async (endpoint: string, body: any = []) => {
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

const Api = {
  login: async (email: string, password: string) => {
    try {
      const response = await apiPost("/user/signin", { email, password });
      return response;
    } catch (error) {
      console.error(error);
    }
  },
  getStates:async () => {
    try{
      const response = await apiGet('/states')
      return response.states

    }catch(error){
      console.error(error)
    }
  }
};

const useApi = () => Api;

export { useApi };

//http://alunos.b7web.com.br:501

// const BASEAPI = 'http://alunos.b7web.com.br:501'

// const apiPost = async (endpoint, body) => {
//   if(body.token){
//     const token = Cookies.get('token')
//     if(token){
//       body.token = token
//     }
//   }

//   const res = await fetch(BASEAPI+endpoint, {
//     method:'POST',
//     headers:{
//       'Accept':'application/json',
//       'Content-Type':'application/json'
//     },
//     body:JSON.stringify(body)
//   })

//   const json = await res.json();

//   if(json.notallowed){
//     window.location.href='/signin'
//     return
//   }
//   return json
// }
