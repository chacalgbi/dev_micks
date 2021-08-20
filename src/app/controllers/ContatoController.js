import * as Yup from 'yup';
import Contato from '../models/Contato';

class ContatoController{

    async index(req, res) {
        const { page = 1 } = req.query;
        const { limit = 40 } = req.query;
        await Contato.paginate({}, { select: '_id nome email', page, limit }).then((contato) => {
            return res.json({
                error: false,
                contato: contato
            });
        }).catch((erro) => {
            return res.status(400).json({
                error: true,
                code: 106,
                message: "Erro: Não foi possível executar a solicitação!"
            });
        });
    };

    async show(req, res){
        Contato.findOne({ _id: req.params.id }).then((contato) => {
            return res.json({
                error: false,
                contato: contato
            });
        }).catch((err) => {
            return res.status(400).json({
                error: true,
                code: 107,
                message: "Erro: Não foi possível executar a solicitação!"
            })
        });
    };

    async store(req, res){

        const schema = Yup.object().shape({
            nome: Yup.string().required(), 
            email: Yup.string().email().required(),
            assuntoMsg: Yup.string().required(),
            msg: Yup.string().required()
        });

        if(!(await schema.isValid(req.body))){
            return res.status(400).json({
                error: true,
                code: 124,
                message: "Erro: Dados do formulário inválido!"
            });
        };

        const cadContato = await Contato.create(req.body, (err) => {
            if (err) return res.status(400).json({
                error: true,
                code: 127,
                message: "Error: Mensagem de contato não foi enviado com sucesso!"
            });

            return res.json({
                error: false,
                message: "Mensagem de contato enviado com sucesso!"
            });
        });
    };
    
    async update(req, res){

        const schema = Yup.object().shape({
            _id: Yup.string().required(),
            nome: Yup.string(), 
            email: Yup.string().email(),
            assuntoMsg: Yup.string(),
            msg: Yup.string()
        });

        if(!(await schema.isValid(req.body))){
            return res.status(400).json({
                error: true,
                code: 124,
                message: "Erro: Dados do formulário inválido!"
            });
        };

        await Contato.updateOne({ _id: req.body._id}, req.body, (err) => {
            if(err) return res.status(400).json({
                error: true,
                message: "Erro: Mensagem de contato não foi editado com sucesso!"
            });
        });

        return res.json({
            error: false,
            message: "Mensagem de contato editado com sucesso!"
        });
    };

    async delete(req, res) {
        const contatoExiste = await Contato.findOne({ _id: req.params.id });

        if (!contatoExiste) {
            return res.status(400).json({
                error: true,
                code: 104,
                message: "Erro: Mensagem de contato não encontrado"
            });
        };

        await Contato.deleteOne({ _id: req.params.id }, (err) => {
            if (err) return res.status(400).json({
                error: true,
                code: 105,
                message: "Error: Mensagem de contato não foi apagada!"
            });
        });

        return res.json({
            error: false,
            message: "Mensagem de contato apagado com sucesso!"
        });
    };
};

export default new ContatoController();