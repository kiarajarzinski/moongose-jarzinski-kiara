import express from 'express';
import "dotenv/config";
import cors from "cors";

import { connectDB } from './src/config/database.js';
import { routes } from './src/routes/index.js';

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT;

app.listen(PORT, async () => {
  await connectDB();
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});

app.use('/api', routes);
