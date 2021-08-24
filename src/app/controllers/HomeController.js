import * as yup from 'yup';
import bcrypt from 'bcryptjs';
import Home from '../models/Home';
import Rodape from '../models/Rodape';

class HomeController{

    async show(req, res){
        Home.findOne({}).then((home) => {
            Rodape.findOne({}).then((rodape) =>{
                console.log("Acessou Show")
                return res.json({
                    error: false,
                    home: home,
                    rodape: rodape
                });
            }).catch((err) => {
                return res.status(400).json({
                    error: true,
                    code: 127,
                    message: "Não foi possível recuperar os  dados do Rodapé."
                });
            });
        }).catch((err) => {
            return res.status(400).json({
                error: true,
                code: 123,
                message: "Não foi possível recuperar os  dados da HOME."
            });
        });
    }

    async store(req, res){
        //Permite apenas um registro
        const existeRegistro = await Home.findOne({});
        if(existeRegistro){
            return res.status(400).json({
                error: true,
                code: 122,
                message: "Error: A página Home já possui um registro!"
            });
        }

        const home = await Home.create(req.body, (err) =>{
            if(err) return res.status(400).json({
                error: true,
                code: 121,
                message: "Error: Dados da página HOME não foram cadastrados"
            });

            return res.status(200).json({
                error: false,
                message: "Dados da página HOME cadastrados com sucesso!",
            });
        });
    }

    async update(req, res){
        let schema = yup.object().shape({
            tituloTopo: yup.string().required(),
            descTopo: yup.string(),
            tituloBtnTopo: yup.string(),
            linkBtnTopo: yup.string(),
            tituloServ: yup.string(),
            descServ: yup.string(),
            iconeUmServ: yup.string(),
            iconeDoisServ: yup.string(),
            iconeTresServ: yup.string(),
            tituloVideo: yup.string(),
            descTituloVideo: yup.string(),
            embedVideo: yup.string(),
            iconeUmProj: yup.string(),
            tituloUmProj: yup.string(),
            descUmProj: yup.string(),
            iconeDoisProj: yup.string(),
            tituloDoisProj: yup.string(),
            descDoisProj: yup.string(),
            iconeTresProj: yup.string(),
            tituloTresProj: yup.string(),
            descTresProj: yup.string(),
            iconeQuatroProj: yup.string(),
            tituloQuatroProj: yup.string(),
            descQuatroProj: yup.string(),
          });

          if(!(await schema.isValid(req.body))){
            return res.status(400).json({
                error: true,
                code: 124,
                message: "Error: Dados do formulário inválidos ou incompletos!"
            });
          }

          await Home.updateOne({}, req.body, (err) => {
            if(err){
              return res.status(400).json({
                  error: true,
                  code: 125,
                  message: "Erro: Não foi possível editar a Home."
              });
            }

            return res.json({
              error: false,
              message: "Home Editada com sucesso!"
            });
        });
    }

}

export default new HomeController();