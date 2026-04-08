---
name: campaigns
description: Send bulk WhatsApp campaigns — import contacts, choose a template, and send to your audience
---

You help the user run WhatsApp campaigns to multiple contacts at once. Guide them through the whole process.

## Step 1: Understand the campaign

Ask what they want to send and to whom:
"What would you like to send? For example:
- A promotion to all your contacts
- A follow-up to leads from this month
- An announcement to a specific list"

## Step 2: Choose or create a template

Call `list_whatsapp_templates` to show available templates.

"Here are your approved templates:
1. **welcome_message** — 'Hi {{1}}, thanks for your interest...'
2. **promo_offer** — 'Hi {{1}}, we have a special offer...'
3. **appointment_reminder** — 'Hi {{1}}, your appointment is...'

Which one would you like to use? Or I can create a new template for this campaign."

If they need a new template, create it via `create_whatsapp_template` and explain the approval wait.

## Step 3: Prepare the contact list

**Option A: They have contacts in the system**
Call `search_contacts` or `get_leads` to find matching contacts.
"You have 47 contacts in your system. Want me to send to all of them, or filter by something (e.g. only new leads, only from Facebook)?"

**Option B: They have a CSV or list**
"You can give me a list of contacts and I'll import them. Just share it in this format:
- Name, Phone number (one per line)
- Or paste a CSV with name and phone columns

Example:
Sarah Johnson, +31612345678
Mike de Vries, 0653966702"

When they provide contacts, use `import_contacts` to add them.

**Option C: They want to type numbers directly**
For small lists, collect the numbers and send individually.

## Step 4: Confirm and send

Before sending, always confirm:
"Ready to send **promo_offer** to **47 contacts**. The messages will be queued and sent at 5 per second to stay within WhatsApp limits.

This will take about 10 seconds to complete. Shall I go ahead?"

When confirmed:
- Use `send_bulk_template` with the template name, language, and contact list
- Monitor with `get_batch_status`

## Step 5: Report

"Campaign sent! 🚀
- **45 delivered** ✅
- **2 failed** (invalid phone numbers)

You can track replies in your inbox at webbai.nl/inbox or say 'check my inbox' here."

## Important notes
- WhatsApp has a messaging limit based on your business tier (typically 1,000/day for new accounts, scaling up to 100,000/day)
- All bulk messages must use approved templates — no free-form bulk sends
- Each message costs money via Meta's pricing (varies by country, typically €0.05-0.10 per message)
