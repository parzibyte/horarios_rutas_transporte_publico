<template>
  <v-card
    :style="{ backgroundColor: colorFondo }"
    style="margin: 0 40px 0 40px"
    flat
  >
    <v-select
      @change="obtenerHorariosConFechaYRutaSeleccionada()"
      :items="rutas"
      item-text="nombre"
      item-value="_id"
      label="Ruta"
      v-model="rutaSeleccionada"
      no-data-text="No has registrado ninguna ruta"
    >
      <template v-slot:item="{ item }">
        <h1
          style="min-width: 100%; padding: 10px"
          :style="{ backgroundColor: item.color }"
        >
          {{ item.nombre }}
        </h1>
      </template>
    </v-select>
    <v-slider
      min="40"
      max="70"
      step="5"
      v-model="minutosSuma"
      thumb-label="always"
    ></v-slider>
    <div v-if="horarios.length > 0">
      <v-row justify="center">
        <h6 class="text-h5 mb-2">
          Promedio R3: {{ promedios.combi | milisegundosCortos }}
        </h6>
      </v-row>
      <v-divider></v-divider>
      <div v-for="(horario, i) in horarios" :key="i">
        <v-list-item two-line>
          <v-list-item-content>
            <v-list-item-title> </v-list-item-title>
            <v-row>
              <v-col cols="4" style="text-align: right">
                <TipoTransporte :horario="horario"></TipoTransporte>
              </v-col>
              <v-col cols="8" style="font-size: 1rem">
                <v-icon>mdi-clock-outline</v-icon>
                {{ horario.hora }} |
                <strong style="font-size: 1.3rem">{{
                  horario.tiempoGeneral | milisegundosCortos
                }}</strong>
                <br />
                Predicción:
                <strong>{{
                  sumarConTiempoSeleccionado(horario.hora) | formatearFecha
                }}</strong>
              </v-col>
            </v-row>
          </v-list-item-content>
        </v-list-item>
        <v-divider></v-divider>
      </div>
    </div>
    <div v-else>
      <v-alert type="info">
        No hay horarios para la fecha y ruta seleccionados
      </v-alert>
    </div>
    <v-btn
      color="primary"
      fab
      elevation="2"
      right
      bottom
      fixed
      @click="generarPdf()"
    >
      <v-icon>mdi-file-pdf</v-icon>
    </v-btn>
  </v-card>
</template>

