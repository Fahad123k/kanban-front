import api from "./axios";

export const login = (cred) => api.post("/auth/login", cred);
export const register = (data) => api.post("/auth/register", data);
