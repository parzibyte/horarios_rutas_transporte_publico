import db from "@/BaseDeDatos";
import Utiles from "@/Utiles";
import Constantes from "@/Constantes";
import HorariosService from "@/HorariosService";


const RutasService = {
    async nueva(nombre) {
        return await db.put({
            _id: Utiles.idConSufijo(Constantes.PREFIJO_RUTAS),
            nombre
        });
    },
    async obtener() {
        const rutas = await db.find({
            selector: {
                _id: {
                    $gte: Constantes.PREFIJO_RUTAS,
                    $lte: Constantes.PREFIJO_RUTAS + "\ufff0",
                }
            }
        });
        return rutas.docs;
    },
    async eliminar(documento) {
        await HorariosService.eliminarDeRuta(documento._id);
        return await db.remove(documento);
    }
};
export default RutasService;