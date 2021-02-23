<template>

  <v-dialog
      v-model="mostrar"
      persistent
      max-width="350"
  >
    <v-card class="pt-2 pl-2">
      <h2>Unidad {{ numeroUnidad }}</h2>
      <v-container>
        <v-text-field
            ref="campoCantidad"
            v-model="comision"
            label="Comisión"
            type="number"
        ></v-text-field>
      </v-container>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
            dark
            color="success"
            depressed
            @click="guardar()"
        >
          Guardar
        </v-btn>
        <v-btn
            @click="cerrar"
            large
            text
        >
          Cancelar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import ComisionesService from "@/ComisionesService";

export default {
  name: "DialogoAgregarComision",
  props: ["numeroUnidad", "mostrar"],
  data: () => ({
    comision: null,
  }),
  watch: {
    mostrar() {
      if (this.mostrar) {
        setTimeout(() => {
          this.$refs.campoCantidad.$refs.input.focus();
        }, 50);
      }
    }
  },
  methods: {
    cerrar() {
      this.$emit("cerrar");
    },
    async guardar() {
      if (!this.comision) {
        return;
      }
      await ComisionesService.nueva(this.numeroUnidad, this.comision);
      this.comision = null;
      this.$emit("guardado");

    }
  }
}
</script>

