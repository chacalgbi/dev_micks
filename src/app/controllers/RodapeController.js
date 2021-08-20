import * as Yup from 'yup';
import Rodape from '../models/Rodape';

class RodapeController{
    async show(req, res){
        Rodape.findOne({}).then((rodape) => {
            return res.json({
                error: false,
                rodape: rodape
            });
        }).catch((err) => {
            return res.status(400).json({
                error: true,
                code: 125,
                message: "Erro: Não foi possível executar a solicitação!"
            });
        });
    };

    async store(req, res) {

        const dados = {
            tituloPg: "Celke",
            tituloCont: "Contato",
	        telCont:"(XX) XXXXX-XXXX",
            endCont: "Av. Winston Churchill",
            cnpjCont: "CNPJ: XX.XXX.XXX/XXXX-XX",
            tituloRedSoc: "Redes Sociais",
            instTitulo: "Instagram",
            instLink: "https://www.instagram.com/celkecursos",
            facTitulo: "Facebook",
            facLink: "https://www.facebook.com/celkecursos/",
            youtubeTitulo: "Youtube",
            youtubeLink: "https://www.youtube.com/channel/UC5ClMRHFl8o_MAaO4w7ZYug",
            twiterTitulo: "Twiter",
            twiterLink: "https://twitter.com/celkecursos"
        };
        
        const rodape = await Rodape.findOne({});
        if(rodape){
            return res.status(400).json({
                error: true,
                code: 126,
                message: "Erro: O rodapé já possui um registro!"
            });
        };

        const cadRodape = await Rodape.create(dados, (err) => {
            if (err) return res.status(400).json({
                error: true,
                code: 127,
                message: "Error: Dados do rodapé não foram cadastrado com sucesso!"
            });

            return res.json({
                error: false,
                message: "Dados do rodapé cadastrado com sucesso!"
            });
        });
    };

    async update(req, res){

        const schema = Yup.object().shape({
            tituloPg: Yup.string().required(), 
            tituloCont: Yup.string().required(),
            telCont: Yup.string().required(),
            endCont: Yup.string().required(),
            cnpjCont: Yup.string().required(),
            tituloRedSoc: Yup.string().required(),
            instTitulo: Yup.string().required(),
            instLink: Yup.string().required(),
            facTitulo: Yup.string().required(),
            facLink: Yup.string().required(),
            youtubeTitulo: Yup.string().required(),
            youtubeLink: Yup.string().required(),
            twiterTitulo: Yup.string().required(),
            twiterLink: Yup.string().required()
        });

        if(!(await schema.isValid(req.body))){
            return res.status(400).json({
                error: true,
                code: 124,
                message: "Erro: Dados do formulário inválido!"
            });
        };

        await Rodape.updateOne({}, req.body, (err) => {
            if(err) return res.status(400).json({
                error: true,
                message: "Erro: Conteúdo do rodapé não foi editado com sucesso!"
            });
        });

        return res.json({
            error: false,
            message: "Conteúdo do rodapé editado com sucesso!"
        });
    };

};

export default new RodapeController();