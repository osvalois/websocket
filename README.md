# Servidor WebSocket con Bun

Este proyecto implementa un servidor WebSocket utilizando Bun, un runtime de JavaScript y toolkit todo en uno. El servidor permite la comunicación en tiempo real entre clientes a través de WebSockets y también proporciona una API HTTP para enviar mensajes.

## Características

- Servidor WebSocket para comunicación en tiempo real
- API HTTP para enviar mensajes
- Manejo de CORS para permitir conexiones desde diferentes orígenes
- Servicio de archivos estáticos
- Implementación eficiente utilizando Bun

## Requisitos previos

- [Bun](https://bun.sh/) (versión 1.0.0 o superior)
- [Docker](https://www.docker.com/) (opcional, para despliegue containerizado)

## Instalación

1. Clonar el repositorio:
   ```
   git clone https://github.com/tu-usuario/bun-websocket-server.git
   cd bun-websocket-server
   ```

2. Instalar dependencias:
   ```
   bun install
   ```

## Uso

### Desarrollo local

Para ejecutar el servidor en modo de desarrollo con recarga en caliente:

```
bun run dev
```

El servidor estará disponible en `http://localhost:3000`.

### Producción

Para ejecutar el servidor en modo de producción:

```
bun run start
```

### Docker

Para construir y ejecutar el servidor utilizando Docker:

1. Construir la imagen:
   ```
   docker build -t bun-websocket-server .
   ```

2. Ejecutar el contenedor:
   ```
   docker run -p 3000:3000 bun-websocket-server
   ```

## API

### WebSocket

Conectarse al WebSocket:

```javascript
const socket = new WebSocket('ws://localhost:3000');
```

### HTTP

Enviar un mensaje a través de la API HTTP:

```
POST /send
Content-Type: application/json

{
  "message": "Hola, mundo!"
}
```

## Estructura del proyecto

```
.
├── public/             # Archivos estáticos
│   └── index.html      # Página de cliente de ejemplo
├── server.js           # Código principal del servidor
├── package.json        # Configuración del proyecto
├── Dockerfile          # Configuración de Docker
└── README.md           # Este archivo
```

## Contribuir

Las contribuciones son bienvenidas. Por favor, abre un issue para discutir cambios mayores antes de crear un pull request.

## Licencia

[MIT](https://choosealicense.com/licenses/mit/)