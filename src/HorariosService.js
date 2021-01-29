import db from "@/BaseDeDatos";
import Utiles from "@/Utiles";

const PREFIJO = "horarios";

const HorariosService = {
    async nuevo(idRuta, fecha, hora, tipoUnidad, numero) {
        return await db.put({
            _id: Utiles.idConSufijo(PREFIJO),
            idRuta, fecha, hora, tipoUnidad, numero
        });
    },
    async obtenerPorFechaEIdRuta(fecha, idRuta) {
        const rutas = await db.find({
            selector: {
                _id: {
                    $gte: PREFIJO,
                    $lte: PREFIJO + "\ufff0",
                },
                fecha, idRuta,
            },
        });
        return rutas.docs;
    },
    async obtenerUltimoHorarioRegistrado(fecha, idRuta) {
        const rutas = await db.find({
            selector: {
                _id: {
                    $gte: PREFIJO,
                    $lte: PREFIJO + "\ufff0",
                },
                fecha, idRuta,
                hora: {
                    $gt: null,//null es menor que todas las cosas
                }
            },
            sort: [{"hora": "desc"}],
            limit: 1,
        });
        const docs = rutas.docs;
        if (docs.length <= 0) {
            return "";
        }
        return docs[0];
    },
    async eliminar(documento) {
        return await db.remove(documento);
    }
};
export default HorariosService;
