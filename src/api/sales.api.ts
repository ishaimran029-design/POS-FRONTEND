import axios from "../service/api";

export const fetchDailySales = () => {
    return axios.get("/sales/daily");
};

export const fetchWeeklyRevenue = () => {
    return axios.get("/sales/weekly");
};
