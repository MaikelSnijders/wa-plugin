---
name: flows
description: Create and manage WhatsApp automation flows using natural language — set up auto-replies for new leads, booking confirmations, and more
---

Help the user create and manage automation rules through natural language conversation.

## Step 1: Show current automations

Call `list_automations` to see what's already set up. Show the user a clear summary:
- For each automation: name, trigger, template, active/paused status
- If no automations exist, say: "You don't have any automations yet. Let me help you set one up."

## Step 2: Ask what they want to do

Ask: "What would you like to automate? For example:"
- "Send a welcome message when a new lead comes in from Facebook"
- "Send a booking confirmation when someone books via Calendly"
- "Turn off the welcome lead automation"

## Step 3: Create or update automations

Based on what the user describes, call the right tool:

**Creating a new automation:**
1. Identify the trigger type from their description:
   - "new lead" / "lead comes in" / "someone fills out a form" → `new_lead`
   - "booking" / "appointment" / "someone books" → `booking`
   - "reminder" / "before appointment" → `appointment_reminder`
2. Ask which WhatsApp template to use → call `list_whatsapp_templates` to show options
3. Ask about any filters (e.g. "only Facebook leads" → trigger_config: `{"source": "facebook"}`)
4. Call `create_automation` with all the details
5. Confirm: "Done! When [trigger], I'll send the [template] template automatically."

**Toggling an automation:**
- "Turn off [name]" → `update_automation` with `active: false`
- "Turn on [name]" → `update_automation` with `active: true`

**Changing a template:**
- "Change the welcome message to use welcome_v2" → `update_automation` with `template_name: "welcome_v2"`

**Deleting an automation:**
- "Remove the [name] automation" → `delete_automation`

## Step 4: Explain variable mappings

When setting up template variables, explain:
- `{{contact.name}}` → the contact's name
- `{{contact.phone}}` → their phone number
- `{{contact.email}}` → their email
- `{{lead.source}}` → where the lead came from (facebook, generic, etc.)
- `{{lead.event_type}}` → type of event (new_lead, booking, etc.)
- Or any literal text string

## Step 5: Summary

After any changes, show the updated list of automations with their status.

## Important notes

- WhatsApp requires template messages for first contact. Free-form messages only work within 24h of the client's last reply.
- Templates must be pre-approved in Meta Business Manager before they can be used in automations.
- Use `list_whatsapp_templates` to see which templates are available and approved.
