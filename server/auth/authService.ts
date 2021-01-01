import { NextFunction, Request, Response } from "express";
import * as passport from 'passport';
import * as jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../util/secrets';

export function isAuthenticate(req: Request, res: Response, next: NextFunction) {
  passport.authenticate('jwt', {session: false})(req, res, next);
}

export function authorizeJWT(req: Request, res: Response, next: NextFunction) {
  passport.authenticate("jwt", function (err, user, jwtToken) {
    if (err) {
      console.log(err);
      return res.status(401).json({status: "error", code: "unauthorized"});
    }
    if (!user) {
      return res.status(401).json({status: "error", code: "unauthorized"});
    } else {
      const scope = req.baseUrl.split("/").slice(-1)[0];
      const authScope = jwtToken.scope;
      if (authScope && authScope.indexOf(scope) > -1) {
        return next();
      } else {
        return res.status(401).json({status: "error", code: "unauthorized"});
      }
    }
  })(req, res, next);
}

export function generateAccessToken(user): any {
  return jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
    },
    JWT_SECRET,
    {
      expiresIn: '3d',
      issuer: user._id.toString(),
    }
  );
}

export function formatProfile(user): any {
  return {
    id: user._id,
    name: user.name,
    email: user.email,
    token: this.generateAccessToken(user),
  };
}

