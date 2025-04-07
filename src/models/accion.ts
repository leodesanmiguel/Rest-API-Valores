import  { Schema, model, models, Document } from 'mongoose';

export interface IAccion extends Document {
  Ticker: string;
  Nombre: string;
  Fecha: Date;
  Hora: String;
  Ultimo_precio: string;
  variacion: string;
  Volumen: number;
  Apertura: string;
  Minimo: string;
  Maximo: string;
  Cierre_anterior: string;
  Ultima_cotizacion: Date | string;
}


const accionSchema: Schema = new Schema({
  Ticker:{type: String, required: true} ,
  Nombre:{type: String, required: true} ,
  Fecha:{type: Date, required: false} ,                            // Date
  Hora:{type: String, required: true} ,
  Ultimo_precio:{type: String, required: true} ,
  variacion:{type: String, required: false} ,
  Volumen:{type: Number, required: false} ,                       // Numero
  Apertura:{type: String, required: true} ,
  Minimo:{type: String, required: true} ,
  Maximo:{type: String, required: true} ,
  Cierre_anterior:{type: String, required: false} ,
  Ultima_cotizacion: { type: Schema.Types.Mixed, required: false }, // Mixto-> puede ser Date o String
});

// Creamos el modelo a partir del esquema
//export const AccionModel = model<IAccion>('Accion', accionSchema);
export const AccionModel = models.Accion || model<IAccion>('Accion', accionSchema);
//export const AccionModel = model<IAccion>('Accion', accionSchema, 'acciones');

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
