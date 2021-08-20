import * as Yup from 'yup';
import InfoContato from '../models/InfoContato';
import Rodape from '../models/Rodape';

class InfoContatoController{
    async show(req, res){
        InfoContato.findOne({}).then((infoContato) => {
            Rodape.findOne({}).then((rodape) => {
                return res.json({
                    error: false,
                    infoContato: infoContato,
                    rodape: rodape
                });
            }).catch((err) => {
                return res.status(400).json({
                    error: true,
                    code: 123,
                    message: "Erro: Não foi possível executar a solicitação!"
                });
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
            tituloPgCont: "Contato",
            tituloFlCont: "Fale Conosco",
	        horAtend:"Segunda a Sexta: 08:30 às 12:00 e 13:30 às 18:00",
            tituloEnd: "Endereço.",
            logradouro: "Avenida Winston Churchill, 936",
            endereco: "Capão Raso - Curitiba",
            telefone: "(xx) xxxx-xxxx"
        };
        
        const infoContato = await InfoContato.findOne({});
        if(infoContato){
            return res.status(400).json({
                error: true,
                code: 126,
                message: "Erro: Inforção de contato já possui um registro!"
            });
        };

        const cadInfoContato = await InfoContato.create(dados, (err) => {
            if (err) return res.status(400).json({
                error: true,
                code: 127,
                message: "Error: Dados de informação de contato não foram cadastrado com sucesso!"
            });

            return res.json({
                error: false,
                message: "Dados de informação de contato cadastrado com sucesso!"
            });
        });
    };

    async update(req, res){

        const schema = Yup.object().shape({
            tituloPgCont: Yup.string().required(), 
            tituloFlCont: Yup.string().required(),
            horAtend: Yup.string().required(),
            tituloEnd: Yup.string().required(),
            logradouro: Yup.string().required(),
            endereco: Yup.string().required(),
            telefone: Yup.string().required()
        });

        if(!(await schema.isValid(req.body))){
            return res.status(400).json({
                error: true,
                code: 124,
                message: "Erro: Dados do formulário inválido!"
            });
        };

        await InfoContato.updateOne({}, req.body, (err) => {
            if(err) return res.status(400).json({
                error: true,
                message: "Erro: Informação de contato não foi editado com sucesso!"
            });
        });

        return res.json({
            error: false,
            message: "Informação de contato editado com sucesso!"
        });
    };
};

export default new InfoContatoController();