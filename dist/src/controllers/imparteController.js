"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.remove = exports.update = exports.getById = exports.getAll = exports.create = void 0;
const db_1 = require("../../db");
const create = (imparte, callback) => {
    const queryString = 'INSERT INTO imparte (id_p, cod_a, grupo, horario) VALUES (?, ?, ?, ?)';
    db_1.db.query(queryString, [imparte.id_p, imparte.cod_a, imparte.grupo, imparte.horario], (err) => {
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
};
exports.create = create;
const getAll = (callback) => {
    const queryString = 'SELECT * FROM imparte';
    db_1.db.query(queryString, (err, result) => {
        if (err) {
            callback(err);
        }
        const rows = result;
        const inparticiones = [];
        rows.forEach(row => {
            const imparte = {
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
};
exports.getAll = getAll;
const getById = (cod_e, callback) => {
    const queryString = 'SELECT * FROM imparte WHERE id_p = ?';
    db_1.db.query(queryString, [cod_e], (err, result) => {
        if (err) {
            callback(err);
        }
        const row = result[0];
        if (row) {
            const imparte = {
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
        }
        else {
            callback(null, {
                statusCode: 404,
                message: 'Inscripcion no encontrada'
            });
        }
    });
};
exports.getById = getById;
const update = (imparte, callback) => {
    const queryString = 'UPDATE imparte SET id_p = ?, cod_a = ?, grupo = ?, horario = ? WHERE id_p = ?';
    //id_p, cod_a, grupo, horario   //
    db_1.db.query(queryString, [imparte.id_p, imparte.cod_a, imparte.grupo, imparte.horario], (err) => {
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
};
exports.update = update;
const remove = (cod_e, callback) => {
    const queryString = 'DELETE FROM imparte WHERE cod_e = ?';
    db_1.db.query(queryString, [cod_e], (err) => {
        if (err) {
            callback(err);
        }
        callback(null, {
            statusCode: 200,
            message: 'Inscripcion eliminada exitosamente'
        });
    });
};
exports.remove = remove;
