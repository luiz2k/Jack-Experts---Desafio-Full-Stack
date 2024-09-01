import { HttpClientAdapter } from "../../services/httpClientAdapter";
import { env } from "../../validations/envValidation";

// Cria um adaptador que vai fazer as chamadas HTTP na URL definida
export const API = new HttpClientAdapter(env.VITE_API_URL);
