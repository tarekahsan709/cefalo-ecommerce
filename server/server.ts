import * as express from 'express';
import * as morgan from 'morgan';
import * as dotenv from 'dotenv';
import * as passport from 'passport';
import * as cookieParser from 'cookie-parser';
import * as path from 'path';
import * as mongoose from 'mongoose';

import { connectDatabase, disconnectDatabase } from './config/mongo';
import { SEED_DB } from './config/secrets';
import { Seed } from './config/Seed';

import { ProductRoutes } from './routes/productRoutes';
import { UserRoutes } from './routes/userRoutes';

import logger from './util/logger';
import { addWarning } from '@angular-devkit/build-angular/src/utils/webpack-diagnostics';


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
    this.app.set("port", process.env.PORT || 3000);
    this.app.use('/', express.static(path.join(__dirname, '../public')));
    this.app.use(express.json());
    this.app.use(express.urlencoded({extended: false}));
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
    this.app.use('/api/v1/users', new UserRoutes().router);
    this.app.use('/api/v1/products', new ProductRoutes().router);
  }

  public start(): void {
    this.app.listen(this.app.get("port"), () => {
      logger.info(
        'API is running at http://localhost:%d',
        this.app.get('port')
      );
    });
  }

}

export const server = new Server();

server.start();
