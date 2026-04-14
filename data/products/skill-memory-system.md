# TalonForge Skill — AI Memory System (3-Layer PARA)

*TalonForge ClawMart Skill · v1.0 · OpenClaw-compatible*
*Included in: The Bundle · AI Company in a Box*

---

## What this skill does

Installs a **3-layer persistent memory** on your AI agent so it remembers across sessions, compounds knowledge daily, and surfaces the right context at the right time. Inspired by Felix Craft's Masinov Company + PARA methodology.

**Without this skill:** your AI wakes up with amnesia every session. Each conversation starts from zero. Knowledge evaporates.

**With this skill:** your AI has a brain that grows every day.

---

## The 3 Layers

### Layer 1 — `MEMORY.md` (Long-term curated)
The distilled essence. Manually curated or promoted from daily notes. Think of it as what a human would remember after a year of working on the company.

**What goes here:**
- Core identity decisions
- Strategic bets + outcomes
- Key customer / partner context
- Hard-won lessons
- Non-obvious "watch out for X" insights

**What does NOT go here:**
- Every daily log
- Raw chat history
- Low-signal noise

### Layer 2 — `memory/YYYY-MM-DD.md` (Daily notes)
Raw daily log. One file per day. Low friction to write, high value when reviewed weekly.

**Template:**
```markdown
# 2026-04-13 — Day N

## Key events
- HH:MM — what happened

## Decisions
- Decided X because Y

## Lessons
- Learned Z the hard way

## Tomorrow
- [ ] action 1
- [ ] action 2
```

### Layer 3 — PARA Knowledge Graph
Four top-level buckets, standard across your workspace:

- **Projects** — active, time-bound work with a deadline
- **Areas** — ongoing responsibilities (e.g., "customer support", "brand")
- **Resources** — topics of interest (reference material, swipe files)
- **Archive** — completed / dormant work

---

## Installation (OpenClaw)

1. Save this file as `SKILL-memory-system.md` in your OpenClaw skills dir:
   ```
   ~/.openclaw/skills/memory-system/SKILL.md
   ```

2. Tell your AI:
   > "Install the Memory System skill. Create MEMORY.md if it doesn't exist, create `memory/` directory, create today's daily note, and set up PARA in my workspace."

3. Your AI will create:
   ```
   workspace/
   ├── MEMORY.md
   ├── memory/
   │   └── 2026-04-13.md
   ├── Projects/
   ├── Areas/
   ├── Resources/
   └── Archive/
   ```

---

## Nightly Extraction Cron (optional but recommended)

Add this to your AI's routines so it auto-reviews each day and promotes durable insights into MEMORY.md:

```bash
0 23 * * * cd /path/to/workspace && claude --print "Read today's daily note (memory/$(date +%Y-%m-%d).md). Extract 1-3 durable insights worth remembering. Append to MEMORY.md under today's date. If nothing durable happened, write 'No promotions today.'"
```

---

## Why 3 Layers (not 1)

**1-layer (dump everything into MEMORY.md):** memory bloats, context window overflows, retrieval quality drops.

**2-layer (MEMORY + daily):** works but PARA organization helps for project-specific context retrieval.

**3-layer (what this skill installs):** memory compounds, daily notes capture raw signal, PARA routes knowledge to the right bucket for query-time retrieval.

---

## Related Products

- **The Blueprint ($29)** — full context on how to design memory + identity together
- **The Kit ($97)** — auto-generates this structure + 4 others from 10 answers
- **The Bundle ($97)** — this skill + Blueprint + Kit + 2 other skills

*TalonForge · 2026*

— Anvil 🦅
