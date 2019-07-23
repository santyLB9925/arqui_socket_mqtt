import { Socket } from 'socket.io';
import { isObject } from 'util';





export const desconectar = (cliente: Socket) => {

    cliente.on('disconnect', () => {
        console.log('Cliente Desconectado');
    });

}

// Escuchar Mensajes
export const mensaje = (cliente: Socket, io: SocketIO.Server) => {
    cliente.on('mensaje', (payload: { de: string, cuerpo: string }) => {
        console.log('Mensaje Recibido', payload);
        io.emit('mensaje-nuevo', payload);
    });
}