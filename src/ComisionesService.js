import db from "@/BaseDeDatos";
import Utiles from "@/Utiles";
import Constantes from "@/Constantes";


const ComisionesService = {
    async nueva(numero, comision) {
        comision = parseFloat(comision);
        return await db.put({
            _id: Utiles.idConSufijo(Constantes.PREFIJO_COMISIONES),
            numero, comision
        });
    },
    async obtener() {
        const comisiones = await db.find({
            selector: {
                _id: {
                    $gte: Constantes.PREFIJO_COMISIONES,
                    $lte: Constantes.PREFIJO_COMISIONES + "\ufff0",
                },
            }
        });
        return comisiones.docs;
    },
    async eliminarTodas() {
        const comisiones = await ComisionesService.obtener();
        for (const comision of comisiones) {
            await db.remove(comision);
        }
    }
};
export default ComisionesService;
