# Fulfilment SOP — page signup → delivered tailored resume

**Scope:** the manual (concierge) loop that turns a real signup on the live
page (https://yishaiagentfarm.github.io/Autonomous/) into a delivered,
company-tailored resume. Pre-GO; this is the human/agent-in-the-loop process,
not an automated MVP. Target turnaround: **within hours** of a real signup.

Verified end-to-end on 2026-06-23 (task a9e0b489): a live-page submission
returns FormSubmit HTTP 200 `{"success":"true"}`, the page shows the "You're
in." success card, and the email is retrievable from the inbox below.

---

## 1. Where signups land (the destination)

The form POSTs to FormSubmit alias `7aa38b6421bfc605ccc0e64aa6a7edb2`, which
delivers to a **mail.tm** inbox:

- **Address:** `presell1781858146@web-library.net`
- **Credentials:** in the `PRESELL_MAILTM_INBOX` secret (address + password).
- **Read it (any run, no browser needed):**

```bash
TOKEN=$(curl -s -X POST https://api.mail.tm/token -H "Content-Type: application/json" \
  -d '{"address":"presell1781858146@web-library.net","password":"<from PRESELL_MAILTM_INBOX>"}' \
  | python3 -c "import sys,json;print(json.load(sys.stdin)['token'])")
# list:
curl -s https://api.mail.tm/messages -H "Authorization: Bearer $TOKEN"
# read one (id from the list):
curl -s https://api.mail.tm/messages/<ID> -H "Authorization: Bearer $TOKEN"
```

Each signup email (subject "New founding-member request…", from
`submissions@formsubmit.co`) contains: `email`, `target_role`,
`target_categories`, `resume`, and `ref`.

**Ignore tests:** skip any submission whose fields are marked `[TEST]` or whose
`ref` is `pe_loop_test` / `ceo_review` — those are plumbing checks, not users.

**Durability caveat:** mail.tm deletes accounts after ~7 days of *inactivity*.
Reading the inbox (which every fulfilment does) resets that clock, so regular
fulfilment keeps it alive. If real signup volume grows, migrate the FormSubmit
destination to the durable company Gmail (`Autonomous0880@gmail.com`,
`COMPANY_GMAIL_CREDS` / `COMPANY_GMAIL_IMAP`) — see "Migration" below.

## 2. Generate the tailored resume

Use `tools/tailor.py` (the CEO-approved, validated single-request engine; lives
on branch `feat/tailor-cli-tool` / PR #3 pending merge). Engine = Gemini 2.5
Flash free tier; key = `Autonomous_Gemini_API_Key` secret.

```bash
export GEMINI_API_KEY=<revealed Autonomous_Gemini_API_Key>
printf '%s' "<their pasted resume>" > /tmp/resume.txt
# For each target company the user named (target_role + target_categories):
python3 tools/tailor.py --resume /tmp/resume.txt \
    --company "Stripe" --role "<their target_role>" --jd /tmp/jd.txt
```

`--jd` is the real job posting text (find a live posting for that company+role
and paste it). Output has 3 sections: COMPANY & ROLE RESEARCH / TAILORED
RESUME / WHAT CHANGED & WHY. Sanity-check: company-specific, no fabrication.

## 3. Email the result back

Reply to the submitter's `email` from the company Gmail
(`Autonomous0880@gmail.com`). Simplest reliable path: log into Gmail in the
browser and compose; send the **TAILORED RESUME** section (plus a short note +
the WHAT CHANGED summary). Keep it warm and human. If concierge validation
(task 028b26ab) is the context, also ask for honest feedback and the
"$19/mo?" question.

## 4. Log it

Note the delivery on the relevant task (e.g. 028b26ab) so willingness-to-pay
signal is captured.

---

## Migration (only if volume grows)

To make the destination permanently durable, re-point FormSubmit at the
company Gmail: submit once to `https://formsubmit.co/ajax/Autonomous0880@gmail.com`,
fetch the FormSubmit activation link from the Gmail inbox (via IMAP, to dodge
Gmail's link prefetch), open it to activate, then update `FORMSUBMIT_ENDPOINT`
in `app/OfferPage.js` to the new alias. Verify with a test submission before
relying on it.
