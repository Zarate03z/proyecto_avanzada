import { Inscribe } from '../models/inscribeModel';
import { db } from '../../db';
import { OkPacket, RowDataPacket } from 'mysql2';

export const create = (inscribe: Inscribe, callback: Function) => {
    const queryString = 'INSERT INTO inscribe (cod_e, cod_a, id_p, grupo, n1, n2, n3) VALUES (?, ?, ?, ?, ?, ?, ?)';
    db.query(queryString, [inscribe.cod_e, inscribe.cod_a, inscribe.id_p, inscribe.grupo, inscribe.n1, inscribe.n2, inscribe.n3], (err) => {
        if (err) {
            callback(err);
        }
        //const insertId = (<OkPacket>result).insertId;
        //callback(null, insertId);
        callback(null, {
            statusCode: 201,
            message: 'Inscripcion creada exitosamente',
            data: {
                cod_e: inscribe.cod_e
            }
        });
    });
}
export const getAll = (callback: Function) => {
    const queryString = 'SELECT * FROM inscribe';
    db.query(queryString, (err, result) => {
        if (err) {
            callback(err);
        }
        const rows = <RowDataPacket[]>result;
        const inscripciones: Inscribe[] = [];
        rows.forEach(row => {
            const inscribe: Inscribe = {
                cod_e: row.cod_e,
                cod_a: row.cod_a,
                id_p: row.id_p,
                grupo: row.grupo,
                n1: row.n1,
                n2: row.n2,
                n3: row.n3
            };
            inscripciones.push(inscribe);
        });
        callback(null, {
            statusCode: 200,
            message: 'Inscripciones obtenidas exitosamente',
            data: result
        });
    });
}

export const getById = (cod_e: number, callback: Function) => {
    const queryString = 'SELECT * FROM inscribe WHERE cod_e = ?';
    db.query(queryString, [cod_e], (err, result) => {
        if (err) {
            callback(err);
        }
        const row = (<RowDataPacket[]>result)[0];
        if (row) {
            const inscribe: Inscribe = {
                cod_e: row.cod_e,
                cod_a: row.cod_a,
                id_p: row.id_p,
                grupo: row.grupo,
                n1: row.n1,
                n2: row.n2,
                n3: row.n3
            };
            callback(null, {
                statusCode: 200,
                message: 'Inscripcion obtenida exitosamente',
                data: inscribe
            });
        } else {
            callback(null, {
                statusCode: 404,
                message: 'Inscripcion no encontrada'
            });
        }
    });
}

export const update = (inscribe: Inscribe, callback: Function) => {
    const queryString = 'UPDATE inscribe SET cod_a = ?, id_p = ?, grupo = ?, n1 = ?, n2 = ?, n3 = ? WHERE cod_e = ?';
    db.query(
        queryString, 
        [inscribe.cod_a, inscribe.id_p, inscribe.grupo, inscribe.n1, inscribe.n2, inscribe.n3, inscribe.cod_e], (err) => {
        if (err) {
            callback(err);
        }
        callback(null, {
            statusCode: 200,
            message: 'Inscripcion actualizada exitosamente',
            data: {
                cod_e: inscribe.cod_e
            }
        });
    });
}

export const remove = (cod_e: number, callback: Function) => {
    const queryString = 'DELETE FROM inscribe WHERE cod_e = ?';
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