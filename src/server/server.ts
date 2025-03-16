/**
 * El punto de entrada de la aplicación.
 * 
 */

import express   from 'express';
import dotenv    from 'dotenv';
import morgan    from 'morgan';
import connectDB from '../config/mongodb';
//import { getValoresController, createValorController } from '../controllers/valor.controller';

dotenv.config();

const app = express();
app.use(express.json());
app.use(morgan('dev'));


//connectDB();

// app.get('/valores', getValoresController);
// app.post('/valores', createValorController);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running 🥰 on port ${port} ✨`);
});

