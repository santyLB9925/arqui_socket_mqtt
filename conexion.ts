import {Client} from 'pg';

const conexionBd ={
  user: 'postgres',
  host: 'localhost',
  database: 'arqui3',
  password: 'awesome777rexomg',
  port: 5432,
}
export const client= new Client(conexionBd)