import api from "./api";

export const createOrder = (order) => {
    return api.post("/order", order);
};

export const getOrder = (orderId) => {
    return api.get(`/order/${orderId}`);
};