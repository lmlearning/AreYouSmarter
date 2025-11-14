#!/usr/bin/env node
import { readFile, writeFile } from 'fs/promises';

const newExplanations = [
  {
    "questionId": "high_school_biology_22",
    "explanation": "Mules are sterile hybrids with **evolutionary fitness of zero** because they cannot reproduce.\n\n**What are mules?**\n- Hybrid: horse (64 chromosomes) × donkey (62 chromosomes)\n- Mule has 63 chromosomes (odd number)\n- Cannot produce functional gametes\n- **Sterile** (with rare exceptions)\n\n**Evolutionary fitness:**\n\n**Definition:**\n- Reproductive success\n- Number of viable offspring\n- Contribution of genes to next generation\n\n**Mules have fitness = 0:**\n- Cannot produce offspring (sterile)\n- No genes passed to next generation\n- **ZERO evolutionary fitness**\n- **Option 0 is CORRECT** ✓\n\n**Why mules are sterile:**\n- Odd number of chromosomes (63)\n- Cannot pair during meiosis\n- Homologous chromosomes don't match\n- No viable gametes produced\n- Occasionally fertile (1 in 1000), but extremely rare\n\n**Why other options are WRONG:**\n\n**Option 1: Offspring have less genetic variation**\n- **IMPOSSIBLE**\n- Mules have NO offspring (sterile)\n- Can't have less variation if there's no offspring\n\n**Option 2: Mutations cannot occur**\n- **FALSE**\n- Mutations can occur in any DNA\n- Mule somatic cells can mutate\n- Just can't pass mutations to offspring (no reproduction)\n\n**Option 3: Crossing-over limited to mitosis prophase**\n- **FALSE**\n- Crossing-over occurs in meiosis prophase I (not mitosis)\n- Mitosis has no crossing-over\n- Mules' problem is meiosis failure, not mitosis\n\n**Fitness examples:**\n- Fertile organism with 10 offspring: fitness = 10\n- Fertile organism with 0 offspring: fitness = 0\n- Sterile organism: fitness = 0\n- **Mule: fitness = 0**\n\n**Hybrid sterility:**\n\n**Reproductive barrier:**\n- Post-zygotic isolating mechanism\n- Hybrid forms but is sterile\n- Prevents gene flow between species\n\n**Other examples:**\n- **Liger**: Lion × tiger (63 chromosomes, sterile)\n- **Tigon**: Tiger × lion (sterile)\n- **Wholphin**: Whale × dolphin (rare, fertile)\n- **Cama**: Camel × llama (fertile)\n\n**Why mules exist despite sterility:**\n- **Human selection** (artificial breeding)\n- Desirable traits: strength, endurance, sure-footedness\n- Hardy, disease-resistant\n- Would not exist in nature (no evolutionary advantage)\n\n**Crossing-over reminder:**\n- Occurs in meiosis I prophase (not mitosis)\n- Homologous chromosomes exchange segments\n- Increases genetic variation\n- Mules can't complete meiosis (unmatched chromosomes)\n\nMules cannot reproduce and thus have zero contribution to the next generation's gene pool.",
    "reasoning": "Evolutionary fitness = reproductive success. Mules sterile (63 chromosomes, can't pair in meiosis) → no offspring → fitness = 0. Can't have offspring variation (no offspring). Mutations can occur (in somatic cells). Crossing-over in meiosis prophase I (not mitosis). Answer: option 0 (fitness = 0).",
    "steps": [
      "Mule = horse × donkey hybrid",
      "63 chromosomes (odd number)",
      "Cannot pair in meiosis",
      "Sterile (no offspring)",
      "Fitness = 0 (no reproduction)",
      "Answer: option 0 ✓ (fitness = 0)"
    ],
    "generatedAt": "2025-01-14T16:56:00.000Z"
  },
  {
    "questionId": "high_school_biology_23",
    "explanation": "ADH (antidiuretic hormone) regulates water reabsorption to **maintain homeostasis**.\n\n**What is ADH?**\n- **Antidiuretic hormone** (also called vasopressin)\n- Produced by hypothalamus\n- Stored/released by posterior pituitary\n- Acts on kidney collecting ducts\n\n**Function:**\n- Increases water reabsorption\n- Reduces urine output\n- Concentrates urine\n- Maintains blood osmolarity\n\n**Homeostasis mechanism:**\n\n**When dehydrated:**\n1. Blood osmolarity increases (more concentrated)\n2. Osmore ceptors in hypothalamus detect change\n3. **ADH released**\n4. Kidney collecting ducts increase water reabsorption\n5. Less water in urine (concentrated, dark)\n6. Blood osmolarity decreases (returns to normal)\n7. **NEGATIVE FEEDBACK**\n\n**When hydrated:**\n1. Blood osmolarity decreases (dilute)\n2. **ADH release inhibited**\n3. Kidney collecting ducts decrease water reabsorption\n4. More water in urine (dilute, pale)\n5. Blood osmolarity increases (returns to normal)\n\n**This is HOMEOSTASIS (option 1)** ✓\n- Maintaining stable internal environment\n- Water balance regulation\n- **Negative feedback loop**\n\n**Why other options are WRONG:**\n\n**Option 0: Innate behavior**\n- Innate behavior = instinctive actions (suckling, migration)\n- ADH is a **hormone** (physiological)\n- Not a behavior\n\n**Option 2: Failure to respond to environment**\n- **OPPOSITE**\n- ADH DOES respond to environment (dehydration)\n- Appropriate response to maintain balance\n\n**Option 3: Positive feedback**\n- **WRONG feedback type**\n- Positive feedback amplifies change (labor contractions, blood clotting)\n- ADH is **NEGATIVE feedback** (reverses change)\n- Returns to set point\n\n**Homeostasis examples:**\n- **Temperature**: Sweating, shivering\n- **Blood glucose**: Insulin, glucagon\n- **Blood pressure**: Baroreceptors\n- **Water balance**: ADH ✓\n- **pH**: Buffers, breathing rate\n- **Calcium**: Parathyroid hormone, calcitonin\n\n**Positive vs. Negative feedback:**\n\n**Negative feedback (homeostasis):**\n- Output opposes change\n- Returns to set point\n- Most physiological systems\n- ADH, insulin, temperature\n\n**Positive feedback (amplification):**\n- Output enhances change\n- Moves away from set point\n- Rare (specific purposes)\n- Childbirth, blood clotting, ovulation\n\n**ADH disorders:**\n- **Diabetes insipidus**: Too little ADH → excessive urination\n- **SIADH**: Too much ADH → water retention\n\nADH maintains water homeostasis through negative feedback regulation of kidney function.",
    "reasoning": "ADH increases water reabsorption in kidneys. Responds to blood osmolarity changes. Negative feedback returns to set point = homeostasis. Not behavior (hormone). Not failure (appropriate response). Not positive feedback (negative feedback). Answer: option 1 (homeostasis).",
    "steps": [
      "ADH regulates water balance",
      "Dehydration → ADH → retain water",
      "Hydration → no ADH → excrete water",
      "Negative feedback to set point",
      "Maintains stable internal environment",
      "Answer: option 1 ✓ (homeostasis)"
    ],
    "generatedAt": "2025-01-14T16:57:00.000Z",
    "correctedAnswer": 1
  },
  {
    "questionId": "high_school_biology_24",
    "explanation": "**Insulin INCREASES (not decreases) glycogen storage**, making option 1 the FALSE statement.\n\n**Hormone functions:**\n\n**Option 0: Thyroxine increases metabolism**\n- **TRUE** ✓\n- Thyroid hormone (T3, T4)\n- Increases cellular respiration\n- Raises basal metabolic rate (BMR)\n- Affects growth, development\n- Hyperthyroidism: high metabolism, weight loss\n- Hypothyroidism: low metabolism, weight gain\n\n**Option 1: Insulin DECREASES glycogen storage**\n- **FALSE** ✗\n- **OPPOSITE of reality**\n- Insulin INCREASES glycogen storage\n- Promotes glucose → glycogen conversion\n- Liver and muscle store glycogen\n- **THIS IS THE ANSWER**\n\n**Option 2: Vasopressin stimulates water reabsorption**\n- **TRUE** ✓\n- Vasopressin = ADH (antidiuretic hormone)\n- Acts on kidney collecting ducts\n- Increases aquaporin channels\n- Retains water, concentrates urine\n\n**Option 3: Epinephrine increases blood sugar and heart rate**\n- **TRUE** ✓\n- \"Adrenaline\"\n- Fight-or-flight hormone\n- Glycogenolysis: glycogen → glucose\n- Increases heart rate and contractility\n- Dilates airways\n- Redirects blood to muscles\n\n**Insulin function (CORRECT):**\n\n**When blood glucose is HIGH (after meal):**\n1. Pancreas releases insulin\n2. Cells take up glucose (GLUT4 transporters)\n3. **Liver converts glucose → glycogen (STORAGE)**\n4. Adipose tissue stores fat\n5. Blood glucose decreases\n\n**Insulin effects:**\n- **INCREASES glycogen synthesis** (opposite of option 1)\n- INCREASES glucose uptake\n- INCREASES protein synthesis\n- INCREASES fat storage\n- DECREASES blood glucose\n\n**Glucagon (opposite of insulin):**\n- Released when glucose is LOW\n- DECREASES glycogen storage (breaks it down)\n- Glycogen → glucose\n- Increases blood glucose\n\n**Diabetes mellitus:**\n- Type 1: No insulin production\n- Type 2: Insulin resistance\n- High blood glucose\n- Cannot store glycogen properly\n\n**Summary of hormones:**\n- **Thyroxine**: ↑ metabolism ✓\n- **Insulin**: ↑ glycogen storage (option says ↓, WRONG)\n- **Vasopressin**: ↑ water reabsorption ✓\n- **Epinephrine**: ↑ glucose + ↑ heart rate ✓\n\nInsulin promotes glycogen storage, not decreases it - option 1 is the false statement.",
    "reasoning": "Thyroxine ↑ metabolism ✓. Insulin ↑ glycogen storage (option says ↓, FALSE). Vasopressin ↑ water reabsorption ✓. Epinephrine ↑ glucose + heart rate ✓. Question asks for FALSE statement. Answer: option 1 (insulin statement wrong).",
    "steps": [
      "Thyroxine ↑ metabolism (true)",
      "Insulin statement says ↓ glycogen",
      "REALITY: Insulin ↑ glycogen storage",
      "Option 1 is OPPOSITE of truth",
      "Other options all true",
      "Answer: option 1 ✓ (FALSE statement)"
    ],
    "generatedAt": "2025-01-14T16:58:00.000Z",
    "correctedAnswer": 1
  },
  {
    "questionId": "high_school_biology_25",
    "explanation": "A **Barr body** is an **inactivated X chromosome** resulting in females with **mosaic X-inactivation** (half cells use one X, half use the other).\n\n**What is a Barr body?**\n- Condensed, inactive X chromosome\n- Dark-staining blob in nucleus\n- Discovered by Murray Barr (1949)\n- Found in female (XX) mammals\n\n**X-inactivation (Lyonization):**\n\n**Why it occurs:**\n- Females: XX (2 copies of X genes)\n- Males: XY (1 copy of X genes)\n- **Dosage compensation** needed\n- Inactivate one X in females to match males\n\n**Process:**\n- Occurs early in development (~1000-cell stage)\n- **Random choice** which X inactivates in each cell\n- XIST gene coats one X chromosome with RNA\n- Heterochromatin forms (condensed, inactive)\n- **Permanent** in that cell lineage\n\n**Result:**\n- **Mosaic pattern** in females\n- Some cells use maternal X, others paternal X\n- ~50/50 distribution\n- **Option 2 is CORRECT** ✓\n\n**Why other options are WRONG:**\n\n**Option 0: Inactivated Y chromosome, sterile man**\n- **WRONG chromosome**\n- Barr body is INACTIVATED X (not Y)\n- Y is already small and inactive in most cells\n- Men have no Barr body (only 1 X, needs to stay active)\n\n**Option 1: Inactivated Y, appears female**\n- **WRONG chromosome**\n- Barr body is X, not Y\n- Inactivated Y wouldn't make someone female\n- Y determines male development (SRY gene)\n\n**Option 3: Inactivated X, females sterile**\n- **WRONG outcome**\n- X-inactivation is NORMAL in all females\n- Does NOT cause sterility\n- Necessary for proper development\n\n**Examples of X-inactivation:**\n\n**Calico cats:**\n- Orange and black patches\n- Orange gene on X chromosome\n- Random X-inactivation creates patches\n- **Only in females** (XX)\n- Males can't be calico (XY, only one X)\n\n**Human females:**\n- All have one Barr body per cell\n- Mosaic for X-linked traits\n- Heterozygous females show mild symptoms of X-linked disorders\n\n**X-linked disorders:**\n- **Duchenne muscular dystrophy**\n- **Hemophilia**\n- **Color blindness**\n- Females: carriers (one good X often compensates)\n- Males: affected (only one X, if defective = disease)\n\n**Barr body count:**\n- XX (normal female): 1 Barr body\n- XY (normal male): 0 Barr bodies\n- XXX (Triple X): 2 Barr bodies\n- XXY (Klinefelter): 1 Barr body\n- XO (Turner): 0 Barr bodies\n\n**Rule: # Barr bodies = # X chromosomes - 1**\n\nBarr bodies represent random X-inactivation, creating a mosaic pattern in female cells.",
    "reasoning": "Barr body = inactivated X chromosome. Occurs in XX females for dosage compensation. Random inactivation in each cell → mosaic (half cells one X, half other X). Not Y chromosome. Not sterile (normal in all females). Calico cats are example. Answer: option 2 (inactivated X, mosaic).",
    "steps": [
      "Barr body = inactivated X",
      "Occurs in XX females",
      "Random which X inactivates per cell",
      "Results in mosaic pattern",
      "NOT Y chromosome ✗",
      "NOT sterile (normal) ✗",
      "Answer: option 2 ✓ (inactivated X, mosaic)"
    ],
    "generatedAt": "2025-01-14T16:59:00.000Z",
    "correctedAnswer": 2
  }
];

// Read existing explanations
const existing = JSON.parse(await readFile('server/data/ai-explanations.json', 'utf-8'));

// Add new ones
const updated = [...existing, ...newExplanations];

// Write back
await writeFile('server/data/ai-explanations.json', JSON.stringify(updated, null, 2), 'utf-8');

console.log(`Added ${newExplanations.length} new explanations. Total: ${updated.length}`);
console.log(`Progress: ${updated.length}/14042 = ${(updated.length / 14042 * 100).toFixed(2)}%`);
