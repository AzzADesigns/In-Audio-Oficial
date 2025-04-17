import axios from "axios"

interface PlayMusic {
    id?: number;     // por si en el futuro Jamendo devuelve ID (opcional si no viene).
    name: string;
    artist: string;
    album: string;
    audioUrl: string;
}

const BASE_URL = "http://localhost:3000/music";

// Ahora recibe page y limit como argumentos
export const getMusic = async (page: number = 1, limit: number = 7): Promise<PlayMusic[]> => {
    try {
        const response = await axios.get<PlayMusic[]>(BASE_URL, {
            params: {
                page,
                limit
            }
        });
        return response.data;
    } catch (error) {
        console.log("Error al obtener la música:", error);
        return [];
    }
}
