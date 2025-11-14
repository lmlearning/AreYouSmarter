#!/bin/bash

# status.sh - Show current progress and active claims
# Usage: ./status.sh

cd /home/user/AreYouSmarter

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📊 Explanation Generation Progress"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Overall progress
python3 << 'PYEOF'
import json
import os
from datetime import datetime

# Load main file
with open('server/data/ai-explanations.json', 'r') as f:
    explanations = json.load(f)

total = 14042
completed = len(explanations)
remaining = total - completed
percent = completed / total * 100

print(f"📈 Overall Progress:")
print(f"   Completed: {completed:,}/{total:,} ({percent:.2f}%)")
print(f"   Remaining: {remaining:,}")

# Progress bar
bar_length = 50
filled = int(bar_length * completed / total)
bar = '█' * filled + '░' * (bar_length - filled)
print(f"   [{bar}]")
print()

# Subject breakdown
subjects = {}
for exp in explanations:
    subject = exp['questionId'].rsplit('_', 1)[0]
    subjects[subject] = subjects.get(subject, 0) + 1

print(f"📚 By Subject (top 10):")
for subject, count in sorted(subjects.items(), key=lambda x: x[1], reverse=True)[:10]:
    print(f"   {subject:40s}: {count:4d} questions")

if len(subjects) > 10:
    print(f"   ... and {len(subjects) - 10} more subjects")
print()

# Recent activity (last 5 commits)
print(f"🕐 Recent Activity:")
import subprocess
try:
    log = subprocess.check_output(
        ['git', 'log', '--oneline', '--decorate', '-5'],
        encoding='utf-8'
    )
    for line in log.strip().split('\n'):
        print(f"   {line}")
except:
    print("   Unable to fetch git log")
PYEOF

echo ""

# Active claims
CLAIMS_DIR="/tmp/claims"
if [ -d "$CLAIMS_DIR" ]; then
    CLAIM_COUNT=$(ls "$CLAIMS_DIR"/claim_*.txt 2>/dev/null | wc -l)
    if [ $CLAIM_COUNT -gt 0 ]; then
        echo "🔒 Active Claims ($CLAIM_COUNT):"
        for claim in "$CLAIMS_DIR"/claim_*.txt; do
            filename=$(basename "$claim")
            range=${filename#claim_}
            range=${range%.txt}
            content=$(cat "$claim")
            timestamp=$(echo "$content" | cut -d'|' -f1)
            hostname=$(echo "$content" | cut -d'|' -f2)
            worker=$(echo "$content" | cut -d'|' -f3)

            # Calculate age
            if command -v date &> /dev/null; then
                claim_time=$(date -d "$timestamp" +%s 2>/dev/null || echo "0")
                now_time=$(date +%s)
                age_min=$(( (now_time - claim_time) / 60 ))
                if [ $claim_time -gt 0 ]; then
                    echo "   [$range] by $worker ($age_min min ago)"
                else
                    echo "   [$range] by $worker"
                fi
            else
                echo "   [$range] by $worker"
            fi
        done
    else
        echo "🔒 Active Claims: None"
    fi
else
    echo "🔒 Active Claims: None (directory doesn't exist)"
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "💡 Quick Actions:"
echo "   ./claim-batch.sh auto          - Claim next available batch"
echo "   ./claim-batch.sh 3000 3019 w1  - Claim specific range"
echo "   ./complete-batch.sh 3000 3019  - Complete and push batch"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
