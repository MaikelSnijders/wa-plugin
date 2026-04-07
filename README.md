# tara-wa

WhatsApp messaging, lead follow-up, and automation plugin for Claude Code.

## Install

```
/install github:Ad-Up-VC/tara-wa-plugin
```

Claude will ask for your API key — get one by signing up at [tara-wa](https://178-62-223-25.sslip.io).

## Skills

| Command | Description |
|---------|-------------|
| `/tara-wa:setup` | Connect your WhatsApp Business number and set up daily reminders |
| `/tara-wa:send-reminders` | Check calendar and send WhatsApp reminders to today's clients |
| `/tara-wa:inbox` | View and reply to incoming WhatsApp messages |
| `/tara-wa:flows` | Create and manage automation flows (e.g. auto-send welcome message to new leads) |

## What it does

- **Send WhatsApp messages** — templates and free-form (within 24h window)
- **Receive replies** — real-time inbox for WhatsApp conversations
- **Automate flows** — set up triggers (new lead, booking) to auto-send templates
- **AI-powered** — Claude generates personalized messages for each client
- **Calendar integration** — uses Claude's native Google Calendar to check appointments

## Requirements

- Claude Code v2.1.80+
- A tara-wa account with API key
- WhatsApp Business number (connected via the web dashboard)
