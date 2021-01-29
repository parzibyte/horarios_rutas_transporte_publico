<template>
  <v-card flat>
    <DialogoAgregarHorario @guardado="onHorarioGuardado" :ruta="rutaSeleccionada" :mostrar="dialogoRegistrarHorario"
                           @cerrar="dialogoRegistrarHorario=false"></DialogoAgregarHorario>
    <div v-if="rutas.length > 0">
      <div v-for="(ruta, i) in rutas" :key="i">
        <v-list-item @click="registrarHorario(ruta)" three-line>
          <v-list-item-content>
            <v-list-item-title>
              <h5 class="text-h4">{{ ruta.nombre }}</h5>
              <div v-if="ruta.horario">
                <h5 class="text-h6">
                  <v-icon>mdi-clock-outline</v-icon>
                  {{ ruta.horario.hora }} |
                  Hace {{ ruta.transcurrido | milisegundosALegible }}
                </h5>
                <TipoTransporte :horario="ruta.horario"></TipoTransporte>
              </div>
              <div v-else><p>
                Sin información de horario. Toca para agregar
              </p></div>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-divider></v-divider>
      </div>
    </div>
    <div v-else>
      <v-alert
          class="mx-2 my-2"
          dense
          type="info"
      >
        Todavía no hay rutas. Ve a <strong>Rutas</strong> y agrega algunas
      </v-alert>
    </div>
    <v-snackbar top timeout="700" v-model="snackbar.mostrar">
      {{ snackbar.texto }}
    </v-snackbar>
    <v-btn
        color="primary"
        fab
        elevation="2"
        right
        bottom
        fixed
        @click="clickBoton()"
    >
      <v-icon v-show="pausado">mdi-play</v-icon>
      <v-icon v-show="!pausado">mdi-pause</v-icon>
    </v-btn>
  </v-card>

</template>

<script>
import RutasService from "@/RutasService";
import DialogoAgregarHorario from "@/components/DialogoAgregarHorario";
import HorariosService from "@/HorariosService";
import Utiles from "@/Utiles";
import TipoTransporte from "@/components/TipoTransporte";

export default {
  name: "Horarios",
  components: {TipoTransporte, DialogoAgregarHorario},
  data: () => ({
    snackbar: {
      texto: "",
      mostrar: false,
    },
    dialogoRegistrarHorario: false,
    rutas: [],
    rutaSeleccionada: {},
    idInterval: null,
    pausado: false,
  }),
  async mounted() {
    await this.obtenerRutas();
    this.iniciarIntervalRefrescarTiempo();
  },
  methods: {
    clickBoton() {
      if (this.pausado) {
        this.iniciarIntervalRefrescarTiempo();
        this.pausado = false;
      } else {
        clearInterval(this.idInterval);
        this.pausado = true;
      }
    },
    iniciarIntervalRefrescarTiempo() {
      clearInterval(this.idInterval);
      this.refrescarTiempoTranscurrido();
      this.idInterval = setInterval(() => {
        this.refrescarTiempoTranscurrido();
      }, 2000);
    },
    refrescarTiempoTranscurrido() {
      const fechaActualComoCadena = Utiles.formatearFechaActual();
      const fechaActual = new Date();
      for (const ruta of this.rutas) {
        if (!ruta.horario.hora) {
          ruta.transcurrido = "";
          continue;
        }
        const fechaUltimoHorario = new Date(fechaActualComoCadena + " " + ruta.horario.hora);
        ruta.transcurrido = fechaActual - fechaUltimoHorario;
      }
    },
    async onHorarioGuardado() {
      this.snackbar = {
        texto: "Horario guardado",
        mostrar: true,
      };
      await this.obtenerRutas();
      this.dialogoRegistrarHorario = false;
      this.$emit("actualizados");
    },
    registrarHorario(ruta) {
      this.rutaSeleccionada = ruta;
      this.dialogoRegistrarHorario = true;
    },
    async obtenerRutas() {
      const fechaActual = Utiles.formatearFechaActual();
      const rutas = await RutasService.obtener();
      for (const ruta of rutas) {
        ruta.horario = await HorariosService.obtenerUltimoHorarioRegistrado(fechaActual, ruta._id);
        ruta.transcurrido = 0;
      }
      this.rutas = rutas;
    }
  }
}
</script>
