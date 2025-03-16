import { AccionModel, IAccion } from './../models/accion';
/**
 * La capa de acceso a datos para los valores. 
 * Ticker,Nombre,Fecha,Hora,Último precio,VAR.,Volumen,Aper.,Mínimo,Máximo,Cierre anterior,Última cotización,
 */


//import Valor, { IValor } from '../models/valor';

export const getAcciones = async (): Promise<IAccion[]> => {
  return AccionModel.find();
};

export const createAccion = async (valor: IAccion): Promise<IAccion> => {
  return AccionModel.create(valor);
};



// Agrega aquí otras funciones para actualizar, eliminar, etc.