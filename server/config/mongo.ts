import * as mongoose from 'mongoose';

let connection = null;

async function connectDatabase(): Promise<any> {
  const connectionString = getConnectionString();
  const connectionOptions = getConnectionOption();

  await mongoose.connect(connectionString, connectionOptions, (err) => {
    if (err) {
      console.log('mongoose.connect() failed: ' + err);
    }
  });

  connection = await mongoose.connection;

  mongoose.connection.on('error', (err) => {
    console.log('Error connecting to MongoDB: ' + err);
  });

  mongoose.connection.once('open', () => {
    console.log('We have connected to mongodb');
  });
}

function getConnectionString() {
  // Fixme: Move test to const
  if (process.env.NODE_ENV === 'test') {
    return process.env.MONGODB_TEST_URI;
  } else {
    return process.env.MONGODB_URI;
  }
}

function getConnectionOption() {
  return {
    promiseLibrary: global.Promise,
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  };
}

function disconnectDatabase() {
  connection.close(() => {
    console.log('Mongoose default connection disconnected through app termination');
    process.exit(0);
  });
}

export { connectDatabase, disconnectDatabase };
