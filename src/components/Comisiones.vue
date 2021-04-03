<template>
  <v-card flat>

    <DialogoAgregarComision @guardado="onComisionGuardada" :numero-unidad="numeroUnidadSeleccionada"
                            :mostrar="dialogoComision"
                            @cerrar="dialogoComision=false"></DialogoAgregarComision>
    <h2 class="ml-2 mt-1">Total: ${{ total() }}
    <v-btn class="mb-3 ml-2 mt-1" @click="eliminarTodas" color="info">Eliminar todas</v-btn>
</h2>
    <v-badge
        overlap
        bordered
        color="success"
        class="mx-3 mt-2"
        :content="unidad.comision"
        v-for="(unidad, indice) in unidades" :key="indice"
    >
      <v-btn
          @click="agregarComision(unidad)"
          depressed
          color="error" >{{ unidad.numero }}
      </v-btn>
    </v-badge>
  </v-card>
</template>

<script>
import DialogoAgregarComision from "@/components/DialogoAgregarComision";
import Constantes from "@/Constantes";
import ComisionesService from "@/ComisionesService";

let diccionario = {};

export default {
  name: "Comisiones",
  components: {DialogoAgregarComision},
  data: () => ({
    unidades: [],
    dialogoComision: false,
    numeroUnidadSeleccionada: null,
  }),
  mounted() {
    this.prepararArregloNumeros();
    this.refrescarComisiones();
  },
  methods: {
    async eliminarTodas() {
      if (!confirm("¿Seguro?")) {
        return;
      }
      await ComisionesService.eliminarTodas();
      this.prepararArregloNumeros();
      await this.refrescarComisiones();
    },
    total() {
      let total = 0;
      for (const unidad of this.unidades) {
        total += unidad.comision;
      }
      return total;
    },
    prepararArregloNumeros() {
      const numeros = Constantes.NUMEROS_PARA_COMISION;
      const unidades = [];
      diccionario = {};
      for (const [indice, numero] of numeros.entries()) {
        diccionario[numero] = indice;
        unidades.push({
          numero,
          comision: 0,
        });
      }
      this.unidades = unidades;
    },
    async refrescarComisiones() {
      const comisionesRegistradas = await ComisionesService.obtener();
      console.log({comisionesRegistradas})
      for (const comision of comisionesRegistradas) {
        const posibleIndice = diccionario[comision.numero];
        if (posibleIndice || posibleIndice === 0) {
          this.unidades[posibleIndice].comision = comision.comision;
        }
      }
    },
    mostrarDialogoComision() {
      this.dialogoComision = true;
    },
    agregarComision(unidad) {
      if (unidad.comision > 0) {
        return;
      }
      this.numeroUnidadSeleccionada = unidad.numero;
      this.dialogoComision = true;
    },
    onComisionGuardada() {
      this.dialogoComision = false;
      this.refrescarComisiones();
    }
  }
}
</script>

<style scoped>

</style>