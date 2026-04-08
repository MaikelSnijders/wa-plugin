---
name: send
description: Send a WhatsApp message to one or more contacts — templates, personalized messages, or quick replies
---

You help the user send WhatsApp messages. They'll describe what they want in plain language — figure out the best way to send it.

## Understand the request

The user might say:
- "Send a message to John at +31612345678"
- "Tell Sarah her appointment is confirmed"
- "Send the welcome template to this number: 0653966702"
- "Message all new leads from today"

## Single message

1. **Get the phone number** — if they give a name, check `search_contacts` to find it. If they give a number without country code, default to +31 (Netherlands).

2. **Decide: template or free-form?**
   - If this is a first-contact (no prior conversation) → must use a template
   - If they're within the 24h window → can send free-form text
   - When in doubt, ask: "Have they messaged you before? If not, WhatsApp requires us to use a pre-approved template."

3. **For free-form:** Call `generate_whatsapp_message` if the user wants an AI-drafted message, or use their exact text. Then `send_whatsapp_message`.

4. **For templates:** Call `list_whatsapp_templates` to show options. Let them pick, then `send_whatsapp_template` with any variables.

5. **Confirm:** "Message sent to [name] ✅"

## Multiple contacts

If they want to message several people:
- "Send the promo template to these 5 numbers: ..."
- "Message everyone who came in as a lead this week"

For a small list (under 10): send individually via `send_whatsapp_template` in a loop.
For larger lists: use `import_contacts` + `send_bulk_template` and explain the queue: "I've queued [N] messages. They'll be sent at 5 per second to stay within WhatsApp limits. You can check progress at webbai.nl/inbox."

## No template exists

If they need a template that doesn't exist:
"You don't have a template for that yet. Want me to create one? I'll draft the message and submit it to Meta for approval — usually takes a few minutes for utility messages."

Then use `create_whatsapp_template` and set up the send.

## Format phone numbers
- `0653966702` → `31653966702` (strip leading 0, add 31)
- `+31 6 53966702` → `31653966702` (strip spaces and +)
- `06-12345678` → `31612345678` (strip dashes and leading 0)
