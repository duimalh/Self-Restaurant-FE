import api from "./self-restaurant";

export const createPayment = (payment) => {
    return api.post("/payment", payment);
};