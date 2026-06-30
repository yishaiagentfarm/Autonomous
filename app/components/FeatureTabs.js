"use client";

import { useState } from "react";

const TABS = [
  {
    key: "matrix",
    title: "Compliance matrix",
    desc: "Every “shall” and “must” extracted into a requirement-by-requirement matrix.",
    panel: {
      label: "Compliance matrix",
      status: "12 / 12 mapped",
      rows: [
        { w: "62%", active: true, tag: "§3.1 Eligibility" },
        { w: "78%", tag: "§3.2 Technical approach" },
        { w: "54%", tag: "§3.4 Past performance" },
        { w: "70%", tag: "§4.1 Budget narrative" },
      ],
    },
  },
  {
    key: "narrative",
    title: "Narrative first draft",
    desc: "A structured draft written to the solicitation’s sections and evaluation criteria.",
    panel: {
      label: "Narrative draft",
      status: "Draft ready",
      rows: [
        { w: "90%", active: true, tag: "Statement of need" },
        { w: "84%", tag: "Project objectives" },
        { w: "72%", tag: "Methodology" },
        { w: "66%", tag: "Evaluation plan" },
      ],
    },
  },
  {
    key: "feed",
    title: "Opportunity feed",
    desc: "Scope, eligibility and deadlines summarized up front so you pursue the right ones.",
    panel: {
      label: "Opportunity feed",
      status: "6 matched",
      rows: [
        { w: "58%", active: true, tag: "SBIR Phase I · DoE" },
        { w: "74%", tag: "STTR Phase I · NSF" },
        { w: "48%", tag: "SBIR Phase II · NIH" },
        { w: "63%", tag: "BAA · DARPA" },
      ],
    },
  },
];

export default function FeatureTabs() {
  const [active, setActive] = useState(0);
  const panel = TABS[active].panel;

  return (
    <div className="feat-grid">
      <div className="feat-tabs" role="tablist" aria-label="What GrantHunter produces">
        {TABS.map((t, i) => (
          <button
            key={t.key}
            type="button"
            role="tab"
            aria-selected={i === active}
            className={`feat-tab${i === active ? " on" : ""}`}
            onClick={() => setActive(i)}
          >
            <p className="ft-t">{t.title}</p>
            <p className="ft-d">{t.desc}</p>
          </button>
        ))}
      </div>

      <div className="feat-panel" role="tabpanel">
        <div className="mock-head">
          <div className="mock-head-left">
            <span className="mock-chip">GH</span>
            <div>
              <p className="mock-title">{panel.label}</p>
              <p className="mock-sub">grant-package.draft</p>
            </div>
          </div>
          <span className="mock-pill">{panel.status}</span>
        </div>
        <div className="mock-rows">
          {panel.rows.map((r, i) => (
            <div key={i} className={`mock-row${r.active ? " active" : ""}`}>
              <span className={`mock-tick${r.active ? "" : " ghost"}`} />
              <div className="mock-row-body">
                <p className="mock-tag">{r.tag}</p>
                <span
                  className="mock-bar pulse"
                  style={{ width: r.w, animationDelay: `${i * 160}ms` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
