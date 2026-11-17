# Agencia Web

Aplicación web de una agencia de autos.

**Stack:** Vue 3 · TypeScript · Pinia · Vue Router · Vite · Vitest · Playwright

## Requisitos

| Forma de ejecución       | Necesitas                                |
| ------------------------ | ---------------------------------------- |
| Con Docker (recomendada) | Docker con Compose v2 (`docker compose`) |
| Sin Docker               | Node `^22.18.0` o `>=24.12.0` y npm 11   |

> **Importante:** ejecuta todos los comandos desde la raíz del proyecto, donde está el `docker-compose.yml`.
> Si ves `no configuration file provided: not found`, estás en otra carpeta.

## Levantar el proyecto con Docker

### Desarrollo (hot reload)

```sh
docker compose up --build dev
```

Abre <http://localhost:5173>. Los cambios en `src/` se reflejan al instante.

Para segundo plano y para detenerlo:

```sh
docker compose up -d --build dev
docker compose down
```

### Producción local (build + Nginx)

```sh
docker compose --profile prod up --build prod
```

Abre <http://localhost:8081>. El `build` ejecuta el type-check y genera los estáticos que sirve Nginx. Nginx devuelve `index.html` en cualquier ruta, así que Vue Router en modo history funciona al recargar la página.

Si el puerto 8081 está ocupado, usa otro:

```sh
PROD_PORT=9090 docker compose --profile prod up --build prod
```

### Variables de entorno

- **Desarrollo:** crea un archivo `.env` en la raíz (opcional). Compose lo carga solo.
- **Producción:** las variables `VITE_*` se incrustan en el bundle durante el build. Hoy el `Dockerfile` acepta `VITE_API_URL`:

  ```sh
  VITE_API_URL=https://api.ejemplo.com docker compose --profile prod up --build prod
  ```

  Para añadir otra variable `VITE_*`, declárala como `ARG`/`ENV` en la etapa `build` del `Dockerfile` y como `args` en el servicio `prod` de `docker-compose.yml`.

### Dependencias nuevas

`node_modules` vive dentro del contenedor, no en tu máquina. Tras añadir un paquete, reconstruye la imagen:

```sh
docker compose build dev
```

### Estructura de Docker

| Archivo              | Para qué sirve                                              |
| -------------------- | ----------------------------------------------------------- |
| `Dockerfile`         | Etapas `deps`, `dev`, `build` y `prod`                      |
| `docker-compose.yml` | Servicios `dev` y `prod` (este último con el perfil `prod`) |
| `nginx.conf`         | Configuración de Nginx para la SPA                          |
| `.dockerignore`      | Archivos que no se copian a la imagen                       |

## Levantar el proyecto sin Docker

```sh
npm install
npm run dev
```

Abre <http://localhost:5173>.

> **Si `npm install` falla** con `Cannot read properties of null (reading 'edgesOut')`, es un bug del resolvedor de npm 9 y 10. Actualiza a npm 11 (`npm install -g npm@11`) o ejecuta `npx npm@11 install`.

## Scripts

| Comando              | Descripción                                               |
| -------------------- | --------------------------------------------------------- |
| `npm run dev`        | Servidor de desarrollo con hot reload                     |
| `npm run build`      | Type-check y build de producción en `dist/`               |
| `npm run preview`    | Sirve el build de producción en local                     |
| `npm run type-check` | Verifica tipos con `vue-tsc`                              |
| `npm run lint`       | Ejecuta oxlint y ESLint con autofix                       |
| `npm run format`     | Formatea `src/` con Prettier                              |
| `npm run test:unit`  | Tests unitarios con [Vitest](https://vitest.dev/)         |
| `npm run test:e2e`   | Tests end-to-end con [Playwright](https://playwright.dev) |

### Tests end-to-end

```sh
# Solo la primera vez: instala los navegadores
npx playwright install

# Todos los tests, o solo Chromium
npm run test:e2e
npm run test:e2e -- --project=chromium

# Modo debug
npm run test:e2e -- --debug
```

## Configuración recomendada del editor

- [VS Code](https://code.visualstudio.com/) con la extensión [Vue (Official)](https://marketplace.visualstudio.com/items?itemName=Vue.volar). Desactiva Vetur.
- Navegador: [Vue.js devtools](https://chromewebstore.google.com/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd) para Chromium o [para Firefox](https://addons.mozilla.org/en-US/firefox/addon/vue-js-devtools/).

Referencia de configuración de Vite: <https://vite.dev/config/>.
