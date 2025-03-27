/**
 * Los controladores para las rutas de la API.
 * 
 */


import { IAccion } from './../models/accion';
import { createAccionService, getAccionesService } from "../services/accionService";
import { Request, Response } from 'express';
//import { getValoresService, createValorService } from '../services/valor.service';

//export const getValoresController = async (req: Request, res: Response) => {
//  try {
//    const valores = await getValoresService();
//    res.json(valores);
//  } catch (error) {
//    res.status(500).json({ error: 'Internal Server Error' });
//  }
//};
export const getAccionesController = async (req: Request, res: Response) => {
  try {
    const acciones: IAccion[] = await getAccionesService();
    res.json(acciones);

  } catch (e) {
    const error = e as Error;
    res.status(500).json({ error: 'Internal Server Error', message: error.message });
  }
};



//export const createValorController = async (req: Request, res: Response) => {
//  try {
//    const valor = await createValorService(req.body);
//    res.status(201).json(valor);
//  } catch (error) {
//    res.status(500).json({ error: 'Internal Server Error' });
//  }
//};
export const createAccionController = async (req: Request, res: Response) => {
  try {
    // validar los datos recibidos
    const accionData: IAccion = req.body;

    // Llamamos al servicio para crear la acción
    const accion = await createAccionService(accionData);
    res.status(201).json(accion);
  }
  catch (e) {
    const error = e as Error;
    res.status(500).json({ error: 'Internal Server Error', message: error.message });
  }
};



// Agrega aquí otros controladores para actualizar, eliminar, etc.