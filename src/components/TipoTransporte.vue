<template>
  <div>
    <v-btn
        style="border: 1px solid white !important;"
        class="white--text"
        :color="this.esRojo()? 'error' : 'info'"
        depressed
    >
      {{ horario.numero }}
    </v-btn>
  </div>
</template>

<script>
import Constantes from "@/Constantes";

export default {
  name: "TipoTransporte",
  props: ["horario"],
  methods: {
    esRojo() {
      return this.horario.tipoUnidad === Constantes.TIPO_ROJO;
    }
  }
}
</script>

<style scoped>

</style>