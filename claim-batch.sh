#!/bin/bash

# claim-batch.sh - Helper script for claiming batches in parallel explanation generation
# Usage: ./claim-batch.sh [start] [end] [worker_id]
# Example: ./claim-batch.sh 3000 3019 worker_1

set -e

# Configuration
CLAIMS_DIR="/tmp/claims"
BATCH_SIZE=15

# Parse arguments
START=${1}
END=${2}
WORKER_ID=${3:-"worker_$(hostname)_$$"}

# Show usage if no arguments
if [ -z "$START" ]; then
    echo "Usage: $0 [start] [end] [worker_id]"
    echo ""
    echo "Example: $0 3000 3019 worker_1"
    echo ""
    echo "Or use 'auto' mode to claim next available batch:"
    echo "  $0 auto"
    echo ""
    echo "Current status:"
    cd /home/user/AreYouSmarter
    python3 << 'PYEOF'
import json
with open('server/data/ai-explanations.json', 'r') as f:
    explanations = json.load(f)
total = 14042
completed = len(explanations)
print(f"  Completed: {completed}/{total} ({completed/total*100:.2f}%)")
print(f"  Remaining: {total - completed}")
PYEOF
    echo ""
    if [ -d "$CLAIMS_DIR" ]; then
        echo "Active claims:"
        ls -lh "$CLAIMS_DIR"/claim_*.txt 2>/dev/null | awk '{print "  " $9}' || echo "  None"
    fi
    exit 1
fi

# Auto mode: find next available batch
if [ "$START" == "auto" ]; then
    echo "🔍 Finding next available batch..."
    cd /home/user/AreYouSmarter

    # Get next batch
    BATCH_DATA=$(node get-batch.mjs 1)
    COMPLETED=$(echo "$BATCH_DATA" | python3 -c "import sys, json; data=json.load(sys.stdin); print(data['completed'])")

    # Suggested start
    START=$COMPLETED
    END=$((START + BATCH_SIZE - 1))

    echo "📦 Suggested batch: $START-$END"

    # Check if claimed
    if [ -f "$CLAIMS_DIR/claim_${START}_${END}.txt" ]; then
        echo "⚠️  Batch $START-$END already claimed!"
        echo "   Trying next batch..."
        START=$((END + 1))
        END=$((START + BATCH_SIZE - 1))
        echo "📦 Alternative batch: $START-$END"
    fi
fi

# Validate range
if [ $END -lt $START ]; then
    echo "❌ Error: End ($END) must be >= Start ($START)"
    exit 1
fi

BATCH_SIZE=$((END - START + 1))
if [ $BATCH_SIZE -gt 50 ]; then
    echo "⚠️  Warning: Batch size ($BATCH_SIZE) is large. Recommended: 15-20 questions."
    read -p "Continue? (y/n) " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
fi

# Create claims directory
mkdir -p "$CLAIMS_DIR"

# Clean up stale claims (older than 2 hours)
echo "🧹 Cleaning stale claims (>2 hours old)..."
find "$CLAIMS_DIR" -name "claim_*.txt" -mmin +120 -delete 2>/dev/null || true

# Check for conflicts
CLAIM_FILE="$CLAIMS_DIR/claim_${START}_${END}.txt"
if [ -f "$CLAIM_FILE" ]; then
    echo "❌ Conflict: Batch $START-$END already claimed!"
    cat "$CLAIM_FILE"
    echo ""
    echo "Active claims:"
    ls -lh "$CLAIMS_DIR"/claim_*.txt
    exit 1
fi

# Check for overlapping claims
for claim in "$CLAIMS_DIR"/claim_*.txt; do
    if [ -f "$claim" ]; then
        filename=$(basename "$claim")
        claim_range=${filename#claim_}
        claim_range=${claim_range%.txt}
        claim_start=${claim_range%%_*}
        claim_end=${claim_range##*_}

        # Check if ranges overlap
        if [ $START -le $claim_end ] && [ $END -ge $claim_start ]; then
            echo "❌ Overlap detected with existing claim: $filename"
            cat "$claim"
            exit 1
        fi
    fi
done

# Create claim
TIMESTAMP=$(date -Iseconds)
echo "$TIMESTAMP|$(hostname)|$WORKER_ID" > "$CLAIM_FILE"

echo "✅ Claimed batch $START-$END"
echo "   Worker: $WORKER_ID"
echo "   Claim file: $CLAIM_FILE"
echo ""

# Get the batch
echo "📥 Fetching questions..."
cd /home/user/AreYouSmarter
BATCH_JSON="/tmp/my_batch_${START}_${END}.json"
node get-batch.mjs $BATCH_SIZE > "$BATCH_JSON"

echo "✅ Batch saved to: $BATCH_JSON"
echo ""

# Show summary
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
    subjects = list(set([q['id'].rsplit('_', 1)[0] for q in batch]))
    print(f"  Subjects: {', '.join(subjects[:3])}")
PYEOF

echo ""
echo "🎯 Next steps:"
echo "   1. Generate explanations for questions in $BATCH_JSON"
echo "   2. Run: ./complete-batch.sh $START $END $WORKER_ID"
echo ""
echo "💡 Tip: Keep batch small (15-20) for faster turnaround and fewer conflicts"
