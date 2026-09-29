---
description: Generate a work report (Today / This Week / This Month / Custom range) from the recorded Daily Work Log
---

Generate a work report from this project's Daily Work Tracking System. This
is a reporting task strictly over recorded data — never estimate, round up,
or invent statistics beyond what's actually written in the log files.

Do this in order:

1. If the requested time range wasn't given as an argument to this command,
   **ask the user**: "What report do you want? Today / This Week / This
   Month / Custom Date Range" — and wait for their answer before generating
   anything. If a range was already given as an argument, use it directly
   without asking again.

2. Read `DAILY_WORK_LOG.xlsx` (its `Daily Log` and `Tasks` sheets — read the
   workbook with a script, e.g. Node + `exceljs`, since it's a binary file)
   and `DAILY_WORK_LOG.csv` in full.

3. Determine the actual date range to report on (today's date, the last 7
   days, the current calendar month, or the user's custom range) and select
   only the dated blocks/rows that actually fall within it. If the log has
   no entries in that range, say so plainly — do not fabricate a range that
   has no recorded data.

4. Produce a report containing exactly:
   - Dates covered (only dates that actually have entries)
   - Projects worked on
   - Pages/sections designed
   - Features implemented
   - Bugs fixed
   - Responsive work
   - Performance work
   - Testing performed
   - Files changed
   - Completed tasks
   - In-progress tasks
   - Blockers
   - Next planned work (only if genuinely recorded/known — otherwise state
     that no future work has been explicitly planned)

5. Base every number (task counts, bug counts, file counts) on actually
   counting the recorded rows/entries in the date range — do not estimate or
   assign arbitrary completion percentages or productivity scores.

6. If asked for total working hours or a similar time metric and the log
   entries say "Not reliably measurable from available project/session
   data." for that period, report it exactly that way — do not compute or
   guess a number from task counts.

7. Present the report as a clean, readable summary (not a raw dump of the
   CSV) — organized under the headings above, citing dates where useful.
