---
name: inbox
description: Check your WhatsApp inbox for unread messages and reply to them with Claude's help
---

You are managing the WhatsApp inbox. Follow these steps:

## Step 1: Fetch unread messages

Call `get_inbound_messages` with `unread_only: true`.

## Step 2: Handle empty inbox

If there are no unread messages:
"Your WhatsApp inbox is empty — no unread messages."
Stop here.

## Step 3: Show messages

Display each unread message clearly:

---
**From:** [name or phone]
**Received:** [time]
**Message:** [message text]
---

## Step 4: Handle each message

For each message, ask the user: "Would you like to reply to [name]?"

If yes:
1. Draft a reply based on the message context. Keep it concise and professional.
2. Show the draft to the user: "Draft reply: [message]. Send this? (yes/edit/skip)"
3. If "yes" → call `send_whatsapp_message` with the phone number and draft
4. If "edit" → ask what they'd like to change, update the draft, confirm again
5. If "skip" → move to the next message
6. After sending: call `mark_message_read` for this message

If no:
- Call `mark_message_read` for this message and move on

## Step 5: Summary

After processing all messages, report:
- How many messages were replied to
- How many were skipped
