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

## Step 4: Confirm cost + send

**Bulk campaigns now run on credits.** 1 credit = 1 outbound message. Before sending, always confirm cost AND show the user what their balance will be after:

"Ready to send **promo_offer** to **47 contacts**.
This will use **47 credits** (you have **1,234** available — **1,187** remaining after).
Sending at the rate allowed by your Meta tier (so ~30 minutes for 47 messages on Tier 1).

Shall I go ahead?"

When confirmed:
- Use `send_bulk_template` — it pre-checks credits and reserves them at queue time
- If the response says `error: "Insufficient credits…"` STOP. Tell the user the shortfall and link to webbai.nl/credits to top up. **Do not retry.** Do not split the campaign.
- On success the response gives `{batch_id, total_queued, credits_reserved, balance_after}` — always echo `balance_after` to the user
- Monitor with `get_batch_status` — also reports `credits_consumed` and `credits_refunded`

## Step 5: Report

"Campaign sent! 🚀
- **45 delivered** ✅
- **2 failed** (invalid phone numbers, credits refunded)
- **45 credits consumed**, **1,189** remaining

You can track replies in your inbox at webbai.nl/inbox or say 'check my inbox' here."

## Important notes

- **Credits are required for campaigns.** Buy them at webbai.nl/credits — packs from 500 (€29) to 10,000 (€399). Pro and Business plans no longer include free bulk sends.
- All bulk messages must use approved templates — no free-form bulk sends
- Failed sends are **automatically refunded** — clients only pay for successful deliveries
- Cancelling a campaign refunds all unsent reserved credits
- Per-campaign safety cap: **100 recipients on Pro, 500 on Business** (independent of credit balance)
- Messages are throttled by your Meta messaging tier (Tier 1 = ~42/hr, Tier 2 = ~417/hr, Tier 3 = ~4,167/hr) — protects your WABA quality rating
- 1:1 chats, automations, and briefings are NOT credit-charged — only the campaign flow uses credits
