(function(e){function r(r){for(var t,i,s=r[0],c=r[1],u=r[2],d=0,m=[];d<s.length;d++)i=s[d],Object.prototype.hasOwnProperty.call(n,i)&&n[i]&&m.push(n[i][0]),n[i]=0;for(t in c)Object.prototype.hasOwnProperty.call(c,t)&&(e[t]=c[t]);l&&l(r);while(m.length)m.shift()();return o.push.apply(o,u||[]),a()}function a(){for(var e,r=0;r<o.length;r++){for(var a=o[r],t=!0,s=1;s<a.length;s++){var c=a[s];0!==n[c]&&(t=!1)}t&&(o.splice(r--,1),e=i(i.s=a[0]))}return e}var t={},n={app:0},o=[];function i(r){if(t[r])return t[r].exports;var a=t[r]={i:r,l:!1,exports:{}};return e[r].call(a.exports,a,a.exports,i),a.l=!0,a.exports}i.m=e,i.c=t,i.d=function(e,r,a){i.o(e,r)||Object.defineProperty(e,r,{enumerable:!0,get:a})},i.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,r){if(1&r&&(e=i(e)),8&r)return e;if(4&r&&"object"===typeof e&&e&&e.__esModule)return e;var a=Object.create(null);if(i.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:e}),2&r&&"string"!=typeof e)for(var t in e)i.d(a,t,function(r){return e[r]}.bind(null,t));return a},i.n=function(e){var r=e&&e.__esModule?function(){return e["default"]}:function(){return e};return i.d(r,"a",r),r},i.o=function(e,r){return Object.prototype.hasOwnProperty.call(e,r)},i.p="./";var s=window["webpackJsonp"]=window["webpackJsonp"]||[],c=s.push.bind(s);s.push=r,s=s.slice();for(var u=0;u<s.length;u++)r(s[u]);var l=c;o.push([0,"chunk-vendors"]),a()})({0:function(e,r,a){e.exports=a("56d7")},1:function(e,r){},"56d7":function(e,r,a){"use strict";a.r(r);a("99af"),a("4de4"),a("e260"),a("e6cf"),a("cca6"),a("a79d");var t=a("2b0e"),n=function(){var e=this,r=e.$createElement,a=e._self._c||r;return a("v-app",[a("v-main",[a("Principal")],1)],1)},o=[],i=function(){var e=this,r=e.$createElement,a=e._self._c||r;return a("div",[a("v-tabs",{attrs:{"background-color":"cyan",dark:"","fixed-tabs":"","icons-and-text":""},model:{value:e.tab,callback:function(r){e.tab=r},expression:"tab"}},[a("v-tabs-slider",{attrs:{color:"yellow"}}),a("v-tab",[e._v(" Rutas "),a("v-icon",[e._v("mdi-bus")])],1),a("v-tab",[e._v(" Horarios "),a("v-icon",[e._v("mdi-clipboard-clock")])],1),a("v-tab",[e._v(" Reportes "),a("v-icon",[e._v("mdi-file-table-box-multiple")])],1),a("v-tab",[e._v(" Acerca de "),a("v-icon",[e._v("mdi-information-outline")])],1)],1),a("v-tabs-items",{model:{value:e.tab,callback:function(r){e.tab=r},expression:"tab"}},[a("v-tab-item",[a("Rutas",{on:{actualizadas:e.actualizarRutasEnHorarios}})],1),a("v-tab-item",[a("Horarios",{ref:"horarios",on:{actualizados:function(r){return e.actualizarReporte()}}})],1),a("v-tab-item",[a("Reportes",{ref:"reportes"})],1),a("v-tab-item",[a("AcercaDe")],1)],1)],1)},s=[],c=function(){var e=this,r=e.$createElement,a=e._self._c||r;return a("v-card",{attrs:{flat:""}},[a("ConfirmarEliminacionRuta",{attrs:{ruta:e.rutaSeleccionada,mostrar:e.mostrarDialogoEliminar},on:{confirmado:function(r){return e.eliminarRutaSeleccionada()},cerrar:e.cerrarDialogo}}),a("AgregarRuta",{attrs:{mostrar:e.mostrarDialogoAgregar},on:{guardada:e.onRutaGuardada,cerrar:function(r){e.mostrarDialogoAgregar=!1}}}),e.rutas.length>0?a("div",e._l(e.rutas,(function(r,t){return a("div",{key:t},[a("v-list-item",{attrs:{"two-line":""},on:{click:function(a){return e.confirmarEliminacion(r)}}},[a("v-list-item-content",[a("v-list-item-title",[e._v(e._s(r.nombre))])],1)],1),a("v-divider")],1)})),0):a("div",[a("v-alert",{staticClass:"mx-2 my-2",attrs:{dense:"",type:"info"}},[e._v(" Todavía no hay rutas. Agrega una con el botón flotante ")])],1),a("v-btn",{attrs:{color:"primary",fab:"",elevation:"2",right:"",bottom:"",fixed:""},on:{click:function(r){return e.mostrarDialogoAgregarRuta()}}},[a("v-icon",[e._v("mdi-plus")])],1),a("v-snackbar",{attrs:{top:"",timeout:"700"},model:{value:e.snackbar.mostrar,callback:function(r){e.$set(e.snackbar,"mostrar",r)},expression:"snackbar.mostrar"}},[e._v(" "+e._s(e.snackbar.texto)+" ")])],1)},u=[],l=(a("96cf"),a("1da1")),d=function(){var e=this,r=e.$createElement,a=e._self._c||r;return a("v-dialog",{attrs:{persistent:"","max-width":"290"},model:{value:e.mostrar,callback:function(r){e.mostrar=r},expression:"mostrar"}},[a("v-card",[a("v-card-title",{staticClass:"headline"},[e._v(" Confirmación ")]),a("v-card-text",[e._v("¿Eliminar "),a("strong",[e._v(e._s(e.ruta.nombre))]),e._v("?"),a("br"),e._v(" Se van a eliminar los horarios relacionados ")]),a("v-card-actions",[a("v-spacer"),a("v-btn",{attrs:{text:""},on:{click:e.cerrar}},[e._v(" Cancelar ")]),a("v-btn",{attrs:{color:"red darken-1",text:""},on:{click:e.confirmar}},[e._v(" Eliminar ")])],1)],1)],1)},m=[],v={props:["mostrar","ruta"],name:"ConfirmarEliminacionRuta",data:function(){return{}},methods:{cerrar:function(){this.$emit("cerrar")},confirmar:function(){this.$emit("confirmado")}}},f=v,p=a("2877"),h=a("6544"),b=a.n(h),g=a("8336"),_=a("b0af"),R=a("99d9"),x=a("169a"),w=a("2fa4"),k=Object(p["a"])(f,d,m,!1,null,"6fe8b434",null),O=k.exports;b()(k,{VBtn:g["a"],VCard:_["a"],VCardActions:R["a"],VCardText:R["b"],VCardTitle:R["c"],VDialog:x["a"],VSpacer:w["a"]});var S=function(){var e=this,r=e.$createElement,a=e._self._c||r;return a("v-dialog",{attrs:{persistent:"","max-width":"290"},model:{value:e.mostrar,callback:function(r){e.mostrar=r},expression:"mostrar"}},[a("v-card",[a("v-card-title",{staticClass:"headline"},[e._v(" Nueva ruta ")]),a("v-form",{ref:"formulario",staticClass:"mx-2",model:{value:e.formularioValido,callback:function(r){e.formularioValido=r},expression:"formularioValido"}},[a("v-text-field",{attrs:{rules:e.reglasValidacion.nombre,label:"Nombre",required:""},model:{value:e.ruta.nombre,callback:function(r){e.$set(e.ruta,"nombre",r)},expression:"ruta.nombre"}})],1),a("v-card-actions",[a("v-spacer"),a("v-btn",{attrs:{text:""},on:{click:e.cerrar}},[e._v(" Cancelar ")]),a("v-btn",{attrs:{color:"green darken-1",disabled:!e.formularioValido,text:""},on:{click:e.guardar}},[e._v(" Guardar ")])],1)],1)],1)},C=[],V=(a("7db0"),a("16b2")),I=a("5d16");V["a"].plugin(I["a"]);var T=new V["a"]("rutas");T.createIndex({index:{fields:["hora"]}});var A=T,y=(a("d3b7"),a("25f0"),{restarHorarios:function(e,r){var a=this.formatearFechaActual(),t=new Date(a+" "+e),n=new Date(a+" "+r);return t-n},idConSufijo:function(e){return e.concat("_",this.formatearFechaYHoraParaId())},formatearFechaYHoraParaId:function(){var e=new Date,r=e.getMonth()+1,a=e.getDate(),t="".concat(e.getFullYear(),"-").concat(this.agregarCeroSiEsNecesario(r),"-").concat(this.agregarCeroSiEsNecesario(a)),n="".concat(this.agregarCeroSiEsNecesario(e.getHours()),"_").concat(this.agregarCeroSiEsNecesario(e.getMinutes()),"_").concat(this.agregarCeroSiEsNecesario(e.getSeconds()));return t+"_"+n},formatearHoraActual:function(){var e=new Date;return"".concat(this.agregarCeroSiEsNecesario(e.getHours()),":").concat(this.agregarCeroSiEsNecesario(e.getMinutes()),":").concat(this.agregarCeroSiEsNecesario(e.getSeconds()))},formatearFechaActual:function(){var e=new Date,r=e.getMonth()+1,a=e.getDate();return"".concat(e.getFullYear(),"-").concat(this.agregarCeroSiEsNecesario(r),"-").concat(this.agregarCeroSiEsNecesario(a))},agregarCeroSiEsNecesario:function(e){return e<10?"0".concat(e):e.toString()}}),j=y,H="Rojo",D="Combi",E={TIPO_ROJO:H,TIPO_COMBI:D,TIPOS_UNIDAD:[D,H],PREFIJO_RUTAS:"rutas",PREFIJO_HORARIOS:"horarios"},P=E,$=a("b85c"),F={eliminarDeRuta:function(e){return Object(l["a"])(regeneratorRuntime.mark((function r(){var a,t,n,o;return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:return r.next=2,A.find({selector:{_id:{$gte:P.PREFIJO_HORARIOS,$lte:P.PREFIJO_HORARIOS+"￰"},idRuta:e}});case 2:a=r.sent,t=Object($["a"])(a.docs),r.prev=4,t.s();case 6:if((n=t.n()).done){r.next=14;break}return o=n.value,console.log("Eliminando"),console.log(o),r.next=12,A.remove(o);case 12:r.next=6;break;case 14:r.next=19;break;case 16:r.prev=16,r.t0=r["catch"](4),t.e(r.t0);case 19:return r.prev=19,t.f(),r.finish(19);case 22:case"end":return r.stop()}}),r,null,[[4,16,19,22]])})))()},nuevo:function(e,r,a,t,n){return Object(l["a"])(regeneratorRuntime.mark((function o(){return regeneratorRuntime.wrap((function(o){while(1)switch(o.prev=o.next){case 0:return o.next=2,A.put({_id:j.idConSufijo(P.PREFIJO_HORARIOS),idRuta:e,fecha:r,hora:a,tipoUnidad:t,numero:n});case 2:return o.abrupt("return",o.sent);case 3:case"end":return o.stop()}}),o)})))()},obtenerPorFechaEIdRuta:function(e,r){return Object(l["a"])(regeneratorRuntime.mark((function a(){var t;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return a.next=2,A.find({selector:{_id:{$gte:P.PREFIJO_HORARIOS,$lte:P.PREFIJO_HORARIOS+"￰"},fecha:e,idRuta:r,hora:{$gte:null}},sort:[{hora:"desc"}]});case 2:return t=a.sent,a.abrupt("return",t.docs);case 4:case"end":return a.stop()}}),a)})))()},obtenerUltimoHorarioRegistrado:function(e,r){return Object(l["a"])(regeneratorRuntime.mark((function a(){var t,n;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return a.next=2,A.find({selector:{_id:{$gte:P.PREFIJO_HORARIOS,$lte:P.PREFIJO_HORARIOS+"￰"},fecha:e,idRuta:r,hora:{$gt:null}},sort:[{hora:"desc"}],limit:1});case 2:if(t=a.sent,n=t.docs,!(n.length<=0)){a.next=6;break}return a.abrupt("return","");case 6:return a.abrupt("return",n[0]);case 7:case"end":return a.stop()}}),a)})))()},eliminar:function(e){return Object(l["a"])(regeneratorRuntime.mark((function r(){return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:return r.next=2,A.remove(e);case 2:return r.abrupt("return",r.sent);case 3:case"end":return r.stop()}}),r)})))()}},U=F,N={nueva:function(e){return Object(l["a"])(regeneratorRuntime.mark((function r(){return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:return r.next=2,A.put({_id:j.idConSufijo(P.PREFIJO_RUTAS),nombre:e});case 2:return r.abrupt("return",r.sent);case 3:case"end":return r.stop()}}),r)})))()},obtener:function(){return Object(l["a"])(regeneratorRuntime.mark((function e(){var r;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,A.find({selector:{_id:{$gte:P.PREFIJO_RUTAS,$lte:P.PREFIJO_RUTAS+"￰"}}});case 2:return r=e.sent,e.abrupt("return",r.docs);case 4:case"end":return e.stop()}}),e)})))()},eliminar:function(e){return Object(l["a"])(regeneratorRuntime.mark((function r(){return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:return r.next=2,U.eliminarDeRuta(e._id);case 2:return r.next=4,A.remove(e);case 4:return r.abrupt("return",r.sent);case 5:case"end":return r.stop()}}),r)})))()}},J=N,M={name:"AgregarRuta",props:["mostrar"],data:function(){return{ruta:{nombre:""},formularioValido:!1,reglasValidacion:{nombre:[function(e){return!!e||"Escribe el nombre"}]}}},methods:{antesDeCerrar:function(){this.$refs.formulario.resetValidation(),this.$refs.formulario.reset()},cerrar:function(){this.antesDeCerrar(),this.$emit("cerrar")},guardar:function(){var e=this;return Object(l["a"])(regeneratorRuntime.mark((function r(){return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:return r.next=2,J.nueva(e.ruta.nombre);case 2:e.ruta.nombre="",e.antesDeCerrar(),e.$emit("guardada");case 5:case"end":return r.stop()}}),r)})))()}}},L=M,z=a("4bd4"),B=a("8654"),G=Object(p["a"])(L,S,C,!1,null,null,null),Y=G.exports;b()(G,{VBtn:g["a"],VCard:_["a"],VCardActions:R["a"],VCardTitle:R["c"],VDialog:x["a"],VForm:z["a"],VSpacer:w["a"],VTextField:B["a"]});var q={name:"Rutas",components:{AgregarRuta:Y,ConfirmarEliminacionRuta:O},data:function(){return{rutas:[],rutaSeleccionada:{},mostrarDialogoEliminar:!1,mostrarDialogoAgregar:!1,snackbar:{mostrar:!1,texto:""}}},mounted:function(){this.obtenerRutas()},methods:{onRutaGuardada:function(){this.snackbar.mostrar=!0,this.snackbar.texto="Ruta guardada",this.mostrarDialogoAgregar=!1,this.$emit("actualizadas"),this.obtenerRutas()},mostrarDialogoAgregarRuta:function(){this.mostrarDialogoAgregar=!0},confirmarEliminacion:function(e){this.rutaSeleccionada=e,this.mostrarDialogoEliminar=!0},eliminarRutaSeleccionada:function(){var e=this;return Object(l["a"])(regeneratorRuntime.mark((function r(){return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:return r.next=2,J.eliminar(e.rutaSeleccionada);case 2:e.rutaSeleccionada={},e.mostrarDialogoEliminar=!1,e.$emit("actualizadas"),e.obtenerRutas();case 6:case"end":return r.stop()}}),r)})))()},cerrarDialogo:function(){this.mostrarDialogoEliminar=!1},obtenerRutas:function(){var e=this;return Object(l["a"])(regeneratorRuntime.mark((function r(){return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:return r.next=2,J.obtener();case 2:e.rutas=r.sent;case 3:case"end":return r.stop()}}),r)})))()}}},K=q,W=a("0798"),Q=a("ce7e"),X=a("132d"),Z=a("da13"),ee=a("5d23"),re=a("2db4"),ae=Object(p["a"])(K,c,u,!1,null,"156af335",null),te=ae.exports;b()(ae,{VAlert:W["a"],VBtn:g["a"],VCard:_["a"],VDivider:Q["a"],VIcon:X["a"],VListItem:Z["a"],VListItemContent:ee["a"],VListItemTitle:ee["b"],VSnackbar:re["a"]});var ne=function(){var e=this,r=e.$createElement,a=e._self._c||r;return a("v-card",{attrs:{flat:""}},[a("DialogoAgregarHorario",{attrs:{ruta:e.rutaSeleccionada,mostrar:e.dialogoRegistrarHorario},on:{guardado:e.onHorarioGuardado,cerrar:function(r){e.dialogoRegistrarHorario=!1}}}),e.rutas.length>0?a("div",e._l(e.rutas,(function(r,t){return a("div",{key:t},[a("v-list-item",{attrs:{"three-line":""},on:{click:function(a){return e.registrarHorario(r)}}},[a("v-list-item-content",[a("v-list-item-title",[a("h5",{staticClass:"text-h4"},[e._v(e._s(r.nombre))]),r.horario?a("div",[a("h5",{staticClass:"text-h6"},[a("v-icon",[e._v("mdi-clock-outline")]),e._v(" "+e._s(r.horario.hora)+" | Hace "+e._s(e._f("milisegundosALegible")(r.transcurrido))+" ")],1),a("TipoTransporte",{attrs:{horario:r.horario}})],1):a("div",[a("p",[e._v(" Sin información de horario. Toca para agregar ")])])])],1)],1),a("v-divider")],1)})),0):a("div",[a("v-alert",{staticClass:"mx-2 my-2",attrs:{dense:"",type:"info"}},[e._v(" Todavía no hay rutas. Ve a "),a("strong",[e._v("Rutas")]),e._v(" y agrega algunas ")])],1),a("v-snackbar",{attrs:{top:"",timeout:"700"},model:{value:e.snackbar.mostrar,callback:function(r){e.$set(e.snackbar,"mostrar",r)},expression:"snackbar.mostrar"}},[e._v(" "+e._s(e.snackbar.texto)+" ")]),a("v-btn",{attrs:{color:"primary",fab:"",elevation:"2",right:"",bottom:"",fixed:""},on:{click:function(r){return e.clickBoton()}}},[a("v-icon",{directives:[{name:"show",rawName:"v-show",value:e.pausado,expression:"pausado"}]},[e._v("mdi-play")]),a("v-icon",{directives:[{name:"show",rawName:"v-show",value:!e.pausado,expression:"!pausado"}]},[e._v("mdi-pause")])],1)],1)},oe=[],ie=function(){var e=this,r=e.$createElement,a=e._self._c||r;return a("v-dialog",{attrs:{persistent:"","max-width":"350"},model:{value:e.mostrar,callback:function(r){e.mostrar=r},expression:"mostrar"}},[a("v-card",[a("v-card-title",{staticClass:"headline"},[e._v("Registrar pase")]),a("v-alert",{staticClass:"mx-2 my-2",attrs:{dense:"",type:"info"}},[a("strong",[e._v(e._s(e.ruta.nombre))])]),a("v-container",[a("v-row",[a("v-col",[a("v-select",{attrs:{items:e.tipos,label:"Tipo de unidad"},model:{value:e.tipoUnidad,callback:function(r){e.tipoUnidad=r},expression:"tipoUnidad"}})],1),a("v-col",[a("v-text-field",{attrs:{label:"Número",type:"number"},model:{value:e.numeroUnidad,callback:function(r){e.numeroUnidad=r},expression:"numeroUnidad"}})],1)],1)],1),a("div",{directives:[{name:"show",rawName:"v-show",value:!e.tomarHoraActual,expression:"!tomarHoraActual"}]},[a("v-time-picker",{attrs:{"full-width":"",format:"ampm","use-seconds":""},model:{value:e.horario,callback:function(r){e.horario=r},expression:"horario"}}),a("div",{directives:[{name:"show",rawName:"v-show",value:!e.horario,expression:"!horario"}]},[a("p",[e._v("Por favor selecciona el horario")])]),a("div",{directives:[{name:"show",rawName:"v-show",value:e.horario,expression:"horario"}]},[e._v(" Se registrará con la hora: "),a("strong",[e._v(e._s(e.horario))])])],1),a("v-card-actions",[a("v-spacer"),a("v-btn",{attrs:{text:""},on:{click:e.cerrar}},[e._v(" Cancelar ")]),a("v-btn",{attrs:{color:"green darken-1",text:""},on:{click:e.guardar}},[e._v(" Guardar ")])],1)],1)],1)},se=[],ce={props:["mostrar","ruta"],name:"DialogoAgregarHorario",data:function(){return{horario:"",horaRefrescada:"",idInterval:null,tomarHoraActual:!0,tipos:[],tipoUnidad:"",numeroUnidad:""}},mounted:function(){var e=this;this.tipos=P.TIPOS_UNIDAD,this.tipoUnidad=this.tipos[0],this.idInterval=setInterval((function(){e.refrescarHora()}),500)},beforeDestroy:function(){console.log("Destroy!")},methods:{antesDeCerrar:function(){this.tipoUnidad=this.tipos[0],this.numeroUnidad=""},refrescarHora:function(){this.horaRefrescada=j.formatearHoraActual()},cerrar:function(){this.antesDeCerrar(),this.$emit("cerrar")},guardar:function(){var e=this;return Object(l["a"])(regeneratorRuntime.mark((function r(){var a;return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:if(e.tomarHoraActual||e.horario){r.next=2;break}return r.abrupt("return");case 2:return a="",a=e.tomarHoraActual?j.formatearHoraActual():e.horario,r.next=6,U.nuevo(e.ruta._id,j.formatearFechaActual(),a,e.tipoUnidad,e.numeroUnidad);case 6:e.antesDeCerrar(),e.$emit("guardado");case 8:case"end":return r.stop()}}),r)})))()}}},ue=ce,le=a("62ad"),de=a("a523"),me=a("0fd9"),ve=a("b974"),fe=a("c964"),pe=Object(p["a"])(ue,ie,se,!1,null,null,null),he=pe.exports;b()(pe,{VAlert:W["a"],VBtn:g["a"],VCard:_["a"],VCardActions:R["a"],VCardTitle:R["c"],VCol:le["a"],VContainer:de["a"],VDialog:x["a"],VRow:me["a"],VSelect:ve["a"],VSpacer:w["a"],VTextField:B["a"],VTimePicker:fe["a"]});var be=function(){var e=this,r=e.$createElement,a=e._self._c||r;return a("div",[a("v-icon",[e._v("mdi-bus")]),a("v-badge",{attrs:{bordered:"",color:this.esRojo()?"error":"info",overlap:"",content:e.horario.numero,value:e.horario.numero}},[a("v-btn",{staticClass:"white--text",attrs:{color:this.esRojo()?"error":"info",depressed:""}},[e._v(" "+e._s(e.horario.tipoUnidad)+" ")])],1)],1)},ge=[],_e={name:"TipoTransporte",props:["horario"],methods:{esRojo:function(){return this.horario.tipoUnidad===P.TIPO_ROJO}}},Re=_e,xe=a("4ca6"),we=Object(p["a"])(Re,be,ge,!1,null,"a8b523de",null),ke=we.exports;b()(we,{VBadge:xe["a"],VBtn:g["a"],VIcon:X["a"]});var Oe={name:"Horarios",components:{TipoTransporte:ke,DialogoAgregarHorario:he},data:function(){return{snackbar:{texto:"",mostrar:!1},dialogoRegistrarHorario:!1,rutas:[],rutaSeleccionada:{},idInterval:null,pausado:!1}},mounted:function(){var e=this;return Object(l["a"])(regeneratorRuntime.mark((function r(){return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:return r.next=2,e.obtenerRutas();case 2:e.iniciarIntervalRefrescarTiempo();case 3:case"end":return r.stop()}}),r)})))()},methods:{clickBoton:function(){this.pausado?(this.iniciarIntervalRefrescarTiempo(),this.pausado=!1):(clearInterval(this.idInterval),this.pausado=!0)},iniciarIntervalRefrescarTiempo:function(){var e=this;clearInterval(this.idInterval),this.refrescarTiempoTranscurrido(),this.idInterval=setInterval((function(){e.refrescarTiempoTranscurrido()}),2e3)},refrescarTiempoTranscurrido:function(){var e,r=j.formatearFechaActual(),a=new Date,t=Object($["a"])(this.rutas);try{for(t.s();!(e=t.n()).done;){var n=e.value;if(n.horario.hora){var o=new Date(r+" "+n.horario.hora);n.transcurrido=a-o}else n.transcurrido=""}}catch(i){t.e(i)}finally{t.f()}},onHorarioGuardado:function(){var e=this;return Object(l["a"])(regeneratorRuntime.mark((function r(){return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:return e.snackbar={texto:"Horario guardado",mostrar:!0},r.next=3,e.obtenerRutas();case 3:e.dialogoRegistrarHorario=!1,e.$emit("actualizados");case 5:case"end":return r.stop()}}),r)})))()},registrarHorario:function(e){this.rutaSeleccionada=e,this.dialogoRegistrarHorario=!0},obtenerRutas:function(){var e=this;return Object(l["a"])(regeneratorRuntime.mark((function r(){var a,t,n,o,i;return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:return a=j.formatearFechaActual(),r.next=3,J.obtener();case 3:t=r.sent,n=Object($["a"])(t),r.prev=5,n.s();case 7:if((o=n.n()).done){r.next=15;break}return i=o.value,r.next=11,U.obtenerUltimoHorarioRegistrado(a,i._id);case 11:i.horario=r.sent,i.transcurrido=0;case 13:r.next=7;break;case 15:r.next=20;break;case 17:r.prev=17,r.t0=r["catch"](5),n.e(r.t0);case 20:return r.prev=20,n.f(),r.finish(20);case 23:e.rutas=t;case 24:case"end":return r.stop()}}),r,null,[[5,17,20,23]])})))()}}},Se=Oe,Ce=Object(p["a"])(Se,ne,oe,!1,null,null,null),Ve=Ce.exports;b()(Ce,{VAlert:W["a"],VBtn:g["a"],VCard:_["a"],VDivider:Q["a"],VIcon:X["a"],VListItem:Z["a"],VListItemContent:ee["a"],VListItemTitle:ee["b"],VSnackbar:re["a"]});var Ie=function(){var e=this,r=e.$createElement,a=e._self._c||r;return a("v-card",{staticClass:"mx-2",attrs:{flat:""}},[a("v-dialog",{ref:"dialog",attrs:{"return-value":e.fechaSeleccionada,persistent:"",width:"290px"},on:{"update:returnValue":function(r){e.fechaSeleccionada=r},"update:return-value":function(r){e.fechaSeleccionada=r}},scopedSlots:e._u([{key:"activator",fn:function(r){var t=r.on,n=r.attrs;return[a("v-text-field",e._g(e._b({attrs:{label:"Fecha","prepend-icon":"mdi-calendar",readonly:""},on:{change:function(r){return e.obtenerHorariosConFechaYRutaSeleccionada()}},model:{value:e.fechaSeleccionada,callback:function(r){e.fechaSeleccionada=r},expression:"fechaSeleccionada"}},"v-text-field",n,!1),t))]}}]),model:{value:e.modal,callback:function(r){e.modal=r},expression:"modal"}},[a("v-date-picker",{attrs:{locale:"es-la",scrollable:""},on:{change:function(r){return e.obtenerHorariosConFechaYRutaSeleccionada()}},model:{value:e.fechaSeleccionada,callback:function(r){e.fechaSeleccionada=r},expression:"fechaSeleccionada"}},[a("v-spacer"),a("v-btn",{attrs:{text:"",color:"primary"},on:{click:function(r){e.modal=!1}}},[e._v(" Cancelar ")]),a("v-btn",{attrs:{text:"",color:"primary"},on:{click:function(r){return e.$refs.dialog.save(e.fechaSeleccionada)}}},[e._v(" OK ")])],1)],1),a("v-select",{attrs:{items:e.rutas,"item-text":"nombre","item-value":"_id",label:"Ruta","no-data-text":"No has registrado ninguna ruta"},on:{change:function(r){return e.obtenerHorariosConFechaYRutaSeleccionada()}},model:{value:e.rutaSeleccionada,callback:function(r){e.rutaSeleccionada=r},expression:"rutaSeleccionada"}}),e.horarios.length>0?a("div",[a("v-row",{attrs:{justify:"center"}},[a("h6",{staticClass:"text-h5"},[e._v("Promedios")])]),a("v-row",{attrs:{justify:"center"}},[a("v-chip",{staticClass:"mr-1",attrs:{color:"success"}},[e._v("General")]),a("v-chip",{staticClass:"mr-1",attrs:{color:"info"}},[e._v("Combi")]),a("v-chip",{attrs:{color:"red",dark:""}},[e._v("Rojo")])],1),a("v-row",{staticClass:"mt-4",attrs:{justify:"center"}},[a("v-chip",{staticClass:"mr-1 my-1",attrs:{color:"success"}},[e._v(e._s(e._f("milisegundosALegible")(e.promedios.general)))]),a("v-chip",{staticClass:"mr-1 my-1",attrs:{color:"info"}},[e._v(e._s(e._f("milisegundosALegible")(e.promedios.combi)))]),a("v-chip",{staticClass:"mr-1 my-1",attrs:{color:"red",dark:""}},[e._v(e._s(e._f("milisegundosALegible")(e.promedios.rojo)))])],1),a("v-divider",{staticClass:"mt-4"}),e._l(e.horarios,(function(r,t){return a("div",{key:t},[a("v-list-item",{attrs:{"two-line":""}},[a("v-list-item-content",[a("v-list-item-title",[a("h6",{staticClass:"text-h6"},[e._v(" "+e._s(r.hora)+" ")])]),a("TipoTransporte",{attrs:{horario:r}}),a("v-row",{attrs:{justify:"center"}},[a("v-col",[a("p",{directives:[{name:"show",rawName:"v-show",value:r.tiempoMismoTipo,expression:"horario.tiempoMismoTipo"}]},[a("strong",[e._v(e._s(r.tipoUnidad)+" anterior: "),a("br")]),e._v(" "+e._s(e._f("milisegundosALegible")(r.tiempoMismoTipo))+" ")])]),a("v-col",[a("p",{directives:[{name:"show",rawName:"v-show",value:r.tiempoGeneral,expression:"horario.tiempoGeneral"}]},[a("strong",[e._v("Transporte anterior: ")]),a("br"),e._v(" "+e._s(e._f("milisegundosALegible")(r.tiempoGeneral))+" ")])])],1)],1)],1),a("v-divider")],1)}))],2):a("div",[a("v-alert",{attrs:{type:"info"}},[e._v(" No hay horarios para la fecha y ruta seleccionados ")])],1)],1)},Te=[],Ae={name:"Reportes",components:{TipoTransporte:ke},data:function(){return{fechaSeleccionada:"",rutas:[],modal:!1,rutaSeleccionada:"",horarios:[],promedios:{rojo:"",combi:"",general:""},TIPO_COMBI:P.TIPO_COMBI}},mounted:function(){var e=this;return Object(l["a"])(regeneratorRuntime.mark((function r(){return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:return r.next=2,e.refrescarTodo();case 2:case"end":return r.stop()}}),r)})))()},methods:{refrescarTodo:function(){var e=this;return Object(l["a"])(regeneratorRuntime.mark((function r(){return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:return e.fechaSeleccionada=j.formatearFechaActual(),r.next=3,e.obtenerRutas();case 3:return e.rutas.length>0&&(e.rutaSeleccionada=e.rutas[0]._id),r.next=6,e.obtenerHorariosConFechaYRutaSeleccionada();case 6:case"end":return r.stop()}}),r)})))()},obtenerRutas:function(){var e=this;return Object(l["a"])(regeneratorRuntime.mark((function r(){return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:return r.next=2,J.obtener();case 2:e.rutas=r.sent;case 3:case"end":return r.stop()}}),r)})))()},obtenerHorariosConFechaYRutaSeleccionada:function(){var e=this;return Object(l["a"])(regeneratorRuntime.mark((function r(){var a,t,n,o,i,s,c,u,l,d,m,v,f,p;return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:if(e.fechaSeleccionada&&e.rutaSeleccionada){r.next=2;break}return r.abrupt("return");case 2:return r.next=4,U.obtenerPorFechaEIdRuta(e.fechaSeleccionada,e.rutaSeleccionada);case 4:if(a=r.sent,a.length>0){for(t="",n="",o=0,i=0,s=0,c=0,u=0,a[a.length-1].tipoUnidad===P.TIPO_ROJO?t=a[a.length-1].hora:n=a[a.length-1].hora,l=a.length-2;l>=0;l--)d=a[l].hora,m=a[l+1].hora,v=j.restarHorarios(d,m),s+=v,a[l].tiempoGeneral=v,a[l].tipoUnidad===P.TIPO_ROJO?(t&&(f=j.restarHorarios(d,t),o+=f,c++,a[l].tiempoMismoTipo=f),t=d):(n&&(p=j.restarHorarios(d,n),i+=p,u++,a[l].tiempoMismoTipo=p),n=d);e.promedios.general=s/(a.length-1),e.promedios.rojo=o/c,e.promedios.combi=i/u}e.horarios=a;case 7:case"end":return r.stop()}}),r)})))()}}},ye=Ae,je=a("cc20"),He=a("2e4b"),De=Object(p["a"])(ye,Ie,Te,!1,null,null,null),Ee=De.exports;b()(De,{VAlert:W["a"],VBtn:g["a"],VCard:_["a"],VChip:je["a"],VCol:le["a"],VDatePicker:He["a"],VDialog:x["a"],VDivider:Q["a"],VListItem:Z["a"],VListItemContent:ee["a"],VListItemTitle:ee["b"],VRow:me["a"],VSelect:ve["a"],VSpacer:w["a"],VTextField:B["a"]});var Pe=function(){var e=this,r=e.$createElement,a=e._self._c||r;return a("v-card",{staticClass:"py-6 px-6",attrs:{flat:""}},[a("v-alert",{attrs:{type:"info"}},[a("h2",[e._v("Acerca de")]),a("p",[e._v("Creado y mantenido por "),a("a",{staticClass:"text-button",attrs:{href:"https://parzibyte.me/blog"}},[e._v("Parzibyte")]),e._v(". Código fuente disponible en "),a("a",{attrs:{href:"https://parzibyte.me/blog"}},[e._v("parzibyte.me/blog")])]),a("h2",[e._v("Créditos")]),a("p",[e._v(" Iconos diseñados por "),a("a",{attrs:{href:"https://www.freepik.com",title:"Freepik"}},[e._v("Freepik")]),e._v(" from "),a("a",{attrs:{href:"https://www.flaticon.es/",title:"Flaticon"}},[e._v("www.flaticon.es")])])])],1)},$e=[],Fe={name:"AcercaDe"},Ue=Fe,Ne=(a("742b"),Object(p["a"])(Ue,Pe,$e,!1,null,"109b8790",null)),Je=Ne.exports;b()(Ne,{VAlert:W["a"],VCard:_["a"]});var Me={name:"HelloWorld",components:{AcercaDe:Je,Reportes:Ee,Horarios:Ve,Rutas:te},data:function(){return{tab:1}},methods:{actualizarReporte:function(){this.$refs.reportes.refrescarTodo()},actualizarRutasEnHorarios:function(){this.$refs.horarios.obtenerRutas(),this.$refs.reportes.refrescarTodo()}}},Le=Me,ze=a("71a3"),Be=a("c671"),Ge=a("fe57"),Ye=a("aac8"),qe=a("9a96"),Ke=Object(p["a"])(Le,i,s,!1,null,null,null),We=Ke.exports;b()(Ke,{VIcon:X["a"],VTab:ze["a"],VTabItem:Be["a"],VTabs:Ge["a"],VTabsItems:Ye["a"],VTabsSlider:qe["a"]});var Qe={name:"App",components:{Principal:We},data:function(){return{}}},Xe=Qe,Ze=(a("cf25"),a("7496")),er=a("f6c4"),rr=Object(p["a"])(Xe,n,o,!1,null,null,null),ar=rr.exports;b()(rr,{VApp:Ze["a"],VMain:er["a"]});a("5363");var tr=a("f309");t["a"].use(tr["a"]);var nr=new tr["a"]({icons:{iconfont:"mdi"}});t["a"].config.productionTip=!1,t["a"].filter("milisegundosALegible",(function(e){if(!e)return"-";var r=new Date(e).toISOString().substr(11,8),a=parseInt(r.substring(0,2)),t=parseInt(r.substring(3,5)),n=parseInt(r.substring(6,8)),o="";return a&&(o=o.concat("".concat(a," hr").concat(a>1?"s":""," "))),t&&(o=o.concat("".concat(t," min").concat(t>1?"s":""," "))),n&&(o=o.concat("".concat(n," seg").concat(n>1?"s":""," "))),o})),new t["a"]({vuetify:nr,render:function(e){return e(ar)}}).$mount("#app")},"742b":function(e,r,a){"use strict";a("8a84")},"8a84":function(e,r,a){},cf25:function(e,r,a){"use strict";a("fea6")},fea6:function(e,r,a){}});
//# sourceMappingURL=app.f6ad08b3.js.map