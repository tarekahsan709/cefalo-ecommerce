import { userRoute } from './api/user/user.route';

/**
 * Main application routes
 */
function setRoutes(app): void {
  app.use('/api/v1/users', userRoute);
}

export default setRoutes;
