#!/usr/bin/env node
import { readFile, writeFile } from 'fs/promises';

const newExplanations = [
  {
    "questionId": "high_school_biology_11",
    "explanation": "The gene causing coat patterns in cats also causes crossed eyes, demonstrating that **phenotype is often the result of compromise** (pleiotropy trade-offs).\n\n**Pleiotropy:**\n- One gene affects multiple traits\n- Siamese cats: color-point gene also affects eye development\n- Trade-off: beautiful coat pattern but vision problems\n\n**This example shows:**\n- Genes have multiple effects (pleiotropic)\n- Beneficial trait (coat) linked to harmful trait (crossed eyes)\n- Natural selection balances costs and benefits\n- **Compromise in phenotype**\n\n**Why other options are WRONG:**\n\n**Option 0: Evolution is progressive toward perfection**\n- Evolution is NOT progressive\n- No \"goal\" or \"perfection\"\n- Just adaptation to current environment\n- This example shows IMPERFECTION (crossed eyes)\n\n**Option 2: Natural selection reduces maladaptive genes**\n- TRUE but doesn't explain THIS example\n- Gene persists DESPITE crossed eyes\n- Shows selection can't always remove bad genes\n- When linked to beneficial trait\n\n**Option 3: Polygenic inheritance is maladaptive**\n- False statement\n- Polygenic traits are COMMON and adaptive\n- Height, skin color, intelligence\n- Will NOT become less common\n\n**Evolutionary trade-offs:**\n- Sickle cell: malaria resistance vs anemia\n- Large antlers: mate attraction vs mobility\n- Peacock tail: female choice vs predation\n- **No perfect organism**, only compromises\n\nPleiotropy creates trade-offs where beneficial and harmful effects are linked.",
    "reasoning": "One gene (coat pattern) causes multiple effects (crossed eyes) = pleiotropy. Shows phenotype is compromise between beneficial and harmful effects. Not about progress (evolution has no goal) or polygenic traits. Answer: option 1 (compromise).",
    "steps": [
      "One gene, multiple effects (pleiotropy)",
      "Coat gene → pattern + crossed eyes",
      "Beneficial + harmful linked",
      "Phenotype = compromise",
      "Evolution isn't progressive ✗",
      "Answer: option 1 ✓ (compromise)"
    ],
    "generatedAt": "2025-01-14T16:45:00.000Z",
    "correctedAnswer": 1
  },
  {
    "questionId": "high_school_biology_12",
    "explanation": "**Smaller DNA fragments migrate more rapidly than larger fragments** in gel electrophoresis.\n\n**Gel electrophoresis principle:**\n- DNA is negatively charged (phosphate groups)\n- Electric field pulls DNA through gel matrix\n- Gel acts as molecular sieve\n- Separates by size\n\n**Migration rate:**\n- **Small fragments**: move quickly through pores\n- **Large fragments**: hindered by gel matrix, move slowly\n- Distance traveled ∝ 1/log(size)\n\n**Why option 3 is CORRECT:**\n- 100 bp fragment travels farther than 1000 bp\n- Basis of DNA fingerprinting, PCR analysis\n- Standard molecular biology technique\n\n**Why other options are WRONG:**\n\n**Option 0: Water flows from hypertonic to hypotonic**\n- **BACKWARDS**\n- Water flows from HYPOtonic (low solute) → HYPERtonic (high solute)\n- Water follows concentration gradient\n- Moves toward higher solute concentration\n\n**Option 1: Germinating seeds use LESS oxygen**\n- **OPPOSITE**\n- Germinating seeds have HIGH metabolic rate\n- Cellular respiration increases\n- Use MORE oxygen than dormant seeds\n\n**Option 2: Transpiration DECREASES with air movement**\n- **OPPOSITE**\n- Air movement increases evaporation\n- Removes humid air from leaf surface\n- Transpiration INCREASES with wind\n\n**Correct statements:**\n- Water: hypotonic → hypertonic\n- Germinating seeds: MORE O₂\n- Air movement: MORE transpiration\n- Gel electrophoresis: small fragments faster ✓\n\nSmaller DNA fragments encounter less resistance and migrate faster through the gel matrix.",
    "reasoning": "Gel electrophoresis: small DNA fragments move faster (less hindered). Water flows TO hypertonic (not FROM). Germinating seeds use MORE O₂. Air movement INCREASES transpiration. Answer: option 3 (smaller DNA faster).",
    "steps": [
      "DNA negative charge → moves in field",
      "Gel = molecular sieve",
      "Small fragments → less hindrance",
      "Small faster than large",
      "Other options backwards",
      "Answer: option 3 ✓ (smaller DNA faster)"
    ],
    "generatedAt": "2025-01-14T16:46:00.000Z",
    "correctedAnswer": 3
  },
  {
    "questionId": "high_school_biology_13",
    "explanation": "The **phosphorus cycle** lacks a significant gas phase, unlike other biogeochemical cycles.\n\n**Biogeochemical cycles comparison:**\n\n**1. Water cycle:**\n- **GAS PHASE**: Water vapor (H₂O)\n- Evaporation, condensation, precipitation\n- Atmosphere is major reservoir\n\n**2. Carbon cycle:**\n- **GAS PHASE**: CO₂, CH₄\n- Photosynthesis, respiration, combustion\n- Atmospheric CO₂ = 400+ ppm\n\n**3. Nitrogen cycle:**\n- **GAS PHASE**: N₂ (78% of atmosphere), N₂O, NH₃\n- Nitrogen fixation, denitrification\n- Atmosphere is largest reservoir\n\n**4. Sulfur cycle:**\n- **GAS PHASE**: SO₂, H₂S, DMS (dimethyl sulfide)\n- Volcanic emissions, decomposition\n- Minor but present atmospheric phase\n\n**5. Phosphorus cycle:**\n- **NO SIGNIFICANT GAS PHASE** ✓\n- Phosphorus has no stable gaseous compounds at Earth temperatures\n- PH₃ (phosphine) is rare and unstable\n- Cycles through rocks → soil → organisms → sediments\n- **SEDIMENTARY CYCLE** (not atmospheric)\n\n**Phosphorus reservoirs:**\n- **Rocks**: Apatite, phosphate minerals (largest)\n- **Soil**: Available as phosphate (PO₄³⁻)\n- **Organisms**: DNA, RNA, ATP, phospholipids\n- **Ocean sediments**: Long-term sink\n\n**Phosphorus cycle steps:**\n1. Weathering releases phosphate from rocks\n2. Plants absorb PO₄³⁻ from soil\n3. Animals eat plants\n4. Decomposition returns PO₄³⁻ to soil\n5. Runoff carries phosphate to ocean\n6. Marine organisms → sediments → rocks (slow)\n\n**Why phosphorus is different:**\n- No phosphorus-reducing bacteria\n- No atmospheric transport (only in dust)\n- Cycles very slowly (millions of years for rock cycle)\n- Often limiting nutrient in ecosystems\n\n**Consequence:**\n- Phosphorus cannot be \"fixed\" from atmosphere\n- Depends on geological weathering\n- Finite resource (mined as fertilizer)\n- Eutrophication from runoff (algal blooms)\n\nPhosphorus cycles through solid and aqueous phases only, lacking a gaseous atmospheric component.",
    "reasoning": "Phosphorus cycle: no gas phase. P has no stable gaseous compounds. Cycles through rocks/soil/water/organisms only. Water (H₂O vapor), carbon (CO₂), nitrogen (N₂), sulfur (SO₂, H₂S) all have gas phases. Answer: option 3 (phosphorus).",
    "steps": [
      "Water cycle: H₂O gas ✓",
      "Carbon: CO₂ gas ✓",
      "Sulfur: SO₂, H₂S gas ✓",
      "Phosphorus: NO stable gas",
      "Sedimentary cycle only",
      "Answer: option 3 ✓ (phosphorus)"
    ],
    "generatedAt": "2025-01-14T16:47:00.000Z",
    "correctedAnswer": 3
  },
  {
    "questionId": "high_school_biology_14",
    "explanation": "Zika fever, West Nile fever, and malaria are all **primarily transmitted by mosquito bites**.\n\n**Comparison of diseases:**\n\n**Zika fever:**\n- Pathogen: Zika virus (flavivirus)\n- Vector: Aedes mosquitoes (A. aegypti, A. albopictus)\n- Geographic: Tropical and subtropical\n- Also: Sexual transmission, mother-to-fetus\n\n**West Nile fever:**\n- Pathogen: West Nile virus (flavivirus)\n- Vector: Culex mosquitoes\n- Geographic: Worldwide (including temperate)\n- Birds are reservoir hosts\n\n**Malaria:**\n- Pathogen: Plasmodium parasites (P. falciparum, P. vivax, etc.)\n- Vector: Anopheles mosquitoes\n- Geographic: Tropical and subtropical\n- **NOT a virus** (protozoan parasite)\n\n**Shared property:**\n**Option 3: Transmitted by mosquito bites** ✓\n- All three are vector-borne diseases\n- Mosquitoes are primary transmission route\n- **CORRECT ANSWER**\n\n**Why other options are WRONG:**\n\n**Option 0: All caused by viruses**\n- Zika: virus ✓\n- West Nile: virus ✓\n- Malaria: **PROTOZOAN (Plasmodium)**, NOT virus ✗\n- This is FALSE\n\n**Option 1: Only in tropical countries**\n- West Nile is found in temperate regions\n- United States, Europe, Canada\n- Not limited to tropics ✗\n\n**Option 2: Antibiotic resistance**\n- Antibiotics work on BACTERIA, not viruses/parasites\n- Zika/West Nile are viruses (no antibiotics)\n- Malaria is parasite (antimalarial drugs, not antibiotics)\n- Malaria has antimalarial resistance (chloroquine, etc.)\n- But \"antibiotic resistance\" is incorrect term ✗\n\n**Vector-borne disease characteristics:**\n- Pathogen requires arthropod vector\n- Transmission during blood meal\n- Mosquito lifecycle affects disease spread\n- Control: insecticides, bed nets, eliminate breeding sites\n\n**Other mosquito-borne diseases:**\n- Dengue (Aedes)\n- Chikungunya (Aedes)\n- Yellow fever (Aedes)\n- Japanese encephalitis (Culex)\n\nAll three diseases are transmitted primarily through infected mosquito bites.",
    "reasoning": "Zika (virus), West Nile (virus), malaria (protozoan). Zika + West Nile = viruses, but malaria ≠ virus. West Nile in temperate zones (not just tropics). Antibiotics for bacteria (not viruses/parasites). ALL transmitted by mosquitoes ✓. Answer: option 3 (mosquito transmission).",
    "steps": [
      "Zika: Aedes mosquito ✓",
      "West Nile: Culex mosquito ✓",
      "Malaria: Anopheles mosquito ✓",
      "All mosquito-borne",
      "Malaria ≠ virus (protozoan) ✗",
      "Answer: option 3 ✓ (mosquito transmission)"
    ],
    "generatedAt": "2025-01-14T16:48:00.000Z",
    "correctedAnswer": 3
  },
  {
    "questionId": "high_school_biology_15",
    "explanation": "Without Galapagos observations, Darwin would have had a much poorer understanding of the **ability of populations to undergo modification** as they adapt to environments.\n\n**Darwin's Galapagos observations:**\n\n**1. Finches (Darwin's finches):**\n- 13 species on different islands\n- Different beak shapes adapted to food sources\n- Ground finches: large beaks for seeds\n- Tree finches: thin beaks for insects\n- Cactus finches: pointed beaks for cactus\n- **DEMONSTRATED ADAPTIVE RADIATION**\n\n**2. Tortoises:**\n- Different shell shapes on different islands\n- Dome shells where vegetation is low\n- Saddle-back shells where vegetation is high\n- **DEMONSTRATED ADAPTATION TO ENVIRONMENT**\n\n**3. Mockingbirds:**\n- Distinct species on different islands\n- Descended from common ancestor\n- Modified to local conditions\n\n**What Galapagos showed:**\n- Populations CHANGE over time\n- Adaptations match environmental conditions\n- Common descent with modification\n- Natural selection shapes traits\n- **Evidence for evolution in action**\n\n**What Darwin would have LACKED without Galapagos:**\n**Option 1: Ability of populations to undergo modification** ✓\n- This was the KEY INSIGHT from Galapagos\n- Finches showed how populations adapt\n- Visual evidence of evolutionary change\n- **CORRECT ANSWER**\n\n**Why other options are WRONG:**\n\n**Option 0: Stability of well-adapted populations**\n- Galapagos showed CHANGE, not stability\n- Opposite of what he observed\n\n**Option 2: Exact number of offspring environment can support**\n- Malthus taught him this (not Galapagos)\n- From \"Essay on Population\" (1798)\n- Read on voyage, not from observations\n\n**Option 3: Unlimited resources**\n- FALSE concept\n- Darwin understood resources are LIMITED\n- Competition for limited resources drives selection\n\n**Other Darwin evidence:**\n- Fossils (South America)\n- Artificial selection (pigeons)\n- Biogeography\n- Comparative anatomy\n- But Galapagos was iconic example of adaptation\n\nGalapagos finches provided crucial evidence that populations can modify to adapt to different environments.",
    "reasoning": "Galapagos finches/tortoises showed populations ADAPT to environments (different beaks, shells). Darwin's key insight: populations undergo MODIFICATION. Not stability (showed change), not offspring numbers (Malthus), not unlimited resources (false). Answer: option 1 (modification ability).",
    "steps": [
      "Galapagos: finches with different beaks",
      "Each adapted to food source",
      "Populations MODIFIED over time",
      "Adaptation to environment",
      "Key evidence for evolution",
      "Answer: option 1 ✓ (modification)"
    ],
    "generatedAt": "2025-01-14T16:49:00.000Z",
    "correctedAnswer": 1
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
