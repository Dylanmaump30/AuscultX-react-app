const apiUrl = import.meta.env.VITE_BACKEND_API;
import { createUser } from "../redux/states/user";

export const loginUser = async (
  userData: { email: string; password: string },
  dispatch: any
) => {
  try {
    const response = await fetch(`${apiUrl}/users/login`, {
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
    dispatch(createUser(data));

    return data;
  } catch (error) {
    console.error("Error en la solicitud:", error);
    throw error;
  }
};
