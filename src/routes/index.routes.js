import { Router } from 'express';
import multer from "multer";
import path from "path";
import {v4 as uuid} from "uuid";
const router = Router();


//Directorio de almacenamiento del archivo y asignación de nombre-extención
const storedFile = multer.diskStorage({
    destination: path.join(__dirname, '../uploads/'),
    filename: (req,file,cb) => {
        cb(null, uuid() + path.extname(file.originalname).toLocaleLowerCase());
    }
});

//Carpeta donde se almacena, Directorio, limite y filtrado de archivos
const upload = multer({
    storage:storedFile,
    dest: path.join(__dirname, '../uploads/') ,
    limits: {
        fileSize: 8000000               // Se agrega el limite del archivo
    },
    fileFilter: (req,file,cb) => {
        const filetypes = /jpeg|jpg|png|gif/;
        const mimetype = filetypes.test(file.mimetype);
        const extname = filetypes.test(path.extname(file.originalname));
        if (mimetype && extname) {
           return cb(null, true);
        }
        cb('Error: El archivo debe ser una imagen');
    }
}).single('image');

router.post('/data', upload ,(req,res) => {
    const file = req.file;
    res.json({
        message: 'Archivo cargado',
        type: 'success'
    });
});

export default router;