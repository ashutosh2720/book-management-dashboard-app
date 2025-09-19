import axios from "axios";

// API client
const api = axios.create({
  baseURL: "https://backend-d3gs.onrender.com",
});

// Book API functions
export const bookApi = {
  getBooks: () =>
    api.get("/books").then((res) =>
      res.data.map((book) => ({
        ...book,
        createdAt: book.createdAt || "2024-01-01T00:00:00.000Z",
        updatedAt: book.updatedAt || "2024-01-01T00:00:00.000Z",
      }))
    ),
  createBook: (book) =>
    api
      .post("/books", {
        ...book,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      })
      .then((res) => res.data),
  updateBook: (id, book) =>
    api
      .put(`/books/${id}`, {
        ...book,
        updatedAt: new Date().toISOString(),
      })
      .then((res) => res.data),
  deleteBook: (id) => api.delete(`/books/${id}`).then((res) => res.data),
};

export default api;
