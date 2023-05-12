import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const app = express();

app.use(cors({ origin: true }));

app.use(express.json());
app.use(express.raw({ type: 'application/vnd.custom-type' }));
app.use(express.text({ type: 'text/html' }));

// Healthcheck endpoint
app.get('/', (req, res) => {
  res.status(200).send({ status: 'ok' });
});

const api = express.Router();

api.get('/hello', async (req, res) => {
  const tes = await prisma.todo.findMany({
    orderBy: { createdAt: 'desc' }
  });
  console.log('🚀 ~ file: api.ts:25 ~ api.get ~ tes:', tes);
  res.status(200).send({ message: 'hello world' });
});

// Version the api
app.use('/api/v1', api);
