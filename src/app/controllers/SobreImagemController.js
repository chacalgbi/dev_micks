import fs from 'fs';

class SobreImagemController{
    async update(re, res){
        return res.json({
            error: false,
            message: "Sobre Imagem Controller"
        });
    }
}

export default new SobreImagemController();