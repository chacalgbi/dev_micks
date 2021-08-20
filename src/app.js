import express from 'express';
import routes from './routes';
import cors from 'cors';
import './config/conexao';

const app = express();

class App{
    constructor(){
        this.app = express();
        this.middlewares();
        this.routes();
    }
    middlewares(){
        this.app.use(express.json());
        this.app.use((req, res, next) =>{
            res.header("Access-Control-Allow-Origin", "*"); // Qualqer URL
            res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");

            this.app.use(cors());
            next();
        });
    }
    routes(){
        this.app.use(routes);
    }
}

export default new App().app;