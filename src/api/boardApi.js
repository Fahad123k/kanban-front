import api from "./axios";

export const getBoards = () => api.get("/boards");
export const createBoard = (payload) => api.post("/boards", payload);
export const getBoard = (id) => api.get(`/boards/${id}`);
export const deleteBoard = (id) => api.delete(`/boards/${id}`);
export const searchBoards = (q) => api.get(`/boards/search/query?query=${encodeURIComponent(q)}`);
