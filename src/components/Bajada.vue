<template>
  <v-card flat>
    <DialogoSolicitarUnidadBajada
      @guardar="onGuardarUnidad"
      :mostrar="dialogoUnidad"
      @cerrar="dialogoUnidad = false"
    ></DialogoSolicitarUnidadBajada>
    <v-btn
      color="primary"
      fab
      elevation="2"
      right
      bottom
      fixed
      @click="dialogoUnidad = true"
    >
      <v-icon>mdi-plus</v-icon>
    </v-btn>
    <div v-for="(unidad, i) in unidades" :key="i">
      <v-list-item
        two-line
        @click="eliminarUnidad(i, unidad)"
        style="background-color: orange"
      >
        <v-list-item-content>
          <v-list-item-title>
            <v-row>
              <v-col cols="3">
                <v-btn
                  style="border: 1px solid white !important"
                  class="white--text"
                  color="info"
                  depressed
                >
                  {{ unidad.unidad }}
                </v-btn>
              </v-col>
              <v-col cols="7">
                <p>
                  {{ unidad.hora }} |
                  <strong style="font-size: 1.2rem">
                    {{ unidad.transcurrido | milisegundosCortos }}
                  </strong>
                  <strong
                    style="margin-left: 10px; color: green; font-size: 1.4rem"
                    >{{
                      unidad.diferenciaConAnterior | milisegundosCortos
                    }}</strong
                  >
                </p>
              </v-col>
            </v-row>
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-divider></v-divider>
    </div>
  </v-card>
</template>

<script>
import UnidadesBajadaService from "../UnidadesBajadaService";
import Utiles from "../Utiles";
import DialogoSolicitarUnidadBajada from "./DialogoSolicitarUnidadBajada";
export default {
  name: "Bajada",
  components: { DialogoSolicitarUnidadBajada },
  data: () => ({
    unidades: [],
    dialogoUnidad: false,
  }),
  methods: {
    iniciarIntervalRefrescarTiempo() {
      clearInterval(this.idInterval);
      this.refrescarTiempoTranscurrido();
      this.idInterval = setInterval(() => {
        this.refrescarTiempoTranscurrido();
      }, 1000);
    },
    refrescarTiempoTranscurrido() {
      const fechaActualComoCadena = Utiles.formatearFechaActual();
      const fechaActual = new Date();
      for (const horario of this.unidades) {
        const fechaUltimoHorario = new Date(
          fechaActualComoCadena + "T" + horario.hora
        );
        horario.transcurrido = fechaActual - fechaUltimoHorario;
      }
      for (let i = 1; i < this.unidades.length; i++) {
        const tiempoA = this.unidades[i].hora;
        const tiempoB = this.unidades[i - 1].hora;
        let diferenciaGeneral = Utiles.restarHorarios(tiempoA, tiempoB);
        this.unidades[i].diferenciaConAnterior = diferenciaGeneral;
      }
    },
    async obtenerUnidades() {
      let unidades = await UnidadesBajadaService.obtener();
      unidades = unidades.map((unidad) => {
        unidad.transcurrido = "";
        unidad.diferenciaConAnterior = "";
        return unidad;
      });
      this.unidades = unidades;
    },
    async onGuardarUnidad(unidad) {
      this.dialogoUnidad = false;
      await UnidadesBajadaService.nueva(unidad);
      await this.obtenerUnidades();
    },
    async eliminarUnidad(indice, documento) {
      if (indice !== 0) {
        return;
      }
      if (!confirm("Seguro?")) {
        return;
      }
      await UnidadesBajadaService.eliminar(documento);
      await this.obtenerUnidades();
    },
  },
  async mounted() {
    await this.obtenerUnidades();
    this.iniciarIntervalRefrescarTiempo();
  },
};
</script>

<style>
.toasted.toasted-oculto {
  visibility: hidden;
}
</style>