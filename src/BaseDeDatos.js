import PouchDB from "pouchdb";
import PouchdbFind from 'pouchdb-find';

PouchDB.plugin(PouchdbFind);
const db = new PouchDB('rutas');
export default db;
