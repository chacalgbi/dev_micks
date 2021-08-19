import { Router } from "express";
import UserController from "./app/controllers/UserController";
import LoginController from "./app/controllers/LoginController";
import authMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.get('/users', UserController.index);
routes.get('/users/:id', UserController.show);
routes.post('/users', UserController.store);
routes.post('/login', LoginController.store);
routes.put('/users', UserController.update);
routes.delete('/users/:id', authMiddleware, UserController.delete);

export default routes;