import PouchDB from "pouchdb";
import PouchdbFind from 'pouchdb-find';

PouchDB.plugin(PouchdbFind);
const db = new PouchDB('rutas');
// Para poder ordenar por hora en los horarios
db.createIndex({
    index: {fields: ['hora']}
});
export default db;
