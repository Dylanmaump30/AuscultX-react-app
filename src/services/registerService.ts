const apiUrl = import.meta.env.VITE_BACKEND_API;
export const registerUser = async (userData: {
  name: string;
  username: string;
  email: string;
  password: string;
}) => {
  try {
    const response = await fetch(`${apiUrl}/users/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Ocurrió un error desconocido");
    }

    return data;
  } catch (error) {
    console.error("Error en la solicitud:", error);
    throw error;
  }
};
