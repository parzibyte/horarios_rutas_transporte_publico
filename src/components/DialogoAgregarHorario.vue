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
      <v-alert class="mx-2 my-2" dense type="success">
        <strong class="text-h4">{{ ruta.nombre }} | {{ numeroUnidad }}</strong>
      </v-alert>
      <v-switch
        v-model="tomarHoraActual"
        :label="`Tomar hora actual`"
      ></v-switch>

      <div v-show="!tomarHoraActual">
        <v-time-picker
          format="ampm"
          full-width
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
          v-show="deberiaMostrarBotonMicro()"
          dark
          color="red"
          large
          @click="guardarMicro()"
        >
          Rojo
        </v-btn>
        <v-btn @click="cerrar" large text> Cancelar </v-btn>
        <v-btn color="blue " large dark @click="guardarCombi()"> R-3 </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import Utiles from "@/Utiles";
import HorariosService from "@/HorariosService";
import Constantes from "@/Constantes";
const formateador = new Intl.DateTimeFormat("es-MX", { timeStyle: "medium" });
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
  watch: {
    mostrar() {
      if (this.mostrar) {
        this.horario = formateador.format(new Date());
        setTimeout(() => {
          this.$refs.campoNumero.$refs.input.focus();
        }, 50);
      }
    },
  },
  methods: {
    deberiaMostrarBotonMicro() {
      if (!this.ruta.nombre) {
        return true;
      }
      const rutas = [
        "talzintan",
        "tezotepec",
        "calicapan",
        "sosa",
        "san isidro",
        "tacopan",
      ];
      if (rutas.indexOf(this.ruta.nombre.toLowerCase()) === -1) {
        return false;
      }
      return true;
    },
    guardarCombi() {
      this.tipoUnidad = Constantes.TIPO_COMBI;
      this.guardar();
    },
    guardarMicro() {
      this.tipoUnidad = Constantes.TIPO_ROJO;
      this.guardar();
    },
    antesDeCerrar() {
      this.tipoUnidad = this.tipos[0];
      this.numeroUnidad = "";
      this.tomarHoraActual = true;
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
      if (!this.numeroUnidad) {
        return;
      }
      let verdaderoHorario = "";
      if (this.tomarHoraActual) {
        verdaderoHorario = Utiles.formatearHoraActual();
      } else {
        verdaderoHorario = this.horario;
      }
      await HorariosService.nuevo(
        this.ruta._id,
        Utiles.formatearFechaActual(),
        verdaderoHorario,
        this.tipoUnidad,
        this.numeroUnidad
      );
      this.antesDeCerrar();
      this.$emit("guardado");
    },
  },
};
</script>
