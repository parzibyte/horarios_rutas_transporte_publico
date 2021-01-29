<template>
  <v-dialog
      v-model="mostrar"
      persistent
      max-width="350"
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

      <v-container>

        <v-row >
          <v-col>

            <v-select
                :items="tipos"
                label="Tipo de unidad"
                v-model="tipoUnidad"
            ></v-select>
          </v-col>
          <v-col>

            <v-text-field

                v-model="numeroUnidad"
                label="Número"
                type="number"
            ></v-text-field>
          </v-col>
        </v-row>
      </v-container>
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
import Constantes from "@/Constantes";

export default {
  props: ["mostrar", "ruta"],
  name: "DialogoAgregarHorario",
  data: () => ({
    horario: "",
    horaRefrescada: "",
    idInterval: null,
    tomarHoraActual: true,
    tipos: [],
    tipoUnidad: "",
    numeroUnidad: "",
  }),
  mounted() {
    this.tipos = Constantes.TIPOS_UNIDAD;
    this.tipoUnidad = this.tipos[0];
    this.idInterval = setInterval(() => {
      this.refrescarHora();
    }, 500);
  },
  beforeDestroy() {
    console.log("Destroy!");
  },
  methods: {
    antesDeCerrar() {
      this.tipoUnidad = this.tipos[0];
      this.numeroUnidad = "";
    },
    refrescarHora() {
      this.horaRefrescada = Utiles.formatearHoraActual();
    },
    cerrar() {
      this.antesDeCerrar();
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
      await HorariosService.nuevo(this.ruta._id, Utiles.formatearFechaActual(), verdaderoHorario, this.tipoUnidad, this.numeroUnidad);
      this.antesDeCerrar();
      this.$emit("guardado");
    }
  }
}
</script>
