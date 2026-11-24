#!/usr/bin/env bash
set -e

echo "=== Running Living Documentation Impact Check ==="

CHANGED_FILES=$(git diff --name-only origin/main...HEAD 2>/dev/null || git status --porcelain | awk '{print $2}')

if [ -z "$CHANGED_FILES" ]; then
  echo "No changed files detected. Passing check."
  exit 0
fi

FAILED=0

check_mapping() {
  local pattern=$1
  local required_doc=$2
  
  if echo "$CHANGED_FILES" | grep -qE "$pattern"; then
    if ! echo "$CHANGED_FILES" | grep -qE "$required_doc"; then
      echo "❌ VIOLATION: Changes detected in '$pattern' but '$required_doc' was not updated!"
      FAILED=1
    else
      echo "✓ Verified: Changes in '$pattern' synchronized with '$required_doc'."
    fi
  fi
}

check_mapping "backend/app/Models|backend/database/migrations" "docs/DATABASE.md"
check_mapping "backend/routes|backend/app/Http" "docs/API.md"
check_mapping "backend/app/Policies" "docs/SECURITY.md"
check_mapping "backend/app/Services/LuckyDip" "docs/LUCKY_DIP_RULES.md"
check_mapping "frontend/src/components|frontend/src/pages" "docs/DESIGN_SPEC.md"

if [ $FAILED -ne 0 ]; then
  echo "Living documentation check failed. Please update corresponding docs or add approved override."
  exit 1
fi

echo "✓ All living documentation checks passed."
exit 0
