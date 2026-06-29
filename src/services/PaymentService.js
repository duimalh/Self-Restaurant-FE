import api from "./api";

export const createPayment = (payment) => {
    return api.post("/payment", payment);
};