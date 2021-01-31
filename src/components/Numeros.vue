<template>
  <v-card class="mx-2" flat>
    <v-dialog
        ref="dialog"
        v-model="modal"
        :return-value.sync="fechaSeleccionada"
        persistent
        width="290px"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-text-field
            @change="obtenerNumeros()"
            v-model="fechaSeleccionada"
            label="Fecha"
            prepend-icon="mdi-calendar"
            readonly
            v-bind="attrs"
            v-on="on"
        ></v-text-field>
      </template>
      <v-date-picker
          @change="obtenerNumeros()"
          locale="es-la"
          v-model="fechaSeleccionada"
          scrollable
      >
        <v-spacer></v-spacer>
        <v-btn
            text
            color="primary"
            @click="modal = false"
        >
          Cancelar
        </v-btn>
        <v-btn
            text
            color="primary"
            @click="$refs.dialog.save(fechaSeleccionada)"
        >
          OK
        </v-btn>
      </v-date-picker>
    </v-dialog>
    <v-select
        @change="obtenerNumeros()"
        :items="rutas"
        item-text="nombre"
        item-value="_id"
        label="Ruta"
        v-model="rutaSeleccionada"
        no-data-text="No has registrado ninguna ruta"
    ></v-select>
    <v-select
        @change="obtenerNumeros()"
        :items="tipos"
        label="Tipo de unidad"
        v-model="tipoUnidad"
        no-data-text="No hay unidades"
    ></v-select>
    <h4>En orden de pasada</h4>
    <v-btn dark :color="esRojo()?'red':'blue'" class="mx-1 my-1" v-for="numero in numerosEnOrdenDePasada"
           :key="'pasada_'+numero">
      {{
        numero
      }}
    </v-btn>
    <v-divider class="my-2"></v-divider>
    <h4>En orden ascendente</h4>
    <v-btn dark :color="esRojo()?'red':'blue'" class="mx-1 my-1" v-for="numero in numerosEnOrdenAscendente"
           :key="'ascendente_'+numero">{{
        numero
      }}
    </v-btn>
    <v-divider class="my-2"></v-divider>
    <h4>Total: {{ numerosEnOrdenAscendente.length }}</h4>
  </v-card>
</template>

<script>
import Utiles from "@/Utiles";
import RutasService from "@/RutasService";
import HorariosService from "@/HorariosService";
import Constantes from "@/Constantes";

export default {
  name: "Numeros",
  data: () => ({
    rutaSeleccionada: "",
    fechaSeleccionada: "",
    modal: false,
    rutas: [],
    tipoUnidad: "",
    horarios: [],
    numerosEnOrdenDePasada: [],
    numerosEnOrdenAscendente: [],
    tipos: [],
  }),
  async mounted() {

    this.tipos = Constantes.TIPOS_UNIDAD;
    this.tipoUnidad = this.tipos[0];
    await this.refrescarTodo();
  },
  methods: {
    esRojo() {
      return this.tipoUnidad === Constantes.TIPO_ROJO;
    },
    async refrescarTodo() {
      this.fechaSeleccionada = Utiles.formatearFechaActual();
      await this.obtenerRutas();
      if (this.rutas.length > 0) {
        this.rutaSeleccionada = this.rutas[0]._id;
      }
      this.obtenerNumeros();
    },
    async obtenerNumeros() {
      const horarios = await HorariosService.obtenerNumerosPorFechaRutaYTipoUnidad(this.fechaSeleccionada, this.rutaSeleccionada, this.tipoUnidad);
      const numerosRepetidos = horarios.map(horario => horario.numero);
      this.numerosEnOrdenDePasada = numerosRepetidos.filter((valor, indiceActual, arreglo) => arreglo.indexOf(valor) === indiceActual);
      const arregloSinReferencia = JSON.parse(JSON.stringify(this.numerosEnOrdenDePasada));
      arregloSinReferencia.sort((a, b) => a - b);
      this.numerosEnOrdenAscendente = arregloSinReferencia;
      this.horarios = horarios;
    },
    async obtenerRutas() {
      this.rutas = await RutasService.obtener();
    },
  }
}
</script>

<style scoped>

</style>