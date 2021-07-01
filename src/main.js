import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import Toasted from 'vue-toasted';
const formateador = new Intl.DateTimeFormat('es-MX', {  timeStyle: 'medium' });
Vue.use(Toasted);
Vue.config.productionTip = false
Vue.filter("formatearFecha", (fecha) => {
    return formateador.format(fecha);
})
Vue.filter("milisegundosALegible", milisegundos => {
    if (!milisegundos) {
        return "-";
    }
    const transcurrido = new Date(milisegundos).toISOString().substr(11, 8);
    const horas = parseInt(transcurrido.substring(0, 2));
    const minutos = parseInt(transcurrido.substring(3, 5));
    const segundos = parseInt(transcurrido.substring(6, 8));
    let respuesta = "";
    if (horas) {
        respuesta = respuesta.concat(`${horas} hr${horas > 1 ? 's' : ''} `);
    }
    if (minutos) {
        respuesta = respuesta.concat(`${minutos} min${minutos > 1 ? 's' : ''} `);
    }
    if (segundos) {
        respuesta = respuesta.concat(`${segundos} seg${segundos > 1 ? 's' : ''} `);
    }
    return respuesta;
});

Vue.filter("milisegundosCortos", milisegundos => {
    if (!milisegundos) {
        return "-";
    }
    const transcurrido = new Date(milisegundos).toISOString().substr(14, 5);
    return transcurrido;

});
Vue.filter("milisegundosConHoras", milisegundos => {
    if (!milisegundos) {
        return "-";
    }
    const transcurrido = new Date(milisegundos).toISOString().substr(11, 8);
    return transcurrido;

});

new Vue({
    vuetify,
    render: h => h(App)
}).$mount('#app')
