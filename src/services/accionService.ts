/**
 * La lógica de negocio para los valores.
 * 
 */

import { IAccion } from "../models/accion";
import { getAcciones } from "../repositories/accionRepository";

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
export const createAccionService = async (accion: IAccion): Promise<IAccion> => {
  return accion;  
}


// Agrega aquí la lógica de negocio adicional.