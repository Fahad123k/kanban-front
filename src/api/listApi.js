import api from "./axios";

export const getLists = (boardId) => api.get(`/lists/${boardId}`);
export const createList = (payload) => api.post("/lists", payload); // {board,title,order}
export const updateList = (id, payload) => api.put(`/lists/${id}`, payload);
export const deleteList = (id) => api.delete(`/lists/${id}`);
