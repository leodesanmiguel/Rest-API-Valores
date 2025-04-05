// src/routes/accionRoutes.ts
import express from 'express';
import {
  createAccionController,
  getAccionesController,
  getAccionesFileController,
  getFileAccionesController,
  qq
} from '../controllers/accionController';


const router = express.Router();

router.get('/', getAccionesController); // La ruta completa sería /api/v1/acciones
router.post('/', createAccionController); // La ruta completa sería /api/v1/acciones

router.get('/file', getFileAccionesController); // La ruta completa sería /api/v1/acciones/file
router.get('/file', getAccionesFileController ); // La ruta completa sería /api/v1/acciones/file
router.get('/qqq', qq); // La ruta completa sería /api/v1/acciones/qqq

export default router;