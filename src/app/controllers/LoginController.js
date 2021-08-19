import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import configAuth from '../../config/auth';

class LoginController{
    async store(req, res){
        const {email, senha} = req.body;

        //Verificar se o usuário existe
        const userExiste = await User.findOne({email: email});
        if(!userExiste){
            return res.status(401).json({
                error: true,
                code: 110,
                message: "Error: Email NÃO existe no Banco de Dados!"
            });
        }

        //Verifica se a senha é a mesma do banco de dados
        if(!(await bcrypt.compare(senha, userExiste.senha))){
            return res.status(401).json({
                error: true,
                code: 111,
                message: `Error: Senha inválida para ${email}`
            });
        }

        // Se passar usuário e senha, acessa.
        return res.json({
            user:{
                id: userExiste._id,
                nome: userExiste.nome,
                email
            },
            token: jwt.sign(
                {id: userExiste._id},
                configAuth.secret,
                {expiresIn: configAuth.expiresIn}),
        });
    }
}

export default new LoginController();

// HASH UNICO Criptografia MD5
// String: thome_lucas_dev_micks
// MD5:  09cee1da4fb061b583b324747025e702
// SHA1: a593a2e7faa65659922a7559bac900667e446491