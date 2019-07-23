

import { Router, Request, Response } from 'express';
import {client}from '../conexion'
import cors from 'cors';

var corsOption={
  origin: 'http://192.168.43.159:8080',
  optionsSuccessStatus:200
}

const router = Router();

router.get('/alumnos',cors(corsOption),(req:Request,res:Response) => {
    client.query('SELECT * FROM alumno', (error, results) => {
      if (error) {
        throw error
      }
      res.status(200).json(results.rows)
    });
  })
router.get('/alumnos/:id',cors(corsOption),(req:Request,res:Response) => {
  const id= req.params.id;
    client.query('SELECT * FROM alumno WHERE id= $1',[id],(error, results) => {
      if (error) {
        throw error
      }
      res.status(200).json(results.rows)
    });
  })

router.get('/mensajes', (req: Request, res: Response) => {
    res.json({
        ok: true,
        mensaje: 'GET listo!'
    });
});

router.post('/mensajes', (req: Request, res: Response) => {

    const cuerpo = req.body.cuerpo;
    const de = req.body.de;

    res.json({
        ok: true,
        cuerpo,
        de
        // mensaje: 'POST listo!'
    });
});
router.post('/alumnos/registro',(req:Request, res:Response)=> {
 
    const nombre = req.body.nombre;
    const apellidoPaterno = req.body.apellidopaterno;
    const apellidoMaterno = req.body.apellidomaterno;
    const carrera = req.body.carrera;
    const matricula = req.body.matricula;
    const rfid = req.body.rfid;
    
      client.query('INSERT INTO alumno (nombre,apellidopaterno,apellidomaterno,carrera,matricula,rfid) VALUES ($1,$2,$3,$4,$5,$6)',[nombre,apellidoPaterno,apellidoMaterno,carrera,matricula,rfid],(error,results) => {
        if (error) {
          throw error
        }
        res.status(201).json({
          nombre,
          apellidoPaterno,
          apellidoMaterno,
          carrera,
          matricula,
          rfid
        })
        });
})
router.delete('/alumnos/eliminar/:id',cors(corsOption),(req:Request,res:Response) => {
  const id= req.params.id;
    client.query('DELETE FROM alumno WHERE id= $1',[id],(error, results) => {
      if (error) {
        throw error
      }
      res.status(200).send(`Se eliminó el id: ${id}`)
    });
  })

router.post('/mensajes/:id', (req: Request, res: Response) => {

    const cuerpo = req.body.cuerpo;
    const de = req.body.de;
    const id = req.params.id

    res.json({
        ok: true,
        cuerpo,
        de,
        id
        // mensaje: 'POST listo!'
    });
});

export default router;
