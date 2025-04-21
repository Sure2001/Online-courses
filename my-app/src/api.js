const API_URL = "http://localhost:5000";

export const addUser = async (userData) => {
    try {
      const response = await fetch(`${API_URL}/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to sign up");
      }
      return await response.json();
    } catch (error) {
      console.error("Error in addUser:", error);
      return { error: error.message };
    }
  };

export const loginUser = async (userData) => {
    const response = await fetch(`${API_URL}/signin`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
    });
    return response.json();
};

export const forgotPassword = async (userData) => {
    const response = await fetch(`${API_URL}/forgotpassword`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
    });
    return response.json();
};