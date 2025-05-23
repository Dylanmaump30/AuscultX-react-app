const apiUrl = import.meta.env.VITE_BACKEND_API;
import axios from "axios";
import { AudioListProps } from "../models/user.model";

export const getAudioData = async ({ _id }: AudioListProps) => {
  try {
    const response = await axios.get(`${apiUrl}/audios/results/${_id}`, {
      responseType: "blob",
    });

    const arrayBuffer = await response.data.arrayBuffer();
    const uint8Array = new Uint8Array(arrayBuffer);

    const jsonString = new TextDecoder("utf-8").decode(uint8Array);

    const jsonData = JSON.parse(jsonString);

    return jsonData;
  } catch (error) {
    console.error(" Error al obtener los datos:", error);
    throw error;
  }
};
export const getImageUrl = async ({ _id }: AudioListProps) => {
  try {
    const response = await axios.get(`${apiUrl}/audios/images/${_id}`, {
      responseType: "blob",
    });

    const arrayBuffer = await response.data.arrayBuffer();
    const uint8Array = new Uint8Array(arrayBuffer);

    const jsonString = new TextDecoder("utf-8").decode(uint8Array);

    const jsonData = JSON.parse(jsonString);

    return jsonData;
  } catch (error) {
    console.error(" Error al obtener los datos:", error);
    throw error;
  }
};

export const getAudios = async (_id: String) => {
  try {
    const response = await axios.get(`${apiUrl}/audios/${_id}`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener los datos:", error);
    throw error;
  }
};
