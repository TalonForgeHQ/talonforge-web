# TalonForge Skill — AI Safety Rails

*TalonForge ClawMart Skill · v1.0 · OpenClaw-compatible*
*Included in: The Bundle · AI Company in a Box*

---

## What this skill does

Installs **pre-built guardrails** on your autonomous AI agent so it can act freely on low-risk tasks and pauses for human approval on high-risk ones. Not a nanny. A tiered trust system.

**Without this skill:** you either (a) micromanage every action and your AI is useless, or (b) give it free reign and it sends $10K to the wrong wallet.

**With this skill:** your AI has a clear ladder of what it can do alone, what it does with notification, and what requires explicit approval.

---

## The 5-Tier Trust Ladder

### Tier 1 — Read-only (no approval)
- Read any local file
- Fetch public URLs
- Query your own databases
- Summarize / analyze / report

### Tier 2 — Local writes (no approval)
- Create / edit files in workspace
- Commit to git (local)
- Run tests
- Update MEMORY.md

### Tier 3 — External side-effects (notify)
- Push to GitHub
- Deploy to staging
- Send email draft (for review)
- Post to social media (with `--draft` flag)

### Tier 4 — Customer / brand-facing (approval required)
- Publish to production
- Send email from brand inbox
- Post to social media (live)
- Reply to customer DMs
- Change pricing
- Sign a contract

### Tier 5 — Financial / irreversible (explicit approval + audit)
- Move funds
- Deploy smart contracts
- Delete data
- Grant access to third parties
- Respond to legal / regulatory

---

## Guardrails Installed

### Financial
- **Wallet approval floor:** any on-chain action above `[USER_THRESHOLD]` triggers approval
- **Subscription ceiling:** monthly SaaS spend cap
- **Ad spend cap:** paid-media daily budget

### Data
- **PII handling:** customer data auto-redacted from logs
- **Secret detection:** scans before commits, blocks pushes with leaked keys
- **Backup protection:** no `rm -rf` on production data without 2-person approval

### External
- **Domain allowlist:** external POSTs restricted to declared partners
- **API rate limits:** self-imposed ceilings on expensive APIs
- **Rollback readiness:** every production change must have a documented rollback path

### Brand
- **Voice guardrail:** no posting without matching brand voice rules
- **Competitor trash-talk blocked:** don't publicly attack named competitors
- **Legal-sensitive topics flagged:** auto-escalate anything that looks like legal risk

---

## Installation (OpenClaw)

1. Save as `SKILL-safety-rails.md` in:
   ```
   ~/.openclaw/skills/safety-rails/SKILL.md
   ```

2. Tell your AI:
   > "Install the Safety Rails skill. Create SAFETY.md with our tier definitions. For each tier, draft the approval workflow. Default me to Tier 3 approval."

3. Configure the user-specific values in `SAFETY.md`:
   ```yaml
   user: Zinou
   wallet_approval_floor_usd: 500
   subscription_monthly_cap_usd: 200
   ad_spend_daily_cap_usd: 50
   brand_voice_file: ../../VOICE.md
   ```

---

## Emergency Kill-Switch

Every TalonForge AI agent must recognize a hard-stop word:

```
STOP STOP STOP
```

When the user types this (all caps, three words, in any channel), the AI:
1. Ceases all in-flight actions
2. Posts a summary of what it was doing
3. Waits for explicit resume

Implementation: a watcher that scans all inbound messages for the pattern and calls `halt()`.

---

## Why this beats "just be careful"

Without tiers, every prompt becomes a negotiation. Tiers let you set policy once and let the AI self-route by risk category. That's the difference between a junior employee who asks about every decision and a senior one who knows what to escalate.

---

## Related Products

- **The Blueprint ($29)** — full essay on trust-ladder design + 10 case studies
- **The Kit ($97)** — auto-installs this + 4 other skills from 10 answers
- **The Bundle ($97)** — this skill + Blueprint + Kit + 2 other skills

*TalonForge · 2026*

— Anvil 🦅
