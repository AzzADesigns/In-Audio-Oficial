import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

const CLIENT_ID = process.env.JAMENDO_API_KEY;

export const getTracks = async (limit = 7, offset = 0) => {
  try {
    const response = await axios.get('https://api.jamendo.com/v3.0/tracks', {
      params: {
        client_id: CLIENT_ID,
        format: 'json',
        include: 'musicinfo',
        groupby: 'artist_id',
        limit,      // cantidad por página
        offset      // desplazamiento (para la paginación)
      },
    });

    console.log("Tracks Response:", response.data);

    if (!response.data.results) {
      throw new Error('No se encontraron resultados');
    }

    const tracks = response.data.results.map((track) => ({
      name: track.name,
      artist: track.artist_name,
      audioUrl: track.audio,  
      genre:track.musicinfo.tags.genres
    }));

    return tracks;
  } catch (error) {
    console.error("Error al consultar las tracks de Jamendo", error);
    return [];  
  }
};


//fijate en musicinfo.tags que trae