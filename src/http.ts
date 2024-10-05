import { file } from 'bun';
import { join } from 'path';
import { ClientManager } from './clientManager';

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type"
};

export async function handleHTTP(req: Request, url: URL, clientManager: ClientManager): Promise<Response> {
  const headers = new Headers(corsHeaders);

  if (req.method === 'OPTIONS') {
    return new Response(null, { headers });
  }

  if (req.method === 'POST' && url.pathname === '/send') {
    return handleSendMessage(req, headers, clientManager);
  }

  return serveStaticFile(url, headers);
}

async function handleSendMessage(req: Request, headers: Headers, clientManager: ClientManager): Promise<Response> {
  const body = await req.json();
  const message = body.message;

  if (!message) {
    return new Response(JSON.stringify({ error: 'Se requiere un mensaje' }), { 
      status: 400, 
      headers: { ...headers, 'Content-Type': 'application/json' }
    });
  }

  clientManager.broadcastMessage(JSON.stringify({ message }));

  return new Response(JSON.stringify({ success: true, message: 'Mensaje enviado a todos los clientes WebSocket' }), { 
    status: 200, 
    headers: { ...headers, 'Content-Type': 'application/json' }
  });
}

function serveStaticFile(url: URL, headers: Headers): Response {
  try {
    let path = url.pathname;
    if (path === '/') path = '/index.html';
    const filePath = join(import.meta.dir, '..', 'public', path);
    const content = file(filePath);
    return new Response(content, { headers });
  } catch (error) {
    return new Response('Not Found', { status: 404, headers });
  }
}