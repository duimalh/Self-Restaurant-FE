import api from "./api"; // Bug FE-1: sửa "./self-restaurant" → "./api"

export const createOrder = (order) => {
    return api.post("/order", order);
};

export const getOrder = (orderId) => {
    return api.get(`/order/${orderId}`);
};