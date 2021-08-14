import db from "@/BaseDeDatos";
import Utiles from "@/Utiles";
import Constantes from "@/Constantes";

const UnidadesBajadaService = {
	async nueva(unidad) {
		const hora = Utiles.formatearHoraActual();
		return await db.put({
			_id: Utiles.idConSufijo(Constantes.PREFIJO_UNIDADES_BAJADA),
			unidad, hora
		});
	},
	async obtener() {
		const unidades = await db.find({
			selector: {
				_id: {
					$gte: Constantes.PREFIJO_UNIDADES_BAJADA,
					$lte: Constantes.PREFIJO_UNIDADES_BAJADA + "\ufff0",
				},
			}
		});
		return unidades.docs;
	},
	async eliminar(documento) {
		return await db.remove(documento);
	}
};
export default UnidadesBajadaService;
