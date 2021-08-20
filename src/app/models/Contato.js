import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const Contato = new mongoose.Schema({
    nome: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    assuntoMsg: {
        type: String,
        required: true
    },
    msg: {
        type: String,
        required: true
    }
},
    {
        timestamps: true
    });

Contato.plugin(mongoosePaginate);

export default mongoose.model('contato', Contato);