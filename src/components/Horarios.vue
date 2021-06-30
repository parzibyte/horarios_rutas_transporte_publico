<template>
  <v-card flat>
    <DialogoAgregarHorario
      @guardado="onHorarioGuardado"
      :ruta="rutaSeleccionada"
      :mostrar="dialogoRegistrarHorario"
      @cerrar="dialogoRegistrarHorario = false"
    ></DialogoAgregarHorario>
    <v-row>
      <v-col style="padding: 0" cols="2" v-show="mostrarNotas">
        <div v-if="rutasTemporales.length > 0">
          <div
            @click="clickRutaTemporal(ruta)"
            v-for="(ruta, i) in rutasTemporales"
            :key="i"
          >
            <v-list-item
              :style="{ backgroundColor: ruta.marcada ? '#FF8F00' : 'white' }"
              two-line
            >
              <v-list-item-content>
                <v-list-item-title style="font-size: 0.77rem">
                  <strong>{{ ruta.nombre }}<br />{{ ruta.sufijo }}</strong>
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-divider></v-divider>
          </div>
        </div>
      </v-col>
      <v-col :cols="mostrarNotas ? 10 : 12">
        <div v-if="rutas.length > 0">
          <div v-for="(ruta, i) in rutas" :key="i">
            <v-list-item
              :style="{ backgroundColor: ruta.color }"
              @click="registrarHorario(ruta, i)"
              three-line
            >
              <v-list-item-content style="padding: 0; margin: 0">
                <v-list-item-title>
                  <h5
                    class="text-h4"
                    style="text-align: right; margin-bottom: 10px"
                  >
                    {{ ruta.nombre }}
                  </h5>
                  <div v-if="ruta.horarios">
                    <v-row
                      v-for="(horarioReal, clave) in ruta.horarios"
                      :key="clave"
                    >
                      <template v-if="clave === 0">
                        <v-col
                          style="
                            padding-bottom: 0 !important;
                            padding-top: 0 !important;
                            margin: 0 !important;
                          "
                          cols="3"
                        >
                          <TipoTransporte
                            :horario="horarioReal"
                            v-if="clave === 0"
                          ></TipoTransporte>
                        </v-col>
                        <v-col
                          style="
                            padding-bottom: 0 !important;
                            padding-top: 0 !important;
                            margin: 0 !important;
                            font-size: 1.2rem;
                          "
                          cols="9"
                          :style="{
                            backgroundColor:
                              horarioReal.transcurrido >=
                                rangoNotificacionInicio &&
                              horarioReal.transcurrido <=
                                rangoNotificacionFin &&
                              clave === 0 &&
                              esRojo(horarioReal)
                                ? 'white'
                                : 'inherit',
                          }"
                        >
                          {{ horarioReal.hora }} |
                          <strong
                            :style="{
                              fontSize: clave === 0 ? '1.5rem' : '1.2rem',
                            }"
                            >{{
                              horarioReal.transcurrido | milisegundosCortos
                            }}</strong
                          >
                        </v-col>
                      </template>
                      <template v-else>
                        <v-col
                          cols="12"
                          style="
                            padding-top: 0 !important;
                            padding-bottom: 0 !important;
                            text-align: right;
                          "
                        >
                          <p>
                            Se llevó
                            <strong>{{
                              horarioReal.transcurrido | milisegundosCortos
                            }}</strong>
                            de
                            <span
                              :style="{
                                backgroundColor: esRojo(horarioReal)
                                  ? 'red'
                                  : 'inherit',
                                border: esRojo(horarioReal)
                                  ? '1px solid white'
                                  : 'none',
                              }"
                              >{{ horarioReal.tipoUnidad }}:<strong>{{
                                horarioReal.numero
                              }}</strong></span
                            >
                          </p>
                        </v-col>
                      </template>
                    </v-row>
                  </div>
                  <div v-else>
                    <p>Sin información de horario. Toca para agregar</p>
                  </div>
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-divider></v-divider>
          </div>
        </div>
        <div v-else>
          <v-alert class="mx-2 my-2" dense type="info">
            Todavía no hay rutas. Ve a <strong>Rutas</strong> y agrega algunas
          </v-alert>
        </div>
      </v-col>
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
  components: { TipoTransporte, DialogoAgregarHorario },
  data: () => ({
    ultimoIndice: null,
    rangoNotificacionInicio: 360000, // 6 minutos (1000 milisegundos * 60 segundos * 6 minutos)
    rangoNotificacionFin: 420000, // 6 minutos
    snackbar: {
      texto: "",
      mostrar: false,
    },
    mostrarNotas: true,
    dialogoRegistrarHorario: false,
    rutas: [],
    rutasTemporales: [
      {
        nombre: "  ",
        marcada: false,
        sufijo: "",
      },

      {
        nombre: "TALZ",
        marcada: false,
        sufijo: "",
      },
      {
        nombre: "TEZO",
        marcada: false,
        sufijo: "",
      },
      {
        nombre: "CALI",
        marcada: false,
        sufijo: "",
      },

      {
        nombre: "SOSA",
        marcada: false,
        sufijo: "",
      },
      {
        nombre: "SANI",
        marcada: false,
        sufijo: "",
      },

      {
        nombre: "TALZ",
        marcada: false,
        sufijo: "",
      },
      {
        nombre: "TEZO",
        marcada: false,
        sufijo: "",
      },
      {
        nombre: "CALI",
        marcada: false,
        sufijo: "",
      },
      {
        nombre: "SOSA",
        marcada: false,
        sufijo: "",
      },
      {
        nombre: "SANI",
        marcada: false,
        sufijo: "",
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
    clickRutaTemporal(ruta) {
      ruta.marcada = !ruta.marcada;
      if (ruta.marcada) {
        ruta.sufijo = prompt("Ingresa el texto: ");
      } else {
        ruta.sufijo = "";
      }
    },
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
      }, 1000);
    },
    refrescarTiempoTranscurrido() {
      const fechaActualComoCadena = Utiles.formatearFechaActual();
      const fechaActual = new Date();
      for (const ruta of this.rutas) {
        let indice = 0;
        for (const horario of ruta.horarios) {
          horario.mostrarNotificacion = true;
          if (!horario.hora) {
            ruta.transcurrido = "";
            continue;
          }
          const fechaUltimoHorario = new Date(
            fechaActualComoCadena + "T" + horario.hora
          );
          horario.transcurrido = fechaActual - fechaUltimoHorario;
          if (indice === 1) {
            horario.transcurrido =
              new Date(fechaActualComoCadena + "T" + ruta.horarios[0].hora) -
              fechaUltimoHorario;
          }
          if (indice === 0) {
            if (
              horario.transcurrido >= this.rangoNotificacionInicio &&
              horario.transcurrido <= this.rangoNotificacionFin &&
              !horario.notificacionMostrada &&
              this.esRojo(horario)
            ) {
              const nombreRuta = ruta.nombre;
              const tipoUnidad = horario.tipoUnidad;
              const numero = horario.numero;
              const aviso = `${nombreRuta} ${tipoUnidad} ${numero}`;
              this.$toasted.show(aviso, {
                // theme: "outline",
                position: "bottom-center",
                duration: null,
              });
              horario.notificacionMostrada = true;
            } else if (
              horario.transcurrido > this.rangoNotificacionFin &&
              this.esRojo(horario)
            ) {
              horario.notificacionMostrada = false;
            }
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
      // this.$emit("actualizados");
      this.colocarHorarioARuta(this.ultimoIndice);
    },
    registrarHorario(ruta, indice) {
      this.ultimoIndice = indice;
      this.rutaSeleccionada = ruta;
      this.dialogoRegistrarHorario = true;
    },
    async colocarHorarioARuta(indice) {
      const fechaActual = Utiles.formatearFechaActual();
      const horarios = await HorariosService.obtenerUltimoHorarioRegistrado(
        fechaActual,
        this.rutas[indice]._id
      );
      for (const horario of horarios) {
        horario.transcurrido = 0;
      }
      this.rutas[indice].horarios = horarios;
    },
    async obtenerRutas() {
      const fechaActual = Utiles.formatearFechaActual();
      const rutas = await RutasService.obtener();
      for (const ruta of rutas) {
        const horarios = await HorariosService.obtenerUltimoHorarioRegistrado(
          fechaActual,
          ruta._id
        );
        for (const horario of horarios) {
          horario.transcurrido = 0;
        }
        ruta.horarios = horarios;
        ruta.transcurrido = 0;
        ruta.marcada = false;
      }
      this.rutas = rutas;
    },
  },
};
</script>
