import { AccionService } from '../services/accionService';
/**
 * Los controladores para las rutas de la API.
 * 
 */

import { AccionModel, IAccion } from './../models/accion';
import { createAccionService, getAccionesService } from "../services/accionService";
import { Request, Response } from 'express';
import path from 'path';
import dotenv from 'dotenv';

//import { getValoresService, createValorService } from '../services/valor.service';
dotenv.config(); // Cargar variables de entorno desde el archivo .env
const dataFolder = process.env.DATA_FOLDER || './src/utils'; // Ruta por defecto si DATA_FOLDER no está definido


export const getAccionesController = async (req: Request, res: Response) => {
  try {
    const acciones: IAccion[] = await getAccionesService();
    res.json(acciones);

  } catch (e) {
    const error = e as Error;
    res.status(500).json({ error: 'Internal Server Error', message: error.message });
  }
};


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


export const getFileAccionesController = async (req: Request, res: Response) => {
  try {

    const filename = req.query.filename as string;
    if (!filename) {
      return res.status(400).json({ error: '⚠️ Filename is required ' });
    }

    const filePath = path.join(dataFolder, filename); // Ruta completa del archivo
    // Verifica si el archivo existe (opcional, pero recomendado) 
    // Puedes usar fs para verificar si el archivo existe
    // const fileExists = fs.existsSync(filePath);
    // if (!fileExists) {
    //   return res.status(404).json({ error: '⚠️ File not found' });
    // }
    // Si el archivo no existe, puedes devolver un error o manejarlo como desees
    // Lee el archivo y obtiene las acciones
    // const resultados = await accionService.leerFileAccion(filePath);
    // if (!resultados) {
    //   return res.status(404).json({ error: '⚠️ File not found or empty' });
    // }  
    // return res.status(200).json(resultados);
    
    
    
    
    const accionService = new AccionService();
    // Verifica si el archivo existe y tiene contenido
    // Puedes usar fs para verificar si el archivo existe
    // const fileExists = fs.existsSync(filePath);
    // if (!fileExists) {
    //   return res.status(404).json({ error: '⚠️ File not found' });
    // }
    // Si el archivo no existe, puedes devolver un error o manejarlo como desees
    // Lee el archivo y obtiene las acciones
    const resultados = await accionService.leerFileAccion(filePath);
    if (!resultados) {
      return res.status(404).json({ error: '⚠️ File not found or empty' });
    }
    return res.status(200).json(resultados);
    // Si el archivo existe y tiene contenido, puedes procesarlo aquí  
    // Si necesitas guardar las acciones en la base de datos, puedes hacerlo aquí
    // const acciones = await AccionModel.insertMany(acciones);


  }
  catch (e) {
    const error = e as Error;
    console.error('Error al leer el archivo:', error);
    return res.status(500).json({ error: 'Internal Server Error', message: error.message });
  }
};

//export class AccionRepository {
//  async create(data: Partial<IAccion>): Promise<IAccion> {
//    const accion = new AccionModel(data);
//    return await accion.save();
//  }
//
//  async insertMany(data: Partial<IAccion>[]): Promise<IAccion[]> {
//    return await AccionModel.insertMany(data);
//  }
//
//  // Puedes agregar otros métodos para consultar, actualizar o eliminar acciones
//}