import api from "./api"; // Bug FE-1: sửa "./self-restaurant" → "./api"

export const createPayment = (payment) => {
    return api.post("/payment", payment);
};