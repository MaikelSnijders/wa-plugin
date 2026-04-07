---
name: send-reminders
description: Check today's calendar appointments and send WhatsApp reminders to each contact with a phone number
---

You are running the daily WhatsApp reminder task. Follow these steps precisely.

## Step 1: Fetch today's appointments

Use your connected Google Calendar to get today's events. Look for events that have phone numbers in the description, notes, location, or attendee fields.

For each event, extract:
- Contact name (from attendee name or event title)
- Phone number (from description, notes, or location field)
- Appointment time
- Appointment type (from event title)

## Step 2: Build the contact list

From the calendar results:
- Skip entries with no phone number (log as skipped if you have their name)
- Deduplicate by phone number — if the same phone appears more than once, keep only the earliest appointment

## Step 3: Handle no appointments

If there are no appointments with phone numbers today, log a brief note and stop:
"No appointments with phone numbers found for today. Nothing to send."

## Step 4: Send reminders

For each contact in the deduplicated list:

1. Call `generate_whatsapp_message` with:
   - `contact_name`: their name
   - `appointment_time`: formatted time (e.g. "today at 2:30 PM")
   - `appointment_type`: type of appointment

2. Call `send_whatsapp_message` with:
   - `phone`: their phone number (E.164 format — add country code if missing, default to +31 for Netherlands)
   - `message`: the generated message
   - `contact_name`: for logging
   - `appointment_time`: for logging

3. Note the result (success/failure)

Do NOT ask for confirmation before each message — send all reminders automatically.

## Step 5: Report results

After sending all reminders, report a summary:
- Total appointments found
- Messages sent successfully
- Skipped (no phone number)
- Failed (with error details)

Example: "Sent 3 reminders, skipped 1 (no phone), 0 failed."
