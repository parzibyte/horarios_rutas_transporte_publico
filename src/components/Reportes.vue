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
          v-model="fechaSeleccionada"
          scrollable
      >
        <v-spacer></v-spacer>
        <v-btn
            text
            color="primary"
            @click="modal = false"
        >
          Cancel
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
    ></v-select>
    <div v-if="horarios.length > 0">
      <div v-for="(horario, i) in horarios" :key="i">
        <v-list-item two-line>
          <v-list-item-content>
            <v-list-item-title>
              <h6 class="text-h6">
                {{ horario.hora }}
              </h6>
            </v-list-item-title>
            <TipoTransporte :horario="horario"></TipoTransporte>
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

export default {
  name: "Reportes",
  components: {TipoTransporte},
  data: () => ({
    fechaSeleccionada: "",
    rutas: [],
    modal: false,
    rutaSeleccionada: "",
    horarios: [],
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
      this.horarios = await HorariosService.obtenerPorFechaEIdRuta(this.fechaSeleccionada, this.rutaSeleccionada);
    }
  }
}
</script>

<style scoped>

</style>