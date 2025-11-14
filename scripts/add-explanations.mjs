#!/usr/bin/env node
import { readFile, writeFile } from 'fs/promises';

const newExplanations = [
  {
    "questionId": "high_school_biology_2",
    "explanation": "The **electron transport chain (ETC)** in mitochondria uses electron energy to pump protons and ultimately **produce ATP**.\n\n**Cellular respiration overview:**\n1. Glycolysis: glucose → 2 pyruvate (cytoplasm)\n2. Krebs cycle: acetyl-CoA → CO₂ + NADH + FADH₂\n3. **ETC**: NADH/FADH₂ → ATP production\n\n**Electron transport chain mechanism:**\n\n**Step 1: Electron donors**\n- NADH and FADH₂ (from glycolysis and Krebs)\n- Donate high-energy electrons to ETC\n\n**Step 2: Electron cascade through complexes**\n- Complex I: NADH → Q → releases energy\n- Complex III: QH₂ → cytochrome c → releases energy\n- Complex IV: cytochrome c → O₂ → H₂O\n\n**Step 3: Proton pumping (ENERGY USE)**\n- Energy from electrons pumps H⁺ from matrix → intermembrane space\n- Creates proton gradient (high [H⁺] outside, low inside)\n- Generates electrochemical potential\n\n**Step 4: ATP synthesis**\n- ATP synthase uses proton gradient\n- H⁺ flows back through ATP synthase\n- **Chemiosmosis**: ADP + Pi → ATP\n\n**Why other options are wrong:**\n- Break down glucose: Glycolysis does this\n- Make glucose: Photosynthesis (Calvin cycle)\n- Make NADH: Glycolysis and Krebs cycle do this\n\n**Correct answer: Produce ATP** (option 2)\n\nETC energy pumps protons, creating gradient that drives ATP synthase.",
    "reasoning": "ETC electrons release energy → pumps H⁺ → creates gradient → ATP synthase produces ATP via chemiosmosis. Not glucose breakdown (glycolysis), glucose synthesis (Calvin), or NADH production (Krebs). Answer: option 2 (produce ATP).",
    "steps": [
      "ETC receives electrons from NADH/FADH₂",
      "Energy released as electrons pass through",
      "Energy pumps H⁺ across membrane",
      "H⁺ gradient created",
      "ATP synthase uses gradient → ATP",
      "Answer: option 2 ✓ (produce ATP)"
    ],
    "generatedAt": "2025-01-14T16:31:00.000Z",
    "correctedAnswer": 2
  },
  {
    "questionId": "high_school_biology_3",
    "explanation": "Early Earth (approximately 4 billion years ago) had a **reducing atmosphere without oxygen**.\n\n**Primitive Earth atmosphere composition:**\n\n**Present gases:**\n- **Hydrogen (H₂)**: Abundant\n- **Ammonia (NH₃)**: Present\n- **Methane (CH₄)**: Present\n- **Water vapor (H₂O)**: Abundant\n- **Carbon dioxide (CO₂)**: Present\n- **Nitrogen (N₂)**: Present\n\n**ABSENT gas:**\n- **Oxygen (O₂)**: NOT present\n\n**Why no oxygen?**\n\n**1. No photosynthetic life:**\n- Oxygen comes from photosynthesis\n- Cyanobacteria evolved approximately 2.7 billion years ago\n- Before that, no biological O₂ production\n\n**2. Oxygen would react away:**\n- Highly reactive element\n- Would oxidize minerals (iron, sulfur)\n- Reducing atmosphere = no free O₂\n\n**3. Geological evidence:**\n- Banded iron formations (BIFs) approximately 2.4 Ga\n- Show oxygen accumulation started then\n- Before: no oxidized minerals\n\n**Great Oxygenation Event (approximately 2.4 Ga):**\n- Cyanobacteria photosynthesis\n- O₂ accumulated in atmosphere\n- Changed Earth's chemistry\n- Enabled aerobic life\n\n**Miller-Urey experiment (1953):**\n- Simulated early atmosphere: CH₄, NH₃, H₂, H₂O\n- NO oxygen added\n- Produced amino acids\n\nPrimitive Earth had reducing gases but lacked oxygen until photosynthetic life evolved.",
    "reasoning": "Early Earth atmosphere: reducing (H₂, NH₃, CH₄, H₂O). No O₂ because no photosynthesis yet. Oxygen came later (approximately 2.4 Ga) from cyanobacteria. Miller-Urey used reducing atmosphere. Answer: option 0 (oxygen).",
    "steps": [
      "Primitive Earth approximately 4 Ga",
      "Had H₂, NH₃, CH₄, H₂O (reducing)",
      "NO oxygen (O₂)",
      "O₂ requires photosynthesis",
      "Photosynthesis evolved later (approximately 2.7 Ga)",
      "Answer: option 0 ✓ (oxygen EXCEPT)"
    ],
    "generatedAt": "2025-01-14T16:32:00.000Z"
  },
  {
    "questionId": "high_school_biology_4",
    "explanation": "**Convergent evolution** occurs when unrelated species independently evolve similar features due to similar environmental pressures.\n\n**Definition:**\n- Different evolutionary origins\n- Similar environmental challenges\n- Analogous structures (similar function, different origin)\n- NOT homologous (same structure, common ancestor)\n\n**Examples of convergent evolution:**\n\n**1. Wings of insects vs. birds:**\n- Insects: exoskeleton extensions, no bones\n- Birds: modified forelimbs with bones\n- Different structures, same function (flight)\n- **BEST EXAMPLE**\n\n**2. Dolphin (mammal) vs. shark (fish):**\n- Streamlined body shape\n- Fins for swimming\n- Different ancestors, similar aquatic adaptation\n\n**3. Cacti (Americas) vs. euphorbs (Africa):**\n- Both succulent, spiny, water-storing\n- Different plant families\n- Similar desert adaptations\n\n**Why other options are WRONG:**\n\n**Option 0: Pectoral fins of fish & front legs of cats**\n- **HOMOLOGOUS structures**\n- Common tetrapod ancestor\n- Same bone structure (humerus, radius, ulna)\n- **Divergent evolution**, not convergent\n\n**Option 1: Notochord in all chordate embryos**\n- **Shared derived trait**\n- Common ancestor\n- Homology, not analogy\n\n**Option 3: Oak leaves vs. cactus spines**\n- **Both modified leaves**\n- But cacti have both leaves AND spines (different structures)\n- Not best convergent example\n\n**Key distinction:**\n- **Homologous**: Same structure, common ancestor (divergent evolution)\n- **Analogous**: Different structure, similar function (convergent evolution)\n\nInsect and bird wings are analogous structures, exemplifying convergent evolution.",
    "reasoning": "Convergent evolution = unrelated organisms evolve similar features independently. Insect/bird wings: analogous (different structures, same function). Fish fins/cat legs: homologous (common ancestor). Notochord: shared ancestry. Answer: option 2 (insect & bird wings).",
    "steps": [
      "Convergent = unrelated → similar features",
      "Analogous structures (different origin)",
      "Insect wings ≠ bird wings (structure)",
      "Both for flight (function)",
      "Fish fins/cat legs = homologous",
      "Answer: option 2 ✓ (wings)"
    ],
    "generatedAt": "2025-01-14T16:33:00.000Z",
    "correctedAnswer": 2
  },
  {
    "questionId": "high_school_biology_5",
    "explanation": "**Mitosis** occurs in actively dividing, growing tissues, particularly in **meristems** (plant growth regions).\n\n**Mitosis definition:**\n- Cell division for growth and repair\n- 2n → 2n (diploid → diploid)\n- Produces identical daughter cells\n- Occurs in somatic (body) cells\n\n**Where to find mitotic divisions:**\n\n**Shoot tip (apical meristem):**\n- Undifferentiated cells\n- Actively dividing (high mitotic index)\n- Produces new leaves, stems\n- **Longitudinal section shows mitotic figures**\n- Root tip also has high mitosis\n\n**Why other options are WRONG:**\n\n**Option 0: Cross section of muscle tissue**\n- Mature, differentiated cells\n- Rarely divide (except satellite cells)\n- Post-mitotic (G₀ phase)\n- Low mitotic activity\n\n**Option 1: Cross section of anther**\n- Site of pollen production\n- **MEIOSIS**, not mitosis\n- 2n → n (haploid pollen)\n- Wrong cell division type\n\n**Option 3: Cross section of leaf**\n- Mature, differentiated tissue\n- Cells in G₀ (non-dividing)\n- Photosynthetic function, not growth\n- No active division\n\n**Mitotic index by tissue:**\n- Shoot/root tip meristem: 10-30% (HIGH)\n- Bone marrow: 5-10%\n- Skin epidermis: 2-5%\n- Muscle: <0.01% (LOW)\n- Mature leaf: approximately 0%\n\n**Meiosis vs. Mitosis locations:**\n- Mitosis: Meristems (shoot, root), cambium, skin, gut\n- Meiosis: Anthers (pollen), ovules (egg), testes, ovaries\n\nShoot tip contains actively dividing meristematic cells undergoing mitosis.",
    "reasoning": "Mitosis = growth/repair in somatic cells. Shoot tip = apical meristem = high mitotic activity. Muscle = differentiated, rarely divides. Anther = meiosis (pollen). Leaf = mature, no division. Answer: option 2 (shoot tip).",
    "steps": [
      "Mitosis in actively growing tissues",
      "Shoot tip = apical meristem",
      "Undifferentiated, dividing cells",
      "Muscle = mature",
      "Anther = meiosis",
      "Answer: option 2 ✓ (shoot tip)"
    ],
    "generatedAt": "2025-01-14T16:34:00.000Z",
    "correctedAnswer": 2
  },
  {
    "questionId": "high_school_biology_6",
    "explanation": "**Invertebrate immune systems** have innate immunity including **phagocytes**, but lack adaptive immunity (T cells, B cells).\n\n**Immune system types:**\n\n**1. Innate immunity (nonspecific):**\n- Present in ALL animals (vertebrates + invertebrates)\n- Physical barriers, phagocytes, antimicrobial peptides\n- No memory, immediate response\n- Evolutionarily ancient\n\n**2. Adaptive immunity (specific):**\n- **ONLY in vertebrates** (jawed fish onwards)\n- T cells, B cells, antibodies\n- Memory, slower initial response\n- Evolved approximately 500 million years ago\n\n**Invertebrate immune defenses:**\n\n**Cellular:**\n- **Phagocytes** (hemocytes, coelomocytes)\n- Encapsulation\n- Nodule formation\n\n**Humoral:**\n- Antimicrobial peptides (AMPs)\n- Lysozyme\n- Phenoloxidase cascade\n- Complement-like proteins\n\n**Pattern recognition:**\n- Toll-like receptors (TLRs)\n- Recognize PAMPs (pathogen-associated molecular patterns)\n\n**Why other options are WRONG:**\n\n**Option 0: Cytotoxic T-lymphocytes (CTLs)**\n- Part of adaptive immunity\n- CD8+ T cells\n- **ONLY in vertebrates**\n- Require MHC I, TCR\n\n**Option 2: B-cells**\n- Produce antibodies\n- Adaptive immunity\n- **ONLY in vertebrates**\n- Require V(D)J recombination\n\n**Option 3: Helper T-cells**\n- CD4+ T cells\n- Coordinate adaptive response\n- **ONLY in vertebrates**\n\n**Examples:**\n- Insects (Drosophila): hemocytes, AMPs, Toll pathway\n- Mollusks: phagocytic hemocytes\n- Echinoderms: coelomocytes\n- All have phagocytes, none have T/B cells\n\n**Evolution of adaptive immunity:**\n- Jawless fish (lamprey): VLRs (variable lymphocyte receptors)\n- Jawed fish onwards: T cells, B cells, immunoglobulins\n- Innovation: RAG1/RAG2 genes for V(D)J recombination\n\nInvertebrates have phagocytic cells but lack the T and B lymphocytes of vertebrate adaptive immunity.",
    "reasoning": "Invertebrates: innate immunity only (phagocytes, AMPs). NO adaptive immunity (no T cells, B cells). Phagocytes = universal innate defense. T cells/B cells evolved in vertebrates. Answer: option 1 (phagocytes).",
    "steps": [
      "Invertebrates have innate immunity",
      "Phagocytes (hemocytes) present",
      "NO T cells (adaptive)",
      "NO B cells (adaptive)",
      "Adaptive immunity = vertebrate innovation",
      "Answer: option 1 ✓ (phagocytes)"
    ],
    "generatedAt": "2025-01-14T16:35:00.000Z",
    "correctedAnswer": 1
  },
  {
    "questionId": "high_school_biology_7",
    "explanation": "When two unrelated species evolve to become more similar, this is **convergent evolution**.\n\n**Types of evolution:**\n\n**1. Convergent evolution:**\n- Unrelated species → similar traits\n- Similar environmental pressures\n- Analogous structures\n- **ANSWER**\n\n**Examples:**\n- Dolphin (mammal) & shark (fish): streamlined body\n- Cactus (Americas) & euphorb (Africa): desert succulents\n- Bird, bat, pterosaur wings: flight\n- Eyes: evolved independently 40+ times\n\n**2. Divergent evolution:**\n- Related species → different traits\n- Common ancestor splits\n- Adaptive radiation\n- Opposite of convergent\n\n**Examples:**\n- Darwin's finches: different beak shapes\n- Mammalian forelimbs: whale flipper, human arm, bat wing\n\n**3. Parallel evolution:**\n- Related species → similar traits independently\n- Similar environments, shared ancestry\n- More similar starting point than convergent\n\n**Examples:**\n- Old World & New World porcupines\n- Saber-toothed cats (marsupial & placental)\n\n**4. Coevolution:**\n- Two species evolve in response to each other\n- Reciprocal adaptations\n- Predator-prey, mutualism, parasitism\n\n**Examples:**\n- Flowers & pollinators\n- Acacia & ants\n- Host & parasite arms race\n\n**Key distinction:**\nQuestion states \"unrelated species\" → rules out parallel (which requires some relatedness)\nBecoming \"more similar\" → convergent (not divergent)\n\nUnrelated species becoming similar = convergent evolution.",
    "reasoning": "Unrelated species evolving to be MORE similar = convergent evolution. Divergent = opposite (more different). Parallel = related species. Coevolution = reciprocal adaptation. Answer: option 1 (convergent).",
    "steps": [
      "Unrelated species",
      "Become more SIMILAR",
      "Convergent = unrelated → similar",
      "Divergent = related → different",
      "Definition matches convergent",
      "Answer: option 1 ✓ (convergent)"
    ],
    "generatedAt": "2025-01-14T16:36:00.000Z",
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
