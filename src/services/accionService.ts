/**
 * La lógica de negocio para los valores.
 * 
 */

import { AccionModel, IAccion, IAccion2 } from "../models/accion";
import { getAcciones } from "../repositories/accionRepository";
import fs from 'fs';
import path from 'path';
import csv from 'csv-parser';
//import { getValores, createValor } from '../repositories/valor.repository';
//import { IValor } from '../models/valor';

// export const getValoresService = async (): Promise<IValor[]> => {
//   return getValores();
// };
export const getAccionesService = async (): Promise<IAccion[]> => {
  return getAcciones();
}


// export const createValorService = async (valor: IValor): Promise<IValor> => {
//   return createValor(valor);
// };
export const createAccionService = async (accionData: IAccion): Promise<IAccion> => {
  // Creamos una nueva instancia del modelo con los datos recibidos
  const nuevaAccion = new AccionModel(accionData);

  // Guardamos el registro en la base de datos
  return await nuevaAccion.save();
}


export const loadCSVAccionToMongoDB = async (filePath: string): Promise<void> => {
  const results: IAccion[] = [];
  const fullPath = path.join(__dirname, filePath);
  try {
    // Lee el archivo CSV y procesa cada fila
    await new Promise<void>((resolve, reject) => {
      fs.createReadStream(fullPath)
        .pipe(csv())
        .on('data', (data) => {
          try {


          } catch (conversionError) {
            const error = conversionError as Error;
            console.error('Error al procesar la fila:', data, error);
          }
        })
        .on('end', () => {
          console.log('Archivo CSV procesado correctamente.');
          resolve();
        })
        .on('error', (error) => {
          console.error('Error al procesar el archivo CSV:', error);
          reject(error);
        });
    });

    // Aquí puedes agregar la lógica para guardar los datos en MongoDB
    console.log('Datos procesados:', results);
  } catch (e) {
    const error = e as Error;
    console.error('Error al cargar el archivo CSV:', error);
    
  };
  
};

export const loadCSVAccionToMongoDB2 = async (filePath: string): Promise<void> => {
  const results: IAccion2[] = [];
  const fullPath = path.join(__dirname, filePath);
 
  
};