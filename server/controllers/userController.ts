import { NextFunction, Request, Response, Router } from "express";
import * as passport from 'passport';
import { IVerifyOptions } from 'passport-local';
import { IUser } from '../models/user';
import { formatProfile } from '../auth/authService';


export class UserController {

  constructor() {
  }

  public async registerUser(req: Request, res: Response, next: NextFunction): Promise<void> {
    passport.authenticate('local-signup', (err: Error, user: IUser, info: IVerifyOptions) => {
      if (err || !user) {
        const message = info ? info.message : 'Invalid arguments.';
        return res.status(400).json(message);
      }
      res.json(formatProfile(user.toJSON()));
    })(req, res, next);
  }

  public async authenticateUser(req: Request, res: Response, next: NextFunction) {
    passport.authenticate('local-login', (err, user, info) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.status(401).json({msg: info.message});
      } else {
        res.json(formatProfile(user.toJSON()));
      }
    })(req, res, next);
  }

}
