<template>
  <v-card flat>

    <ConfirmarEliminacionRuta @confirmado="eliminarRutaSeleccionada()" @cerrar="cerrarDialogo"
                              :ruta="rutaSeleccionada"
                              :mostrar="mostrarDialogoEliminar"></ConfirmarEliminacionRuta>
    <AgregarRuta @guardada="onRutaGuardada" :mostrar="mostrarDialogoAgregar"
                 @cerrar="mostrarDialogoAgregar = false"></AgregarRuta>
    <div v-if="rutas.length > 0">
      <div v-for="(ruta, i) in rutas" :key="i">
        <v-list-item @click="confirmarEliminacion(ruta)" two-line>
          <v-list-item-content>
            <v-list-item-title>{{ ruta.nombre }}</v-list-item-title>
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
        Todavía no hay rutas. Agrega una con el botón flotante
      </v-alert>
    </div>
    <v-btn
        color="primary"
        fab
        elevation="2"
        right
        bottom
        fixed
        @click="mostrarDialogoAgregarRuta()"
    >
      <v-icon>mdi-plus</v-icon>
    </v-btn>
    <v-snackbar top timeout="700" v-model="snackbar.mostrar">
      {{ snackbar.texto }}
    </v-snackbar>
  </v-card>
</template>

<script>
import ConfirmarEliminacionRuta from "@/components/ConfirmarEliminacionRuta";
import AgregarRuta from "@/components/AgregarRuta";
import RutasService from "@/RutasService";

export default {
  name: "Rutas",
  components: {AgregarRuta, ConfirmarEliminacionRuta},
  data: () => ({
    rutas: [],
    rutaSeleccionada: {},
    mostrarDialogoEliminar: false,
    mostrarDialogoAgregar: false,
    snackbar: {
      mostrar: false,
      texto: "",
    }
  }),
  mounted() {
    this.obtenerRutas();
  },
  methods: {
    onRutaGuardada() {
      this.snackbar.mostrar = true;
      this.snackbar.texto = "Ruta guardada";
      this.mostrarDialogoAgregar = false;
      this.$emit("actualizadas");
      this.obtenerRutas();
    },
    mostrarDialogoAgregarRuta() {
      this.mostrarDialogoAgregar = true;
    },
    confirmarEliminacion(ruta) {
      this.rutaSeleccionada = ruta;
      this.mostrarDialogoEliminar = true;
    },
    async eliminarRutaSeleccionada() {
      await RutasService.eliminar(this.rutaSeleccionada);
      this.rutaSeleccionada = {};
      this.mostrarDialogoEliminar = false;
      this.$emit("actualizadas");
      this.obtenerRutas();
    },
    cerrarDialogo() {
      this.mostrarDialogoEliminar = false;
    },
    async obtenerRutas() {
      this.rutas = await RutasService.obtener();
    }
  }
}
</script>

<style scoped>

</style>