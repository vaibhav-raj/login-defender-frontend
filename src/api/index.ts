import axios from "axios";

const API_BASE_URL = "https://loginradius.onrender.com/api/v1/auth"; 

export const signupUser = async (userData: {
  name: string;
  email: string;
  password: string;
}) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/register`, userData);
    return response.data;
  } catch (error: unknown) {
    if (typeof error === "object" && error !== null && "response" in error) {
      const responseData =
        typeof error.response === "object" &&
          error.response !== null &&
          "data" in error.response
          ? (error.response as { data: unknown }).data
          : error;
      console.error("Signup failed:", responseData);
      throw responseData;
    } else {
      console.error("Signup failed:", error);
      throw error;
    }
  }
};

export const loginUser = async (credentials: {
  email: string;
  password: string;
}) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/login`, credentials);
    return response.data;
  } catch (error: unknown) {
    if (typeof error === "object" && error !== null && "response" in error) {
      const responseData =
        typeof error.response === "object" &&
        error.response !== null &&
        "data" in error.response
          ? (error.response as { data: unknown }).data
          : error;
      console.error("Login failed:", responseData);
      throw responseData;
    } else {
      console.error("Login failed:", error);
      throw error;
    }
  }
};
