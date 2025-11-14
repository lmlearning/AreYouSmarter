#!/usr/bin/env node
import { readFile, writeFile } from 'fs/promises';

const newExplanations = [
  {
    "questionId": "high_school_biology_16",
    "explanation": "**None of the statements about lipids are correct** - but the question asks which IS correct. Let me analyze each:\n\n**Lipid types:**\n\n**1. Fats and oils (triglycerides):**\n- Glycerol + 3 fatty acids\n- Energy storage\n- Saturated vs unsaturated\n\n**2. Phospholipids:**\n- Glycerol + 2 fatty acids + phosphate group\n- Cell membranes\n- Amphipathic (hydrophobic + hydrophilic)\n\n**3. Steroids:**\n- Four-ring structure\n- Cholesterol, sex hormones, cortisol\n- **NOT glycerol + fatty acids**\n\n**Analyzing options:**\n\n**Option 0: Unsaturated fatty acids linked to heart disease**\n- **FALSE**\n- SATURATED fats linked to heart disease\n- Unsaturated fats are HEALTHY\n- Omega-3, omega-6 beneficial\n- Mediterranean diet high in unsaturated\n\n**Option 1: Lipids make up most cell surface receptors**\n- **FALSE**  \n- Most receptors are PROTEINS\n- G-protein coupled receptors, tyrosine kinases, ion channels\n- Some lipid rafts help anchor, but receptors themselves are protein\n\n**Option 2: Phospholipids are water soluble**\n- **Partially TRUE** ✓\n- **AMPHIPATHIC**: both hydrophobic and hydrophilic\n- Form micelles and bilayers in water\n- Hydrophilic head soluble, hydrophobic tails not\n- **BEST ANSWER** (though imperfectly worded)\n\n**Option 3: Steroids are glycerol + fatty acids**\n- **FALSE**\n- Steroids have RING STRUCTURE\n- Not based on glycerol\n- Derived from cholesterol\n- Triglycerides are glycerol + fatty acids\n\n**Phospholipid behavior in water:**\n- Hydrophilic phosphate head dissolves\n- Hydrophobic fatty acid tails avoid water\n- Self-assemble into bilayers or micelles\n- This is how cell membranes form\n- \"Water soluble\" is simplification, but closest to correct\n\n**Correct lipid facts:**\n- Saturated fats (not unsaturated) linked to disease\n- Proteins (not lipids) are main receptors\n- Phospholipids form membranes (amphipathic)\n- Steroids are ring structures (not glycerol-based)\n\nPhospholipids are amphipathic and interact with water to form membrane structures.",
    "reasoning": "Unsaturated fats = healthy (not disease). Receptors = proteins (not lipids). Phospholipids = amphipathic, interact with water (form membranes). Steroids = ring structure (not glycerol). Option 2 closest (phospholipids and water). Answer: option 2.",
    "steps": [
      "Unsaturated fats healthy ✗",
      "Receptors = proteins ✗",
      "Phospholipids amphipathic, form bilayers in water ✓",
      "Steroids = rings, not glycerol ✗",
      "Option 2 closest to correct",
      "Answer: option 2 (phospholipids/water)"
    ],
    "generatedAt": "2025-01-14T16:50:00.000Z",
    "correctedAnswer": 2
  },
  {
    "questionId": "high_school_biology_17",
    "explanation": "**Muscle** is NOT a connective tissue - it is a separate tissue type.\n\n**Four primary tissue types:**\n\n**1. Epithelial tissue:**\n- Covers surfaces, lines cavities\n- Skin, gut lining, glands\n\n**2. Connective tissue:**\n- Supports, connects, separates other tissues\n- Contains extracellular matrix\n- Includes: ligaments, blood, cartilage, bone, adipose\n\n**3. Muscle tissue:**\n- Specialized for contraction\n- Skeletal, cardiac, smooth\n- **SEPARATE TISSUE TYPE**\n\n**4. Nervous tissue:**\n- Transmits electrical signals\n- Neurons, glia\n\n**Analyzing options:**\n\n**Option 0: Ligaments**\n- Dense regular connective tissue ✓\n- Connect bone to bone\n- Collagen fibers in parallel\n- Connective tissue\n\n**Option 1: Muscle**\n- **NOT connective tissue** ✗\n- Muscle tissue (separate category)\n- Contains myofibrils, sarcomeres\n- Specialized for contraction\n- **ANSWER**\n\n**Option 2: Blood**\n- Connective tissue ✓\n- Fluid connective tissue\n- Cells suspended in plasma (extracellular matrix)\n- Connects all body systems\n\n**Option 3: Cartilage**\n- Connective tissue ✓\n- Supportive connective tissue\n- Chondrocytes in matrix\n- Flexible support structure\n\n**Connective tissue characteristics:**\n- Derived from mesoderm (embryologically)\n- Abundant extracellular matrix\n- Relatively few cells, lots of ECM\n- Support and connection function\n\n**Types of connective tissue:**\n- **Loose**: Areolar, adipose, reticular\n- **Dense**: Regular (ligaments, tendons), irregular (dermis)\n- **Cartilage**: Hyaline, elastic, fibrocartilage\n- **Bone**: Compact, spongy\n- **Blood**: Fluid connective tissue\n- **Lymph**: Fluid connective tissue\n\n**Muscle vs. Tendon vs. Ligament:**\n- **Muscle**: contractile tissue (skeletal, cardiac, smooth)\n- **Tendon**: dense regular connective tissue, muscle to bone\n- **Ligament**: dense regular connective tissue, bone to bone\n\nMuscle is a distinct tissue type specialized for contraction, not a connective tissue.",
    "reasoning": "Connective tissue: ligaments ✓, blood ✓, cartilage ✓. Muscle = separate tissue type (contractile). Four tissue types: epithelial, connective, muscle, nervous. Muscle NOT connective. Answer: option 1 (muscle).",
    "steps": [
      "Four tissue types",
      "Ligaments = connective ✓",
      "Blood = connective ✓",
      "Cartilage = connective ✓",
      "Muscle = MUSCLE tissue (separate)",
      "Answer: option 1 ✓ (muscle)"
    ],
    "generatedAt": "2025-01-14T16:51:00.000Z",
    "correctedAnswer": 1
  },
  {
    "questionId": "high_school_biology_18",
    "explanation": "The light reactions supply the Calvin cycle with **ATP and NADPH**, which provide energy and reducing power.\n\n**Photosynthesis overview:**\n\n**Stage 1: Light reactions (thylakoid membrane)**\n- Light energy captured\n- Water split → O₂ released\n- **Products: ATP + NADPH + O₂**\n\n**Stage 2: Calvin cycle (stroma)**\n- CO₂ fixed into glucose\n- **Requires: ATP + NADPH + CO₂**\n- Products: G3P → glucose\n\n**Connection between stages:**\n\n**Light reactions produce:**\n- **ATP**: Energy currency\n- **NADPH**: Reducing power (electrons)\n- **O₂**: Byproduct (not used by Calvin)\n\n**Calvin cycle uses:**\n- **ATP**: Powers carbon fixation steps\n- **NADPH**: Reduces 3-PGA to G3P\n- **CO₂**: Raw material from atmosphere\n\n**Analyzing options:**\n\n**Option 0: Light reactions provide oxygen**\n- O₂ is produced but NOT used by Calvin cycle\n- O₂ is released to atmosphere\n- Calvin cycle is \"light-independent\" and doesn't need O₂\n- **FALSE**\n\n**Option 1: ATP and NADPH provide power and raw materials**\n- ATP = energy (power) ✓\n- NADPH = reducing power (electrons) ✓\n- **CORRECT ANSWER**\n- Powers carbon fixation and reduction steps\n\n**Option 2: Water provides hydrogen to Calvin cycle**\n- Water is split in light reactions\n- Electrons go to NADPH (not directly to Calvin)\n- Hydrogen delivered via NADPH, not directly from water\n- **FALSE**\n\n**Option 3: CO₂ released by light reactions**\n- **OPPOSITE**\n- Light reactions consume CO₂? No\n- CO₂ comes from ATMOSPHERE\n- CO₂ is consumed by Calvin cycle, not released by light reactions\n- **FALSE**\n\n**Calvin cycle steps:**\n1. **Carbon fixation**: CO₂ + RuBP → 2 (3-PGA) [uses RuBisCO]\n2. **Reduction**: 3-PGA + ATP + NADPH → G3P [uses ATP + NADPH]\n3. **Regeneration**: G3P → RuBP [uses ATP]\n\n**Energy accounting:**\n- Per 3 CO₂: 9 ATP + 6 NADPH required\n- Per 1 G3P: 3 ATP + 2 NADPH\n- All supplied by light reactions\n\nATP and NADPH from light reactions power the Calvin cycle's carbon fixation.",
    "reasoning": "Light reactions produce ATP + NADPH + O₂. Calvin cycle uses ATP (energy) + NADPH (electrons) to fix CO₂ → glucose. O₂ released (not used). CO₂ from air (not light reactions). Water → NADPH (not direct). Answer: option 1 (ATP + NADPH).",
    "steps": [
      "Light reactions: H₂O → O₂ + ATP + NADPH",
      "Calvin cycle needs ATP + NADPH",
      "ATP = energy for fixation",
      "NADPH = electrons for reduction",
      "O₂ released, not used ✗",
      "Answer: option 1 ✓ (ATP + NADPH)"
    ],
    "generatedAt": "2025-01-14T16:52:00.000Z",
    "correctedAnswer": 1
  },
  {
    "questionId": "high_school_biology_19",
    "explanation": "**Endosymbiosis** created compartmentalization, which **increases metabolic efficiency** by separating specific reactions.\n\n**Endosymbiotic theory:**\n\n**Origin of mitochondria and chloroplasts:**\n- Ancestral prokaryote engulfed aerobic bacterium\n- Bacterium became mitochondrion\n- Later, photosynthetic bacterium became chloroplast\n- **Lynn Margulis** proposed theory (1960s)\n\n**Evidence for endosymbiosis:**\n- Double membrane (from engulfment)\n- Own circular DNA (like bacteria)\n- Own ribosomes (70S, like bacteria)\n- Divide by binary fission\n- Similar size to bacteria\n\n**Benefits of compartmentalization:**\n\n**Option 2: Organelles separate reactions and increase metabolic efficiency** ✓\n- Specialized environments for different reactions\n- Concentration of enzymes\n- Optimal conditions (pH, ion concentration)\n- Prevents conflicting reactions\n- **CORRECT ANSWER**\n\n**Examples:**\n- **Mitochondria**: Aerobic respiration, proton gradient\n- **Chloroplasts**: Photosynthesis, light capture\n- **Lysosomes**: Acidic digestion (pH ~5)\n- **Peroxisomes**: H₂O₂ breakdown\n- **ER**: Protein synthesis and folding\n\n**Why other options are WRONG:**\n\n**Option 0: DNA reproduces more efficiently**\n- Compartmentalization doesn't directly help DNA replication\n- DNA still in nucleus (eukaryotes) or nucleoid (prokaryotes)\n- Not the main advantage\n\n**Option 1: Prokaryotes have equivalent structures**\n- **FALSE**\n- Prokaryotes LACK membrane-bound organelles\n- Have ribosomes, but no mitochondria, nucleus, ER, etc.\n- Mesosomes (infoldings) but not true compartments\n\n**Option 3: Prokaryotes reproduce more quickly**\n- **OPPOSITE**\n- Prokaryotes DO reproduce faster (20 min vs hours)\n- But compartmentalization SLOWS reproduction\n- Complex eukaryotes reproduce more slowly\n- Not an advantage of compartmentalization\n\n**Metabolic efficiency examples:**\n- **Mitochondria**: High [H⁺] in intermembrane space → ATP\n- **Chloroplasts**: High [H⁺] in thylakoid lumen → ATP\n- **Lysosomes**: Low pH for hydrolases without damaging cell\n- **Nucleus**: Transcription separate from translation (splicing)\n\n**Compartmentalization advantages:**\n- Specialization of function\n- Protection from toxic intermediates\n- Regulation of pathways\n- Simultaneous incompatible reactions\n- Higher complexity possible\n\nOrganelles create specialized compartments that optimize conditions for specific metabolic pathways.",
    "reasoning": "Endosymbiosis created organelles with membranes → compartmentalization. Allows separation of reactions, optimal conditions for each, prevents interference → increases efficiency. Prokaryotes LACK organelles (no equivalent). Not about DNA replication or reproduction speed. Answer: option 2 (metabolic efficiency).",
    "steps": [
      "Endosymbiosis → mitochondria, chloroplasts",
      "Created compartments",
      "Separate reactions in organelles",
      "Optimal conditions for each",
      "Increases metabolic efficiency",
      "Answer: option 2 ✓ (efficiency)"
    ],
    "generatedAt": "2025-01-14T16:53:00.000Z",
    "correctedAnswer": 2
  },
  {
    "questionId": "high_school_biology_20",
    "explanation": "Vaccination **increases the number of lymphocytes with receptors** that recognize the specific antigen.\n\n**How vaccination works:**\n\n**1. Vaccine contains antigen:**\n- Weakened/killed pathogen\n- Or subunit (protein, polysaccharide)\n- Or mRNA encoding antigen\n\n**2. Immune system responds:**\n- Antigen-presenting cells (APCs) present antigen\n- Activate naive lymphocytes with matching receptors\n- **Clonal selection and expansion**\n- B cells and T cells multiply\n\n**3. Memory cells created:**\n- Long-lived lymphocytes\n- Rapid response upon re-exposure\n- **More lymphocytes with specific receptors**\n\n**Option 3 is CORRECT:**\n\"Increases the number of lymphocytes with receptors that can recognize and bind to the antigen\" ✓\n- Clonal expansion creates many copies\n- All have same receptor specificity\n- Memory B cells and memory T cells\n- **ANSWER**\n\n**Why other options are WRONG:**\n\n**Option 0: Increases number of different receptors**\n- **FALSE**\n- Each lymphocyte has ONE receptor specificity\n- Vaccination doesn't create NEW receptor types\n- Increases COPIES of cells with SAME receptor\n- Doesn't increase diversity\n\n**Option 1: Increases macrophages specific to antigen**\n- **FALSE**\n- Macrophages are nonspecific (innate immunity)\n- They don't have antigen-specific receptors\n- Same macrophages respond to all pathogens\n- Not the mechanism of vaccination\n\n**Option 2: Increases epitopes that immune system recognizes**\n- **FALSE**\n- Epitopes are parts OF the antigen\n- Immune system doesn't create epitopes\n- Pathogens have epitopes\n- Vaccination doesn't change epitope number\n\n**Clonal selection:**\n- Millions of naive lymphocytes, each with random receptor\n- Antigen binds to matching receptors\n- Those cells activated and multiply\n- Creates population of cells with same specificity\n- **Expansion of specific clones**\n\n**Example:**\n- Pre-vaccine: 1 in 100,000 lymphocytes recognize flu H1N1\n- Post-vaccine: 1 in 100 lymphocytes recognize flu H1N1\n- **10,000× more cells** with that specific receptor\n- Faster response upon actual infection\n\n**Vaccine types:**\n- Live attenuated: Weakened pathogen\n- Inactivated: Killed pathogen\n- Subunit: Specific proteins\n- mRNA: Cells produce antigen\n- All trigger clonal expansion\n\nVaccination causes clonal expansion of lymphocytes with receptors specific to the vaccine antigen.",
    "reasoning": "Vaccination → antigen presentation → clonal selection → expansion of lymphocytes with matching receptors. Creates memory cells (more of SAME specificity, not different receptors). Macrophages nonspecific (not antigen-specific). Epitopes on pathogen (not created by immune system). Answer: option 3 (more lymphocytes).",
    "steps": [
      "Vaccine contains antigen",
      "Lymphocytes with matching receptors activated",
      "Clonal expansion multiplies those cells",
      "Many more lymphocytes with THAT receptor",
      "Memory for rapid response",
      "Answer: option 3 ✓ (more lymphocytes)"
    ],
    "generatedAt": "2025-01-14T16:54:00.000Z",
    "correctedAnswer": 3
  },
  {
    "questionId": "high_school_biology_21",
    "explanation": "The relationship between calypso orchid and mycorrhizae fungi is **mutualism** - both organisms benefit.\n\n**Symbiotic relationships:**\n\n**1. Mutualism (+/+):**\n- Both species benefit\n- Examples: Pollination, gut bacteria, lichen\n\n**2. Commensalism (+/0):**\n- One benefits, other unaffected\n- Examples: Barnacles on whale, epiphytes on trees\n\n**3. Parasitism (+/-):**\n- One benefits, other harmed\n- Examples: Tapeworm, ticks, mistletoe\n\n**4. Endosymbiosis:**\n- One organism lives inside another\n- Can be mutualistic (mitochondria) or parasitic (malaria)\n- Refers to LOCATION, not benefit type\n\n**Mycorrhizae:**\n\n**Definition:**\n- Fungus-root association\n- Fungal hyphae colonize plant roots\n- **Mutualistic relationship**\n\n**Benefits to plant (+):**\n- Increased water absorption (large surface area)\n- Enhanced nutrient uptake (especially phosphorus, nitrogen)\n- Protection from pathogens\n- Drought tolerance\n- Critical for orchids (often obligate)\n\n**Benefits to fungus (+):**\n- Carbohydrates from plant photosynthesis\n- Stable environment\n- Protection from desiccation\n\n**Types of mycorrhizae:**\n- **Ectomycorrhizae**: Fungus around root (trees)\n- **Arbuscular mycorrhizae** (AM): Penetrates root cells (most plants, ~80%)\n- **Orchid mycorrhizae**: Specialized for orchids\n\n**Calypso orchid specifically:**\n- Requires mycorrhizae for germination\n- Orchid seeds lack endosperm (no stored food)\n- Depend on fungus for early nutrition\n- Adult plant also benefits from enhanced nutrient uptake\n- **Obligate mutualism** (orchid cannot survive without fungus)\n\n**Why option 2 is CORRECT:**\nMutualism ✓\n- Plant gets nutrients and water\n- Fungus gets carbohydrates\n- Both benefit\n\n**Why other options are WRONG:**\n\n**Option 0: Parasitism**\n- Would require one harmed\n- Neither is harmed (both benefit)\n- Not parasitic\n\n**Option 1: Commensalism**\n- Would require one unaffected\n- Fungus BENEFITS (gets carbohydrates)\n- Not commensalism\n\n**Option 3: Endosymbiosis**\n- Refers to organism living INSIDE cells\n- Mycorrhizae is BETWEEN cells (intercellular)\n- Not true endosymbiosis\n- Though some hyphae penetrate cells, the relationship type is mutualism\n\nMycorrhizae form a mutualistic partnership where both fungus and orchid benefit.",
    "reasoning": "Mycorrhizae: fungus + plant roots. Plant gets water/nutrients. Fungus gets carbohydrates. Both benefit = mutualism. Not parasitism (both benefit, none harmed). Not commensalism (fungus benefits, not neutral). Endosymbiosis describes location (inside), not benefit type. Answer: option 2 (mutualism).",
    "steps": [
      "Mycorrhizae = fungus + root",
      "Plant: water + nutrients ✓",
      "Fungus: carbohydrates ✓",
      "Both benefit",
      "Mutualism = +/+",
      "Answer: option 2 ✓ (mutualism)"
    ],
    "generatedAt": "2025-01-14T16:55:00.000Z",
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
