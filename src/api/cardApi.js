import api from "./axios";

export const getCardsByBoard = (boardId) => api.get(`/cards/by-board/${boardId}`);
export const createCard = (payload) => api.post("/cards", payload); // {board,list,title,order}
export const updateCard = (id, payload) => api.put(`/cards/${id}`, payload);
export const deleteCard = (id) => api.delete(`/cards/${id}`);
export const searchCards = (query, boardId) => api.get(`/search/cards?query=${encodeURIComponent(query)}${boardId ? `&boardId=${boardId}` : ""}`);
