const Utiles = {
    restarHorarios(a, b) {
        const fecha = this.formatearFechaActual();
        const fechaYHoraA = new Date(fecha + " " + a);
        const fechaYHoraB = new Date(fecha + " " + b);
        return fechaYHoraA - fechaYHoraB;
    },
    idConSufijo(tipo) {
        return tipo.concat("_", this.formatearFechaYHoraParaId());
    },
    formatearFechaYHoraParaId() {
        const fecha = new Date();
        const mes = fecha.getMonth() + 1; // Ya que los meses los cuenta desde el 0
        const dia = fecha.getDate();
        const fechaFormateada = `${fecha.getFullYear()}-${this.agregarCeroSiEsNecesario(mes)}-${this.agregarCeroSiEsNecesario(dia)}`;
        const horaFormateada = `${this.agregarCeroSiEsNecesario(fecha.getHours())}_${this.agregarCeroSiEsNecesario(fecha.getMinutes())}_${this.agregarCeroSiEsNecesario(fecha.getSeconds())}`;
        return fechaFormateada + "_" + horaFormateada;
    },

    formatearHoraActual() {
        const fecha = new Date();
        return `${this.agregarCeroSiEsNecesario(fecha.getHours())}:${this.agregarCeroSiEsNecesario(fecha.getMinutes())}:${this.agregarCeroSiEsNecesario(fecha.getSeconds())}`;
    },

    formatearFechaActual() {
        const fecha = new Date();
        const mes = fecha.getMonth() + 1; // Ya que los meses los cuenta desde el 0
        const dia = fecha.getDate();
        return `${fecha.getFullYear()}-${this.agregarCeroSiEsNecesario(mes)}-${this.agregarCeroSiEsNecesario(dia)}`;
    },
    agregarCeroSiEsNecesario(valor) {
        if (valor < 10) {
            return '0'.concat(valor);
        }
        return valor.toString();
    }
};
export default Utiles;