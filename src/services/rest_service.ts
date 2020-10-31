import axios, { AxiosRequestConfig } from "axios";
import Router  from "next/router";
import { LoginInputs } from "../pages/login";
import { AuthToken } from "./auth_token";
import { catchAxiosError } from "./error";

const baseConfig: AxiosRequestConfig = {
  baseURL: "http://localhost:3000/api",
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  }
};

export const post = (url: string, data: any, config: AxiosRequestConfig = {}) => {
  return axios.post(url, data, {...baseConfig, ...config}).catch(catchAxiosError);
};

export const get = async (url: string, config: AxiosRequestConfig = {}) => {
  const axiosConfig = {
    ...baseConfig,
    ...config,
  };
  return await axios.get(url, axiosConfig).catch(catchAxiosError)
};

export async function postLogin(inputs: LoginInputs): Promise<string | void> {
  const res: any = await post("/authorize", inputs).catch(catchAxiosError);

  if (res.error) {
    await Router.push("/login");
  } else if (!res.data || !res.data.token) {
    await Router.push("/login");
  }

  // store the token into cookies
  const { token } = res.data;
  AuthToken.storeToken(token);
  // Redirect
  await Router.push("/dashboard");
}
