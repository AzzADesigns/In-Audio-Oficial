import express from 'express';
import { getTracks } from '../services/jamendoService.js';  // Asegúrate de que sea getPlaylists, no getTracks

const router = express.Router();

router.get('/music', async (req, res) => {
  try {
    const Track= await getTracks();
    res.json(Track);  // Envía las playlists como respuesta JSON
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener las playlists' });
  }
});

export default router;
