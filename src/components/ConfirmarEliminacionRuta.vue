<template>
  <v-dialog
      v-model="mostrar"
      persistent
      max-width="290"
  >
    <v-card>
      <v-card-title class="headline">
        Confirmación
      </v-card-title>
      <v-card-text>¿Eliminar <strong>{{ ruta.nombre }}</strong>?<br>
        Se van a eliminar los horarios relacionados
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>

        <v-btn
            text
            @click="cerrar"
        >
          Cancelar
        </v-btn>

        <v-btn
            color="red darken-1"
            text
            @click="confirmar"
        >
          Eliminar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: ["mostrar", "ruta"],
  name: "ConfirmarEliminacionRuta",
  data: () => ({}),
  methods: {
    cerrar() {
      this.$emit("cerrar");
    },
    confirmar(){
      this.$emit("confirmado");
    }
  }
}
</script>

<style scoped>

</style>