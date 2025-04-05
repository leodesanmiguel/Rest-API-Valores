/**
 * Los controladores para las rutas de la API.
 * 
 */

import { Request, Response, NextFunction } from 'express';
import { IAccion } from './../models/accion';
import {
  AccionService,
  getAccionesService,
  getAccionesService2
} from "../services/accionService";
import path from 'path';
import dotenv from 'dotenv';

//import { getValoresService, createValorService } from '../services/valor.service';
dotenv.config(); // Cargar variables de entorno desde el archivo .env
const dataFolder = process.env.DATA_FOLDER || './src/utils'; // Ruta por defecto si DATA_FOLDER no está definido


export const qq = async (req: Request, res: Response,  next: NextFunction): Promise<void> => {
  try {
    const palabra = req.query.palabra as string;
    if (!palabra) {
      console.error('⚠️ Palabra es requerida ');
      res.status(400).json({ error: '⚠️ Palabra es requerida ' });
    }
    // Aquí puedes realizar la lógica que necesites con la palabra
    const qqA: IAccion[] = await getAccionesService2(palabra);
    res.json(qqA);
  } catch (e) {
    const error = e as Error;
    console.error('Error al leer el archivo:', error);
    res.status(500).json({ error: 'Internal Server Error', message: error.message });
  } 
};



export const getAccionesController = async (req: Request, res: Response,  next: NextFunction):Promise<void> => {
  try {
    const acciones: IAccion[] = await getAccionesService();
    res.json(acciones);

  } catch (e) {
    const error = e as Error;
    res.status(500).json({ error: 'Internal Server Error', message: error.message });
  }
};


export const createAccionController = async (req: Request, res: Response,  next: NextFunction) => {
  try {
    // validar los datos recibidos
    const accionData: string = req.body;

    // Llamamos al servicio para crear la acción
    const accionService = new AccionService();
    const accion = await accionService.leerFileAccion(accionData);
    res.status(201).json(accion);
  }
  catch (e) {
    const error = e as Error;
    res.status(500).json({ error: 'Internal Server Error', message: error.message });
  }
};

export const getAccionesFileController = async (req: Request, res: Response) => {
  try {
    const filename = req.query.filename as string;
    if (!filename) {
      console.error('⚠️ Filename is required ');
    }
    res.json({ filename });
  }
  catch (e) {
    const error = e as Error;
    console.error('Error al leer el archivo:', error);
    return res.status(500).json({ error: 'Internal Server Error', message: error.message });
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