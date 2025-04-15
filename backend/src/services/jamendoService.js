import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

const CLIENT_ID = process.env.JAMENDO_API_KEY;

export const getTracks = async () => {
  try {
    const response = await axios.get('https://api.jamendo.com/v3.0/tracks', {
      params: {
        client_id: CLIENT_ID,
        format: 'json',
        limit: 10,                      // Puedes ajustar la cantidad de resultados
        fuzzytags: 'groove+rock',       // Cambia esto por los géneros que quieras
        speed: 'high+veryhigh',         // Opcional: velocidad de las canciones
        include: 'musicinfo',
        groupby: 'artist_id',
      },
    });

    console.log("Tracks Response:", response.data);

    if (!response.data.results) {
      throw new Error('No se encontraron resultados');
    }

    const tracks = response.data.results.map((track) => ({
      name: track.name,
      artist: track.artist_name,
      album: track.album_name,
      audioUrl: track.audio,  // Link para reproducir la música
    }));

    return tracks;
  } catch (error) {
    console.error("Error al consultar las tracks de Jamendo", error);
    return [];  // En caso de error retorna un arreglo vacío
  }
};
