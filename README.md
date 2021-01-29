# horarios

# Convirtiendo en PWA
Ejecutar `npm run build`, copiar lo de **build** a un servidor web para probar
 y en esa carpeta abrir `index.html`, formatear el código
para que sea legible y agregar en el `head`:
````html
<link rel="manifest" href="./manifest.json">
<script type="text/javascript">
    if ("serviceWorker" in navigator) {
        // register service worker
        navigator.serviceWorker.register("service-worker.js");
    }
</script>
````
También agregar obviamente el manifest y las imágenes:
````json
{
  "name": "Checador del transporte",
  "short_name": "Checador",
  "theme_color": "#2196f3",
  "background_color": "#2196f3",
  "display": "fullscreen",
  "orientation": "portrait",
  "scope": "./",
  "start_url": "./",
  "icons": [
    {
      "src": "./images/icons-192.png",
      "type": "image/png",
      "sizes": "192x192"
    },
    {
      "src": "./images/icons-512.png",
      "type": "image/png",
      "sizes": "512x512"
    }
  ]
}
````
Luego instalar sw-precache con `npm install --global sw-precache`. Para generar el archivo
**service-worker.js** ejecutamos: `sw-precache`.

Todo listo, visitamos la página, abrimos consola de depuración, pestaña Application > Manifest y todo
debe estar bien

Ahora subimos eso a un sitio https, puede ser GitHub pages, visitamos página con dispositivo
móvil, Menú > Instalar aplicación.

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