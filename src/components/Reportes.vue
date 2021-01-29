<template>
  <v-card class="mx-2" flat>
    <v-dialog
        ref="dialog"
        v-model="modal"
        :return-value.sync="fechaSeleccionada"
        persistent
        width="290px"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-text-field
            @change="obtenerHorariosConFechaYRutaSeleccionada()"
            v-model="fechaSeleccionada"
            label="Fecha"
            prepend-icon="mdi-calendar"
            readonly
            v-bind="attrs"
            v-on="on"
        ></v-text-field>
      </template>
      <v-date-picker
          @change="obtenerHorariosConFechaYRutaSeleccionada()"
          locale="es-la"
          v-model="fechaSeleccionada"
          scrollable
      >
        <v-spacer></v-spacer>
        <v-btn
            text
            color="primary"
            @click="modal = false"
        >
          Cancelar
        </v-btn>
        <v-btn
            text
            color="primary"
            @click="$refs.dialog.save(fechaSeleccionada)"
        >
          OK
        </v-btn>
      </v-date-picker>
    </v-dialog>
    <v-select
        @change="obtenerHorariosConFechaYRutaSeleccionada()"
        :items="rutas"
        item-text="nombre"
        item-value="_id"
        label="Ruta"
        v-model="rutaSeleccionada"
        no-data-text="No has registrado ninguna ruta"
    ></v-select>
    <div v-if="horarios.length > 0">
      <v-row justify="center">
        <h6 class="text-h5">Promedios</h6>
      </v-row>
      <v-row justify="center">
        <v-chip class="mr-1" color="success">General</v-chip>
        <v-chip class="mr-1" color="info">Combi</v-chip>
        <v-chip color="red" dark>Rojo</v-chip>
      </v-row>
      <v-row class="mt-4" justify="center">
        <v-chip class="mr-1 my-1" color="success">{{ promedios.general | milisegundosALegible }}</v-chip>
        <v-chip class="mr-1 my-1" color="info">{{ promedios.combi | milisegundosALegible }}</v-chip>
        <v-chip class="mr-1 my-1" color="red" dark>{{ promedios.rojo | milisegundosALegible }}</v-chip>
      </v-row>
      <v-divider class="mt-4"></v-divider>
      <div v-for="(horario, i) in horarios" :key="i">
        <v-list-item two-line>
          <v-list-item-content>
            <v-list-item-title>
              <h6 class="text-h6">
                {{ horario.hora }}
              </h6>
            </v-list-item-title>
            <TipoTransporte :horario="horario"></TipoTransporte>
            <v-row justify="center">
              <v-col>
                <p v-show="horario.tiempoMismoTipo">
                  <strong>{{ horario.tipoUnidad }} anterior:
                    <br>
                  </strong> {{
                    horario.tiempoMismoTipo | milisegundosALegible
                  }}
                </p>
              </v-col>
              <v-col>
                <p v-show="horario.tiempoGeneral">
                  <strong>Transporte anterior: </strong>
                  <br>
                  {{ horario.tiempoGeneral | milisegundosALegible }}
                </p>
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
  components: {TipoTransporte},
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
    await this.refrescarTodo();
  },
  methods: {
    async refrescarTodo() {
      this.fechaSeleccionada = Utiles.formatearFechaActual();
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
      const horarios = await HorariosService.obtenerPorFechaEIdRuta(this.fechaSeleccionada, this.rutaSeleccionada);
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
    }
  }
}
</script>
