// src/routes/accionRoutes.ts
import express from 'express';
import {AccionController} from '../controllers/accionController';


const accionRoutes = express.Router();
const accionController = new AccionController();

accionRoutes.post('/uno', accionController.createAccionController.bind(accionController)); 

accionRoutes.get('/todos', accionController.getAccionesController.bind(accionController)); 

accionRoutes.post('/up', accionController.uploadArchivoAccionesController.bind(accionController) ); // La ruta completa sería /api/v1/acciones/file

export default accionRoutes;