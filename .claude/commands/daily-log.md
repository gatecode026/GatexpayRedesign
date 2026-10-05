---
description: Inspect today's actual work and append/update today's record in DAILY_WORK_LOG.xlsx and DAILY_WORK_LOG.csv
---

Update the project's Daily Work Tracking System for today. Follow the rules
in `CLAUDE.md` under "Daily Work Tracking System" exactly — this is a data
integrity task, not a creative-writing task.

Do this in order:

1. **Read first.** Read `CLAUDE.md`'s tracking-system section, then
   `DAILY_WORK_LOG.xlsx` (its `README` and `Daily Log` sheets — read the
   workbook with a script, e.g. Node + `exceljs`, since it's a binary file),
   and `DAILY_WORK_LOG.csv` if it exists. Determine today's actual date.
   Check whether today's dated block already exists in the `Daily Log`
   sheet and whether today's date already has rows in the `Tasks` sheet /
   the CSV.

2. **Inspect what actually happened** — do not rely on memory or assumption:
   - If this project is a git repository: run `git status`, `git diff`, and
     `git log` (scoped to today if possible) to see real changes, files
     touched, and any commits. If it is not a git repository, say so in the
     Git/Change Summary section instead of inventing commit data.
   - Review the files actually created/modified/deleted during this session
     (from the conversation's own tool-call history — edits, writes, file
     reads that led to changes).
   - Review any test/build/typecheck/lint commands that were actually run
     this session and their real results.
   - Review any explicit statements the user made about what was done,
     planned, or blocked.

3. **Cross-check against what's already logged today.** If today's block/
   rows already exist (this is a second `/daily-log` run today, or a
   continuation), extend/update them with new work rather than duplicating
   the whole day or creating a second dated block for the same date.

4. **Write today's block in the `Daily Log` sheet** (append below the
   previous day's block if today doesn't exist yet; otherwise update
   today's existing block in place) using this structure exactly, matching
   the formatting already used in the sheet (bold navy date-heading row,
   bold blue section-label rows, mini-tables with a light header row for
   Tasks Completed / Files Changed, bullet rows for lists):

   ```
   YYYY-MM-DD                 (date heading)

   Project
   Work Summary
   Tasks Completed            (mini-table: # | Task | Type | Status | Details)
   Design Work
   Development Work
   Bug Fixes
   Responsive Work
   Performance Work
   Files Changed              (mini-table: File | Action | Purpose)
   Testing & Verification
   Git / Change Summary
   Work Completed
   Work In Progress
   Next Day Plan
   Daily Statistics
   Daily Summary
   ```

   Skip a section's specifics honestly (e.g. "No performance work was done
   today") rather than padding it with unrelated content. Never invent
   working hours — if not determinable, write exactly: "Not reliably
   measurable from available project/session data." Never mark unfinished
   or reverted work as "Completed".

   Since `.xlsx` is a binary format, generate the update with a script
   (read the existing workbook with `exceljs`, append/update the relevant
   rows, then write it back to the same path) rather than attempting a text
   edit.

5. **Write matching rows in the `Tasks` sheet** — one row per meaningful
   task from today's Tasks Completed table, using the existing column
   header row as the schema. Append new rows; never delete or rewrite
   existing rows.

6. **Write the same rows to `DAILY_WORK_LOG.csv`**, in the same column
   order as its header row. Append; never delete or rewrite existing rows.
   Quote any field containing a comma. After writing, verify the file still
   parses as valid CSV (consistent field count per row) before finishing.

7. **Never delete, reorder, or rewrite any previous day's block or rows**
   in either file.

8. **Report back concisely**: how many tasks were logged today, how many
   bugs fixed, how many files changed, and point to the two files. Do not
   re-print the entire log in chat.
