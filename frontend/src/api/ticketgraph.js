import api from "./api";

// 🎟️ Fetch ticket sales stats
export const getTicketSalesStats = async (period = "week") => {
  try {
    const res = await api.get(`/api/ticketgraph/sales-stats?period=${period}`);
    return res.data;
  } catch (error) {
    console.error("Ticket API error:", error);
    throw error;
  }
};
