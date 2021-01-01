import * as mongoose from 'mongoose';
import logger from '../util/logger';

let connection = null;

function connectDatabase() {
  const connectionString = getConnectionString();
  const connectionOptions = getConnectionOption();

  const run = async () => {
    await mongoose.connect(connectionString, connectionOptions, (err) => {
      if (err) {
        logger.error('mongoose.connect() failed: ' + err);
      }
    });
    connection = await mongoose.connection;
  };

  run().catch(error => console.error(error));

  mongoose.connection.on('error', (err) => {
    logger.error('Error connecting to MongoDB: ' + err);
  });

  mongoose.connection.once('open', () => {
    logger.info('We have connected to mongodb');
  });
}

function getConnectionString(): string {
  if (process.env.NODE_ENV === 'test') {
    return process.env.MONGODB_TEST_URI;
  } else {
    return process.env.MONGODB_URI;
  }
}

function getConnectionOption(): object {
  return {
    promiseLibrary: global.Promise,
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  };
}

function disconnectDatabase(): void {
  connection.close(() => {
    logger.info('Mongoose default connection disconnected through app termination');
    process.exit(0);
  });
}

export { connectDatabase, disconnectDatabase };
