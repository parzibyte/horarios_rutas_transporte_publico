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
        Horarios
        <v-icon>mdi-clipboard-clock</v-icon>
      </v-tab>
      <v-tab>
        Reportes
        <v-icon>mdi-file-table-box-multiple</v-icon>
      </v-tab>
      <v-tab>
        Comisiones
        <v-icon>mdi-currency-usd</v-icon>
      </v-tab>
      <v-tab>
        Rutas
        <v-icon>mdi-bus</v-icon>
      </v-tab>
      <v-tab>
        Acerca de
        <v-icon>mdi-information-outline</v-icon>
      </v-tab>
    </v-tabs>
    <v-tabs-items v-model="tab">

      <v-tab-item>
        <Horarios @actualizados="actualizarReporte()" ref="horarios"></Horarios>
      </v-tab-item>
      <v-tab-item>
        <Reportes ref="reportes"></Reportes>
      </v-tab-item>
      <v-tab-item>
        <Comisiones></Comisiones>
      </v-tab-item>
      <v-tab-item>
        <Rutas @actualizadas="actualizarRutasEnHorarios"></Rutas>
      </v-tab-item>
      <v-tab-item>
        <AcercaDe></AcercaDe>
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>

<script>
import Rutas from "@/components/Rutas";
import Horarios from "@/components/Horarios";
import Reportes from "@/components/Reportes";
import AcercaDe from "@/components/AcercaDe";
import Comisiones from "@/components/Comisiones";

export default {
  name: 'HelloWorld',
  components: {Comisiones, AcercaDe, Reportes, Horarios, Rutas},
  data: () => ({
    tab: 0,
  }),
  methods: {
    actualizarReporte() {
      this.$refs.reportes.refrescarTodo();
    },
    actualizarRutasEnHorarios() {
      this.$refs.horarios.obtenerRutas();
      this.$refs.reportes.refrescarTodo();
    }
  }
}
</script>
