import mongoose from 'mongoose';

const Rodape = new mongoose.Schema({
    tituloPg: {
        type: String,
        required: true
    },
    tituloCont: {
        type: String,
        required: true
    },
    telCont: {
        type: String,
        required: true
    },
    endCont: {
        type: String,
        required: true
    },
    cnpjCont: {
        type: String,
        required: true
    },
    tituloRedSoc: {
        type: String,
        required: true
    },
    instTitulo: {
        type: String,
        required: true
    },
    instLink: {
        type: String,
        required: true
    },
    facTitulo: {
        type: String,
        required: true
    },
    facLink: {
        type: String,
        required: true
    },
    youtubeTitulo: {
        type: String,
        required: true
    },
    youtubeLink: {
        type: String,
        required: true
    },
    twiterTitulo: {
        type: String,
        required: true
    },
    twiterLink: {
        type: String,
        required: true
    },
},
{
    timestamps: true
});

export default mongoose.model('rodape', Rodape);