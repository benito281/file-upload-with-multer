import express from "express";
import indexRoute from './routes/index.routes';


//Setting
const app = express();
app.set('port', process.env.PORT || 3000);


//Middlewars
app.use(express.json());
//app.use(upload.single('image'));

//routes
app.use(indexRoute);

//static files
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/uploads'));        //Podemos acceder al archivo desde el navegador

//Server
app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
})