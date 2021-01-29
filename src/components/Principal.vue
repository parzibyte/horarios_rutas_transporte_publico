<template>
  <div>
    <v-tabs
        background-color="cyan"
        dark
        fixed-tabs
        v-model="tab"
        icons-and-text
    >
      <v-tabs-slider color="yellow"></v-tabs-slider>
      <v-tab>
        Rutas
        <v-icon>mdi-bus</v-icon>
      </v-tab>
      <v-tab>
        Horarios
        <v-icon>mdi-clipboard-clock</v-icon>
      </v-tab>
      <v-tab>
        Reportes
        <v-icon>mdi-file-table-box-multiple</v-icon>
      </v-tab>
    </v-tabs>
    <v-tabs-items v-model="tab">
      <v-tab-item>
        <Rutas @actualizadas="actualizarRutasEnHorarios"></Rutas>
      </v-tab-item>
      <v-tab-item>
        <Horarios ref="horarios"></Horarios>
      </v-tab-item>
      <v-tab-item>
        <Reportes></Reportes>
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>

<script>
import Rutas from "@/components/Rutas";
import Horarios from "@/components/Horarios";
import Reportes from "@/components/Reportes";

export default {
  name: 'HelloWorld',
  components: {Reportes, Horarios, Rutas},
  data: () => ({
    tab: 1,
  }),
  methods: {
    actualizarRutasEnHorarios() {
      this.$refs.horarios.obtenerRutas();
    }
  }
}
</script>
