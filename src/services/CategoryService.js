import api from "./api";

export const getAllCategories = () => {
    return api.get("/categories");
};