import multer from 'multer';
import crypto from 'crypto';
import {extname, resolve} from 'path';

export default{
    storage:
    multer.diskStorage({
        destination: function (req, file, cb) {
            console.log("Criar pasta");
            //cb(null, '/tmp');
          },
          filename: function (req, file, cb) {
            console.log("Salvou A Imagem 1");
            cb(null, file.fieldname + '-' + Date.now());
            console.log("Salvou A Imagem 2");
          }
    })
};