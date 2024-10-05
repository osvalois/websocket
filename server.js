import { serve, file } from 'bun';
import { join } from 'path';

const port = process.env.PORT || 3000;

// Almacenar todas las conexiones WebSocket
const clients = new Set();

// Configurar el servidor
const server = serve({
  port: port,
  fetch(req, server) {
    const url = new URL(req.url);
    
    // Manejar la actualización a WebSocket
    if (server.upgrade(req)) {
      return; // Conexión actualizada a WebSocket
    }
    
    // Configurar headers CORS
    const headers = new Headers({
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type"
    });
    
    // Manejar solicitudes OPTIONS para CORS
    if (req.method === 'OPTIONS') {
      return new Response(null, { headers });
    }
    
    // Manejar la ruta POST /send
    if (req.method === 'POST' && url.pathname === '/send') {
      return handleSendMessage(req, headers);
    }
    
    // Servir archivos estáticos
    try {
      let path = url.pathname;
      if (path === '/') path = '/index.html';
      const filePath = join(import.meta.dir, 'public', path);
      const content = file(filePath);
      return new Response(content, { headers });
    } catch (error) {
      return new Response('Not Found', { status: 404, headers });
    }
  },
  websocket: {
    open(ws) {
      clients.add(ws);
    },
    message(ws, message) {
      console.log('Mensaje recibido:', message);
      // Broadcast message to all clients
      for (const client of clients) {
        client.send(message);
      }
    },
    close(ws) {
      clients.delete(ws);
    },
  },
});

async function handleSendMessage(req, headers) {
  const body = await req.json();
  const message = body.message;

  if (!message) {
    return new Response(JSON.stringify({ error: 'Se requiere un mensaje' }), { 
      status: 400, 
      headers: { ...headers, 'Content-Type': 'application/json' }
    });
  }

  // Enviar el mensaje a todos los clientes WebSocket conectados
  for (const client of clients) {
    client.send(JSON.stringify({ message }));
  }

  return new Response(JSON.stringify({ success: true, message: 'Mensaje enviado a todos los clientes WebSocket' }), { 
    status: 200, 
    headers: { ...headers, 'Content-Type': 'application/json' }
  });
}

console.log(`Servidor ejecutándose en http://localhost:${port}`);