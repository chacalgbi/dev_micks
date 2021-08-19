import { Router } from "express";
import UserController from "./app/controllers/UserController";
import LoginController from "./app/controllers/LoginController";
import authMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.get('/users', UserController.index);
routes.post('/users', UserController.store);
routes.post('/login', LoginController.store);
routes.delete('/users/:id', authMiddleware, UserController.delete);

export default routes;