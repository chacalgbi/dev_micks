import mongoose from 'mongoose';

const InfoContato = new mongoose.Schema({
    tituloPgCont: {
        type: String,
        required: true
    },
    tituloFlCont: {
        type: String,
        required: true
    },
    horAtend: {
        type: String,
        required: true
    },
    tituloEnd: {
        type: String,
        required: true
    },
    logradouro: {
        type: String,
        required: true
    },
    endereco: {
        type: String,
        required: true
    },
    telefone: {
        type: String,
        required: true
    }
},
{
    timestamps: true
});

export default mongoose.model('infocontato', InfoContato);