#!/usr/bin/env node
import { readFile, writeFile } from 'fs/promises';

const newExplanations = [
  {
    "questionId": "high_school_biology_26",
    "explanation": "A **heterotroph** obtains energy by **oxidizing organic molecules** (consuming other organisms).\n\n**Nutritional modes:**\n\n**1. Energy source:**\n- **Phototrophs**: Use light (photo-)\n- **Chemotrophs**: Use chemicals (chemo-)\n\n**2. Carbon source:**\n- **Autotrophs**: Use CO₂ (self-feeding)\n- **Heterotrophs**: Use organic molecules (other-feeding)\n\n**Four combinations:**\n\n**Photoautotrophs:**\n- Light energy + CO₂\n- Plants, algae, cyanobacteria\n- Photosynthesis: 6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂\n\n**Chemoautotrophs:**\n- Chemical energy + CO₂\n- Some bacteria (nitrifying, sulfur bacteria)\n- Chemosynthesis at hydrothermal vents\n\n**Photoheterotrophs:**\n- Light energy + organic molecules\n- Some purple non-sulfur bacteria\n- Rare\n\n**Chemoheterotrophs:**\n- Chemical energy + organic molecules\n- **ANIMALS, FUNGI, MOST BACTERIA**\n- Cellular respiration: C₆H₁₂O₆ + 6O₂ → 6CO₂ + 6H₂O + ATP\n- **THIS IS THE ANSWER** ✓\n\n**Heterotroph definition:**\n- Cannot make own food\n- Consume organic molecules from other organisms\n- **Oxidize** glucose/fats/proteins for energy\n- Cellular respiration or fermentation\n\n**Option 1 is CORRECT:**\n\"Obtains energy by oxidizing organic molecules\" ✓\n- Breaks down organic compounds\n- Extracts energy via cellular respiration\n- Releases CO₂ and H₂O\n\n**Why other options are WRONG:**\n\n**Option 0: Energy from sunlight**\n- This describes **PHOTOTROPHS** (not heterotrophs)\n- Plants, algae\n- Autotrophs (not heterotrophs)\n\n**Option 2: Makes organic molecules from CO₂**\n- This describes **AUTOTROPHS** (not heterotrophs)\n- Carbon fixation\n- Opposite of heterotrophs\n\n**Option 3: Consumes exclusively autotrophs**\n- TOO RESTRICTIVE\n- Heterotrophs can eat autotrophs OR other heterotrophs\n- Herbivores eat autotrophs (plants)\n- Carnivores eat heterotrophs (animals)\n- Omnivores eat both\n- Not limited to autotrophs only\n\n**Types of heterotrophs:**\n- **Herbivores**: Eat plants (deer, cows)\n- **Carnivores**: Eat animals (lions, eagles)\n- **Omnivores**: Eat both (humans, bears)\n- **Decomposers**: Break down dead matter (fungi, bacteria)\n- **Parasites**: Feed on living hosts\n\n**Oxidation of organic molecules:**\n- Glucose oxidation: C₆H₁₂O₆ → CO₂ (C is oxidized)\n- Electron transport chain extracts energy\n- ATP produced (30-32 ATP per glucose)\n- Essential for heterotroph survival\n\nHeterotrophs obtain energy through cellular respiration, oxidizing organic molecules from consumed organisms.",
    "reasoning": "Heterotrophs consume organic molecules and oxidize them for energy (cellular respiration). Not photosynthesis (autotrophs). Not making molecules from CO₂ (autotrophs). Not exclusively autotroph-eaters (can eat heterotrophs too). Answer: option 1 (oxidizing organic molecules).",
    "steps": [
      "Hetero- = other, -troph = feeding",
      "Cannot make own food",
      "Consume organic molecules",
      "Oxidize via cellular respiration",
      "Extract energy as ATP",
      "Answer: option 1 ✓ (oxidizing organic)"
    ],
    "generatedAt": "2025-01-14T17:05:00.000Z",
    "correctedAnswer": 1
  },
  {
    "questionId": "high_school_biology_27",
    "explanation": "**ADP + P → ATP** occurs forward in glycolysis and reverse in gluconeogenesis.\n\n**Glycolysis vs. Gluconeogenesis:**\n\n**Glycolysis (glucose → pyruvate):**\n- Breaks down glucose\n- Cytoplasm\n- Produces ATP\n- **ADP + P → ATP** (substrate-level phosphorylation)\n- Steps 7 and 10: Make ATP\n\n**Gluconeogenesis (pyruvate → glucose):**\n- Synthesizes glucose\n- Liver, kidney\n- Consumes ATP\n- **ATP → ADP + P** (reverse direction)\n- Requires energy input\n\n**Why option 3 is CORRECT:**\n\"ADP + P → ATP\" ✓\n- Forward in glycolysis (energy produced)\n- Reverse in gluconeogenesis (energy consumed)\n- Most glycolytic enzymes work both directions\n- Three irreversible steps bypassed in gluconeogenesis\n\n**Why other options are WRONG:**\n\n**Option 0: Pyruvate → lactate**\n- **FERMENTATION**, not gluconeogenesis\n- Occurs during anaerobic conditions\n- Regenerates NAD⁺ for glycolysis\n- Not the reverse pathway of glycolysis\n- Lactate can → pyruvate, but this isn't gluconeogenesis\n\n**Option 1: Pyruvate → ethanol**\n- **ALCOHOLIC FERMENTATION**\n- Yeast, bacteria\n- Not reverse of glycolysis\n- Doesn't make glucose\n\n**Option 2: NAD⁺ + H⁺ + 2e⁻ → NADH**\n- Occurs in glycolysis (G3P → 1,3-BPG)\n- BUT doesn't occur in gluconeogenesis\n- Gluconeogenesis uses different step (bypasses this)\n- NADH → NAD⁺ in gluconeogenesis (opposite)\n- Not truly reversible in the pathways\n\n**Glycolysis steps (simplified):**\n1. Glucose → G6P (uses ATP)\n2. G6P → F6P\n3. F6P → F-1,6-BP (uses ATP) [IRREVERSIBLE]\n4. F-1,6-BP → 2 G3P\n5. 2 G3P → 2 1,3-BPG (makes NADH)\n6. 2 1,3-BPG → 2 3-PG (**makes 2 ATP**)\n7. 2 3-PG → 2 2-PG\n8. 2 2-PG → 2 PEP\n9. 2 PEP → 2 pyruvate (**makes 2 ATP**) [IRREVERSIBLE]\n\n**Net glycolysis:** \n- 2 ATP produced (4 made - 2 used)\n- 2 NADH produced\n\n**Gluconeogenesis bypasses:**\n- Uses different enzymes for 3 irreversible steps\n- Pyruvate → PEP (via pyruvate carboxylase + PEPCK)\n- F-1,6-BP → F6P (via fructose-1,6-bisphosphatase)\n- G6P → glucose (via glucose-6-phosphatase)\n- Reverses ATP-making steps (consumes ATP instead)\n\n**Reversible reactions:**\n- Most steps use same enzymes in both directions\n- Equilibrium shifts based on substrate concentrations\n- ATP ⇄ ADP + P is reversible in pathway\n- Direction depends on glycolysis vs gluconeogenesis\n\nThe ATP synthesis/hydrolysis step is reversible, going forward in glycolysis and backward in gluconeogenesis.",
    "reasoning": "Glycolysis makes ATP (ADP + P → ATP). Gluconeogenesis reverses pathway, consumes ATP (ATP → ADP + P). Pyruvate → lactate/ethanol = fermentation (not reverse). NAD⁺ → NADH in glycolysis but bypassed in gluconeogenesis. Answer: option 3 (ADP + P → ATP).",
    "steps": [
      "Glycolysis: ADP + P → ATP (makes energy)",
      "Gluconeogenesis: ATP → ADP + P (uses energy)",
      "Same reaction, opposite directions",
      "Fermentation not reverse pathway",
      "NADH/NAD⁺ step bypassed in gluconeogenesis",
      "Answer: option 3 ✓ (ADP + P → ATP)"
    ],
    "generatedAt": "2025-01-14T17:06:00.000Z",
    "correctedAnswer": 3
  },
  {
    "questionId": "high_school_biology_28",
    "explanation": "A fern suddenly producing gametes with double chromosomes indicates **polyploidy** (chromosome number multiplication).\n\n**Chromosome abnormalities:**\n\n**Polyploidy:**\n- Whole genome duplication\n- 2n → 4n (tetraploid), 2n → 3n (triploid), etc.\n- Common in plants (30-80% of angiosperms)\n- Sudden event (one generation)\n- **THIS IS THE ANSWER** ✓\n\n**Why polyploidy fits:**\n- Gametes normally haploid (n)\n- After polyploidy: gametes have 2n (double)\n- Meiotic nondisjunction or somatic doubling\n- Produces fertile offspring if autopolyploid (4n)\n- Common in ferns (40% of fern species)\n\n**Mechanisms:**\n- **Autopolyploidy**: Own genome doubles (2n → 4n)\n- **Allopolyploidy**: Hybrid genome doubles\n- Meiosis error: diploid gametes produced\n- Fertilization: 2n + 2n = 4n offspring\n\n**Why other options are WRONG:**\n\n**Option 0: Karyotyping**\n- **NOT an evolutionary mechanism**\n- Laboratory technique for viewing chromosomes\n- Used to detect abnormalities, doesn't cause them\n- Observation tool, not cause\n\n**Option 1: Balanced polymorphism**\n- Multiple alleles maintained in population\n- Heterozygote advantage\n- Doesn't change chromosome number\n- Example: sickle cell (maintains alleles, not chromosomes)\n\n**Option 2: Mutation**\n- Point mutations, insertions, deletions\n- Changes DNA sequence (not chromosome number)\n- Gradual accumulation\n- Wouldn't double entire genome suddenly\n- Too specific\n\n**Polyploidy in plants:**\n\n**Advantages:**\n- Larger cells (more chromosomes)\n- Increased vigor (heterosis)\n- New gene combinations\n- Can overcome hybrid sterility\n\n**Examples:**\n- Wheat: Hexaploid (6n = 42)\n- Strawberry: Octoploid (8n = 56)\n- Ferns: Many polyploid species\n- Bananas: Triploid (3n = 33, seedless)\n- Cotton: Tetraploid (4n = 52)\n\n**Polyploidy in animals:**\n- Rare (usually lethal)\n- Sex chromosome imbalance\n- Dosage compensation problems\n- Some frogs, fish, salamanders are polyploid\n\n**Speciation:**\n- **Instant reproductive isolation**\n- 4n individuals can't mate with 2n (triploid offspring sterile)\n- New species in one generation\n- **Sympatric speciation**\n\n**Detection:**\n- Karyotyping reveals doubled chromosomes\n- Larger cells\n- Flow cytometry measures DNA content\n- But question asks CAUSE, not detection method\n\n**Types:**\n- **Autopolyploidy**: 2n → 4n (same species)\n- **Allopolyploidy**: 2n + 2n = 4n (hybrid × hybrid)\n- **Aneuploid**: Extra/missing individual chromosomes (Down syndrome = trisomy 21)\n\nPolyploidy causes sudden genome duplication, explaining doubled chromosomes in gametes.",
    "reasoning": "Gametes suddenly have double chromosomes = polyploidy (genome duplication). Common in plants/ferns. Not karyotyping (observation tool). Not balanced polymorphism (allele frequency). Not point mutation (too large a change). Answer: option 3 (polyploidy).",
    "steps": [
      "Normal gametes: n chromosomes",
      "Observed: gametes with 2n (double)",
      "Sudden appearance = whole genome duplication",
      "Polyploidy = chromosome set multiplication",
      "Common in ferns (40% polyploid)",
      "Answer: option 3 ✓ (polyploidy)"
    ],
    "generatedAt": "2025-01-14T17:07:00.000Z",
    "correctedAnswer": 3
  },
  {
    "questionId": "high_school_biology_29",
    "explanation": "**EcoRI** is a **restriction enzyme** (restriction endonuclease) extracted from *E. coli*.\n\n**Restriction enzymes:**\n\n**Definition:**\n- Bacterial enzymes that cut DNA\n- Recognize specific sequences\n- \"Molecular scissors\"\n- Defense against bacteriophages\n- Named after bacteria of origin\n\n**EcoRI specifics:**\n- From *Escherichia coli* strain RY13\n- **Eco** = *E. coli*\n- **R** = strain designation (RY13)\n- **I** = first enzyme from this strain\n- Recognizes palindromic sequence: 5'-GAATTC-3'\n- Makes staggered cut (sticky ends)\n\n**Recognition and cutting:**\n```\n5'-G↓AATTC-3'\n3'-CTTAA↑G-5'\n```\n- Cuts between G and A\n- Produces 5' overhangs (sticky ends)\n- AATT overhang can base-pair with complementary ends\n\n**Uses in molecular biology:**\n- **Cloning**: Cut plasmid and insert\n- **DNA fingerprinting**: Cut genomic DNA\n- **Restriction mapping**: Determine DNA structure\n- **Southern blotting**: Analyze specific sequences\n- **Gene editing** (before CRISPR)\n\n**Option 2 is CORRECT:**\n\"Restriction enzyme extracted from *E. coli*\" ✓\n\n**Why other options are WRONG:**\n\n**Option 0: Bacterium in human intestine**\n- Wrong identity\n- *E. coli* IS a bacterium in intestine\n- But EcoRI is an ENZYME from *E. coli*, not the bacterium itself\n- Confuses source with product\n\n**Option 1: Bacteriophage attacking *E. coli***\n- **OPPOSITE**\n- Lambda phage attacks *E. coli* (well-studied phage)\n- EcoRI is enzyme that DEFENDS against phages\n- Cuts foreign DNA (including phage DNA)\n\n**Option 3: Type of DNA**\n- **WRONG molecule type**\n- EcoRI is PROTEIN (enzyme), not DNA\n- Acts ON DNA but isn't DNA itself\n- Enzymes are proteins\n\n**Other restriction enzymes:**\n- **BamHI**: From *Bacillus amyloliquefaciens* H\n- **HindIII**: From *Haemophilus influenzae* Rd\n- **PstI**: From *Providencia stuartii*\n- **SmaI**: From *Serratia marcescens*\n- Hundreds discovered\n\n**Types of ends:**\n- **Sticky ends** (5' or 3' overhangs): EcoRI, BamHI\n- **Blunt ends** (no overhang): SmaI, EcoRV\n- Sticky ends easier for cloning (complementary base pairing)\n\n**Biological function:**\n- Bacterial immune system\n- Recognizes foreign DNA (unmethylated)\n- Cuts invading phage DNA\n- Host DNA protected by methylation\n- **Restriction-modification system**\n\n**Palindromic sequences:**\n- Read same on both strands (5'→3')\n- EcoRI: GAATTC\n- BamHI: GGATCC\n- Allow dimeric enzyme to bind symmetrically\n\nEcoRI is a restriction endonuclease isolated from *E. coli* that cuts DNA at specific sequences.",
    "reasoning": "EcoRI = restriction enzyme from *E. coli* (Eco = *E. coli*, RI = strain). Cuts DNA at GAATTC. Not the bacterium itself. Not phage (enzyme defends against phages). Not DNA (enzyme = protein). Answer: option 2 (restriction enzyme).",
    "steps": [
      "EcoRI named after *E. coli*",
      "Restriction enzyme (endonuclease)",
      "Cuts DNA at specific sequence",
      "Molecular biology tool",
      "Not bacterium, phage, or DNA",
      "Answer: option 2 ✓ (restriction enzyme)"
    ],
    "generatedAt": "2025-01-14T17:08:00.000Z",
    "correctedAnswer": 2
  },
  {
    "questionId": "high_school_biology_30",
    "explanation": "**Bird wings and insect wings** are LEAST likely homologous - they're **analogous** (convergent evolution).\n\n**Homology vs. Analogy:**\n\n**Homologous structures:**\n- **Same evolutionary origin** (common ancestor)\n- **Same structure**, different function\n- **Divergent evolution**\n- Example: Human arm, whale flipper, bat wing (all from tetrapod limb)\n\n**Analogous structures:**\n- **Different evolutionary origin** (no common ancestor with that structure)\n- **Different structure**, same function\n- **Convergent evolution**\n- Example: Bird wing vs. insect wing\n\n**Analyzing options:**\n\n**Option 0: Bat wings and human arms**\n- **HOMOLOGOUS** ✓\n- Same bones: humerus, radius, ulna, carpals, metacarpals, phalanges\n- Inherited from common tetrapod ancestor\n- Divergent evolution (different functions)\n\n**Option 1: Baboon hemoglobin and gorilla hemoglobin**\n- **HOMOLOGOUS** ✓\n- Both primates\n- Inherited from common primate ancestor\n- Very similar sequences\n- Molecular homology\n\n**Option 2: Plant mitochondria and animal mitochondria**\n- **HOMOLOGOUS** ✓\n- Both from endosymbiotic event (~2 billion years ago)\n- Common bacterial ancestor\n- Similar structure, function, DNA\n- Universal in eukaryotes\n\n**Option 3: Bird wings and insect wings**\n- **ANALOGOUS (NOT HOMOLOGOUS)** ✗\n- **LEAST LIKELY HOMOLOGY**\n- **THIS IS THE ANSWER** ✓\n\n**Why bird and insect wings are analogous:**\n\n**Different structures:**\n- **Bird wing**: Modified forelimb bones covered with feathers\n- **Insect wing**: Outgrowth of exoskeleton, no bones, chitinous\n\n**Different origins:**\n- Birds: Descended from dinosaurs (amniote tetrapods)\n- Insects: Descended from arthropod ancestors\n- Common ancestor had NO wings\n- Wings evolved independently\n\n**Convergent evolution:**\n- Similar environmental pressure (flight)\n- Evolved similar function independently\n- Classic example of analogy\n\n**Comparison:**\n\n| Feature | Bird wing | Insect wing |\n|---------|-----------|-------------|\n| **Structure** | Bones, feathers | Chitin, no bones |\n| **Development** | Forelimb modification | Thorax outgrowth |\n| **Veins** | Blood vessels | Tracheal tubes |\n| **Evolution** | Dinosaurs (~150 Mya) | ~350 Mya |\n| **Homology** | Tetrapod limb | Novel structure |\n\n**Other analogous structures:**\n- Shark (fish) and dolphin (mammal) fins\n- Cactus (Americas) and euphorb (Africa) succulents\n- Octopus and vertebrate eyes\n\n**Homology evidence:**\n- Fossil record\n- Comparative anatomy\n- Embryology (similar development)\n- Molecular sequences (DNA, proteins)\n\nBird and insect wings evolved independently for flight - analogous structures, not homologous.",
    "reasoning": "Homology = common origin. Bat arm/human arm: same bones (homologous). Baboon/gorilla hemoglobin: same origin (homologous). Plant/animal mitochondria: same endosymbiont origin (homologous). Bird/insect wings: different structures, independent evolution (analogous). Answer: option 3 (wings).",
    "steps": [
      "Homology = common evolutionary origin",
      "Bat/human: tetrapod limbs (homologous)",
      "Hemoglobins: common ancestor (homologous)",
      "Mitochondria: endosymbiosis (homologous)",
      "Bird/insect wings: independent evolution (analogous)",
      "Answer: option 3 ✓ (least likely homology)"
    ],
    "generatedAt": "2025-01-14T17:09:00.000Z",
    "correctedAnswer": 3
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
