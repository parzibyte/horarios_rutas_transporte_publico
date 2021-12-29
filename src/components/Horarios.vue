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
              :style="{
                backgroundColor: ruta.marcada ? colorRutaTemporal : 'white',
              }"
              two-line
            >
              <v-list-item-content>
                <v-list-item-title style="font-size: 0.7rem">
                  <strong>{{ ruta.nombre }}<br />{{ ruta.sufijo }}</strong>
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-divider></v-divider>
          </div>
        </div>
        <v-btn
          v-for="(horario, indice) in horariosRojosParteInferior"
          :key="indice"
          style="border: 1px solid white !important; display: block"
          :style="{ backgroundColor: horario.colorRuta }"
          class="white--text"
          depressed
        >
          {{ horario.numero }}
        </v-btn>
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
                  <p style="text-align: right; margin-bottom: 10px">
                    <v-btn
                      style="
                        padding: 0;
                        margin: 0;
                        min-width: 0px;
                        height: 16px;
                      "
                      color="error"
                      depressed
                      >{{ (ruta.informacionMicros[0] || {}).numero }}</v-btn
                    >

                    {{ (ruta.informacionMicros[0] || {}).hora }}
                    <strong>
                      {{
                        diferenciaEntreMicros(ruta.informacionMicros)
                          | milisegundosCortos
                      }}
                    </strong>

                    <v-btn
                      style="
                        padding: 0;
                        margin: 0;
                        min-width: 0px;
                        height: 16px;
                      "
                      color="error"
                      depressed
                      >{{ (ruta.informacionMicros[1] || {}).numero }}</v-btn
                    >
                    <strong>
                      {{ ruta.nombre }}
                    </strong>
                  </p>
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
                              horarioReal.transcurrido | milisegundosConHoras
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
const CLAVE_LOCALSTORAGE = "rutas_temporales";
const COLOR_NARANJA = "#C6FF00";
const COLOR_MORADO = "#FF1744";

let diccionario = {};
export default {
  name: "Horarios",
  components: { TipoTransporte, DialogoAgregarHorario },
  data: () => ({
    colorRutaTemporal: COLOR_NARANJA,
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
        nombre: "TACO",
        marcada: false,
        sufijo: "",
      },
      {
        nombre: "TALZ",
        marcada: false,
        sufijo: "",
      },
      {
        nombre: "TALB",
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
    horariosRojos: [],
    horariosRojosParteInferior: [],
  }),
  async mounted() {
    if (!localStorage.getItem(CLAVE_LOCALSTORAGE)) {
      this.guardarRutasTemporales();
    }
    this.rutasTemporales = JSON.parse(localStorage.getItem(CLAVE_LOCALSTORAGE));
    await this.obtenerRutas();
    await this.obtenerReporteDeRojos();
    this.iniciarIntervalRefrescarTiempo();
  },
  methods: {
    obtenerRutaSegunId(id) {
      return diccionario[id];
    },
    async obtenerReporteDeRojos() {
      const horarios = await HorariosService.obtenerPorTipoUnidad(
        Constantes.TIPO_ROJO
      );
      horarios.reverse();
      horarios.forEach((horario) => {
        const ruta = this.obtenerRutaSegunId(horario.idRuta);
        horario.nombreRuta = ruta.nombre;
        horario.colorRuta = ruta.color;
      });
      for (let i = horarios.length - 2; i >= 0; i--) {
        const tiempoA = horarios[i].hora;
        const tiempoB = horarios[i + 1].hora;
        let diferenciaGeneral = Utiles.restarHorarios(tiempoA, tiempoB);
        horarios[i].tiempoGeneral = diferenciaGeneral;
      }
      const diccionarioHoras = {};
      for (let i = horarios.length - 1; i >= 0; i--) {
        const tiempoA = horarios[i].hora;
        const nombreRuta = horarios[i].nombreRuta;
        horarios[i].tiempoMismaRuta = 0;
        if (diccionarioHoras[nombreRuta]) {
          horarios[i].tiempoMismaRuta = Utiles.restarHorarios(
            tiempoA,
            diccionarioHoras[nombreRuta]
          );
        }
        diccionarioHoras[nombreRuta] = tiempoA;
      }
      this.horariosRojosParteInferior = horarios.slice(0, 8);
    },
    diferenciaEntreMicros(informacionMicros) {
      if (informacionMicros.length < 2) {
        return 0;
      }
      const primeraRuta = informacionMicros[0];
      const segundaRuta = informacionMicros[1];
      const primeraFecha = new Date(primeraRuta.fecha + "T" + primeraRuta.hora);
      const segundaFecha = new Date(segundaRuta.fecha + "T" + segundaRuta.hora);
      return primeraFecha - segundaFecha;
    },
    guardarRutasTemporales() {
      localStorage.setItem(
        CLAVE_LOCALSTORAGE,
        JSON.stringify(this.rutasTemporales)
      );
    },
    clickRutaTemporal(ruta) {
      ruta.marcada = !ruta.marcada;
      if (ruta.marcada) {
        ruta.sufijo = prompt("Ingresa el texto: ");
      } else {
        ruta.sufijo = "";
      }
      this.guardarRutasTemporales();
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
      // Para parpadear
      this.colorRutaTemporal =
        this.colorRutaTemporal === COLOR_NARANJA ? COLOR_MORADO : COLOR_NARANJA;
      // Para parpadear
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
      await this.colocarInformacionMicros();
      this.obtenerReporteDeRojos();
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
    obtenerUltimosRojos(idRuta) {
      const ultimos = [];
      let contadorEncontrados = 0;
      for (let i = this.horariosRojos.length - 1; i >= 0; i--) {
        const rojo = this.horariosRojos[i];
        if (rojo.idRuta === idRuta) {
          ultimos.push(rojo);
          contadorEncontrados++;
        }
        if (contadorEncontrados >= 2) {
          return ultimos;
        }
      }
      return ultimos;
    },
    async colocarInformacionMicros() {
      this.horariosRojos = await HorariosService.obtenerPorTipoUnidad(
        Constantes.TIPO_ROJO
      );
      for (const ruta of this.rutas) {
        ruta.informacionMicros = this.obtenerUltimosRojos(ruta._id);
      }
    },
    async obtenerRutas() {
      diccionario = {};
      const fechaActual = Utiles.formatearFechaActual();
      const rutas = await RutasService.obtener();
      for (const ruta of rutas) {
        diccionario[ruta._id] = ruta;
        const horarios = await HorariosService.obtenerUltimoHorarioRegistrado(
          fechaActual,
          ruta._id
        );
        for (const horario of horarios) {
          horario.transcurrido = 0;
        }
        ruta.horarios = horarios;
        ruta.informacionMicros = this.obtenerUltimosRojos(ruta._id);
        ruta.transcurrido = 0;
        ruta.marcada = false;
      }
      this.rutas = rutas;
      await this.colocarInformacionMicros();
    },
  },
};
</script>
