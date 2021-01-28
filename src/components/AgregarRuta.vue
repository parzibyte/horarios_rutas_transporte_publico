<template>

  <v-dialog
      v-model="mostrar"
      persistent
      max-width="290"
  >
    <v-card>
      <v-card-title class="headline">
        Nueva ruta
      </v-card-title>
      <v-form
          class="mx-2"
          ref="formulario"
          v-model="formularioValido"
      >
        <v-text-field
            v-model="ruta.nombre"
            :rules="reglasValidacion.nombre"
            label="Nombre"
            required
        ></v-text-field>
      </v-form>

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
            :disabled="!formularioValido"
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
export default {
  name: "AgregarRuta",
  props: ["mostrar"],
  data: () => ({
    ruta: {
      nombre: ""
    },
    formularioValido: false,
    reglasValidacion: {
      nombre: [
        (nombre) => {
          if (!nombre) {
            return "Escribe el nombre"
          }
          return true;
        }
      ],
    }
  }),
  methods: {
    validate() {

    },
    cerrar() {
      this.$refs.formulario.resetValidation();
      this.$refs.formulario.reset();
      this.$emit("cerrar");
    },
    guardar() {
      console.log("Guardamos:")
      console.log(this.ruta);
      this.ruta.nombre = "";
      this.cerrar();
    }
  }
}
</script>

<style scoped>

</style>