<script>
import RutasService from "@/RutasService";
import Utiles from "@/Utiles";
import HorariosService from "@/HorariosService";
import TipoTransporte from "@/components/TipoTransporte";
import Constantes from "@/Constantes";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
const formateador = new Intl.DateTimeFormat("es-MX", {
  dateStyle: "short",
  //timeStyle: "medium",
});
export default {
  name: "Reportes",
  components: { TipoTransporte },
  data: () => ({
    fechaSeleccionada: "",
    rutas: [],
    modal: false,
    rutaSeleccionada: "",
    horarios: [],
    promedios: {
      rojo: "",
      combi: "",
      general: "",
    },
    TIPO_COMBI: Constantes.TIPO_COMBI,
    minutosSuma: null,
  }),
  async mounted() {
    //this.createPdf();
    await this.obtenerRutas();
    this.fechaSeleccionada = Utiles.formatearFechaActual();
    // await this.refrescarTodo();
  },
  computed: {
    colorFondo() {
      const ruta = this.rutas.find((ruta) => {
        return ruta._id === this.rutaSeleccionada;
      });
      if (ruta) {
        return ruta.color;
      } else {
        return "#ffffff";
      }
    },
  },
  methods: {
    async generarPdf() {
      const fecha = formateador.format(new Date());
      const pdfDoc = await PDFDocument.create();
      const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman);

      let page = pdfDoc.addPage();
      const colorNegro = rgb(0, 0, 0);
      const linea =
        "______________________________________________________________";
      const parrafos = [
        {
          texto:
            "Reporte de ruta " + this.nombreDeRutaPorId(this.rutaSeleccionada),
          tamaño: 20,
          color: colorNegro,
        },
        {
          texto: "Fecha: " + fecha,
          tamaño: 20,
          color: colorNegro,
        },
      ];
      let y = page.getHeight() - parrafos[0].tamaño;
      for (const parrafo of parrafos) {
        page.drawText(parrafo.texto, {
          x: 20,
          y: y,
          size: parrafo.tamaño,
          font: timesRomanFont,
          color: parrafo.color,
        });
        y -= parrafo.tamaño;
        if (y - parrafo.tamaño <= 0) {
          page = pdfDoc.addPage();
          y = page.getHeight() - parrafo.tamaño;
        }
      }
      const inicioUnidad = 20,
        inicioHora = 150,
        inicioTiempoGeneral = 250,
        inicioTiempoMismaUnidad = 350;
      const tamañoFuenteTiempos = 15;
      page.drawText("Unidad", {
        x: inicioUnidad,
        y: y,
        size: tamañoFuenteTiempos,
        font: timesRomanFont,
        color: colorNegro,
      });
      page.drawText("Hora", {
        x: inicioHora,
        y: y,
        size: tamañoFuenteTiempos,
        font: timesRomanFont,
        color: colorNegro,
      });
      page.drawText("Tiempo gral.", {
        x: inicioTiempoGeneral,
        y: y,
        size: tamañoFuenteTiempos,
        font: timesRomanFont,
        color: colorNegro,
      });
      page.drawText("Tiempo misma unidad", {
        x: inicioTiempoMismaUnidad,
        y: y,
        size: tamañoFuenteTiempos,
        font: timesRomanFont,
        color: colorNegro,
      });
      y -= 1;
      page.drawText(linea, {
        x: inicioUnidad,
        y: y,
        size: tamañoFuenteTiempos,
        font: timesRomanFont,
        color: colorNegro,
      });
      y -= tamañoFuenteTiempos + 10;

      let contador = 0;
      for (const horario of this.horarios) {
        contador += 1;
        page.drawText(
          "" + contador + ". " + horario.tipoUnidad + " " + horario.numero,
          {
            x: inicioUnidad,
            y: y,
            size: tamañoFuenteTiempos,
            font: timesRomanFont,
            color: colorNegro,
          }
        );
        page.drawText(horario.hora, {
          x: inicioHora,
          y: y,
          size: tamañoFuenteTiempos,
          font: timesRomanFont,
          color: colorNegro,
        });

        page.drawText(Utiles.milisegundosCortos(horario.tiempoGeneral), {
          x: inicioTiempoGeneral,
          y: y,
          size: tamañoFuenteTiempos,
          font: timesRomanFont,
          color: colorNegro,
        });
        page.drawText(Utiles.milisegundosCortos(horario.tiempoMismoTipo), {
          x: inicioTiempoMismaUnidad,
          y: y,
          size: tamañoFuenteTiempos,
          font: timesRomanFont,
          color: colorNegro,
        });
        y -= 1;
        page.drawText(linea, {
          x: inicioUnidad,
          y: y,
          size: tamañoFuenteTiempos,
          font: timesRomanFont,
          color: colorNegro,
        });
        y -= tamañoFuenteTiempos + 10;
        if (y - tamañoFuenteTiempos <= 0) {
          page = pdfDoc.addPage();
          y = page.getHeight() - tamañoFuenteTiempos;
        }
      }

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes], {
        type: "application/pdf",
      });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download =
        this.nombreDeRutaPorId(this.rutaSeleccionada) + "_" + fecha + ".pdf";
      document.body.appendChild(a);
      a.style.display = "none";
      a.click();
      a.remove();
    },
    sumarConTiempoSeleccionado(hora) {
      return Utiles.sumarHorarios(hora, this.minutosSuma);
    },
    async refrescarTodo() {
      await this.obtenerRutas();
      if (this.rutas.length > 0) {
        this.rutaSeleccionada = this.rutas[0]._id;
      }
      await this.obtenerHorariosConFechaYRutaSeleccionada();
    },
    async obtenerRutas() {
      this.rutas = await RutasService.obtener();
    },
    nombreDeRutaPorId(id) {
      for (const ruta of this.rutas) {
        if (ruta._id == id) {
          return ruta.nombre;
        }
      }
    },
    async obtenerHorariosConFechaYRutaSeleccionada() {
      if (!this.fechaSeleccionada || !this.rutaSeleccionada) {
        return;
      }
      const horarios = await HorariosService.obtenerPorFechaEIdRuta(
        this.fechaSeleccionada,
        this.rutaSeleccionada
      );
      if (horarios.length > 0) {
        let ultimaHoraRojo = "";
        let ultimaHoraCombi = "";
        let sumatoriaRojo = 0;
        let sumatoriaCombi = 0;
        let sumatoriaGeneral = 0;
        let contadorRojo = 0;
        let contadorCombi = 0;
        if (horarios[horarios.length - 1].tipoUnidad === Constantes.TIPO_ROJO) {
          ultimaHoraRojo = horarios[horarios.length - 1].hora;
        } else {
          ultimaHoraCombi = horarios[horarios.length - 1].hora;
        }

        for (let i = horarios.length - 2; i >= 0; i--) {
          const tiempoA = horarios[i].hora;
          const tiempoB = horarios[i + 1].hora;
          let diferenciaGeneral = Utiles.restarHorarios(tiempoA, tiempoB);
          sumatoriaGeneral += diferenciaGeneral;
          horarios[i].tiempoGeneral = diferenciaGeneral;
          if (horarios[i].tipoUnidad === Constantes.TIPO_ROJO) {
            if (ultimaHoraRojo) {
              let diferencia = Utiles.restarHorarios(tiempoA, ultimaHoraRojo);
              sumatoriaRojo += diferencia;
              contadorRojo++;
              horarios[i].tiempoMismoTipo = diferencia;
            }
            ultimaHoraRojo = tiempoA;
          } else {
            if (ultimaHoraCombi) {
              let diferencia = Utiles.restarHorarios(tiempoA, ultimaHoraCombi);
              sumatoriaCombi += diferencia;
              contadorCombi++;
              horarios[i].tiempoMismoTipo = diferencia;
            }
            ultimaHoraCombi = tiempoA;
          }
        }
        this.promedios.general = sumatoriaGeneral / (horarios.length - 1);
        this.promedios.rojo = sumatoriaRojo / contadorRojo;
        this.promedios.combi = sumatoriaCombi / contadorCombi;
      }
      this.horarios = horarios;
    },
  },
};
</script>
