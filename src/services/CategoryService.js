import api from "./self-restaurant";

export const getAllCategories = () => {
    return api.get("/categories");
};