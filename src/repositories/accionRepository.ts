import { AccionModel, IAccion } from './../models/accion';
/**
 * La capa de acceso a datos para los valores. 
 * Ticker,Nombre,Fecha,Hora,Último precio,VAR.,Volumen,Aper.,Mínimo,Máximo,Cierre anterior,Última cotización,
 */


//import Valor, { IValor } from '../models/valor';

export const getAcciones = async (): Promise<IAccion[]> => {
  return AccionModel.find();
};
export const getAcciones2 = async (palabra: string): Promise<IAccion[]> => {
  if (!palabra) {
    console.error('⚠️ Palabra es requerida ');
    throw new Error('⚠️ Palabra es requerida ');
  }
  console.log('Palabra:', palabra);
  return AccionModel.find().where('Ticker').regex(new RegExp(palabra, 'i'));
};

export const createAccion = async (valor: IAccion): Promise<IAccion> => {
  return AccionModel.create(valor);
};



// Agrega aquí otras funciones para actualizar, eliminar, etc.