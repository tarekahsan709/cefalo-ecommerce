import * as cookieParser from 'cookie-parser';
import * as dotenv from 'dotenv';
import * as express from 'express';
import * as morgan from 'morgan';
import * as passport from 'passport';
import * as path from 'path';

import { connectDatabase, disconnectDatabase } from './config/mongo';
import { ProductRoutes } from './routes/productRoutes';
import { UserRoutes } from './routes/userRoutes';
import logger from './util/logger';

const API_BASE_URL = '/api/v1/';

class Server {
  public app: express.Application;

  constructor() {
    this.app = express();
    dotenv.config();
    connectDatabase();
    Server.configPassport();
    this.initExpressMiddleware();
    this.initCustomMiddleware();
    this.initRoutes();
  }

  private static configPassport(): void {
    require('./config/passport')(passport);
  }

  private initExpressMiddleware(): void {
    this.app.set('port', process.env.PORT || 3000);
    this.app.use('/', express.static(path.join(__dirname, '../public')));
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(cookieParser());

    if (process.env.NODE_ENV !== 'test') {
      this.app.use(morgan('dev'));
    }
    process.on('uncaughtException', (err) => {
      if (err) {
        logger.error(err.stack);
      }
    });
  }

  private initCustomMiddleware(): void {
    if (process.platform === 'win32') {
      require('readline')
        .createInterface({
          input: process.stdin,
          output: process.stdout,
        })
        .on('SIGINT', () => {
          logger.info('SIGINT: Closing MongoDB connection');
          disconnectDatabase();
        });
    }

    process.on('SIGINT', () => {
      logger.info('SIGINT: Closing MongoDB connection');
      disconnectDatabase();
    });
  }

  private initRoutes(): void {
    this.app.use(`${API_BASE_URL}users`, new UserRoutes().router);
    this.app.use(`${API_BASE_URL}products`, new ProductRoutes().router);
  }

  public start(): void {
    this.app.listen(this.app.get('port'), () => {
      logger.info(
        'API is running at http://localhost:%d',
        this.app.get('port')
      );
    });
  }
}

export const server = new Server();

server.start();
