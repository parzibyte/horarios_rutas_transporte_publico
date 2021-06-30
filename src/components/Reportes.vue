<template>
  <v-card style="background-color: #18ffff; margin: 0 40px 0 40px" flat>
    <v-select
      @change="obtenerHorariosConFechaYRutaSeleccionada()"
      :items="rutas"
      item-text="nombre"
      item-value="_id"
      label="Ruta"
      v-model="rutaSeleccionada"
      no-data-text="No has registrado ninguna ruta"
    >
      <template v-slot:item="{ item }">
        <h1 style="min-width: 100%; padding: 10px;" :style="{ backgroundColor: item.color }">{{ item.nombre }}</h1>
      </template>
    </v-select>
    <div v-if="horarios.length > 0">
      <v-row justify="center">
        <h6 class="text-h5 mb-2">
          Promedio R3: {{ promedios.combi | milisegundosCortos }}
        </h6>
      </v-row>
      <v-divider></v-divider>
      <div v-for="(horario, i) in horarios" :key="i">
        <v-list-item two-line>
          <v-list-item-content>
            <v-list-item-title> </v-list-item-title>
            <v-row>
              <v-col cols="4" style="text-align: right">
                <TipoTransporte :horario="horario"></TipoTransporte>
              </v-col>
              <v-col cols="8" style="font-size: 1rem">
                <v-icon>mdi-clock-outline</v-icon>
                {{ horario.hora }} |
                <strong style="font-size: 1.3rem">{{
                  horario.tiempoGeneral | milisegundosCortos
                }}</strong>
              </v-col>
            </v-row>
          </v-list-item-content>
        </v-list-item>
        <v-divider></v-divider>
      </div>
    </div>
    <div v-else>
      <v-alert type="info">
        No hay horarios para la fecha y ruta seleccionados
      </v-alert>
    </div>
  </v-card>
</template>

<script>
import RutasService from "@/RutasService";
import Utiles from "@/Utiles";
import HorariosService from "@/HorariosService";
import TipoTransporte from "@/components/TipoTransporte";
import Constantes from "@/Constantes";

export default {
  name: "Reportes",
  components: { TipoTransporte },
  data: () => ({
    fechaSeleccionada: "",
    rutas: [],
    modal: false,
    rutaSeleccionada: "",
    horarios: [],
    promedios: {
      rojo: "",
      combi: "",
      general: "",
    },
    TIPO_COMBI: Constantes.TIPO_COMBI,
  }),
  async mounted() {
    await this.obtenerRutas();
    this.fechaSeleccionada = Utiles.formatearFechaActual();
    // await this.refrescarTodo();
  },
  methods: {
    async refrescarTodo() {
      await this.obtenerRutas();
      if (this.rutas.length > 0) {
        this.rutaSeleccionada = this.rutas[0]._id;
      }
      await this.obtenerHorariosConFechaYRutaSeleccionada();
    },
    async obtenerRutas() {
      this.rutas = await RutasService.obtener();
    },
    async obtenerHorariosConFechaYRutaSeleccionada() {
      if (!this.fechaSeleccionada || !this.rutaSeleccionada) {
        return;
      }
      const horarios = await HorariosService.obtenerPorFechaEIdRuta(
        this.fechaSeleccionada,
        this.rutaSeleccionada
      );
      if (horarios.length > 0) {
        let ultimaHoraRojo = "";
        let ultimaHoraCombi = "";
        let sumatoriaRojo = 0;
        let sumatoriaCombi = 0;
        let sumatoriaGeneral = 0;
        let contadorRojo = 0;
        let contadorCombi = 0;
        if (horarios[horarios.length - 1].tipoUnidad === Constantes.TIPO_ROJO) {
          ultimaHoraRojo = horarios[horarios.length - 1].hora;
        } else {
          ultimaHoraCombi = horarios[horarios.length - 1].hora;
        }

        for (let i = horarios.length - 2; i >= 0; i--) {
          const tiempoA = horarios[i].hora;
          const tiempoB = horarios[i + 1].hora;
          let diferenciaGeneral = Utiles.restarHorarios(tiempoA, tiempoB);
          sumatoriaGeneral += diferenciaGeneral;
          horarios[i].tiempoGeneral = diferenciaGeneral;
          if (horarios[i].tipoUnidad === Constantes.TIPO_ROJO) {
            if (ultimaHoraRojo) {
              let diferencia = Utiles.restarHorarios(tiempoA, ultimaHoraRojo);
              sumatoriaRojo += diferencia;
              contadorRojo++;
              horarios[i].tiempoMismoTipo = diferencia;
            }
            ultimaHoraRojo = tiempoA;
          } else {
            if (ultimaHoraCombi) {
              let diferencia = Utiles.restarHorarios(tiempoA, ultimaHoraCombi);
              sumatoriaCombi += diferencia;
              contadorCombi++;
              horarios[i].tiempoMismoTipo = diferencia;
            }
            ultimaHoraCombi = tiempoA;
          }
        }
        this.promedios.general = sumatoriaGeneral / (horarios.length - 1);
        this.promedios.rojo = sumatoriaRojo / contadorRojo;
        this.promedios.combi = sumatoriaCombi / contadorCombi;
      }
      this.horarios = horarios;
    },
  },
};
</script>
