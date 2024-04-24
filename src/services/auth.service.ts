import { AxiosError } from "axios";
import { tesloApi } from "../api/teslo.api";

export interface LoginResponse {
  id: string;
  email: string;
  fullName: string;
  isActive: boolean;
  roles: string[];
  token: string;
}

export class AuthService {
  static login = async (
    email: string,
    password: string
  ): Promise<LoginResponse> => {
    try {
      const response = await tesloApi.post<LoginResponse>("/auth/login", {
        email,
        password,
      });
      console.log(response.data);
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error.response?.data);
        throw new Error(error.response?.data);
      }

      console.log(error);
      throw new Error("Unable to login");
    }
  };

  static checkStatus = async (): Promise<LoginResponse> => {
    try {
      const response = await tesloApi.get("/auth/check-status");
      return response.data;
    } catch (error) {
      console.log(error);
      throw new Error("Unauthorized");
    }
  };
}
