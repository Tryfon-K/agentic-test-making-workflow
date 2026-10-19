#!/bin/zsh

# Run Playwright with any arguments passed to this script, capturing both output streams.
test_output="$(npx playwright test --reporter=line "$@" 2>&1)"
test_status=$?

# Show Playwright's output and stop if the tests passed.
print -r -- "$test_output"

if (( test_status == 0 )); then
  exit 0
fi

# Store Codex's final answer in the project test-results directory.
diagnosis_log="test-results/codex-diagnosis.log"

# Clear any diagnosis from a previous run so it cannot be mistaken for a new one.
: > "$diagnosis_log"

# Send the failure details to Codex for a read-only diagnosis.
# Hide Codex's progress output; its final answer goes into the log above.
codex exec --sandbox read-only --output-last-message "$diagnosis_log" \
  - >/dev/null 2>&1 <<EOF
Investigate each failed test shown below. This run already reproduced
the failure; do not rerun tests.

For each failed test, read its error-context.md, relevant test and page objects, and saved trace.
Inspect the relevant trace actions and final page state; do not dump the
entire trace archive or explore unrelated files.

Classify the cause as an application defect, outdated test, or test
reliability issue. Give the evidence and the exact proposed repair.
Have the Cause and Proposed Repair in separate lines.
If the evidence is insufficient, say what additional check is needed.
Do not edit files. Keep the final answer under 200 words.

Playwright output:
$test_output
EOF
# Print the diagnosis, or explain when no diagnosis was produced.
if [[ -s "$diagnosis_log" ]]; then
  print -r -- "Codex failed test diagnosis:"
  cat "$diagnosis_log"
  print
else
  print -u2 -- "Codex did not produce a diagnosis."
fi

# Return Playwright's original status so npm and CI still see the test failure.
exit "$test_status"
