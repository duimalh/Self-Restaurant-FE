import api from "./api"; // Bug FE-1: sửa "./self-restaurant" → "./api"

export const getAllCategories = () => {
    return api.get("/categories");
};