
import Server from './classes/server';
import { SERVER_PORT } from './global/environment';
import router from './routes/router';
import bodyParser from 'body-parser';
import cors from 'cors';
//import {Client} from 'pg';
const server = Server.instance;



server.app.use(bodyParser.urlencoded({ extended: true}));
server.app.use(bodyParser.json());

//Rutas de Servicio
server.app.use('/',router);

//Configuración de los cors
server.app.use(cors({origin: true, credentials:false}));




server.start(()=>{
    console.log(`Servidor Corriendo en el puerto ${SERVER_PORT}`);
})

