// index.js

import express from 'express';
import cors from 'cors';
import { connectToMongo } from './db.js';
import authRoutes from './Routes/auth.js';
import notesRoutes from './Routes/notes.js';

const app = express();
const port = 5000;

app.use(cors());
connectToMongo();

app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/notes', notesRoutes);

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});
