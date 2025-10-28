#!/usr/bin/env python3
import pandas as pd
import json

# Key MMLU subjects mapped to our categories
SUBJECTS = {
    "college_physics": {"category": "physics", "difficulty": "Hard"},
    "high_school_physics": {"category": "physics", "difficulty": "Medium"},
    "high_school_us_history": {"category": "history", "difficulty": "Medium"},
    "high_school_world_history": {"category": "history", "difficulty": "Medium"},
    "college_mathematics": {"category": "mathematics", "difficulty": "Hard"},
    "high_school_mathematics": {"category": "mathematics", "difficulty": "Medium"},
    "elementary_mathematics": {"category": "mathematics", "difficulty": "Easy"},
    "high_school_geography": {"category": "geography", "difficulty": "Easy"},
    "college_biology": {"category": "biology", "difficulty": "Hard"},
    "high_school_biology": {"category": "biology", "difficulty": "Medium"},
    "world_religions": {"category": "literature", "difficulty": "Medium"},
    "college_chemistry": {"category": "chemistry", "difficulty": "Hard"},
    "high_school_chemistry": {"category": "chemistry", "difficulty": "Medium"},
    "philosophy": {"category": "philosophy", "difficulty": "Hard"},
    "formal_logic": {"category": "philosophy", "difficulty": "Hard"},
}

questions = []

for subject, config in SUBJECTS.items():
    url = f"https://huggingface.co/datasets/cais/mmlu/resolve/refs%2Fconvert%2Fparquet/{subject}/test/0000.parquet"
    
    try:
        df = pd.read_parquet(url)
        
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
            
        print(f"Loaded {len(df)} questions from {subject}", file=__import__('sys').stderr)
    except Exception as e:
        print(f"Error loading {subject}: {e}", file=__import__('sys').stderr)

print(json.dumps({"questions": questions, "total": len(questions)}))
