import api from "./api"; 

export const getAllProducts = () => {
    return api.get("/product");
};

export const getProductsByCategory = (categoryId) => {
    return api.get(`/product/category/${categoryId}`);
};

export const getProductDetail = (id) => {
    return api.get(`/product/${id}`);
};