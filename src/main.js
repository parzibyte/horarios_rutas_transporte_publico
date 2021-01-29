import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false
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

new Vue({
    vuetify,
    render: h => h(App)
}).$mount('#app')
