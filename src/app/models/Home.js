import mongoose from 'mongoose';

const Home = new mongoose.Schema({
    tituloTopo:{
        type: String,
        //required: true
    },
    descTopo:{
        type: String,
    },
    tituloBtnTopo:{
        type: String,
    },
    linkBtnTopo:{
        type: String
    },
    tituloServ:{
        type: String,
    },
    descServ:{
        type: String
    },
    iconeUmServ:{
        type: String
    },
    iconeDoisServ:{
        type: String
    },
    iconeTresServ:{
        type: String
    },
    tituloVideo:{
        type: String
    },
    descTituloVideo:{
        type: String
    },
    embedVideo:{
        type: String
    },
    tituloProj:{
        type: String
    },
    iconeUmProj:{
        type: String
    },
    tituloUmProj:{
        type: String
    },
    descUmProj:{
        type: String
    },
    iconeDoisProj:{
        type: String
    },
    tituloDoisProj:{
        type: String
    },
    descDoisProj:{
        type: String
    },
    iconeTresProj:{
        type: String
    },
    tituloTresProj:{
        type: String
    },
    descTresProj:{
        type: String
    },
    iconeQuatroProj:{
        type: String
    },
    tituloQuatroProj:{
        type: String
    },
    descQuatroProj:{
        type: String
    }
},{
    timestamps: true
});

export default mongoose.model('home', Home);