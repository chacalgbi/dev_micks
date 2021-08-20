import * as yup from 'yup';
import bcrypt from 'bcryptjs';
import User from '../models/User';

class PerfilController{
    async show(req, res){
        User.findOne({_id: req.userId}, '_id nome email cpf telefone endereco cidade createdAt updatedAt').then((user)=>{
            return res.json({
                error: false,
                user: user
            });
        }).catch((erro)=>{
            return res.status(400).json({
                error: true,
                code: 115,
                message: "Erro: Perfil não encontrado"
            });
        })

    }

    async update(req, res){
        let schema = yup.object().shape({
            nome: yup.string().min(5),
            email: yup.string().email().min(13),
            senha: yup.string().min(5),
            cpf: yup.string().min(10),
            telefone: yup.string().min(8),
            endereco: yup.string().min(10),
            cidade: yup.string().min(3),
          });

          if(!(await schema.isValid(req.body))){
            return res.status(400).json({
                error: true,
                code: 108,
                message: "Error: Dados do formulário inválidos ou incompletos!"
            });
          }

          const { email } = req.body;
          const temUsuario = await User.findOne({_id: req.userId});
          if(!temUsuario){
              return res.status(400).json({
                  error: true,
                  code: 109,
                  message: "Erro: Usuário não encontrado"
              });
          }

          //Primeiro verifica se o email é diferente do email atual
          if(email != temUsuario.email){
            const jaExiste = await User.findOne({email}); // procura se já tem o email no BD
            if(jaExiste){
                return res.status(400).json({
                    error: true,
                    code: 110,
                    message: "Erro: Este email já está cadastrado!"
                });
            }
          }

          var dados = req.body;
          if(dados.senha){ // Se o usuário enviar a senha, encripta a mesma
              dados.senha = await bcrypt.hash(dados.senha, 7);
          }

          await User.updateOne({_id: req.userId}, dados, (err) => {
              if(err){
                return res.status(400).json({
                    error: true,
                    code: 116,
                    message: "Erro: Não foi possível editar o Perfil usuário"
                });
              }

              return res.json({
                error: false,
                message: "Perfil do usuário editado com sucesso!"
              });
          });
    }

}

export default new PerfilController();