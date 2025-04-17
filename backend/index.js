import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import tracksRouter from './src/routes/routes.js';  // Asegurate que la ruta sea correcta!


dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/', tracksRouter);

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});