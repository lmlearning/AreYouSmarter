#!/usr/bin/env python3
import pandas as pd
import json
import sys

# Comprehensive MMLU subjects mapped to categories
SUBJECTS = {
    # Physics
    "college_physics": {"category": "physics", "difficulty": "Hard"},
    "high_school_physics": {"category": "physics", "difficulty": "Medium"},
    "conceptual_physics": {"category": "physics", "difficulty": "Medium"},
    
    # History
    "high_school_us_history": {"category": "history", "difficulty": "Medium"},
    "high_school_european_history": {"category": "history", "difficulty": "Medium"},
    "high_school_world_history": {"category": "history", "difficulty": "Medium"},
    "prehistory": {"category": "history", "difficulty": "Medium"},
    
    # Mathematics
    "college_mathematics": {"category": "mathematics", "difficulty": "Hard"},
    "high_school_mathematics": {"category": "mathematics", "difficulty": "Medium"},
    "elementary_mathematics": {"category": "mathematics", "difficulty": "Easy"},
    "high_school_statistics": {"category": "mathematics", "difficulty": "Medium"},
    "abstract_algebra": {"category": "mathematics", "difficulty": "Hard"},
    
    # Geography
    "high_school_geography": {"category": "geography", "difficulty": "Easy"},
    
    # Biology
    "college_biology": {"category": "biology", "difficulty": "Hard"},
    "high_school_biology": {"category": "biology", "difficulty": "Medium"},
    "anatomy": {"category": "biology", "difficulty": "Hard"},
    "human_aging": {"category": "biology", "difficulty": "Medium"},
    "human_sexuality": {"category": "biology", "difficulty": "Medium"},
    "medical_genetics": {"category": "biology", "difficulty": "Hard"},
    "nutrition": {"category": "biology", "difficulty": "Medium"},
    "virology": {"category": "biology", "difficulty": "Hard"},
    
    # Literature & Religion
    "world_religions": {"category": "literature", "difficulty": "Medium"},
    
    # Chemistry
    "college_chemistry": {"category": "chemistry", "difficulty": "Hard"},
    "high_school_chemistry": {"category": "chemistry", "difficulty": "Medium"},
    
    # Philosophy
    "philosophy": {"category": "philosophy", "difficulty": "Hard"},
    "formal_logic": {"category": "philosophy", "difficulty": "Hard"},
    "logical_fallacies": {"category": "philosophy", "difficulty": "Medium"},
    "moral_disputes": {"category": "philosophy", "difficulty": "Hard"},
    "moral_scenarios": {"category": "philosophy", "difficulty": "Medium"},
    
    # Business
    "professional_accounting": {"category": "business", "difficulty": "Hard"},
    "business_ethics": {"category": "business", "difficulty": "Medium"},
    "management": {"category": "business", "difficulty": "Medium"},
    "marketing": {"category": "business", "difficulty": "Medium"},
    
    # Law
    "professional_law": {"category": "law", "difficulty": "Hard"},
    "international_law": {"category": "law", "difficulty": "Hard"},
    "jurisprudence": {"category": "law", "difficulty": "Hard"},
    
    # Medicine
    "professional_medicine": {"category": "medicine", "difficulty": "Hard"},
    "clinical_knowledge": {"category": "medicine", "difficulty": "Hard"},
    "college_medicine": {"category": "medicine", "difficulty": "Hard"},
    
    # Psychology
    "professional_psychology": {"category": "psychology", "difficulty": "Hard"},
    "high_school_psychology": {"category": "psychology", "difficulty": "Medium"},
    
    # Computer Science
    "college_computer_science": {"category": "computer_science", "difficulty": "Hard"},
    "high_school_computer_science": {"category": "computer_science", "difficulty": "Medium"},
    "computer_security": {"category": "computer_science", "difficulty": "Hard"},
    "machine_learning": {"category": "computer_science", "difficulty": "Hard"},
    
    # Astronomy
    "astronomy": {"category": "astronomy", "difficulty": "Hard"},
    
    # Engineering
    "electrical_engineering": {"category": "engineering", "difficulty": "Hard"},
    
    # Economics & Social Sciences
    "high_school_government_and_politics": {"category": "social_sciences", "difficulty": "Medium"},
    "high_school_macroeconomics": {"category": "social_sciences", "difficulty": "Medium"},
    "high_school_microeconomics": {"category": "social_sciences", "difficulty": "Medium"},
    "econometrics": {"category": "social_sciences", "difficulty": "Hard"},
    "sociology": {"category": "social_sciences", "difficulty": "Medium"},
    "us_foreign_policy": {"category": "social_sciences", "difficulty": "Medium"},
    "security_studies": {"category": "social_sciences", "difficulty": "Hard"},
    
    # General Knowledge
    "miscellaneous": {"category": "general", "difficulty": "Medium"},
    "global_facts": {"category": "general", "difficulty": "Easy"},
    "public_relations": {"category": "general", "difficulty": "Medium"},
}

questions = []
subject_counts = {}

for subject, config in SUBJECTS.items():
    url = f"https://huggingface.co/datasets/cais/mmlu/resolve/refs%2Fconvert%2Fparquet/{subject}/test/0000.parquet"
    
    try:
        df = pd.read_parquet(url)
        count = 0
        
        for idx, row in df.iterrows():
            answer_map = {"A": 0, "B": 1, "C": 2, "D": 3}
            correct = answer_map.get(row["answer"], 0)
            
            questions.append({
                "id": f"{subject}_{idx}",
                "subject": config["category"],
                "question": row["question"],
                "options": list(row["choices"]),
                "correctAnswer": correct,
                "difficulty": config["difficulty"],
                "explanation": f"The correct answer is {row['choices'][correct]}."
            })
            count += 1
        
        category = config["category"]
        subject_counts[category] = subject_counts.get(category, 0) + count
        print(f"Loaded {count} questions from {subject} → {category}", file=sys.stderr)
    except Exception as e:
        print(f"Error loading {subject}: {e}", file=sys.stderr)

print(f"\nTotal questions by category:", file=sys.stderr)
for category in sorted(subject_counts.keys()):
    print(f"  {category}: {subject_counts[category]}", file=sys.stderr)
print(f"\nTotal questions: {len(questions)}", file=sys.stderr)

print(json.dumps({"questions": questions, "total": len(questions)}))
