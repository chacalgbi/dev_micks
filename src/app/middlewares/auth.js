import { promisify } from "util";
import jwt from 'jsonwebtoken';
import configAuth from '../../config/auth';

export default async (req, res, next)=>{
    const authHeader = req.headers.authorization;

    //Se o token não for enviado
    if(!authHeader){
        return res.status(401).json({
            error: true,
            code: 130,
            message: "Error: Token não encontrado"
        });
    }

    // Separa o título do corpo
    const [bearer, token] = authHeader.split(' ');

    try{
        const decoded = await promisify(jwt.verify)(token, configAuth.secret);
        //console.log(decoded)
        req.userId = decoded.id;
        return next();

    }catch(err){
        return res.status(401).json({
            error: true,
            code: 130,
            message: "Error: Token Inválido"
        });
    }
}