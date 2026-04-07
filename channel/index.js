/**
 * tara-wa Channel Server
 *
 * Runs as a stdio MCP subprocess inside Claude Code.
 * Connects to the tara-wa SSE stream and injects inbound
 * WhatsApp messages into the active Claude Code conversation.
 *
 * Requires Claude Code v2.1.80+ with channels support.
 */

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';

const API_KEY = process.env.TARA_WA_API_KEY;
const SERVER_URL = process.env.TARA_WA_SERVER || 'https://wa.yourdomain.com';
const STREAM_URL = `${SERVER_URL}/clients/me/messages/stream`;
const RECONNECT_DELAY_MS = 5000;

const server = new Server(
  { name: 'tara-wa-channel', version: '1.0.0' },
  {
    capabilities: {
      'claude/channel': {}
    }
  }
);

// Connect to SSE stream from the hosted backend
async function connectToStream() {
  if (!API_KEY) {
    process.stderr.write('tara-wa-channel: TARA_WA_API_KEY not set\n');
    return;
  }

  try {
    const res = await fetch(STREAM_URL, {
      headers: { Authorization: `Bearer ${API_KEY}` }
    });

    if (!res.ok) {
      process.stderr.write(`tara-wa-channel: SSE connect failed (${res.status}), retrying in ${RECONNECT_DELAY_MS}ms\n`);
      setTimeout(connectToStream, RECONNECT_DELAY_MS);
      return;
    }

    const reader = res.body.getReader();
    const decoder = new TextDecoder();
    let buffer = '';

    while (true) {
      const { value, done } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split('\n');
      buffer = lines.pop(); // Keep incomplete last line

      for (const line of lines) {
        if (!line.startsWith('data: ')) continue;
        const raw = line.slice(6).trim();
        if (!raw) continue;

        try {
          const event = JSON.parse(raw);
          if (event.type === 'inbound_message') {
            await injectMessage(event);
          }
        } catch {
          // Skip malformed events
        }
      }
    }
  } catch (err) {
    process.stderr.write(`tara-wa-channel: SSE error: ${err.message}, retrying in ${RECONNECT_DELAY_MS}ms\n`);
  }

  // Reconnect after disconnect
  setTimeout(connectToStream, RECONNECT_DELAY_MS);
}

async function injectMessage(event) {
  const name = event.from_name || event.from_phone;
  const time = new Date(event.received_at).toLocaleTimeString('en-GB', {
    hour: '2-digit',
    minute: '2-digit'
  });

  const content = [
    `**New WhatsApp message from ${name}** (${event.from_phone}) at ${time}:`,
    `> ${event.message}`,
    '',
    `You can reply using \`/tara-wa:inbox\` or ask me to draft a reply now.`
  ].join('\n');

  await server.notification({
    method: 'notifications/claude/channel',
    params: {
      content,
      meta: {
        source: 'tara-wa',
        type: 'inbound_whatsapp',
        from_phone: event.from_phone,
        from_name: event.from_name
      }
    }
  });
}

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);

  // Start SSE connection after MCP handshake
  connectToStream();
}

main().catch(err => {
  process.stderr.write(`tara-wa-channel fatal: ${err.message}\n`);
  process.exit(1);
});
