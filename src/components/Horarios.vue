<template>
  <v-card flat>
    <DialogoAgregarHorario @guardado="onHorarioGuardado" :ruta="rutaSeleccionada" :mostrar="dialogoRegistrarHorario"
                           @cerrar="dialogoRegistrarHorario=false"></DialogoAgregarHorario>
    <v-row>
      <v-col style="padding: 0" cols="3" v-show="mostrarNotas">
        <div v-if="rutasTemporales.length > 0">
          <div v-for="(ruta, i) in rutasTemporales" :key="i">
            <v-list-item :style="{backgroundColor: ruta.marcada ? '#FF8F00' : 'white'}"
                         @click="ruta.marcada = !ruta.marcada" two-line>
              <v-list-item-content>
                <v-list-item-title>{{ ruta.nombre }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-divider></v-divider>
          </div>
        </div>
      </v-col>
      <v-col :cols="mostrarNotas ? 9 : 12">
        <div v-if="rutas.length > 0">
          <div v-for="(ruta, i) in rutas" :key="i">
            <v-list-item :style="{backgroundColor: ruta.color}" @click="registrarHorario(ruta)" three-line>
              <v-list-item-content>
                <v-list-item-title>
                  <h5 class="text-h4" style="">{{ ruta.nombre }}</h5>
                  <div v-if="ruta.horarios">
                    <v-row v-for="(horarioReal, clave) in ruta.horarios" :key="clave">
                      <v-col cols="4">
                        <TipoTransporte :horario="horarioReal"></TipoTransporte>
                      </v-col>
                      <v-col
                          cols="8"
                          :style="{backgroundColor: horarioReal.transcurrido >= rangoNotificacionInicio && horarioReal.transcurrido <= rangoNotificacionFin && clave === 0 && esRojo(horarioReal) ? 'white': 'inherit'}"
                          style="font-size: 1.2rem;"
                      >
                        <v-icon>mdi-clock-outline</v-icon>
                        {{ horarioReal.hora }} |
                        <strong style="font-size: 2rem;">{{ horarioReal.transcurrido | milisegundosCortos }}</strong>
                      </v-col>
                    </v-row>
                    <h5 class="text-h6">
                    </h5>
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
      </v-col>
      <v-btn
          color="primary"
          fab
          elevation="2"
          left
          bottom
          fixed
          @click="intercambiarVista()"
      >
        <v-icon>mdi-car-connected</v-icon>
      </v-btn>
    </v-row>

    <v-snackbar top timeout="700" v-model="snackbar.mostrar">
      {{ snackbar.texto }}
    </v-snackbar>
  </v-card>

</template>

<script>
import RutasService from "@/RutasService";
import DialogoAgregarHorario from "@/components/DialogoAgregarHorario";
import HorariosService from "@/HorariosService";
import Utiles from "@/Utiles";
import TipoTransporte from "@/components/TipoTransporte";
import Constantes from "@/Constantes";

export default {
  name: "Horarios",
  components: {TipoTransporte, DialogoAgregarHorario},
  data: () => ({
    rangoNotificacionInicio: 300000,
    rangoNotificacionFin: 420000,
    snackbar: {
      texto: "",
      mostrar: false,
    },
    mostrarNotas: false,
    dialogoRegistrarHorario: false,
    rutas: [],
    rutasTemporales: [
      {
        nombre: "TALZ",
        marcada: false,
      },
      {
        nombre: "CALI",
        marcada: false,
      },
      {
        nombre: "TEZO",
        marcada: false,
      },
      {
        nombre: "SOSA",
        marcada: false,
      },
      {
        nombre: "SANI",
        marcada: false,
      },
    ],
    rutaSeleccionada: {},
    idInterval: null,
    pausado: false,
  }),
  async mounted() {
    await this.obtenerRutas();
    this.iniciarIntervalRefrescarTiempo();
  },
  methods: {

    esRojo(horario) {
      return horario.tipoUnidad === Constantes.TIPO_ROJO;
    },
    intercambiarVista() {
      this.mostrarNotas = !this.mostrarNotas;
    },
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
      }, 5000);
    },
    refrescarTiempoTranscurrido() {
      const fechaActualComoCadena = Utiles.formatearFechaActual();
      const fechaActual = new Date();
      for (const ruta of this.rutas) {
        let indice = 0;
        for (const horario of ruta.horarios) {
          if (!horario.hora) {
            ruta.transcurrido = "";
            continue;
          }
          const fechaUltimoHorario = new Date(fechaActualComoCadena + " " + horario.hora);
          horario.transcurrido = fechaActual - fechaUltimoHorario;
          if (indice === 1) {
            horario.transcurrido = new Date(fechaActualComoCadena + " " + ruta.horarios[0].hora) - fechaUltimoHorario;
          }
          indice++;
        }
      }
    },
    async onHorarioGuardado() {
      this.snackbar = {
        texto: "Horario guardado",
        mostrar: true,
      };
      this.dialogoRegistrarHorario = false;
      this.$emit("actualizados");
      await this.obtenerRutas();
    },
    registrarHorario(ruta) {
      this.rutaSeleccionada = ruta;
      this.dialogoRegistrarHorario = true;
    },
    async obtenerRutas() {
      const fechaActual = Utiles.formatearFechaActual();
      const rutas = await RutasService.obtener();
      for (const ruta of rutas) {
        const horarios = await HorariosService.obtenerUltimoHorarioRegistrado(fechaActual, ruta._id);
        for (const horario of horarios) {
          horario.transcurrido = 0;
        }
        ruta.horarios = horarios;
        ruta.transcurrido = 0;
        ruta.marcada = false;
      }
      this.rutas = rutas;
    }
  }
}
</script>
