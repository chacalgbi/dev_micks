import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const User = new mongoose.Schema({
    nome:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    senha:{
        type: String,
        required: true
    },
    cpf:{
        type: String
    },
    telefone:{
        type: String,
        required: true
    },
    endereco:{
        type: String
    },
    cidade:{
        type: String
    }
},{
    timestamps: true
});

User.plugin(mongoosePaginate);

export default mongoose.model('user', User);