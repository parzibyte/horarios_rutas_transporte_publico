<template>

  <v-dialog
      v-model="mostrar"
      persistent
      max-width="290"
  >
    <v-card class="px-2">
      <v-card-title class="headline">
        Agregar comisión
      </v-card-title>

      <v-text-field
          v-model="numero"
          label="Número"
      ></v-text-field>

      <v-text-field
          v-model="comision"
          label="Comisión"
      ></v-text-field>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
            text
            @click="cerrar"
        >
          Cancelar
        </v-btn>

        <v-btn
            color="green darken-1"
            text
            @click="guardar"
        >
          Guardar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import ComisionesService from "@/ComisionesService";
import Utiles from "@/Utiles";

export default {
  name: "AgregarComision",
  props: ["mostrar"],
  data: () => ({
    numero: "",
    comision: "",
  }),
  methods: {
    antesDeCerrar() {
      this.numero = "";
      this.comision = "";
    },
    cerrar() {
      this.antesDeCerrar();
      this.$emit("cerrar");
    },
    async guardar() {
      if (!this.numero || !this.comision) {
        return;
      }
      await ComisionesService.nueva(this.numero, parseFloat(this.comision), Utiles.formatearFechaActual());
      this.antesDeCerrar();
      this.$emit("guardada");
    },
  }
}
</script>

<style scoped>

</style>