/**
 * El modelo de datos para los valores. 
 * Ticker,Nombre,Fecha,Hora,Último precio,VAR.,Volumen,Aper.,Mínimo,Máximo,Cierre anterior,Última cotización,
 * ALUA,Aluar Aluminio Argentino,26/07/2024,08:28:46,"AR$ 993,00","0,00%",0,"0,00","0,00","0,00","1.040,00",25/07/2024,Ver detalle  Operar
 * ALUAC,Aluar Aluminio Argentino,26/07/2024,08:28:46,"US$ 0,26","0,00%",0,"0,00","0,00","0,00","0,26",24/06/2020,Ver detalle  Operar
 * ALUAD
 * Aluar Aluminio Argentino
 * 26/07/2024
 * 08:28:46
 * "US$ 0,82",
 * "0,00%",
 * 0,
 * "0,00",
 * "0,00",
 * "0,00",
 * "0,81",
 * 25/07/2024

 */

import  { Schema, model, Document } from 'mongoose';

export interface IAccion extends Document {
  //nombre: string;
  //valor: number;
  Ticker: string;
  Nombre: string;
  Fecha: Date;
  Hora: Date;
  Ultimo_precio: string;
  variacion: string;
  Volumen: number;
  Apertura: string;
  Minimo: string;
  Maximo: string;
  Cierre_anterior: string;
  Ultima_cotizacion: Date;
}


const accionSchema: Schema = new Schema({
  Ticker:{type: String, required: true} ,
  Nombre:{type: String, required: true} ,
  Fecha:{type: Date, required: true} ,
  Hora:{type: String, required: true} ,
  Ultimo_precio:{type: String, required: true} ,
  variacion:{type: String, required: false} ,
  Volumen:{type: Number, required: false} ,
  Apertura:{type: String, required: true} ,
  Minimo:{type: String, required: true} ,
  Maximo:{type: String, required: true} ,
  Cierre_anterior:{type: String, required: true} ,
  Ultima_cotizacion:{type: String, required: false} ,
});


export interface IAccion2 extends Document {
  Ticker: string;
  Nombre: string;
}

const accionSchema2: Schema = new Schema({
  Ticker:{type: String, required: true} ,
  Nombre: { type: String, required: true },
});

// Creamos el modelo a partir del esquema
export const AccionModel = model<IAccion>('Accion', accionSchema);

export const AccionModel2 = model<IAccion2>('Accion', accionSchema2);

//export default mongoose.model<IAccion>('Accion', accionSchema);


/**
 * 
 * 
{
  "Ticker": "",
  "Nombre": "",
  "Fecha": "",
  "Hora": "",
  "Ultimo_precio": "",
  "variacion": "",
  "Volumen": "",
  "Apertura": "",
  "Minimo": "",
  "Maximo": "",
  "Cierre_anterior": "",
  "Ultima_cotización": ""
}
 */

