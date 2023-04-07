import { dataBaseConnection } from './http/Config';
import bodyParser from 'body-parser';

import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import brandRouter from './http/Routes/brandRoute';

dotenv.config();

const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

const port = process.env.PORT;

dataBaseConnection();

app.get('/', (req: Request, res: Response) => {
  res.send('Hii');
});

app.use('/api/brand', brandRouter);

app.listen(port || 5000, () => {
  console.log('Server running smoothly');
});
