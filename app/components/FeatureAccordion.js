"use client";

import { useState } from "react";

const ITEMS = [
  {
    key: "matrix",
    title: "Compliance matrix",
    teaser: "Every requirement, mapped to your response.",
    detail:
      "GrantHunter pulls every “shall” and “must” out of the solicitation into a requirement-by-requirement checklist — so nothing that gets you disqualified slips through.",
  },
  {
    key: "narrative",
    title: "First-draft narrative",
    teaser: "A real draft, written to the solicitation.",
    detail:
      "A structured first draft written to the solicitation’s sections and evaluation criteria. You start from a working document, not a blank page.",
  },
  {
    key: "feed",
    title: "Opportunity feed",
    teaser: "Pursue the right ones, sooner.",
    detail:
      "Scope, eligibility, and deadlines summarized up front — pulled from live Grants.gov, SBIR, STTR, SAM.gov and federal BAA sources — so you commit writing time to the grants you can actually win.",
  },
  {
    key: "control",
    title: "You stay in control",
    teaser: "Edit, approve, submit.",
    detail:
      "GrantHunter does the slow first pass; you keep full editorial control. Review, refine, and approve every word before it’s submitted.",
  },
];

export default function FeatureAccordion() {
  const [open, setOpen] = useState(0);

  return (
    <div className="acc">
      {ITEMS.map((it, i) => {
        const isOpen = i === open;
        return (
          <div key={it.key} className={`acc-item${isOpen ? " open" : ""}`}>
            <button
              type="button"
              className="acc-head"
              aria-expanded={isOpen}
              onClick={() => setOpen(isOpen ? -1 : i)}
            >
              <span className="acc-title">{it.title}</span>
              <span className="acc-teaser">{it.teaser}</span>
              <span className="acc-icon" aria-hidden="true" />
            </button>
            <div className="acc-panel">
              <div className="acc-panel-inner">
                <p className="acc-detail">{it.detail}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
