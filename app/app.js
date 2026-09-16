import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import users from './routes/users.js';
import product from './routes/product.js'

dotenv.config();

const app = express()

app.use(cors({ origin: true, methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"] }));
app.use(express.json());
app.get("/health", (req, res) => res.status(200).json({ ok: true }));
app.use(users);
app.use(product);

export default app