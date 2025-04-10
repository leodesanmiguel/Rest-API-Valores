import { Request, Response, NextFunction, RequestHandler } from 'express';
import { AccionService } from "../services/accionService";
import dotenv from 'dotenv';
import { IAccion } from './../models/accion';
import path from 'path';
import fs from 'fs';
import { console } from 'inspector/promises';
//import csv from 'csv-parser';

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

  
  public uploadArchivoAccionesController: ExpressHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response> => {
    try {
      console.log('Subiendo archivo...', req.query.nombrefile);
      const filename = req.query.nombrefile as string;
      if (!filename) {
        return res.status(400).json({ error: '⚠️ Filename is required ' });
      }
      const filePath = path.join(dataFolder, filename);
      const resultados: IAccion[] = [];

      await new Promise((resolve, reject) => {
        const csvParser = require('csv-parser'); // Importar el parser CSV
 
        fs.createReadStream(filePath)
          .pipe(csvParser())
          .on('data', (data:any) => resultados.push(data))
          .on('end', () => resolve(null))
          .on('error', (error:any) => reject(error));
      });

      if (resultados.length === 0) {
        return res.status(404).json({ error: '⚠️ File not found or empty' });
      }
      
      let registrosGuardados = 0;
      
      for (const row of resultados) {
        const encontrado = {
          'Nro:': registrosGuardados,
          'Registro-->': row
          };
          console.log('encontrado:', encontrado);
        try {
          const accionData: IAccion = {
            Ticker: this.parseTicker(row.Ticker),
            Nombre: this.parseNombre(row.Nombre),
            Fecha: this.parseDate(String(row.Fecha)) || new Date(),
            Hora: row.Hora || '00:00:00',
            Ultimo_precio: this.parseCadena(row.Ultimo_precio) || '0',
            variacion: this.parseCadena(row.variacion) || '0',
            Volumen: this.parseVolumen(row.Volumen.toString()) || 0,
            Apertura: this.parseCadena(row.Apertura) || '0',
            Minimo: this.parseCadena(row.Minimo) || '0',
            Maximo: this.parseCadena(row.Maximo) || '0',
            Cierre_anterior: this.parseCadena(row.Cierre_anterior) || '0',
            Ultima_cotizacion: this.parseDate(String(row.Ultima_cotizacion)) || new Date(),
          } as IAccion;

          //await this.accionService.createAccionService(accionData);
          await this.accionService.createRegistryService(row);
          registrosGuardados++;
        } catch (e) {
          const error = e as Error;
          res.json({
            'Error': '⚠️ Error al procesar el registro',
            'Registro': row,
            'mensaje': error.message,
          });
          // Aquí podrías decidir si quieres detener el proceso o continuar con los demás registros
        }
      }

      return res.status(200).json({
        message: `Se procesaron ${resultados.length} registros y se guardaron ${registrosGuardados} acciones.`,
        nombre: req.query.nombrefile,
        folder: dataFolder,
        ruta: filePath,
        //resultados: resultados,
      });

    } catch (e) {
      const error = e as Error;
      console.error('Error al leer o procesar el archivo:', error);
      return res.status(500).json({ error: 'Internal Server Error', message: error.message });
    }
  };

  
  
  // Aquí puedes agregar métodos para manejar las acciones
  // Por ejemplo, un método para crear una acción, obtener todas las acciones, etc.
  // Puedes usar el servicio de AccionService para interactuar con la base de datos
  private parseCadena(dataString: string): string {
    return dataString;
  }
    private parseTicker(dataString: string): string {
    return dataString? dataString.toUpperCase(): '--'; // Elimina espacios en blanco y convierte a mayúsculas
  }
  private parseNombre(dataString: string): string {
    return dataString? dataString.toUpperCase(): '--'; // Elimina espacios en blanco y convierte a mayúsculas
  }
  private parseDate(dateString: string): Date {
    const [day, month, year] = dateString.split('/');
    return  new Date(`${year}-${month}-${day}`); // Ajusta el mes restando 1
  }
  private parseHora(dataString: string): string {
    return dataString;
  }
  private parseUltimo_precio(dataString: string): string {
    return dataString;
  }
  private parseVariacion(dataString: string): string {
    return dataString? dataString.toUpperCase(): '--'; // Elimina espacios en blanco y convierte a mayúsculas
  }
  private parseVolumen(dataString: string): number {
    return  dataString? parseInt(dataString.trim().replace(/\./g,''),10): 0; // Elimina espacios en blanco
  }
  private parseApertura(dataString: string): string {
    return dataString? dataString.toUpperCase(): '--'; // Elimina espacios en blanco y convierte a mayúsculas
  }
  private parseMinimo(dataString: string): string {
    return dataString? dataString.toUpperCase(): '--'; // Elimina espacios en blanco y convierte a mayúsculas
  }
  private parseMaximo(dataString: string): string {
    return dataString? dataString.toUpperCase(): '--'; // Elimina espacios en blanco y convierte a mayúsculas
  }
  private parseCierre_anterior(dataString: string): string {
    return dataString? dataString.toUpperCase(): '--'; // Elimina espacios en blanco y convierte a mayúsculas
  }
  private parseUltima_cotizacion(dataString: string): string {
    return dataString? dataString.toUpperCase(): '--'; // Elimina espacios en blanco y convierte a mayúsculas
  }
}
