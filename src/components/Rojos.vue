<template>
  <v-card class="mx-1 my-1" flat>
    <v-btn
      color="primary"
      fab
      elevation="2"
      right
      bottom
      fixed
      @click="obtenerReporte()"
    >
      <v-icon>mdi-refresh</v-icon>
    </v-btn>
    <div v-for="(horario, i) in horarios" :key="i">
      <v-list-item two-line>
        <v-list-item-content>
          <v-list-item-title> </v-list-item-title>
          <v-row>
            <v-col cols="4" style="text-align: left">
              <TipoTransporte :horario="horario"></TipoTransporte>
              <strong style="font-size: 1.2rem">{{
                horario.nombreRuta
              }}</strong>
            </v-col>
            <v-col cols="8" style="font-size: 1rem">
              <v-icon>mdi-clock-outline</v-icon>
              {{ horario.hora }} |
              <strong style="font-size: 1.3rem">{{
                horario.tiempoGeneral | milisegundosConHoras
              }}</strong>
            </v-col>
          </v-row>
        </v-list-item-content>
      </v-list-item>
      <v-divider></v-divider>
    </div>
  </v-card>
</template>
<script>
import HorariosService from "../HorariosService";
import RutasService from "../RutasService";
import Constantes from "../Constantes";
import Utiles from "../Utiles";
import TipoTransporte from "./TipoTransporte";
let diccionario = {};
export default {
  components: { TipoTransporte },
  data: () => ({
    horarios: [],
    rutas: [],
  }),
  async mounted() {
    await this.obtenerRutas();
    await this.obtenerReporte();
  },
  methods: {
    obtenerNombreRutaSegunId(id) {
      return diccionario[id];
    },
    async obtenerRutas() {
      diccionario = {};
      const rutas = await RutasService.obtener();
      rutas.forEach((ruta) => {
        diccionario[ruta._id] = ruta.nombre;
      });
    },
    async obtenerReporte() {
      const horarios = await HorariosService.obtenerPorTipoUnidad(
        Constantes.TIPO_ROJO
      );

      horarios.reverse();
      horarios.forEach((horario) => {
        horario.nombreRuta = this.obtenerNombreRutaSegunId(horario.idRuta);
      });
      for (let i = horarios.length - 2; i >= 0; i--) {
        const tiempoA = horarios[i].hora;
        const tiempoB = horarios[i + 1].hora;
        let diferenciaGeneral = Utiles.restarHorarios(tiempoA, tiempoB);
        horarios[i].tiempoGeneral = diferenciaGeneral;
      }
      this.horarios = horarios;
    },
  },
};
</script>