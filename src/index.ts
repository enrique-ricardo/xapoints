import express, { Router } from 'express';
import path from 'path';
import { PORT } from './config';

const app = express();

const path_static_files = path.join(__dirname, "..", "public");

app.use(express.static(path_static_files));

app.use(express.urlencoded({extended:false}));

app.use("/", Router);

app.listen(PORT, ()=>{
  console.log(`Escuchando en el puerto ${PORT}`);
});