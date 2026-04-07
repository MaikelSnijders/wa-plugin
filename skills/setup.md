---
name: setup
description: Set up WhatsApp reminders — connect your WhatsApp number, configure Google Calendar, and activate daily scheduling
---

Walk the user through the full tara-wa setup. Follow these steps in order:

## Step 1: Check current status

Call `get_setup_status` to see what's already connected. Show the user a clear summary:
- WhatsApp: ✅ Connected / ❌ Not connected

Skip any steps for services that are already connected.

## Step 2: Connect WhatsApp

If WhatsApp is not connected:
1. Ask the user for their **Meta Phone Number ID** and **Access Token** from the Meta Developer Portal (https://developers.facebook.com → your WhatsApp Business app → API Setup)
2. Call `setup_whatsapp` with the provided values
3. If it fails, explain the error and ask them to double-check the credentials
4. Confirm success

## Step 3: Connect Google Calendar

Tell the user: "To access your calendar, please connect Google Calendar in your Claude settings (Claude.ai → Settings → Connected Apps → Google Calendar). This gives me direct access to your calendar without any extra setup."

Ask the user to confirm they've connected Google Calendar in Claude settings.

## Step 4: Set up daily reminders (IMPORTANT)

Ask: "What time should I send WhatsApp reminders each morning? (e.g. 8:00 AM)"

Once they provide a time, convert it to a cron expression (e.g. "8:00 AM" → `0 8 * * *`, "9:30 AM" → `30 9 * * *`).

**Use `CronCreate` to automatically set up the scheduled task:**
- Schedule: the cron expression for their chosen time
- Task: `Run /tara-wa:send-reminders`
- Label: `tara-wa daily reminders`

Present the CronCreate tool call and wait for the user to approve it. Explain: "This will send WhatsApp reminders automatically every morning at [time]. I'm asking for your approval to create this scheduled task."

Once approved, confirm: "Done! Your daily reminders are set up."

## Step 5: Summary

Show a final summary of everything that was connected and the schedule that was set up. Include:
- Which services are connected
- What time reminders will be sent
- How to run `/tara-wa:send-reminders` manually to test
- How to run `/tara-wa:inbox` to check and reply to incoming WhatsApp messages
