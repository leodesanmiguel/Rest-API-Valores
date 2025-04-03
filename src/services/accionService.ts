/**
 * La lógica de negocio para los valores.
 * 
 */

import { AccionModel, IAccion } from "../models/accion";
import { getAcciones } from "../repositories/accionRepository";
import fs from 'fs';
import path from 'path';
import csv from 'csv-parser';

export const getAccionesService = async (): Promise<IAccion[]> => {
  return getAcciones();
}


//export const createAccionService = async (accionDataString: IAccion): Promise<IAccion> => {
//  // Creamos una nueva instancia del modelo con los datos recibidos
//  const nuevaAccion = new AccionModel(accionData);
//
//  // Guardamos el registro en la base de datos
//  return await nuevaAccion.save();
//}

export class AccionService {
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
              //id: dataString.id,
              Ticker: this.parseTicker(data.Ticker),
              Nombre: this.parseNombre(data.nombre),
              Fecha: this.parseDate(data.Fecha),
              Hora: this.parseHora(data.Hora),
              Ultimo_precio: this.parseUltimo_precio(data.Ultimo_precio),
              variacion: this.parseVariacion(data.variacion),
              Volumen: this.parseVolumen(data.Volumen),
              Apertura: this.parseApertura(data.Apertura),
              Minimo: this.parseMinimo(data.Minimo),
              Maximo: this.parseMaximo(data.Maximo),
              Cierre_anterior: this.parseCierre_anterior(data.Cierre_anterior),
              Ultima_cotizacion: this.parseUltima_cotizacion(data.Ultima_cotizacion),
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


  private parseTicker(dataString: string): string {
    return dataString.trim(); // Elimina espacios en blanco
  }
  private parseNombre(dataString: string): string {
    return dataString.trim(); // Elimina espacios en blanco
  }
  private parseDate(dateString: string): Date {
    const [day, month, year] = dateString.split('/');
    return new Date(`${year}-${month}-${day}`); // Ajusta el mes restando 1
  }
  private parseHora(dataString: string): string {
    return dataString.trim(); // Elimina espacios en blanco
  }
  private parseUltimo_precio(dataString: string): string {
    return dataString.trim(); // Elimina espacios en blanco
  }
  private parseVariacion(dataString: string): string {
    return dataString.trim(); // Elimina espacios en blanco
  }
  private parseVolumen(dataString: string): number {
    return  dataString? parseInt(dataString.trim().replace(/\./g,''),10): 0; // Elimina espacios en blanco
  }
  private parseApertura(dataString: string): string {
    return dataString.trim(); // Elimina espacios en blanco
  }
  private parseMinimo(dataString: string): string {
    return dataString.trim(); // Elimina espacios en blanco
  }
  private parseMaximo(dataString: string): string {
    return dataString.trim(); // Elimina espacios en blanco
  }
  private parseCierre_anterior(dataString: string): string {
    return dataString.trim(); // Elimina espacios en blanco
  }
  private parseUltima_cotizacion(dataString: string): string {
    return dataString.trim(); // Elimina espacios en blanco
  }

}


  




  