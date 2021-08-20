import * as Yup from 'yup';
import Sobre from '../models/Sobre';
import Rodape from '../models/Rodape';

class SobreController{
    async show(req, res){
        Sobre.findOne({}).then((sobre) => {
            Rodape.findOne({}).then((rodape) => {
                return res.json({
                    error: false,
                    sobre: sobre,
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
            tituloPgSobre: "Empresa",
            tituloSobre: "First featurette heading",
	        descSobre:"Donec ullamcorper nulla non metus auctor fringilla. Vestibulum id ligula porta felis euismod semper. Praesent commodo cursus magna, vel scelerisque nisl consectetur. Fusce dapibus, tellus ac cursus commodo."
        };
        
        const sobre = await Sobre.findOne({});
        if(sobre){
            return res.status(400).json({
                error: true,
                code: 126,
                message: "Erro: O sobre já possui um registro!"
            });
        };

        const cadSobre = await Sobre.create(dados, (err) => {
            if (err) return res.status(400).json({
                error: true,
                code: 127,
                message: "Error: Dados do sobre não foram cadastrado com sucesso!"
            });

            return res.json({
                error: false,
                message: "Dados do sobre cadastrado com sucesso!"
            });
        });
    };

    async update(req, res){
        const schema = Yup.object().shape({
            tituloPgSobre: Yup.string(), 
            tituloSobre: Yup.string(),
            descSobre: Yup.string()
        });

        if(!(await schema.isValid(req.body))){
            return res.status(400).json({
                error: true,
                code: 124,
                message: "Erro: Dados do formulário inválido!"
            });
        };

        await Sobre.updateOne({}, req.body, (err) => {
            if(err) return res.status(400).json({
                error: true,
                message: "Erro: Sobre não foi editado com sucesso!"
            });
        });

        return res.json({
            error: false,
            message: "Sobre editado com sucesso!"
        });
    };
};

export default new SobreController();