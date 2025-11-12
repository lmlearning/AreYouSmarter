#!/bin/bash

# claim-batch-github.sh - GitHub-based batch claiming for parallel workers
# Usage: ./claim-batch-github.sh [start] [end] [worker_id]
# Example: ./claim-batch-github.sh 3000 3019 worker_1

set -e

BATCH_SIZE=15
CLAIMS_FILE="claims.json"
BRANCH="claude/precompute-ai-explanations-011CUzpKujAXgqfipY1P1QLy"
MAX_RETRIES=5

# Parse arguments
START=${1}
END=${2}
WORKER_ID=${3:-"worker_$(hostname)_$$"}

if [ -z "$START" ]; then
    echo "Usage: $0 [start] [end] [worker_id]"
    echo ""
    echo "Example: $0 3000 3019 worker_1"
    echo "Or use 'auto' mode: $0 auto"
    exit 1
fi

cd /home/user/AreYouSmarter

# Function to pull latest
pull_latest() {
    echo "🔄 Pulling latest from GitHub..."
    git fetch origin "$BRANCH"
    git pull origin "$BRANCH" || {
        echo "⚠️  Pull failed, trying merge..."
        git merge origin/"$BRANCH" || {
            echo "❌ Cannot pull. Resolve conflicts manually."
            exit 1
        }
    }
}

# Function to claim batch
claim_batch() {
    local start=$1
    local end=$2
    local worker=$3
    local retry_count=0

    while [ $retry_count -lt $MAX_RETRIES ]; do
        # Pull latest
        pull_latest

        # Read current claims
        python3 << PYEOF
import json
from datetime import datetime, timedelta

with open('$CLAIMS_FILE', 'r') as f:
    data = json.load(f)

claims = data.get('claims', [])

# Remove stale claims (>2 hours)
now = datetime.utcnow()
active_claims = []
for claim in claims:
    claim_time = datetime.fromisoformat(claim['timestamp'].replace('Z', '+00:00'))
    age_hours = (now - claim_time).total_seconds() / 3600
    if age_hours < 2:
        active_claims.append(claim)

# Check for conflicts
start, end = $start, $end
conflict = False
for claim in active_claims:
    c_start, c_end = claim['start'], claim['end']
    if start <= c_end and end >= c_start:
        print(f"CONFLICT:{claim['worker']}:{c_start}-{c_end}")
        conflict = True
        break

if conflict:
    exit(1)

# Add new claim
new_claim = {
    "start": start,
    "end": end,
    "worker": "$worker",
    "timestamp": now.isoformat() + 'Z'
}
active_claims.append(new_claim)

data['claims'] = active_claims
data['last_updated'] = now.isoformat() + 'Z'

with open('$CLAIMS_FILE', 'w') as f:
    json.dump(data, f, indent=2)

print(f"CLAIMED:{start}-{end}")
PYEOF

        result=$?

        if [ $result -eq 1 ]; then
            echo "❌ Conflict detected!"
            cat "$CLAIMS_FILE" | python3 -m json.tool
            return 1
        fi

        # Commit and push
        git add "$CLAIMS_FILE"
        git commit -m "Claim batch $start-$end by $worker" || {
            echo "⚠️  Nothing to commit (already claimed?)"
            return 1
        }

        if git push origin "$BRANCH"; then
            echo "✅ Successfully claimed batch $start-$end"
            return 0
        else
            retry_count=$((retry_count + 1))
            if [ $retry_count -lt $MAX_RETRIES ]; then
                wait_time=$((2 ** retry_count))
                echo "⚠️  Push failed, retrying in ${wait_time}s... (attempt $retry_count/$MAX_RETRIES)"
                sleep $wait_time
            else
                echo "❌ Failed to push claim after $MAX_RETRIES attempts"
                git reset HEAD~1  # Undo commit
                return 1
            fi
        fi
    done
}

# Auto mode: find next available batch
if [ "$START" == "auto" ]; then
    pull_latest

    echo "🔍 Finding next available batch..."

    # Get completed count
    COMPLETED=$(python3 -c "import json; print(len(json.load(open('server/data/ai-explanations.json'))))")

    # Get active claims to avoid
    CLAIMED_RANGES=$(python3 << 'PYEOF'
import json
from datetime import datetime, timedelta

with open('claims.json', 'r') as f:
    data = json.load(f)

claims = data.get('claims', [])
now = datetime.utcnow()

# Only active claims (<2 hours)
active = []
for claim in claims:
    claim_time = datetime.fromisoformat(claim['timestamp'].replace('Z', '+00:00'))
    age_hours = (now - claim_time).total_seconds() / 3600
    if age_hours < 2:
        active.append(f"{claim['start']}-{claim['end']}")

print(','.join(active))
PYEOF
)

    echo "   Completed: $COMPLETED"
    echo "   Active claims: ${CLAIMED_RANGES:-none}"

    # Find next unclaimed batch
    START=$COMPLETED
    END=$((START + BATCH_SIZE - 1))

    # Check if this range is claimed
    if echo "$CLAIMED_RANGES" | grep -q "$START"; then
        echo "   Range $START-$END appears claimed, trying next..."
        START=$((END + 1))
        END=$((START + BATCH_SIZE - 1))
    fi

    echo "📦 Claiming batch: $START-$END"
fi

# Validate range
if [ $END -lt $START ]; then
    echo "❌ Error: End ($END) must be >= Start ($START)"
    exit 1
fi

# Attempt to claim
if claim_batch $START $END "$WORKER_ID"; then
    # Get the batch
    echo ""
    echo "📥 Fetching questions..."
    BATCH_JSON="/tmp/my_batch_${START}_${END}.json"
    node get-batch.mjs $((END - START + 1)) > "$BATCH_JSON"

    echo "✅ Batch saved to: $BATCH_JSON"
    echo ""
    echo "📊 Batch summary:"
    python3 << PYEOF
import json
with open('$BATCH_JSON', 'r') as f:
    data = json.load(f)
    batch = data['batch']
print(f"  Questions: {len(batch)}")
if batch:
    print(f"  First: {batch[0]['id']}")
    print(f"  Last: {batch[-1]['id']}")
PYEOF

    echo ""
    echo "🎯 Next steps:"
    echo "   1. Generate explanations for questions in $BATCH_JSON"
    echo "   2. Run: ./complete-batch-github.sh $START $END $WORKER_ID"
    echo ""
    echo "⚠️  Important: Your claim is now on GitHub. Other workers can see it."
else
    echo ""
    echo "❌ Failed to claim batch. Try different range or wait for conflicts to resolve."
    exit 1
fi
