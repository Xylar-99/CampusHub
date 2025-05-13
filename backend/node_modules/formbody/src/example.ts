import express, { Application, Request, Response } from 'express';
import { formbody } from './index';

const app: Application = express();
app.use(formbody);

app.post('/', (req: Request, res: Response) => {
  console.log(req.form.body);
  console.log(req.form.file('file'));
  console.log(req.form.get('name'));
  console.log(req.form.select(['name', 'file']));
  res.sendStatus(200);
});

app.use((req: Request, res: Response) => res.sendStatus(404));

app.listen(3013, () => {
  console.log('localhost:3013');
});
