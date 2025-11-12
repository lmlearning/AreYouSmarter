#!/bin/bash

# complete-batch.sh - Helper script for completing and committing batches
# Usage: ./complete-batch.sh [start] [end] [worker_id]
# Example: ./complete-batch.sh 3000 3019 worker_1

set -e

# Configuration
CLAIMS_DIR="/tmp/claims"
MAIN_FILE="server/data/ai-explanations.json"
BRANCH="claude/precompute-ai-explanations-011CUzpKujAXgqfipY1P1QLy"

# Parse arguments
START=${1}
END=${2}
WORKER_ID=${3:-"worker_$(hostname)_$$"}

# Show usage if no arguments
if [ -z "$START" ] || [ -z "$END" ]; then
    echo "Usage: $0 [start] [end] [worker_id]"
    echo ""
    echo "Example: $0 3000 3019 worker_1"
    echo ""
    echo "This script will:"
    echo "  1. Append your generated batch to main file"
    echo "  2. Commit changes"
    echo "  3. Push to remote"
    echo "  4. Remove your claim"
    exit 1
fi

CLAIM_FILE="$CLAIMS_DIR/claim_${START}_${END}.txt"
GENERATED_FILE="/tmp/generated_batch_${START}_${END}.json"

cd /home/user/AreYouSmarter

# Check if generated file exists
if [ ! -f "$GENERATED_FILE" ]; then
    echo "❌ Error: Generated batch file not found: $GENERATED_FILE"
    echo ""
    echo "Expected location: $GENERATED_FILE"
    echo "Did you generate the explanations?"
    exit 1
fi

# Validate JSON
echo "🔍 Validating generated batch JSON..."
if ! python3 -m json.tool "$GENERATED_FILE" > /dev/null 2>&1; then
    echo "❌ Error: Invalid JSON in $GENERATED_FILE"
    exit 1
fi

# Check batch size
BATCH_COUNT=$(python3 -c "import json; print(len(json.load(open('$GENERATED_FILE'))))")
echo "✅ Found $BATCH_COUNT explanations in batch"

# Append to main file
echo ""
echo "📝 Appending to main file..."
python3 << 'PYEOF'
import json

# Load main file
with open('server/data/ai-explanations.json', 'r') as f:
    all_explanations = json.load(f)

before_count = len(all_explanations)

# Load generated batch
with open('GENERATED_FILE', 'r') as f:
    new_batch = json.load(f)

# Check for duplicates
existing_ids = {e['questionId'] for e in all_explanations}
new_explanations = [e for e in new_batch if e['questionId'] not in existing_ids]
duplicate_count = len(new_batch) - len(new_explanations)

if duplicate_count > 0:
    print(f"⚠️  Warning: {duplicate_count} duplicate(s) skipped")

if not new_explanations:
    print("❌ No new explanations to add (all duplicates)")
    exit(1)

# Append new explanations
all_explanations.extend(new_explanations)
after_count = len(all_explanations)

# Save
with open('server/data/ai-explanations.json', 'w') as f:
    json.dump(all_explanations, f, indent=2)

# Report
percent = after_count / 14042 * 100
print(f"✅ Added {len(new_explanations)} explanations")
print(f"   Before: {before_count}")
print(f"   After: {after_count}")
print(f"   Progress: {after_count}/14042 ({percent:.2f}%)")

# Save stats for commit message
with open('/tmp/batch_stats.txt', 'w') as f:
    f.write(f"{before_count}\n{after_count}\n{percent:.2f}\n{len(new_explanations)}")
PYEOF

if [ $? -ne 0 ]; then
    echo "❌ Error during append"
    exit 1
fi

# Read stats for commit message
read BEFORE_COUNT AFTER_COUNT PERCENT ADDED_COUNT < /tmp/batch_stats.txt

# Determine subjects covered
SUBJECTS=$(python3 << 'PYEOF'
import json
with open('GENERATED_FILE', 'r') as f:
    batch = json.load(f)
    subjects = {}
    for exp in batch:
        subject = exp['questionId'].rsplit('_', 1)[0]
        subjects[subject] = subjects.get(subject, 0) + 1

    summary = ', '.join([f"{s}_{subjects[s]}" for s in sorted(subjects.keys())])
    print(summary)
PYEOF
)

# Commit
echo ""
echo "💾 Committing changes..."
git add "$MAIN_FILE"

COMMIT_MSG="Add ${ADDED_COUNT} AI explanations (${BEFORE_COUNT}→${AFTER_COUNT}, ${PERCENT}%)

Generated comprehensive explanations for:
- Questions ${START}-${END} (${ADDED_COUNT} questions)
- Subjects: ${SUBJECTS}

Worker: ${WORKER_ID}

High-quality explanations with detailed reasoning, step-by-step logic,
and educational content following project standards."

git commit -m "$COMMIT_MSG"

# Push with retry
echo ""
echo "⬆️  Pushing to remote..."
MAX_RETRIES=3
RETRY_COUNT=0

while [ $RETRY_COUNT -lt $MAX_RETRIES ]; do
    if git push -u origin "$BRANCH"; then
        echo "✅ Successfully pushed to remote"
        break
    else
        RETRY_COUNT=$((RETRY_COUNT + 1))
        if [ $RETRY_COUNT -lt $MAX_RETRIES ]; then
            WAIT_TIME=$((2 ** RETRY_COUNT))
            echo "⚠️  Push failed, retrying in ${WAIT_TIME}s... (attempt $RETRY_COUNT/$MAX_RETRIES)"
            sleep $WAIT_TIME
        else
            echo "❌ Push failed after $MAX_RETRIES attempts"
            echo ""
            echo "Possible solutions:"
            echo "  1. Check network connection"
            echo "  2. Pull latest changes: git pull origin $BRANCH"
            echo "  3. Manually resolve conflicts if any"
            echo ""
            echo "Your changes are committed locally but not pushed."
            echo "Claim file NOT removed: $CLAIM_FILE"
            exit 1
        fi
    fi
done

# Remove claim file
echo ""
echo "🧹 Cleaning up..."
if [ -f "$CLAIM_FILE" ]; then
    rm "$CLAIM_FILE"
    echo "✅ Removed claim file"
fi

# Remove temp files
rm -f "/tmp/my_batch_${START}_${END}.json"
rm -f "$GENERATED_FILE"
rm -f "/tmp/batch_stats.txt"

echo ""
echo "🎉 Batch complete!"
echo ""
echo "📊 Summary:"
echo "   Questions: ${START}-${END}"
echo "   Added: ${ADDED_COUNT} explanations"
echo "   Total: ${AFTER_COUNT}/14042 (${PERCENT}%)"
echo "   Remaining: $((14042 - AFTER_COUNT))"
echo ""
echo "🚀 Ready for next batch!"
echo "   Run: ./claim-batch.sh auto"
