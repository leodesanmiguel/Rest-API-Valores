/**
 * El punto de entrada de la aplicación.
 * 
 */

import express, { Application }   from 'express';
import dotenv    from 'dotenv';
import morgan from 'morgan';
import { createAccionController, getAccionesController } from '../controllers/acciónController';
//import connectDB from '../config/mongodb';
//import { getValoresController, createValorController } from '../controllers/valor.controller';

import "../config/mongodb";
dotenv.config();

const app:Application = express();
app.use(express.json());
app.use(morgan('dev'));
//app.use("/api/v1", routes())

//connectDB();

// app.get('/valores', getValoresController);
app.get('/api/v1', getAccionesController);

// app.post('/valores', createValorController);
app.post('/api/v1', createAccionController);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running 🥰 on port ${port} ✨`);
});

export default app;
//
//