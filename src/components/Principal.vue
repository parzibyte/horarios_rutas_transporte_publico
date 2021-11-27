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
        Rojos
        <v-icon>mdi-bus-clock</v-icon>
      </v-tab>
      <v-tab>
        Horarios
        <v-icon>mdi-clipboard-clock</v-icon>
      </v-tab>
      <v-tab>
        Reportes
        <v-icon>mdi-file-table-box-multiple</v-icon>
      </v-tab>
      <v-tab>
        Unidades
        <v-icon>mdi-bus-clock</v-icon>
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
        <Rojos></Rojos>
      </v-tab-item>
      <v-tab-item>
        <Horarios ref="horarios"></Horarios>
      </v-tab-item>
      <v-tab-item>
        <Reportes ref="reportes"></Reportes>
      </v-tab-item>
      <v-tab-item>
        <ReportePorUnidad></ReportePorUnidad>
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
import ReportePorUnidad from "@/components/ReportePorUnidad";
import AcercaDe from "@/components/AcercaDe";
import Rojos from "@/components/Rojos";

export default {
  name: "HelloWorld",
  components: {
    AcercaDe,
    Reportes,
    Horarios,
    Rutas,
    ReportePorUnidad,
    Rojos,
  },
  data: () => ({
    tab: 1,
  }),
  methods: {
    actualizarReporte() {
      this.$refs.reportes.refrescarTodo();
    },
    actualizarRutasEnHorarios() {
      this.$refs.horarios.obtenerRutas();
      // this.$refs.reportes.refrescarTodo();
    },
  },
};
</script>
