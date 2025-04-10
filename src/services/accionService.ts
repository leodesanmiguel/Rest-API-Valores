
/**
 * La lógica de negocio para los valores.
 * 
 */

import { AccionModel, IAccion } from "../models/accion";
import { getAcciones, getAcciones2 } from "../repositories/accionRepository";
import fs from 'fs';
import path from 'path';
import csv from 'csv-parser';

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

    
/**
 * 
 * @param reg Registro de las acciones u otros activos
 * @returns void
 * @description Crea un nuevo registro de acción en la base de datos.
 * Recibe el registro tal cual lo recibe el controlador y lo guarda en la base de datos.
 * Se utiliza para guardar registros de acciones desde el archivo CSV.
 * @throws Error si ocurre un error al guardar el registro.
 * @example reg = {
 *    Ticker: 'YPFDD',
 *    Nombre: 'YPF',
 *    Fecha: '27/08/2024',
 *    Hora: '17:55:35',
 *    'Último precio': 'US$ 21,75',
 *    'VAR.': '1,40%',
 *    Volumen: '72.735',
 *    'Aper.': '21,55',
 *    'Mínimo': '21,55',
 *    'Máximo': '21,90',
 *    'Cierre anterior': '21,45',
 *    'Última cotización': '20:00',
 *    '': 'Ver detalle  Operar'
}
 */
  public async createRegistryService (reg: any ): Promise<void>  {
    console.log('Registro Recibido:', reg);
    const accionData: IAccion = {
          Ticker: this.parseTicker(reg.Ticker),
          Nombre: this.parseNombre(reg.Nombre),
          Fecha: this.parseDate(String(reg.Fecha)) || new Date(),
          Hora: reg.Hora || '00:00:00',
          Ultimo_precio: this.parseCadena(reg.Ultimo_precio) || '0',
          variacion: this.parseCadena(reg.variacion) || '0',
          Volumen: this.parseVolumen(reg.Volumen.toString()) || 0,
          Apertura: this.parseCadena(reg.Apertura) || '0',
          Minimo: this.parseCadena(reg.Minimo) || '0',
          Maximo: this.parseCadena(reg.Maximo) || '0',
          Cierre_anterior: this.parseCadena(reg.Cierre_anterior) || '0',
          Ultima_cotizacion: this.parseDate(String(reg.Ultima_cotizacion)) || new Date(),
        } as IAccion;

    const accion = new AccionModel(accionData);
    const resultado = await accion.save();  
    console.log('Registro Guardado:', resultado);

  }

  
  /**
   * @name procesarRegistroCSV
   * @description Procesar un registro CSV y lo guarda en la base de datos.
   * 1) Recibir el registro tal cual lo recibe el controlador 
   * 2) Convierte en el schema IAccion 
   * 3) Enviar al método createAccionService 
   * 4) Guardar en la base de datos.
   * 
   * @param row Registro de las acciones u otros activos
   * @returns void
   * @description Procesa un registro CSV y lo guarda en la base de datos.
   * Recibe el registro tal cual lo recibe el controlador y lo guarda en la base de datos.
   * Se utiliza para guardar registros de acciones desde el archivo CSV.
   * @throws Error si ocurre un error al guardar el registro.
   * @example row = {
   *    Ticker: 'YPFDD',
   *    Nombre: 'YPF',
   *    Fecha: '27/08/2024',
   *    Hora: '17:55:35',
   *    'Último precio': 'US$ 21,75',
   *    'VAR.': '1,40%',
   *    Volumen: '72.735',
   *    'Aper.': '21,55',
   *    'Mínimo': '21,55',
   *    'Máximo': '21,90',
   *    'Cierre anterior': '21,45',
   *    'Última cotización': '20:00',
   *    '': 'Ver detalle  Operar'
   *   }
   
   */
  public async procesarRegistroCSV(row: any): Promise<void> {
    try {
      const accionData: IAccion = {
        Ticker: row.Ticker,
        Nombre: row.Nombre,
        Fecha: this.parseDate(row.Fecha),
        Hora: row.Hora,
        Ultimo_precio: this.parsePrecio(row['Último precio']),
        variacion: this.parseVariacion(row['VAR.']),
        Volumen: this.parseVolumen(row.Volumen),
        Apertura: this.parsePrecio(row['Aper.']),
        Minimo: this.parsePrecio(row['Mínimo']),
        Maximo: this.parsePrecio(row['Máximo']),
        Cierre_anterior: this.parsePrecio(row['Cierre anterior']),
        Ultima_cotizacion: this.parseUltimaCotizacion(row['Última cotización'], row.Fecha),
      } as IAccion;
      await this.createAccionService(accionData);
    } catch (error) {
      console.error('Error al transformar y guardar registro:', row, error);
      throw error; // Relanza el error para que el controlador pueda manejarlo
    }
  }

   private parseCadena(dataString: string): string {
    return dataString;
  }
   private parsePrecio(precioString: string): string {
    return precioString?.replace(/AR\$ |US\$ /g, '').replace(/\./g, '').replace(',', '.').trim() || '';
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
   private parseUltimaCotizacion(cotizacionString: string, fechaString: string): Date | undefined {
    if (!cotizacionString || cotizacionString.includes('/')) {
      return undefined;
    }
    const [hours, minutes] = cotizacionString.split(':');
    const [day, month, year] = fechaString.split('/');
    return new Date(`${year}-${month}-${day}T${hours}:${minutes}:00.000Z`);
  }
}


  




  