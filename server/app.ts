import * as dotenv from 'dotenv';
import * as express from 'express';
import * as morgan from 'morgan';
import * as cookieParser from 'cookie-parser';
import * as path from 'path';

import { connectDatabase, disconnectDatabase } from './config/mongo';
import setRoutes from './routes/routes';

const app = express();
dotenv.config();

async function start(): Promise<any> {
  try {
    initExpressMiddleware();
    initCustomMiddleware();
    await connectDatabase();
    initDbSeeder();
    initRoutes();
    startApp();
  } catch (err) {
    console.error(err);
  }
}

function initExpressMiddleware() {
  app.set('port', (process.env.PORT || 3000));
  app.use('/', express.static(path.join(__dirname, '../public')));
  app.use(express.json());
  app.use(express.urlencoded({extended: false}));
  app.use(cookieParser());
  if (process.env.NODE_ENV !== 'test') {
    app.use(morgan('dev'));
  }
  process.on("uncaughtException", (err) => {
    if (err) console.log(err, err.stack);
  });
}

function initCustomMiddleware() {
  if (process.platform === "win32") {
    require("readline")
      .createInterface({
        input: process.stdin,
        output: process.stdout,
      })
      .on("SIGINT", () => {
        console.log("SIGINT: Closing MongoDB connection");
        disconnectDatabase();
      });
  }

  process.on("SIGINT", () => {
    console.log("SIGINT: Closing MongoDB connection");
    disconnectDatabase();
  });
}

function initDbSeeder() {

}

function initRoutes() {
  setRoutes(app);
  app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
  });
}

function startApp() {
  app.listen(app.get('port'), () => {
    console.log(
      "Listening on http://localhost:",
      app.get('port')
    );
  });
}

start();

export { app };
