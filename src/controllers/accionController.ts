import { Request, Response, NextFunction, RequestHandler } from 'express';
import { AccionService } from "../services/accionService";
import dotenv from 'dotenv';
import { IAccion } from './../models/accion';
import path from 'path';

//import { getValoresService, createValorService } from '../services/valor.service';
dotenv.config(); // Cargar variables de entorno desde el archivo .env
const dataFolder = process.env.DATA_FOLDER || './src/utils'; // Ruta por defecto si DATA_FOLDER no está definido

// Define un tipo alias para el manejador de ruta de Express
type ExpressHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<any> | void; // Permite Promise<any> o void


export class AccionController {
  private accionService: AccionService;
  
  constructor() {
    this.accionService = new AccionService();
  }

  public getAccionesController: ExpressHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> =>{
    try {
      const acciones: IAccion[] = await this.accionService.getAccionesService_();
      res.json(acciones);
      
    } catch (e) {
      const error = e as Error;
      console.error('Error al obtener las acciones:', error);
      res.status(500).json({ error: 'Internal Server Error', message: error.message });
      next(error); // Propagar el error para que el controlador lo maneje
    }
  }
  
 
  public createAccionController: ExpressHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      // validar los datos recibidos
      const accionData: IAccion = req.body;
      if (!accionData) {
        res.status(400).json({ error: '⚠️ Acción data is required ' });
      }
      // Llamamos al servicio para crear la acción
      //const accionService = new AccionService();
      //console.log('accionData:', accionData);
      const accion = await this.accionService.createAccionService(accionData);
      res.status(201).json(accion);
    }
    catch (e) {
      const error = e as Error;
      res.status(500).json({ error: 'Internal Server Error', message: error.message });
    }
  }


  // Aquí puedes agregar métodos para manejar las acciones
  // Por ejemplo, un método para crear una acción, obtener todas las acciones, etc.
  // Puedes usar el servicio de AccionService para interactuar con la base de datos
}

/**
 * para el POST
 * @param req 
 * @param res 
 * @param next 
  * @returns 
  *
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
*/

/***
 * para el GET
 * @param req
 * @param res 
 * @param next
 * @returns
export const getAccionesController = async (req: Request, res: Response,  next: NextFunction):Promise<void> => {
  try {
    const acciones: IAccion[] = await getAccionesService();
    res.json(acciones);

  } catch (e) {
    const error = e as Error;
    res.status(500).json({ error: 'Internal Server Error', message: error.message });
  }
};
*/

/**
 * para el leer un archiv CSV
export const leerMiArchvivoController = async (req: Request, res: Response) => {
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
    const accionService = new AccionService();
    const resultados = await accionService.leerFileAccion(filePath);
    if (!resultados) {
      return res.status(404).json({ error: '⚠️ File not found or empty' });
    }
    return res.status(200).json(resultados);
  } catch (e) {
    const error = e as Error;
    console.error('Error al leer el archivo:', error);
    return res.status(500).json({ error: 'Internal Server Error', message: error.message });
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





export const leerArchvivo = async (req: Request, res: Response) => {
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
*/