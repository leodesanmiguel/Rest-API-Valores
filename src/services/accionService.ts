/**
 * La lógica de negocio para los valores.
 * 
 */

import { AccionModel, IAccion } from "../models/accion";
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
export const createAccionService = async (accionData: IAccion): Promise<IAccion> => {
  // Creamos una nueva instancia del modelo con los datos recibidos
  const nuevaAccion = new AccionModel(accionData);

  // Guardamos el registro en la base de datos
  return await nuevaAccion.save();
}


// Agrega aquí la lógica de negocio adicional.