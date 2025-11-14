# Parallel Explanation Generation - Quick Start

**For LLM workers generating explanations in parallel**

**⚠️ IMPORTANT: Workers coordinate via GitHub, not local filesystem**

## 🚀 Super Quick Start (3 steps)

### 1. Claim a batch
```bash
cd /home/user/AreYouSmarter
./claim-batch-github.sh auto
```

This will:
- Pull latest from GitHub
- Find the next available batch
- Add claim to `claims.json` and commit/push to GitHub
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
./complete-batch-github.sh START END worker_id
```

This will:
- Pull latest from GitHub
- Append your batch to main file (with duplicate detection)
- Remove your claim from `claims.json`
- Commit both files with descriptive message
- Push to GitHub (with retry logic)
- Clean up temp files

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

**All coordination happens via `claims.json` in the GitHub repository**

### Claim
```bash
# Pull latest
git pull origin claude/precompute-ai-explanations-011CUzpKujAXgqfipY1P1QLy

# Add claim to claims.json manually, then:
git add claims.json
git commit -m "Claim batch 3000-3019 by worker_1"
git push origin claude/precompute-ai-explanations-011CUzpKujAXgqfipY1P1QLy

# Get questions
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
# Pull latest first
git pull origin claude/precompute-ai-explanations-011CUzpKujAXgqfipY1P1QLy

# Remove your claim from claims.json, then:
git add server/data/ai-explanations.json claims.json
git commit -m "Add 20 explanations (3000-3019) by worker_1"
git push origin claude/precompute-ai-explanations-011CUzpKujAXgqfipY1P1QLy
```

---

## 🌐 GitHub Coordination

**Key points:**
- **All coordination via `claims.json`** in the repository
- Workers run in **separate environments** (different machines/containers)
- **Must pull before claiming** to see others' claims
- **Must push claim immediately** so others see it
- **Stale claims** (>2 hours) automatically cleaned by scripts
- **Claim format:**
  ```json
  {
    "start": 3000,
    "end": 3019,
    "worker": "worker_1",
    "timestamp": "2025-01-10T13:00:00Z"
  }
  ```

## ⚠️ Important Rules

1. **Always pull first** - Get latest claims before starting
2. **Always claim before starting** - Add to claims.json and push
3. **Small batches (15-20)** - Faster turnaround, fewer conflicts
4. **High quality** - Better 10 excellent than 50 poor explanations
5. **Follow format** - See `PARALLEL_EXPLANATION_GENERATION.md` for details
6. **Remove claims when done** - So others know batch is complete
7. **Handle push conflicts** - If push fails, pull and retry

---

## 🆘 Troubleshooting

### "Batch already claimed"
```bash
# Check current claims
git pull origin claude/precompute-ai-explanations-011CUzpKujAXgqfipY1P1QLy
cat claims.json | python3 -m json.tool

# Try different range or wait for claim to complete
./claim-batch-github.sh 3020 3039 worker_1

# Or use auto mode to find next available
./claim-batch-github.sh auto
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
