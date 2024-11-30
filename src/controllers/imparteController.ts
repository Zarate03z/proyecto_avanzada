import { imparte } from '../models/imparteModel';
import { db } from '../../db';
import { OkPacket, RowDataPacket } from 'mysql2';

export const create = (imparte: imparte, callback: Function) => {
    const queryString = 'INSERT INTO imparte (id_p, cod_a, grupo, horario) VALUES (?, ?, ?, ?)';
    db.query(queryString, [imparte.id_p, imparte.cod_a, imparte.grupo, imparte.horario], (err) => {
        if (err) {
            callback(err);
        }
        //const insertId = (<OkPacket>result).insertId;
        //callback(null, insertId);
        callback(null, {
            statusCode: 201,
            message: 'Inscripcion creada exitosamente',
            data: {
                id_p: imparte.id_p
            }
        });
    });
}
export const getAll = (callback: Function) => {
    const queryString = 'SELECT * FROM imparte';
    db.query(queryString, (err, result) => {
        if (err) {
            callback(err);
        }
        const rows = <RowDataPacket[]>result;
        const inparticiones: imparte[] = [];
        rows.forEach(row => {
            const imparte: imparte = {
                id_p: row.cod_e,
                cod_a: row.cod_a,
                grupo: row.id_p,
                horario: row.grupo
            };
            inparticiones.push(imparte);
        });
        callback(null, {
            statusCode: 200,
            message: 'inparticiones obtenidas exitosamente',
            data: result
        });
    });
}

export const getById = (cod_e: number, callback: Function) => {
    const queryString = 'SELECT * FROM imparte WHERE id_p = ?';
    db.query(queryString, [cod_e], (err, result) => {
        if (err) {
            callback(err);
        }
        const row = (<RowDataPacket[]>result)[0];
        if (row) {
            const imparte: imparte = {
                id_p: row.cod_e,
                cod_a: row.cod_a,
                grupo: row.id_p,
                horario: row.grupo
            };
            callback(null, {
                statusCode: 200,
                message: 'Inscripcion obtenida exitosamente',
                data: imparte
            });
        } else {
            callback(null, {
                statusCode: 404,
                message: 'Inscripcion no encontrada'
            });
        }
    });
}

export const update = (imparte: imparte, callback: Function) => {
    const queryString = 'UPDATE imparte SET id_p = ?, cod_a = ?, grupo = ?, horario = ? WHERE id_p = ?';
    //id_p, cod_a, grupo, horario   //
    db.query(
        queryString, 
        [imparte.id_p, imparte.cod_a, imparte.grupo, imparte.horario], (err) => {
        if (err) {
            callback(err);
        }
        callback(null, {
            statusCode: 200,
            message: 'Inscripcion actualizada exitosamente',
            data: {
                cod_e: imparte.id_p
            }
        });
    });
}

export const remove = (cod_e: number, callback: Function) => {
    const queryString = 'DELETE FROM imparte WHERE cod_e = ?';
    db.query(queryString, [cod_e], (err) => {
        if (err) {
            callback(err);
        }
        callback(null, {
            statusCode: 200,
            message: 'Inscripcion eliminada exitosamente'
        });
    });
}