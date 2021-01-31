<template>
  <v-card flat>
    <AgregarComision @guardada="onComisionGuardada" @cerrar="mostrarDialogoComision = false"
                     :mostrar="mostrarDialogoComision"></AgregarComision>
    <v-dialog
        ref="dialog"
        v-model="modal"
        :return-value.sync="fechaSeleccionada"
        persistent
        width="290px"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-text-field
            @change="obtenerComisiones()"
            v-model="fechaSeleccionada"
            label="Fecha"
            prepend-icon="mdi-calendar"
            readonly
            v-bind="attrs"
            v-on="on"
        ></v-text-field>
      </template>
      <v-date-picker
          @change="obtenerComisiones()"
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
    <h6 class="text-h5 mb-2 ml-2">Total: {{ formatear(total()) }}</h6>
    <v-btn
        color="primary"
        fab
        elevation="2"
        right
        bottom
        fixed
        @click="mostrarDialogoComision = true"
    >
      <v-icon>mdi-plus</v-icon>
    </v-btn>
    <v-badge
        class="mx-3 my-1"
        v-for="(comision,i) in comisiones" :key="i"
        overlap
        bordered
        color="green"
        :content="formatear(comision.comision)"
    >
      <v-btn
          class="white--text"
          color="green"
          depressed
      >
        {{ comision.numero }}
      </v-btn>
    </v-badge>
  </v-card>
</template>

<script>
import AgregarComision from "@/components/AgregarComision";
import ComisionesService from "@/ComisionesService";
import Utiles from "@/Utiles";

export default {
  name: "Comisiones",
  components: {AgregarComision},
  async mounted() {
    this.fechaSeleccionada = Utiles.formatearFechaActual();
    await this.obtenerComisiones();
  },
  methods: {
    formatear(cantidad) {
      return "$".concat(cantidad);
    },
    total() {
      let total = 0;
      for (const comision of this.comisiones) {
        total += comision.comision;
      }
      return total;
    },
    confirmarEliminacion() {

    },
    async onComisionGuardada() {
      this.mostrarDialogoComision = false;
      await this.obtenerComisiones();
    },
    async obtenerComisiones() {
      this.comisiones = await ComisionesService.obtener(this.fechaSeleccionada);
    },
  },
  data: () => ({
    mostrarDialogoComision: false,
    comisiones: [],
    fechaSeleccionada: "",
    modal: false,
  }),
}
</script>

<style scoped>

</style>