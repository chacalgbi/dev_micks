import { Router } from "express";
import multer from 'multer';
import multerUp from './app/middlewares/uploadImgSobre';

import UserController from "./app/controllers/UserController";
import LoginController from "./app/controllers/LoginController";
import PerfilController from "./app/controllers/PerfilController";
import HomeController from "./app/controllers/HomeController";
import RodapeController from "./app/controllers/RodapeController";
import SobreController from './app/controllers/SobreController';
import InfoContatoController from './app/controllers/InfoContatoController';
import ContatoController from './app/controllers/ContatoController';
import SobreImagemController from './app/controllers/SobreImagemController';
import authMiddleware from './app/middlewares/auth';

const routes = new Router();
const imgSobre = multer(multerUp)

// Rotas de Login
routes.post('/login', LoginController.store);

//Rotas de Controle de Usuários
routes.get('/users', UserController.index);
routes.get('/users/:id', UserController.show);
routes.post('/users', UserController.store);
routes.put('/users', authMiddleware, UserController.update);
routes.delete('/users/:id', authMiddleware, UserController.delete);

//Rotas de Perfil
routes.get('/perfil', authMiddleware, PerfilController.show);
routes.put('/perfil', authMiddleware, PerfilController.update);

//Rotas de edição de informações da página
routes.get('/home', HomeController.show);
routes.post('/home', authMiddleware, HomeController.store);
routes.put('/home', authMiddleware, HomeController.update);

//Rotas para edição das informações do Rodapé
routes.get('/rodape',  RodapeController.show);
routes.post('/rodape', RodapeController.store);
routes.put('/rodape',  RodapeController.update);

// Sobre a Empresa
routes.get('/sobre',  SobreController.show);
routes.post('/sobre', SobreController.store);
routes.put('/sobre',  SobreController.update);

//Rotas para edição de Contato
routes.get('/infocontato', InfoContatoController.show);
routes.post('/infocontato', authMiddleware, InfoContatoController.store);
routes.put('/infocontato', authMiddleware, InfoContatoController.update);

//Rotas para edição de Mensagens
routes.get('/contato', authMiddleware, ContatoController.index);
routes.get('/contato/:id', authMiddleware, ContatoController.show);
routes.post('/contato', ContatoController.store);
routes.put('/contato', authMiddleware, ContatoController.update);
routes.delete('/contato/:id', authMiddleware, ContatoController.delete);

// Upload da imagem da empresa
routes.put('/sobre-imagem', multer(multerUp).single('file') ,SobreImagemController.update)

export default routes;