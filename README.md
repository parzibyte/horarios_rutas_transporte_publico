# horarios

# Convirtiendo en PWA
Ejecutar `npm run build` para compilar la app.


Luego instalar sw-precache con `npm install --global sw-precache`. Para generar el archivo
**service-worker.js** entramos a **dist** con `cd dist` y ejecutamos: `sw-precache`.

Ahora todo lo que necesitamos es publicar toda la carpeta de **dist**, puedes subirla a un servidor
local para probar, en ese caso abrimos la consola de depuración, pestaña **Application** > **Manifest** y todo
debe estar bien.

Ahora subimos eso a un sitio https, puede ser GitHub pages, visitamos página con dispositivo
móvil, **Menú** > **Instalar aplicación**.


Si quieres hostearla en este mismo repositorio, renombra **dist** a **docs** y configura en github.
Branch master, ruta **/docs**

Listo

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

# iconos
<div>Iconos diseñados por <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.es/" title="Flaticon">www.flaticon.es</a></div>