#!/usr/bin/env node
import { readFile, writeFile } from 'fs/promises';

const newExplanations = [
  {
    "questionId": "high_school_biology_8",
    "explanation": "Periodic **natural wildfires** play an important ecological role by **removing dead plant matter**, which reduces fuel load and prevents more destructive fires.\n\n**Benefits of periodic wildfires:**\n\n**1. Fuel reduction (CORRECT ANSWER):**\n- Removes dead wood, leaf litter, undergrowth\n- Reduces fuel accumulation\n- Prevents catastrophic crown fires\n- Controlled burns mimic this natural process\n- **Fire suppression paradox**: No small fires → fuel buildup → massive fires\n\n**2. Nutrient cycling:**\n- Ash returns nutrients to soil (N, P, K, Ca)\n- Carbon, nitrogen released\n- Increases soil pH temporarily\n- Makes nutrients available to plants\n\n**3. Seed germination:**\n- Many species require fire for germination\n- **Serotiny**: cones open with heat (lodgepole pine, jack pine)\n- Fire-activated germination (some wildflowers)\n- Clears space for seedlings\n\n**4. Ecosystem diversity:**\n- Creates mosaic of habitats\n- Different successional stages\n- Increases biodiversity\n- Opens canopy for understory\n\n**5. Pest/disease control:**\n- Kills pathogens and insect pests\n- Reduces disease spread\n\n**Fire-adapted ecosystems:**\n- **Chaparral** (California): adapted to frequent fires\n- **Savanna**: fire maintains grassland\n- **Longleaf pine** (SE USA): fire-dependent\n- **Eucalyptus** (Australia): fire promotes regeneration\n- **Mediterranean scrub**: 10-50 year fire cycles\n\n**Why other options are WRONG:**\n\n**Option 1: Leach nutrients, prevent germination**\n- OPPOSITE of reality\n- Fire adds nutrients (ash)\n- Promotes germination, doesn't prevent\n\n**Option 2: Drive off herbivores**\n- Not a primary benefit\n- Herbivores often return quickly\n- Some attracted to post-fire vegetation\n\n**Option 3: Dry out soil, decrease flooding**\n- Fire doesn't significantly dry soil long-term\n- Can actually increase erosion/flooding short-term\n- Removes vegetation that absorbs water\n\n**Fire management:**\n- Total suppression leads to fuel buildup\n- Prescribed burns mimic natural fire\n- Reduces catastrophic wildfire risk\n\nNatural wildfires remove accumulated dead matter, preventing larger, more destructive fires.",
    "reasoning": "Periodic wildfires remove dead plant matter (fuel) → prevents larger fires. Also cycles nutrients, aids germination, maintains ecosystems. Not: leaching nutrients (adds them), driving herbivores (minor), or decreasing flooding (can increase erosion). Answer: option 0 (remove dead matter).",
    "steps": [
      "Dead plant matter = fuel",
      "Wildfires remove fuel",
      "Less fuel = less intense future fires",
      "Fire suppression → fuel buildup → catastrophic fires",
      "Natural fires prevent worse fires",
      "Answer: option 0 ✓ (remove dead matter)"
    ],
    "generatedAt": "2025-01-14T16:37:00.000Z"
  },
  {
    "questionId": "high_school_biology_9",
    "explanation": "Under **visual predation** pressure, algae-eaters would evolve traits making them LESS visible. **Larger females with more/larger young** would be the **LEAST likely** because it increases visibility.\n\n**Natural selection under visual predation:**\n\nPredators locate prey by sight → selection AGAINST visible traits\n\n**LIKELY adaptations (would be selected FOR):**\n\n**Option 0: Drab coloration**\n- Camouflage, cryptic coloration\n- Blends with environment\n- Reduces detection\n- **VERY LIKELY** (common antipredator adaptation)\n\n**Option 1: Nocturnal behavior**\n- Active at night when predators can't see\n- Predators are visual (sight-dependent)\n- Temporal avoidance\n- **VERY LIKELY** (common strategy)\n\n**Option 3: Smaller sexual maturity**\n- Reproduce at smaller size\n- Spend less time as large, visible adult\n- r-selection under predation\n- High predation → earlier reproduction\n- **LIKELY** (documented in guppies, etc.)\n\n**LEAST LIKELY adaptation:**\n\n**Option 2: Larger females, more/larger young**\n- Large body = MORE VISIBLE to visual predators\n- Larger target, easier to spot\n- Carrying young increases size further\n- **SELECTED AGAINST** by visual predators\n- Contradicts camouflage strategy\n- **LEAST LIKELY**\n\n**Trade-offs:**\n- Large size has benefits: more offspring, better survival\n- BUT under visual predation, costs outweigh benefits\n- Would see selection for SMALLER, not larger\n\n**Real-world examples:**\n\n**Guppies (Poecilia reticulata):**\n- High predation: drab colors, smaller size, early maturity\n- Low predation: bright colors, larger size, later maturity\n- John Endler's experiments demonstrated this\n\n**Trinidadian guppies:**\n- Upstream (few predators): larger, colorful\n- Downstream (many predators): smaller, drab, early reproduction\n\n**Life history theory:**\n- High predation mortality → early reproduction (r-selection)\n- Large size requires longer growth → more time exposed\n- Selection favors: small, drab, nocturnal, early maturity\n\nLarger size increases visibility to visual predators, making this the least likely evolutionary response.",
    "reasoning": "Visual predators select AGAINST visibility. Drab color, nocturnal, early maturity = REDUCE visibility (likely). Larger females = INCREASE visibility (selected against). Least likely = what predators select AGAINST. Answer: option 2 (larger females).",
    "steps": [
      "Visual predation → select against visibility",
      "Drab, nocturnal, small = less visible ✓",
      "Larger females = MORE visible",
      "Large size selected AGAINST",
      "Question asks LEAST likely",
      "Answer: option 2 ✓ (larger females)"
    ],
    "generatedAt": "2025-01-14T16:38:00.000Z",
    "correctedAnswer": 2
  },
  {
    "questionId": "high_school_biology_10",
    "explanation": "**Memory cells** are responsible for the rapid, enhanced response to a second infection with the same pathogen.\n\n**Adaptive immune response:**\n\n**Primary response (first infection):**\n1. Antigen recognition (days)\n2. Clonal selection and expansion (1-2 weeks)\n3. Effector cells fight infection\n4. **Memory cells created**\n5. Slow, takes 1-2 weeks\n\n**Secondary response (second infection):**\n1. **Memory cells immediately recognize antigen**\n2. Rapid expansion (hours-days)\n3. Faster, stronger response\n4. Higher antibody levels\n5. Quicker recovery\n\n**Memory cell characteristics:**\n\n**Types:**\n- **Memory B cells**: produce antibodies quickly\n- **Memory T cells**: (CD4+ and CD8+) coordinate response\n\n**Features:**\n- Long-lived (years to lifetime)\n- Circulate in blood and tissues\n- Rapid activation upon re-exposure\n- Higher affinity receptors\n- Larger population than original naive cells\n\n**Why memory cells are the answer:**\n- Persist after first infection\n- **Recognize same flu strain**\n- Activate immediately (no lag time)\n- Generate secondary response\n- Explain faster recovery\n\n**Why other options are WRONG:**\n\n**Option 0: Helper T cells (CD4+)**\n- Coordinate immune response\n- Present in BOTH infections\n- Not specific to SECOND infection\n- Don't explain \"memory\" of first infection\n\n**Option 1: Cytotoxic T cells (CD8+)**\n- Kill infected cells\n- Present in BOTH infections\n- Effector cells, not memory\n- Would need to be generated again (slow)\n\n**Option 3: Plasma cells**\n- Produce antibodies\n- **Short-lived** (days to weeks)\n- Die after first infection\n- Not present during second infection\n- Memory B cells → new plasma cells\n\n**The key difference:**\n- First infection: naive cells → effector cells (slow)\n- Second infection: **memory cells → effector cells (fast)**\n\n**Immunological memory:**\n- Basis of vaccination\n- Protects against reinfection\n- Can last lifetime\n- Measles, chickenpox immunity\n\n**Timeline:**\n- First infection: symptoms peak ~7 days, recover ~10-14 days\n- Second infection: symptoms milder, recover ~3-5 days\n- **Memory cells** bridge the difference\n\nMemory cells from the first infection rapidly activate upon re-exposure, enabling faster recovery.",
    "reasoning": "Second infection faster recovery = immunological memory. Memory cells persist from first infection → recognize same pathogen → rapid response. Helper/cytotoxic T cells present in both (not memory-specific). Plasma cells short-lived (die after first). Answer: option 2 (memory cells).",
    "steps": [
      "First infection creates memory cells",
      "Memory cells persist long-term",
      "Second infection: memory cells recognize pathogen",
      "Rapid activation (hours vs weeks)",
      "Faster recovery = memory",
      "Answer: option 2 ✓ (memory cells)"
    ],
    "generatedAt": "2025-01-14T16:39:00.000Z",
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
