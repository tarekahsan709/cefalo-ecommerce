import * as express from 'express';
import UserCtrl from './user.controller';

const userRoute = express.Router();
const userCtrl = new UserCtrl();

userRoute.route('/').post(userCtrl.insert);
userRoute.route('/login').post(userCtrl.login);

userRoute.route('/all').get(userCtrl.getAll);
userRoute.route('/:id').get(userCtrl.get);
userRoute.route('/:id').put(userCtrl.update);
userRoute.route('/:id').delete(userCtrl.delete);
userRoute.route('/count').get(userCtrl.count);

export { userRoute };
