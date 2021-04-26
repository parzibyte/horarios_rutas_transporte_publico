import db from "@/BaseDeDatos";
import Utiles from "@/Utiles";
import Constantes from "@/Constantes";

const HorariosService = {
    async obtenerPorTipoUnidad(tipoUnidad) {
        const horarios = await db.find({
            selector: {
                _id: {
                    $gte: Constantes.PREFIJO_HORARIOS,
                    $lte: Constantes.PREFIJO_HORARIOS + "\ufff0",
                },
                tipoUnidad,
                hora: {
                    $gte: null
                },
            },
        });
        return horarios.docs;
    },
    async obtenerPorTipoUnidadYNumero(tipoUnidad, numero) {
        const horarios = await db.find({
            selector: {
                _id: {
                    $gte: Constantes.PREFIJO_HORARIOS,
                    $lte: Constantes.PREFIJO_HORARIOS + "\ufff0",
                },
                tipoUnidad, numero,
                hora: {
                    $gte: null
                },
            },
        });
        return horarios.docs;
    },
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
            await db.remove(horario);
        }
    },
    async nuevo(idRuta, fecha, hora, tipoUnidad, numero) {
        return await db.put({
            _id: Utiles.idConSufijo(Constantes.PREFIJO_HORARIOS),
            idRuta, fecha, hora, tipoUnidad, numero
        });
    },

    async obtenerNumerosPorFechaRutaYTipoUnidad(fecha, idRuta, tipoUnidad) {
        const rutas = await db.find({
            selector: {
                _id: {
                    $gte: Constantes.PREFIJO_HORARIOS,
                    $lte: Constantes.PREFIJO_HORARIOS + "\ufff0",
                },
                fecha, idRuta, tipoUnidad,
                hora: {
                    $gte: null
                },
            },
        });
        return rutas.docs;
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
            sort: [{ "hora": "desc" }],
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
            sort: [{ "hora": "desc" }],
            limit: 2,
        });
        const docs = rutas.docs;
        if (docs.length <= 0) {
            return "";
        }
        return docs.splice(0, 2);
    },
    async eliminar(documento) {
        return await db.remove(documento);
    }
};
export default HorariosService;
