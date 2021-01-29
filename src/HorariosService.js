import db from "@/BaseDeDatos";
import Utiles from "@/Utiles";
import Constantes from "@/Constantes";

const HorariosService = {
    async eliminarDeRuta(idRuta) {
        const horarios = await db.find({
            selector: {
                _id: {
                    $gte: Constantes.PREFIJO_HORARIOS,
                    $lte: Constantes.PREFIJO_HORARIOS + "\ufff0",
                },
                idRuta,
            }
        });
        for (const horario of horarios.docs) {
            console.log("Eliminando");
            console.log(horario);
            await db.remove(horario);
        }
    },
    async nuevo(idRuta, fecha, hora, tipoUnidad, numero) {
        return await db.put({
            _id: Utiles.idConSufijo(Constantes.PREFIJO_HORARIOS),
            idRuta, fecha, hora, tipoUnidad, numero
        });
    },
    async obtenerPorFechaEIdRuta(fecha, idRuta) {
        const rutas = await db.find({
            selector: {
                _id: {
                    $gte: Constantes.PREFIJO_HORARIOS,
                    $lte: Constantes.PREFIJO_HORARIOS + "\ufff0",
                },
                fecha, idRuta,
                hora: {
                    $gte: null
                },
            },
            sort: [{"hora": "desc"}],
        });
        return rutas.docs;
    },
    async obtenerUltimoHorarioRegistrado(fecha, idRuta) {
        const rutas = await db.find({
            selector: {
                _id: {
                    $gte: Constantes.PREFIJO_HORARIOS,
                    $lte: Constantes.PREFIJO_HORARIOS + "\ufff0",
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
