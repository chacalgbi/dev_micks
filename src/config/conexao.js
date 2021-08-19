import mongoose from 'mongoose';

class DataBase{
    constructor(){
        this.mongoDataBase();
    }
    mongoDataBase(){
        mongoose.connect('mongodb://localhost:27017/micks', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }).then(()=>{
            console.log("Conexão realizada com sucesso");
        }).catch((erro)=>{
            console.log("Não foi possível conectar. " + erro)
        });
    }
}

export default new DataBase();