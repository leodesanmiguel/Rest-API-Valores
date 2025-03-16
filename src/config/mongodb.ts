/**
 * La configuración de la conexión a MongoDB.
 * 
 */

import dotenv  from 'dotenv';
import mongoose  from 'mongoose';

dotenv.config();

const mongoDbURL = process.env.MONGO_DB_URL as string;
/**
 * FUNCION AUTOMÁTICA DE CONEXIÓN A MONGODB
 *  tipo: IIFE 
 *    Immediately Innvoked Function Expression
 *    Función que se ejecuta inmediatamente después de ser definida
 *   Se usa para ejecutar código una vez que el módulo se ha cargado
 *  y para evitar la contaminación del espacio global.
 * 
 */
export default ( async () => {
  try {
    console.log('connecting with MongoDB 🔜');
    await mongoose.connect(mongoDbURL);
    console.log('✨ MongoDB connected 💯 ');
  } catch (error) {
    console.error('💥 MongoDB connection error  ', error);
    process.exit(1);
  }
})();
//