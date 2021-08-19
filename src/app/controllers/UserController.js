import User from '../models/User';
import * as yup from 'yup';
import bcrypt from 'bcryptjs';
import { validateCPF, validatePhone, validateEmail } from 'validations-br';
class UserControler{

    async store(req, res){

        const validate_cpf   = req.body.cpf;
        const validate_tel   = req.body.telefone;
        const validate_email = req.body.email;
        const cpfValid   = validateCPF(validate_cpf);
        const telValid   = validatePhone(validate_tel);
        const emailValid = validateEmail(validate_email);

        if(!cpfValid){
            return res.status(400).json({
                error: true,
                code: 103,
                message: "Error: O CPF digitado não é válido. EX: 245.547.241-45"
            });
        }else if(!telValid){
            return res.status(400).json({
                error: true,
                code: 103,
                message: "Error: O TELEFONE digitado não é válido. EX: (77) 99987-8877"
            });
        }else if(!emailValid){
            return res.status(400).json({
                error: true,
                code: 103,
                message: "Error: O EMAIL digitado não é válido. EX: teste@gmail.com"
            });
        }

        let schema = yup.object().shape({
            nome: yup.string().required().min(5),
            email: yup.string().email().required().min(13),
            senha: yup.string().required().min(5),
            cpf: yup.string().min(10),
            telefone: yup.string().required().min(8),
            endereco: yup.string().min(10),
            cidade: yup.string().min(3),
          });

          if(!(await schema.isValid(req.body))){
            return res.status(400).json({
                error: true,
                code: 103,
                message: "Error: Dados inválidos ou incompletos!"
            });
          }

        const emailExiste = await User.findOne({email: req.body.email});
        if(emailExiste){
            return res.status(400).json({
                error: true,
                code: 102,
                message: "Error: Email já existe no Banco de Dados!"
            });
        }

        //Encriptar a senha
        var dados = req.body;
        dados.senha = await bcrypt.hash(dados.senha, 7);

        // Depois de todas as validações, inserir no BD
        const user = await User.create(dados, (err) =>{
            if(err) return res.status(400).json({
                error: true,
                code: 101,
                message: "Error: Usuário não foi cadastrado"
            });

            return res.status(200).json({
                error: false,
                message: "Usuário cadastrado com sucesso!",
                dados: user
            });
        });
    }

    async delete(req, res){
        console.log(req.userId);
        const usuarioExiste = await User.findOne({_id: req.params.id});
        if(!usuarioExiste){
            return res.status(400).json({
                error: true,
                code: 121,
                message: "Usuário não encontrado"
            });
        }
        const user = await User.deleteOne({_id: req.params.id}, (err)=>{
            if(err) return res.status(400).json({
                error: true,
                code: 122,
                message: "Usuário encontrado, mas não foi apagado! :("
            });
        });
        return res.json({
            error:false,
            message: "Usuário apagado com sucesso!"
        });
    }

    async index(req,res){
        const {page = 1} = req.query; // Se não receber page, define padrão 1
        const {limit = 20} = req.query;  // Se não receber limit, define padrão 20
        await User.paginate({}, {select: '_id nome email telefone cidade', page: page, limit: limit}).then((users)=>{
            return res.json({
                error: false,
                users: users
            });
        }).catch((erro)=>{
            return res.status(400).json({
                error: true,
                code: 106,
                message: "Não foi possível recuperar a lista de usuários. :("
            });
        });
    }

    async show(req, res){
        User.find({_id: req.params.id}, '_id nome email cpf telefone endereco cidade createdAt updatedAt').then((user) => {
            return res.json({
                error: false,
                user: user
            });
        }).catch((err) => {
            return res.status(400).json({
                error: true,
                code: 107,
                message: "Não foi possível recuperar o usuário. :("
            });
        });
    }

    async update(req, res){
        let schema = yup.object().shape({
            _id: yup.string().required(),
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

          const { _id, email } = req.body;
          const temUsuario = await User.findOne({_id: _id});
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

          await User.updateOne({_id: dados._id}, dados, (err) => {
              if(err){
                return res.status(400).json({
                    error: true,
                    code: 111,
                    message: "Erro: Não foi possível editar o usuário"
                });
              }

              return res.json({
                error: false,
                message: "Usuário Editado com sucesso!"
              });
          });
    }

}

export default new UserControler();