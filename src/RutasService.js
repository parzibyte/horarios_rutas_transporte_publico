import db from "@/BaseDeDatos";
import Utiles from "@/Utiles";

const PREFIJO = "rutas";

const RutasService = {
    async nueva(nombre) {
        return await db.put({
            _id: Utiles.idConSufijo(PREFIJO),
            nombre
        });
    },
    async obtener() {
        const rutas = await db.find({
            selector: {
                _id: {
                    $gte: PREFIJO,
                    $lte: PREFIJO + "\ufff0",
                }
            }
        });
        return rutas.docs;
    },
    async eliminar(documento) {
        return await db.remove(documento);
    }
};
export default RutasService;