// src/routes/accionRoutes.ts
import express from 'express';
import { getFileAccionesController, getAccionesController, createAccionController } from '../controllers/accionController';

const router = express.Router();

router.get('/', getAccionesController);
router.post('/', createAccionController); // La ruta completa sería /api/v1/acciones
router.get('/file', getFileAccionesController); // La ruta completa sería /api/v1/acciones/file


export default router;