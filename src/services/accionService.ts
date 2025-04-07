
/**
 * La lógica de negocio para los valores.
 * 
 */

import { AccionModel, IAccion } from "../models/accion";
import { getAcciones, getAcciones2 } from "../repositories/accionRepository";
import fs from 'fs';
import path from 'path';
import csv from 'csv-parser';
/*
export const getAccionesService = async (): Promise<IAccion[]> => {
  return getAcciones();
}

export const getAccionesService2 = async (palabra:string): Promise<IAccion[]> => {
  return getAcciones2(palabra);
}

export const leerMiArchivoService = async (filePath: string) => {
  const fullPath = path.join(__dirname, filePath);
  
  console.log('Leyendo archivo:', fullPath);
  };
*/
 

export class AccionService {

  public async getAccionesService_(): Promise<IAccion[]> {
    return getAcciones();
  }
 
  public async createAccionService (reg: IAccion): Promise<void>  {
    console.log('Registro Recibido:', reg);
    const accion = new AccionModel(reg);
    const resultado = await accion.save();  
    console.log('Registro Guardado:', resultado);

  }

  /*
  async leerFileAccion(filePath: string): Promise<IAccion[]> {
    const fullPath = path.join(__dirname, filePath);
    const resultados: IAccion[] = [];
    return new Promise<IAccion[]>((resolve, reject) => {

      fs.createReadStream(fullPath)
        .pipe(csv())
        .on('data', (data) => {
          try {
            // Convierte cada fila a un objeto IAccion
            const accion: IAccion = {
              Ticker: this.parseTicker(data.Ticker) || '--',
              Nombre: this.parseNombre(data.nombre) || '--',
              Fecha: this.parseDate(data.Fecha) || new Date(),
              Hora: this.parseHora(data.Hora) || '0:00',
              Ultimo_precio: this.parseUltimo_precio(data.Ultimo_precio) || '0',
              variacion: this.parseVariacion(data.variacion) || '0',
              Volumen: this.parseVolumen(data.Volumen) || 0,
              Apertura: this.parseApertura(data.Apertura) || '0',
              Minimo: this.parseMinimo(data.Minimo) || '0',
              Maximo: this.parseMaximo(data.Maximo) || '0',
              Cierre_anterior: this.parseCierre_anterior(data.Cierre_anterior) || '0',
              Ultima_cotizacion: this.parseUltima_cotizacion(data.Ultima_cotizacion) || new Date().toISOString(),
            };
            resultados.push(accion);
          } catch (conversionError) {
            const error = conversionError as Error;
            console.error('Error al procesar la fila:', data, error);
            reject(error);
          }
        })
        .on('end', () => {
          console.log('✨ Archivo CSV procesado correctamente. ✨');
          resolve(resultados);
        })
        .on('error', (error) => {
          console.error('⚠️ Error al procesar el archivo CSV:⚠️', error);
          reject(error);
        });
    });
    
  }
*/



}


  




  