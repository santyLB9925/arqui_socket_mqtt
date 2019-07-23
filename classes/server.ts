import express from 'express';
import { SERVER_PORT } from '../global/environment';
import socketIO from 'socket.io';
import http from 'http';
import {client} from '../conexion'

import * as socket from '../sockets/socket';

export default class Server {
    
   
    private static _instance: Server;

    public app: express.Application;
    public port: number;
    public valor:String | undefined;
    public io: socketIO.Server;
    private httpServer: http.Server;
    
    private constructor() {
        
      
        this.app = express();
        this.port = SERVER_PORT;

        this.httpServer = new http.Server(this.app);
        this.io = socketIO(this.httpServer);

        this.escucharSockets();
    }
    

    public static get instance() {
        
        return this._instance || (this._instance = new this())
    }
    private conectarBd(){
     client.connect();
        }
    private escucharSockets() {
       
        console.log('Escuchando conexiones - sockets');

        this.io.on('connection', cliente => {
          //  console.log(cliente);
          //  this.conectarBd();

            // Mensajes
            socket.mensaje(cliente, this.io);

            cliente.on('hola',data=>{
                this.valor=data['con']
                console.log(this.valor)
                
            })
           
            // Desconectar
           // socket.desconectar(cliente);
           
        });



    }

    start(callback: Function) {
        this.conectarBd();
        this.httpServer.listen(this.port, callback)
    }

}