/**
 * El punto de entrada de la aplicación.
 * 
 */
import express   from 'express';
import dotenv    from 'dotenv';
import morgan from 'morgan';
import accionRoutes from './routes/accionRoutes';
import "./config/mongodb";

dotenv.config();

const app = express();
// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan('dev'));
// Rutas
app.use("/api/v1/acciones", accionRoutes);

//connectDB();

// app.get('/valores', getValoresController);
//app.get('/api/v1', getAccionesController);

// app.post('/valores', createValorController);
//app.post('/api/v1', createAccionController);

//app.get('/api/v1/accion-file', getFileAccionesController);


const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running 🥰 on port ${port} ✨`);
});

export default app;
//
//