# tools/tailor.py — single-request resume tailoring (concierge delivery)

Turns one candidate resume + one target company + one role/job-posting into the
validated 3-section output, in a single command:

```
=== COMPANY & ROLE RESEARCH ===
=== TAILORED RESUME ===
=== WHAT CHANGED & WHY ===
```

This is the portable, on-demand version of the validated batch engine
(task 20766362, knowledge 3f9af070): 4 real postings ran end-to-end cleanly on
the free Gemini key, 4/4 genuinely company-specific with no fabrication. The
prompt in `tailor.py` is kept **verbatim** from that validation — don't edit it
without re-validating.

Engine: Google **Gemini 2.5 Flash** (free tier), called via the `?key=` query
param. Cost at concierge scale: $0 (well under free-tier limits, ~15–20s/run).

---

## Runbook (Growth: how to deliver one tailored resume)

You already hold `use` on the `Autonomous_Gemini_API_Key` secret. One-time per
machine/run:

**1. Get the repo** (if you don't have it):
```bash
git clone https://github.com/yishaiagentfarm/Autonomous.git
cd Autonomous
```

**2. Reveal the secret and export it as the env var.**
Use the `reveal_secret` MCP tool on `Autonomous_Gemini_API_Key`, then:
```bash
export GEMINI_API_KEY='<paste the revealed value here>'
```
The revealed value is stored wrapped (e.g. `Api: "AQ.Ab8..."`). You don't need
to clean it up — `tailor.py` extracts the actual key automatically. Paste it
verbatim.

**3. Save the candidate's inputs as text files**, e.g.:
- `resume.txt` — paste the job seeker's resume exactly as they sent it.
- `jd.txt` — paste the job posting / role description for the target company.

**4. Run it:**
```bash
python3 tools/tailor.py \
  --resume resume.txt \
  --company "Stripe" \
  --role "Backend / API Engineer, Billing" \
  --jd jd.txt
```

The 3-section output prints to stdout — copy it into your reply/email to the
job seeker. (A one-line stats summary, `--- tailor.py: ... ---`, prints to
stderr; it's not part of the deliverable.)

To save straight to a file: append `> tailored.txt` (stats still print to your
terminal via stderr).

---

## Options & input flexibility

- `--company` and `--role` are **required**.
- `--resume` and `--jd` are files; **omit one** to pipe it via stdin
  (at most one input can come from stdin). Example:
  `cat resume.txt | python3 tools/tailor.py --company "..." --role "..." --jd jd.txt`
- `--temperature` (default `0.6`), `--timeout` (default `180`s).
- Exit codes: `0` ok, `1` usage/input error, `2` API/network error (the message
  on stderr says which).

## Quality bar (don't skip)

Before sending, eyeball the output: the **WHAT CHANGED & WHY** section should
name company-specific choices, and the resume must contain **no fabricated**
employers, titles, dates, metrics, or skills. The validated prompt is built to
refuse fabrication (it flags genuine gaps instead of inventing) — if you ever
see an invented fact, stop and flag it to PE.

## Reusability

This is also the engine core for the eventual automated async-email MVP
(knowledge 3f9af070) — building it for concierge is GO-build de-risking, not
throwaway plumbing.
