// src/routes/accionRoutes.ts
import express from 'express';
import {
  createAccionController,
  getAccionesController,
  leerArchvivo,
  qq
} from '../controllers/accionController';


const accionRoutes = express.Router();

accionRoutes.get('/', getAccionesController); // La ruta completa sería /api/v1/acciones
accionRoutes.post('/', createAccionController); // La ruta completa sería /api/v1/acciones
accionRoutes.get('/file', leerArchvivo ); // La ruta completa sería /api/v1/acciones/file
accionRoutes.get('/qqq', qq); // La ruta completa sería /api/v1/acciones/qqq

export default accionRoutes;