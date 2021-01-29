<template>
  <div>
    <v-icon>mdi-bus</v-icon>
    <v-badge
        bordered
        :color="this.esRojo()? 'error' : 'info'"
        overlap
        :content="horario.numero"
        :value="horario.numero"
    >
      <v-btn
          class="white--text"
          :color="this.esRojo()? 'error' : 'info'"
          depressed
      >
        {{ horario.tipoUnidad }}
      </v-btn>
    </v-badge>
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