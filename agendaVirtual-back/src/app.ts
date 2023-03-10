import express, { Express } from 'express';
import cors from 'cors';

import { connectDb, disconnectDB, loadEnv } from './config';

import {
  dateRouter,
  historyRouter,
  scheduleRouter,
  serviceRouter,
  waitingRouter
} from './routers';

const app = express();

app
  .use(cors())
  .use(express.json())
  .get('/status', (req, res) => res.send('OK'))
  .use('/schedule', scheduleRouter)
  .use('/date', dateRouter)
  .use('/services', serviceRouter)
  .use('/history', historyRouter)
  .use('/waiting', waitingRouter);

export function init(): Promise<Express> {
  connectDb();
  return Promise.resolve(app);
}

export async function close(): Promise<void>{
  await disconnectDB();
}

process.on('unhandledRejection', (reason, promise) => {
  console.error(reason)
});

process.on('uncaughtException', (err) => {
  console.error('uncaughtException', JSON.stringify(err))
});

export default app;
