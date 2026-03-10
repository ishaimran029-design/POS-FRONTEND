import axios from "../service/api"; // Reuse existing axios instance with interceptors

export const fetchDashboardMetrics = () => {
    return axios.get("/dashboard/metrics");
};

export const fetchDashboardSummary = () => {
    return axios.get("/dashboard/summary");
};

export const fetchStoreDashboard = () => {
    return axios.get("/reports/storeadmin/dashboard");
};
