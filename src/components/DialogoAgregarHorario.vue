<template>
  <v-dialog
      v-model="mostrar"
      persistent
  >
    <v-card>
      <v-card-title class="headline">Registrar pase</v-card-title>
      <v-alert
          class="mx-2 my-2"
          dense
          type="info"
      >
        <strong>{{ ruta.nombre }}</strong>

      </v-alert>

      <div class="mx-2">
        <v-switch
            v-model="tomarHoraActual"
            label="Tomar hora actual"
        ></v-switch>
        <div v-show="tomarHoraActual">
          Al presionar el botón, se registrará con la hora: <strong>{{ horaRefrescada }}</strong>
        </div>
        <div v-show="!tomarHoraActual">
          <v-time-picker
              full-width
              format="ampm"
              v-model="horario"
              use-seconds
          ></v-time-picker>
          <div v-show="!horario">
            <p>Por favor selecciona el horario</p>
          </div>
          <div v-show="horario">
            Se registrará con la hora: <strong>{{ horario }}</strong>
          </div>
        </div>
      </div>

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
import Utiles from "@/Utiles";
import HorariosService from "@/HorariosService";

export default {
  props: ["mostrar", "ruta"],
  name: "DialogoAgregarHorario",
  data: () => ({
    horario: "",
    horaRefrescada: "",
    idInterval: null,
    tomarHoraActual: true,
  }),
  mounted() {
    this.idInterval = setInterval(() => {
      this.refrescarHora();
    }, 500);
  },
  beforeDestroy() {
    console.log("Destroy!");
  },
  methods: {
    refrescarHora() {
      this.horaRefrescada = Utiles.formatearHoraActual();
    },
    cerrar() {
      this.$emit("cerrar");
    },
    async guardar() {
      if (!this.tomarHoraActual && !this.horario) {
        return;
      }
      let verdaderoHorario = "";
      if (this.tomarHoraActual) {
        verdaderoHorario = Utiles.formatearHoraActual();
      } else {
        verdaderoHorario = this.horario;
      }
      await HorariosService.nuevo(this.ruta._id, Utiles.formatearFechaActual(), verdaderoHorario);
      this.$emit("guardado");
    }
  }
}
</script>
