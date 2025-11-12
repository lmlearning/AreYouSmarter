#!/bin/bash

# complete-batch-github.sh - Complete batch with GitHub coordination
# Usage: ./complete-batch-github.sh [start] [end] [worker_id]

set -e

CLAIMS_FILE="claims.json"
MAIN_FILE="server/data/ai-explanations.json"
BRANCH="claude/precompute-ai-explanations-011CUzpKujAXgqfipY1P1QLy"
MAX_RETRIES=5

START=${1}
END=${2}
WORKER_ID=${3:-"worker_$(hostname)_$$"}

if [ -z "$START" ] || [ -z "$END" ]; then
    echo "Usage: $0 [start] [end] [worker_id]"
    exit 1
fi

GENERATED_FILE="/tmp/generated_batch_${START}_${END}.json"

cd /home/user/AreYouSmarter

# Check if generated file exists
if [ ! -f "$GENERATED_FILE" ]; then
    echo "❌ Error: Generated batch file not found: $GENERATED_FILE"
    exit 1
fi

# Validate JSON
echo "🔍 Validating generated batch JSON..."
python3 -m json.tool "$GENERATED_FILE" > /dev/null 2>&1 || {
    echo "❌ Error: Invalid JSON"
    exit 1
}

BATCH_COUNT=$(python3 -c "import json; print(len(json.load(open('$GENERATED_FILE'))))")
echo "✅ Found $BATCH_COUNT explanations in batch"

# Pull latest before appending
echo ""
echo "🔄 Pulling latest changes..."
git fetch origin "$BRANCH"
git pull origin "$BRANCH" || {
    echo "⚠️  Pull had conflicts, trying to resolve..."
    git merge origin/"$BRANCH"
}

# Append to main file
echo ""
echo "📝 Appending to main file..."
python3 << PYEOF
import json

with open('$MAIN_FILE', 'r') as f:
    all_explanations = json.load(f)

before_count = len(all_explanations)

with open('$GENERATED_FILE', 'r') as f:
    new_batch = json.load(f)

# Check for duplicates
existing_ids = {e['questionId'] for e in all_explanations}
new_explanations = [e for e in new_batch if e['questionId'] not in existing_ids]
duplicate_count = len(new_batch) - len(new_explanations)

if duplicate_count > 0:
    print(f"⚠️  Warning: {duplicate_count} duplicate(s) skipped")

if not new_explanations:
    print("❌ No new explanations to add")
    exit(1)

all_explanations.extend(new_explanations)
after_count = len(all_explanations)

with open('$MAIN_FILE', 'w') as f:
    json.dump(all_explanations, f, indent=2)

percent = after_count / 14042 * 100
print(f"✅ Added {len(new_explanations)} explanations")
print(f"   Before: {before_count}")
print(f"   After: {after_count}")
print(f"   Progress: {after_count}/14042 ({percent:.2f}%)")

with open('/tmp/batch_stats.txt', 'w') as f:
    f.write(f"{before_count}\n{after_count}\n{percent:.2f}\n{len(new_explanations)}")
PYEOF

[ $? -eq 0 ] || {
    echo "❌ Error during append"
    exit 1
}

# Read stats
read BEFORE_COUNT AFTER_COUNT PERCENT ADDED_COUNT < /tmp/batch_stats.txt

# Determine subjects
SUBJECTS=$(python3 << PYEOF
import json
with open('$GENERATED_FILE', 'r') as f:
    batch = json.load(f)
    subjects = {}
    for exp in batch:
        subject = exp['questionId'].rsplit('_', 1)[0]
        subjects[subject] = subjects.get(subject, 0) + 1
    print(', '.join([f"{s} ({subjects[s]})" for s in sorted(subjects.keys())]))
PYEOF
)

# Remove claim from claims.json
echo ""
echo "🧹 Removing claim from GitHub..."

python3 << PYEOF
import json
from datetime import datetime

with open('$CLAIMS_FILE', 'r') as f:
    data = json.load(f)

claims = data.get('claims', [])
completed = data.get('completed_batches', [])

# Remove this worker's claim
new_claims = [c for c in claims if not (c['start'] == $START and c['end'] == $END and c['worker'] == '$WORKER_ID')]

# Add to completed
completed.append({
    "start": $START,
    "end": $END,
    "worker": "$WORKER_ID",
    "completed_at": datetime.utcnow().isoformat() + 'Z',
    "count": $ADDED_COUNT
})

data['claims'] = new_claims
data['completed_batches'] = completed[-100:]  # Keep last 100
data['last_updated'] = datetime.utcnow().isoformat() + 'Z'

with open('$CLAIMS_FILE', 'w') as f:
    json.dump(data, f, indent=2)

print(f"✅ Removed claim for batch $START-$END")
PYEOF

# Commit everything
echo ""
echo "💾 Committing changes..."

git add "$MAIN_FILE" "$CLAIMS_FILE"

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
echo "⬆️  Pushing to GitHub..."
retry_count=0

while [ $retry_count -lt $MAX_RETRIES ]; do
    if git push origin "$BRANCH"; then
        echo "✅ Successfully pushed to GitHub"
        break
    else
        retry_count=$((retry_count + 1))
        if [ $retry_count -lt $MAX_RETRIES ]; then
            wait_time=$((2 ** retry_count))
            echo "⚠️  Push failed, retrying in ${wait_time}s..."
            sleep $wait_time

            # Pull and retry
            echo "   Pulling latest..."
            git pull --rebase origin "$BRANCH" || {
                echo "   Merge conflict - manual resolution needed"
                exit 1
            }
        else
            echo "❌ Push failed after $MAX_RETRIES attempts"
            echo ""
            echo "Your changes are committed locally. Manual push required:"
            echo "  git pull origin $BRANCH"
            echo "  git push origin $BRANCH"
            exit 1
        fi
    fi
done

# Clean up
echo ""
echo "🧹 Cleaning up local files..."
rm -f "/tmp/my_batch_${START}_${END}.json"
rm -f "$GENERATED_FILE"
rm -f "/tmp/batch_stats.txt"

echo ""
echo "🎉 Batch complete and pushed to GitHub!"
echo ""
echo "📊 Summary:"
echo "   Questions: ${START}-${END}"
echo "   Added: ${ADDED_COUNT} explanations"
echo "   Total: ${AFTER_COUNT}/14042 (${PERCENT}%)"
echo "   Remaining: $((14042 - AFTER_COUNT))"
echo ""
echo "🚀 Ready for next batch!"
echo "   Run: ./claim-batch-github.sh auto"
