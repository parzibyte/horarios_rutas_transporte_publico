<template>
  <v-card flat>
    <ConfirmarEliminacionRuta @confirmado="eliminarRutaSeleccionada()" @cerrar="cerrarDialogo" :ruta="rutaSeleccionada"
                              :mostrar="mostrarDialogoEliminar"></ConfirmarEliminacionRuta>
    <div v-for="(ruta, i) in rutas" :key="i">
      <v-list-item @click="confirmarEliminacion(ruta)" two-line>
        <v-list-item-content>
          <v-list-item-title>{{ ruta.nombre }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-divider></v-divider>
    </div>
    <v-btn
        color="primary"
        fab
        elevation="2"
        right
        bottom
        fixed
    >
      <v-icon>mdi-plus</v-icon>
    </v-btn>
  </v-card>
</template>

<script>
import ConfirmarEliminacionRuta from "@/components/ConfirmarEliminacionRuta";

export default {
  name: "Rutas",
  components: {ConfirmarEliminacionRuta},
  data: () => ({
    rutas: [],
    rutaSeleccionada: {},
    mostrarDialogoEliminar: false,
  }),
  mounted() {
    this.obtenerRutas();
  },
  methods: {
    confirmarEliminacion(ruta) {
      this.rutaSeleccionada = ruta;
      this.mostrarDialogoEliminar = true;
    },
    eliminarRutaSeleccionada() {
      console.log("Se elimina");
      console.log(this.rutaSeleccionada);
      this.rutaSeleccionada = {};
      this.mostrarDialogoEliminar = false;
    },
    cerrarDialogo() {
      this.mostrarDialogoEliminar = false;
    },
    obtenerRutas() {
      const a = [
        {
          nombre: "Ruta 1",
        },
        {
          nombre: "Ruta 2",
        },
      ];
      for (let i = 0; i < 10; i++)
        this.rutas.push(...a);
    }
  }
}
</script>

<style scoped>

</style>