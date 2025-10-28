#!/usr/bin/env python3
"""
Download MMLU dataset from Hugging Face and convert to JSON format
"""
import pandas as pd
import json
import requests
import sys
from typing import List, Dict

# MMLU subject mapping to our categories
SUBJECT_MAPPING = {
    # Physics
    "college_physics": "physics",
    "high_school_physics": "physics",
    "conceptual_physics": "physics",
    
    # History
    "high_school_us_history": "history",
    "high_school_european_history": "history",
    "high_school_world_history": "history",
    "prehistory": "history",
    
    # Mathematics
    "college_mathematics": "mathematics",
    "high_school_mathematics": "mathematics",
    "elementary_mathematics": "mathematics",
    "high_school_statistics": "mathematics",
    "abstract_algebra": "mathematics",
    
    # Geography
    "high_school_geography": "geography",
    
    # Biology
    "college_biology": "biology",
    "high_school_biology": "biology",
    "anatomy": "biology",
    "human_aging": "biology",
    "human_sexuality": "biology",
    "medical_genetics": "biology",
    "nutrition": "biology",
    "virology": "biology",
    
    # Literature
    "world_religions": "literature",
    
    # Chemistry
    "college_chemistry": "chemistry",
    "high_school_chemistry": "chemistry",
    
    # Philosophy
    "philosophy": "philosophy",
    "formal_logic": "philosophy",
    "logical_fallacies": "philosophy",
    "moral_disputes": "philosophy",
    "moral_scenarios": "philosophy",
    
    # Language - linguistics and language arts
    "professional_accounting": "business",
    "professional_law": "law",
    "professional_medicine": "medicine",
    "professional_psychology": "psychology",
    "clinical_knowledge": "medicine",
    "college_medicine": "medicine",
    
    # Computer Science
    "college_computer_science": "computer_science",
    "high_school_computer_science": "computer_science",
    "computer_security": "computer_science",
    "machine_learning": "computer_science",
    
    # Other sciences
    "astronomy": "astronomy",
    "electrical_engineering": "engineering",
    
    # Social Sciences
    "high_school_government_and_politics": "social_sciences",
    "high_school_macroeconomics": "social_sciences",
    "high_school_microeconomics": "social_sciences",
    "econometrics": "social_sciences",
    "sociology": "social_sciences",
    "high_school_psychology": "psychology",
    "us_foreign_policy": "social_sciences",
    "security_studies": "social_sciences",
    "international_law": "law",
    "jurisprudence": "law",
    
    # Business
    "business_ethics": "business",
    "management": "business",
    "marketing": "business",
    
    # General
    "miscellaneous": "general",
    "global_facts": "general",
    "public_relations": "general",
}

def download_parquet(url: str) -> pd.DataFrame:
    """Download and read a parquet file from URL"""
    try:
        df = pd.read_parquet(url)
        return df
    except Exception as e:
        print(f"Error downloading {url}: {e}", file=sys.stderr)
        return None

def convert_to_questions(df: pd.DataFrame, subject: str) -> List[Dict]:
    """Convert dataframe to question format"""
    questions = []
    
    for _, row in df.iterrows():
        # Map answer index (0-3) from class label
        answer_map = {"A": 0, "B": 1, "C": 2, "D": 3}
        correct_answer = answer_map.get(row["answer"], 0)
        
        question = {
            "id": f"{subject}_{len(questions)}",
            "subject": subject,
            "question": row["question"],
            "options": row["choices"],
            "correctAnswer": correct_answer,
            "difficulty": "Medium",  # MMLU doesn't have difficulty ratings
            "explanation": f"The correct answer is {row['choices'][correct_answer]}."
        }
        questions.append(question)
    
    return questions

def main():
    print("Downloading MMLU dataset...")
    
    # Get list of all parquet files
    api_url = "https://datasets-server.huggingface.co/parquet?dataset=cais/mmlu"
    response = requests.get(api_url)
    data = response.json()
    
    all_questions = []
    
    # Download test split for each subject
    subjects_processed = set()
    
    for file_info in data["parquet_files"]:
        config = file_info["config"]
        split = file_info["split"]
        
        # Only download test split and skip auxiliary_train and "all" config
        if split != "test" or config == "all" or config == "auxiliary_train":
            continue
        
        if config in subjects_processed:
            continue
            
        subjects_processed.add(config)
        
        print(f"Processing {config}...", file=sys.stderr)
        
        url = file_info["url"]
        df = download_parquet(url)
        
        if df is not None and len(df) > 0:
            # Convert to our question format
            questions = convert_to_questions(df, config)
            all_questions.extend(questions)
    
    # Output JSON
    output = {
        "questions": all_questions,
        "total": len(all_questions),
        "subjects": list(subjects_processed)
    }
    
    print(json.dumps(output, indent=2))
    print(f"\nDownloaded {len(all_questions)} questions from {len(subjects_processed)} subjects", file=sys.stderr)

if __name__ == "__main__":
    main()
