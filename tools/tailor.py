#!/usr/bin/env python3
"""
tailor.py — single-request company-specific resume tailoring tool.

Takes a candidate's resume + a target company + the role / job posting and
prints the validated 3-section output:
    === COMPANY & ROLE RESEARCH ===
    === TAILORED RESUME ===
    === WHAT CHANGED & WHY ===

This is the portable, single-request version of the validated batch engine
(task 20766362, knowledge 3f9af070). The prompt below is kept VERBATIM from
the validated run — do not edit it without re-validating.

Engine: Google Gemini 2.5 Flash (free tier), called via the ?key= query param
(NOT a Bearer header). The API key is read from the GEMINI_API_KEY environment
variable, so any teammate who holds the `Autonomous_Gemini_API_Key` secret can
run this on a fresh machine. See tools/README.md for the runbook.

USAGE
  export GEMINI_API_KEY=<the revealed Autonomous_Gemini_API_Key>
  python3 tools/tailor.py \
      --resume path/to/resume.txt \
      --company "Stripe" \
      --role "Backend / API Engineer, Billing" \
      --jd path/to/job_posting.txt

  # any of --resume / --jd may be omitted to read that input from stdin.
  # exactly one input may come from stdin; if both are omitted, --resume is
  # read from stdin and --jd must be supplied via file.

EXIT CODES: 0 ok, 1 usage error, 2 API/network error.
"""
import argparse
import json
import os
import re
import sys
import time
import urllib.error
import urllib.request

MODEL = "gemini-2.5-flash"

# --- VALIDATED PROMPT (verbatim from task 20766362; do not edit casually) ---
PROMPT_TMPL = """You are an expert resume writer helping a laid-off software engineer tailor their resume to ONE specific company and role. You are given the candidate's REAL resume and the REAL job posting (scraped from the company's careers page).

Your job:
1. RESEARCH: From the job posting (and only well-known public facts about the company), identify what THIS company and THIS role specifically care about — their mission, product, domain, tech priorities, and the language they use. Do not invent facts.
2. TAILOR: Rewrite the candidate's resume so it speaks directly to this company and role. Rules:
   - Reframe the candidate's REAL experience and bullets in the company's language and priorities. NEVER fabricate experience, employers, titles, dates, metrics, or skills the candidate does not have.
   - Map the candidate's genuine strengths to what this posting asks for. Where the candidate lacks something, do not lie — emphasize the closest real experience instead.
   - Write natural, professional prose. Do NOT keyword-stuff.
   - Keep it ATS-friendly and concise (one page worth).

Output EXACTLY in this structure:
=== COMPANY & ROLE RESEARCH ===
(3-5 bullets: what this specific company/role values, grounded in the posting)
=== TAILORED RESUME ===
(the full tailored resume)
=== WHAT CHANGED & WHY ===
(3-5 bullets naming the company-specific tailoring choices you made)

--- CANDIDATE RESUME ---
{resume}

--- JOB POSTING: {company} — {role} ---
{jd}
"""
# --- END VALIDATED PROMPT ---


def die(msg, code):
    print(f"tailor.py: {msg}", file=sys.stderr)
    sys.exit(code)


def normalize_key(raw):
    """Extract the bare API key from the env var.

    The shared secret is stored wrapped (e.g. `Api: "AQ.Ab8...".`), so a
    teammate who just `export GEMINI_API_KEY="$(reveal)"` would otherwise pass
    the label and quotes through. Be tolerant: if the value contains a
    double-quoted token, use it; otherwise strip a leading label and quotes.
    """
    raw = raw.strip()
    m = re.search(r'"([^"]+)"', raw)
    if m:
        return m.group(1).strip()
    # strip a leading "Label:" prefix if present, then surrounding quotes
    raw = re.sub(r"^[A-Za-z ]+:\s*", "", raw)
    return raw.strip().strip('"').strip("'").strip()


def read_input(path, label, stdin_fallback):
    """Read text from a file path, or from stdin if path is None and allowed."""
    if path:
        try:
            with open(path, "r") as f:
                return f.read()
        except OSError as e:
            die(f"could not read {label} file {path!r}: {e}", 1)
    if stdin_fallback:
        data = sys.stdin.read()
        if not data.strip():
            die(f"no {label} provided (stdin was empty)", 1)
        return data
    return None


def main():
    p = argparse.ArgumentParser(
        description="Tailor a resume to a specific company and role (Gemini).",
        formatter_class=argparse.RawDescriptionHelpFormatter,
    )
    p.add_argument("--resume", help="path to the candidate's resume (text). Omit to read from stdin.")
    p.add_argument("--company", required=True, help='target company, e.g. "Stripe"')
    p.add_argument("--role", required=True, help='target role / title, e.g. "Backend Engineer, Billing"')
    p.add_argument("--jd", help="path to the job posting text. Omit to read from stdin.")
    p.add_argument("--temperature", type=float, default=0.6, help="model temperature (default 0.6)")
    p.add_argument("--timeout", type=int, default=180, help="API timeout seconds (default 180)")
    args = p.parse_args()

    key = normalize_key(os.environ.get("GEMINI_API_KEY", ""))
    if not key:
        die("GEMINI_API_KEY environment variable is not set. "
            "Reveal the Autonomous_Gemini_API_Key secret and `export GEMINI_API_KEY=...` first.", 1)

    # At most one input may come from stdin (you can't read stdin twice).
    if not args.resume and not args.jd:
        die("at least one of --resume / --jd must be a file "
            "(at most one input may be omitted to read from stdin)", 1)

    resume = read_input(args.resume, "resume", stdin_fallback=(not args.resume))
    jd = read_input(args.jd, "job posting", stdin_fallback=(not args.jd))

    if resume is None or not resume.strip():
        die("empty resume", 1)
    if jd is None or not jd.strip():
        die("empty job posting", 1)

    prompt = PROMPT_TMPL.format(resume=resume, company=args.company, role=args.role, jd=jd)
    url = f"https://generativelanguage.googleapis.com/v1beta/models/{MODEL}:generateContent?key={key}"
    body = json.dumps({
        "contents": [{"parts": [{"text": prompt}]}],
        "generationConfig": {"temperature": args.temperature},
    }).encode()
    req = urllib.request.Request(url, data=body, headers={"Content-Type": "application/json"})

    t0 = time.time()
    try:
        with urllib.request.urlopen(req, timeout=args.timeout) as r:
            j = json.load(r)
    except urllib.error.HTTPError as e:
        die(f"Gemini API HTTP {e.code}: {e.read().decode()[:400]}", 2)
    except Exception as e:
        die(f"{type(e).__name__}: {e}", 2)

    try:
        out = j["candidates"][0]["content"]["parts"][-1]["text"]
    except (KeyError, IndexError):
        die(f"unexpected API response shape: {json.dumps(j)[:400]}", 2)

    dt = round(time.time() - t0, 1)
    usage = j.get("usageMetadata", {})
    sys.stdout.write(out)
    if not out.endswith("\n"):
        sys.stdout.write("\n")
    print(
        f"\n--- tailor.py: {args.company} / {args.role} | {dt}s | "
        f"in={usage.get('promptTokenCount')} out={usage.get('candidatesTokenCount')} "
        f"total={usage.get('totalTokenCount')} ---",
        file=sys.stderr,
    )


if __name__ == "__main__":
    main()
