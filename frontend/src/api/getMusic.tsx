import axios from "axios"

interface PlayMusic{
    id: number;
    name: string;
    artist: string;
    album: string;
    audioUrl: string;
}

const BASE_URL = "http://localhost:3000/music";

export const getMusic = async (): Promise<PlayMusic[]> => {
    try {
        const response = await axios.get<PlayMusic[]>(BASE_URL);
        return response.data;
    }catch(error){
        console.log("error al obtener la musica", error)
        return[];
    }
}