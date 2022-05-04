import mongoose, { Connection } from 'mongoose';
import logger from './logger';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const NODE_ENV = process.env.NODE_ENV || '';

let db: Connection;
function getMongoURI() {
  return process.env.MONGODB_URI || '';
}

function connectDB() {
  // DATABASE CONNECTION
  mongoose.connect(getMongoURI(), {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  });

  // MONGODB CONNECTION CHECK
  db = mongoose.connection;
  db.on('error', (err: Error) => {
    logger.error(`Database connection Error: ${err}`);
  });
  db.once('open', () => {
    logger.info('Database connected');
  });
}

export function getDbConnection() {
  return db;
}

export default connectDB;
