import express from 'express';
import { getTracks } from '../services/jamendoService.js';

const router = express.Router();

router.get('/music', async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 7;         // por defecto 7
    const page = parseInt(req.query.page) || 1;           // por defecto página 1
    const offset = (page - 1) * limit;

    const tracks = await getTracks(limit, offset);
    res.json(tracks);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener las tracks' });
  }
});

export default router;