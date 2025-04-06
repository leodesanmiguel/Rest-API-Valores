// src/routes/accionRoutes.ts
import express from 'express';
import {AccionController} from '../controllers/accionController';


const accionRoutes = express.Router();
const accionController = new AccionController();

accionRoutes.post('/uno', accionController.createAccionController.bind(accionController)); 

accionRoutes.get('/todos', accionController.getAccionesController.bind(accionController)); 
//accionRoutes.get('/file', leerMiArchvivoController ); // La ruta completa sería /api/v1/acciones/file
//accionRoutes.get('/qqq', qq); // La ruta completa sería /api/v1/acciones/qqq

export default accionRoutes;