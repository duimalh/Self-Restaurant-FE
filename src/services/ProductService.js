import api from "./self-restaurant";

export const getProductsByCategory = (categoryId) => {
    return api.get(`/product/category/${categoryId}`);
};

export const getProductDetail = (id) => {
    return api.get(`/product/${id}`);
};