import axios from "axios";
import { useAuthStore } from "../stores";

const tesloApi = axios.create({
  baseURL: "http://localhost:3000/api",
});

// Interceptamos la request de axios para agregarle el token en los headers
// El token lo obtenemos del store de zustand, cargado previamente en el metodo de login
tesloApi.interceptors.request.use((config) => {
  // Al estar fuera de React en un archivo vanilla tenemos que usar el metodo getState() de zustand
  const token = useAuthStore.getState().token;

  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }

  return config;
});

export { tesloApi };
