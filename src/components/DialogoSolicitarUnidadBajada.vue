<template>
  <v-dialog v-model="mostrar" persistent max-width="350">
    <v-card class="pt-2">
      <v-container>
        <v-text-field
          ref="campoNumero"
          v-model="numeroUnidad"
          label="Número"
          type="number"
        ></v-text-field>
      </v-container>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click="cerrar" large text> Cancelar </v-btn>
        <v-btn color="blue" large dark @click="guardarUnidad()">Guardar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: ["mostrar"],
  name: "DialogoSolicitarUnidadBajada",
  data: () => ({
    numeroUnidad: "",
  }),
  mounted() {},
  watch: {
    mostrar() {
      if (this.mostrar) {
        setTimeout(() => {
          this.$refs.campoNumero.$refs.input.focus();
        }, 50);
      }
    },
  },
  methods: {
    cerrar() {
      this.numeroUnidad = "";
      this.$emit("cerrar");
    },
    async guardarUnidad() {
      if (!this.numeroUnidad) {
        return;
      }
      const unidad = this.numeroUnidad;
      this.numeroUnidad = "";
      this.$emit("guardar", unidad);
    },
  },
};
</script>
