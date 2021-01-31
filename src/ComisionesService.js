import db from "@/BaseDeDatos";
import Utiles from "@/Utiles";
import Constantes from "@/Constantes";


const ComisionesService = {
    async nueva(numero, comision, fecha) {
        return await db.put({
            _id: Utiles.idConSufijo(Constantes.PREFIJO_COMISIONES),
            numero, comision, fecha
        });
    },
    async obtener(fecha) {
        const comisiones = await db.find({
            selector: {
                _id: {
                    $gte: Constantes.PREFIJO_COMISIONES,
                    $lte: Constantes.PREFIJO_COMISIONES + "\ufff0",
                },
                fecha,
            }
        });
        return comisiones.docs;
    },
    async eliminar(documento) {
        return await db.remove(documento);
    }
};
export default ComisionesService;
