# Parallel Explanation Generation - Quick Start

**For LLM workers generating explanations in parallel**

## 🚀 Super Quick Start (3 steps)

### 1. Claim a batch
```bash
cd /home/user/AreYouSmarter
./claim-batch.sh auto
```

This will:
- Find the next available batch
- Create a claim file to prevent conflicts
- Download questions to `/tmp/my_batch_START_END.json`

### 2. Generate explanations

Create file `/tmp/generated_batch_START_END.json` with high-quality explanations following the format in `PARALLEL_EXPLANATION_GENERATION.md`.

**Quality requirements:**
- 3-10 paragraphs per explanation
- Step-by-step reasoning with calculations
- Educational value - teach concepts, not just answers
- Proper terminology and examples

### 3. Complete and push
```bash
./complete-batch.sh START END worker_id
```

This will:
- Append your batch to main file
- Commit with descriptive message
- Push to remote
- Clean up temp files and claim

---

## 📊 Check Progress

```bash
./status.sh
```

Shows:
- Overall completion percentage
- Subject breakdown
- Active claims
- Recent commits

---

## 🔧 Manual Workflow (if scripts don't work)

### Claim
```bash
mkdir -p /tmp/claims
echo "$(date -Iseconds)|$(hostname)|worker_1" > /tmp/claims/claim_3000_3019.txt
node get-batch.mjs 20 > /tmp/my_batch_3000_3019.json
```

### Generate
Create `/tmp/generated_batch_3000_3019.json` with explanations in correct format.

### Append
```python
import json

with open('server/data/ai-explanations.json', 'r') as f:
    all_exp = json.load(f)

with open('/tmp/generated_batch_3000_3019.json', 'r') as f:
    new_batch = json.load(f)

all_exp.extend(new_batch)

with open('server/data/ai-explanations.json', 'w') as f:
    json.dump(all_exp, f, indent=2)

print(f"New total: {len(all_exp)}/14042")
```

### Commit & Push
```bash
git add server/data/ai-explanations.json
git commit -m "Add 20 explanations (3000-3019)"
git push -u origin claude/precompute-ai-explanations-011CUzpKujAXgqfipY1P1QLy
rm /tmp/claims/claim_3000_3019.txt
```

---

## ⚠️ Important Rules

1. **Always claim before starting** - Prevents duplicate work
2. **Small batches (15-20)** - Faster turnaround, fewer conflicts
3. **High quality** - Better 10 excellent than 50 poor explanations
4. **Follow format** - See `PARALLEL_EXPLANATION_GENERATION.md` for details
5. **Check for conflicts** - Pull before push if someone else committed
6. **Remove claims when done** - So others know batch is complete

---

## 🆘 Troubleshooting

### "Batch already claimed"
```bash
# Check claims
ls -lah /tmp/claims/

# Remove stale claims (>2 hours old)
find /tmp/claims -name "claim_*.txt" -mmin +120 -delete

# Try again or pick different range
./claim-batch.sh 3020 3039 worker_1
```

### "Git push failed"
```bash
# Pull latest
git pull origin claude/precompute-ai-explanations-011CUzpKujAXgqfipY1P1QLy

# Re-append batch (script checks for duplicates)
python3 << 'EOF'
import json
with open('server/data/ai-explanations.json', 'r') as f:
    all_exp = json.load(f)
existing_ids = {e['questionId'] for e in all_exp}

with open('/tmp/generated_batch_START_END.json', 'r') as f:
    new_batch = json.load(f)
new_exp = [e for e in new_batch if e['questionId'] not in existing_ids]

if new_exp:
    all_exp.extend(new_exp)
    with open('server/data/ai-explanations.json', 'w') as f:
        json.dump(all_exp, f, indent=2)
    print(f"Added {len(new_exp)} new explanations")
else:
    print("All questions already done by another worker")
EOF

# Commit and push again
git add server/data/ai-explanations.json
git commit -m "Add explanations (resolved conflict)"
git push -u origin claude/precompute-ai-explanations-011CUzpKujAXgqfipY1P1QLy
```

### "JSON validation failed"
Check your generated file:
```bash
python3 -m json.tool /tmp/generated_batch_START_END.json
```

Fix syntax errors (missing commas, quotes, brackets).

---

## 📚 Documentation

- **Full instructions:** `PARALLEL_EXPLANATION_GENERATION.md`
- **Examples:** Look at existing explanations in `server/data/ai-explanations.json`
- **Quality standards:** See "Quality Standards" section in main doc

---

## 🎯 Goal

**14,042 total explanations** - Currently at ~20% complete

Each explanation should be:
- ✅ Detailed and educational
- ✅ Step-by-step with reasoning
- ✅ Proper terminology
- ✅ Helpful for learning, not just answering

**Quality over quantity!**

---

## 📞 Coordination

If multiple workers are active:
- Check `./status.sh` regularly
- Coordinate rough ranges if possible
- Small batches reduce conflicts
- Push frequently to minimize merge issues

---

**Happy explaining! 🎓**
