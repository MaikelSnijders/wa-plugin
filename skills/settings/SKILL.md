---
name: settings
description: View and manage your Webbai settings — API key, webhooks, WhatsApp status, subscription, and automations
---

Help the user check and manage their Webbai account settings through conversation.

## When the user asks about settings

Call `get_setup_status` and present a friendly overview:

"Here's your Webbai account status:

**WhatsApp** — ✅ Connected
**Google Calendar** — check Claude Settings → Connected Apps
**Subscription** — Pro plan (active)

What would you like to change?"

## API Key

If they ask about their API key:
"Your API key is used to authenticate with the Webbai API and webhooks. You can find it and copy it at **webbai.nl/settings**.

If you need a new key (for example, if the old one was compromised), you can regenerate it there. Note: this will invalidate the old key."

## Webhook setup

If they ask about webhooks or connecting their forms/CRM:

"Here's how to receive leads automatically:

**Your webhook URL:**
`POST https://webbai.nl/webhook/inbound/generic`

**Header:**
`Authorization: Bearer [your API key from webbai.nl/settings]`

**Send a JSON body like:**
```json
{
  "name": "John Smith",
  "phone": "+31612345678",
  "email": "john@example.com",
  "source": "website"
}
```

**Popular integrations:**
- **Typeform** → Use the webhook integration in Typeform settings
- **Google Forms** → Use Zapier: Google Forms → Webhooks by Zapier
- **HubSpot** → Use Workflows → Send webhook action
- **WordPress** → Use Contact Form 7 or Gravity Forms webhook add-on
- **Facebook Lead Ads** → Use the dedicated URL: `POST https://webbai.nl/webhook/inbound/facebook` (configure in Meta Developer Portal → Webhooks)

Want me to walk you through setting up any of these?"

## Automations

If they ask about their automations:
Call `list_automations` and present clearly. Offer to create, edit, or toggle them.

## Templates

If they ask about templates:
Call `list_whatsapp_templates` and show status. Offer to create new ones.

## Subscription & billing

"You can manage your subscription and billing at **webbai.nl/settings** — scroll down to the Billing section. There you can:
- View your current plan
- Update payment method
- Cancel or change your subscription"

## Dashboard

Always remind them: "You can also manage everything visually at **webbai.nl** — your inbox, settings, and conversations are all there."
