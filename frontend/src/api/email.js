import api from "./api";

export const sendContactEmail = async (formData) => {
  try {
    const res = await api.post("/api/email/send-email", formData);
    return res.data;
  } catch (error) {
    console.error("Email API error:", error);
    throw error;
  }
};
