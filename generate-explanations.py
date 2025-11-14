#!/usr/bin/env python3
"""
Simple single-threaded explanation generator for MMLU questions.

This script:
1. Loads questions from questions.ts
2. Loads existing explanations from ai-explanations.json
3. Shows the next question that needs an explanation
4. Allows you to add an explanation interactively or programmatically
"""

import json
import re
import sys
from datetime import datetime
from typing import List, Dict, Any

QUESTIONS_FILE = './server/data/questions.ts'
EXPLANATIONS_FILE = './server/data/ai-explanations.json'


def load_questions() -> List[Dict[str, Any]]:
    """Parse questions from TypeScript file."""
    print("Loading questions from questions.ts...")

    with open(QUESTIONS_FILE, 'r', encoding='utf-8') as f:
        content = f.read()

    # Find the questions array
    match = re.search(r'export const questions: Question\[\] = \[([\s\S]*)\];', content)
    if not match:
        print("ERROR: Could not find questions array in questions.ts")
        sys.exit(1)

    questions_text = match.group(1)

    # Parse individual questions
    question_pattern = r'\{[\s\S]*?id:\s*"([^"]+)"[\s\S]*?subject:\s*"([^"]+)"[\s\S]*?difficulty:\s*"([^"]+)"[\s\S]*?question:\s*"((?:[^"\\]|\\.)*)[\s\S]*?options:\s*\[([\s\S]*?)\][\s\S]*?correctAnswer:\s*(\d+)[\s\S]*?explanation:\s*"((?:[^"\\]|\\.)*)"\s*\}'

    questions = []
    for match in re.finditer(question_pattern, questions_text):
        q_id, subject, difficulty, question, options_text, correct_answer, explanation = match.groups()

        # Parse options
        options = [m.group(1) for m in re.finditer(r'"((?:[^"\\]|\\.)*)"', options_text)]

        questions.append({
            'id': q_id,
            'subject': subject,
            'difficulty': difficulty,
            'question': question.replace('\\"', '"'),
            'options': options,
            'correctAnswer': int(correct_answer),
            'explanation': explanation.replace('\\"', '"')
        })

    print(f"Loaded {len(questions)} questions")
    return questions


def load_explanations() -> List[Dict[str, Any]]:
    """Load existing AI explanations."""
    try:
        with open(EXPLANATIONS_FILE, 'r', encoding='utf-8') as f:
            explanations = json.load(f)
        print(f"Loaded {len(explanations)} existing explanations")
        return explanations
    except FileNotFoundError:
        print("No existing explanations found, starting fresh")
        return []


def save_explanations(explanations: List[Dict[str, Any]]) -> None:
    """Save explanations to file."""
    with open(EXPLANATIONS_FILE, 'w', encoding='utf-8') as f:
        json.dump(explanations, f, indent=2, ensure_ascii=False)
    print(f"Saved {len(explanations)} explanations to {EXPLANATIONS_FILE}")


def get_next_questions(questions: List[Dict], explanations: List[Dict], count: int = 1) -> List[Dict]:
    """Get next questions that need explanations."""
    explained_ids = {exp['questionId'] for exp in explanations}

    remaining = [q for q in questions if q['id'] not in explained_ids]
    return remaining[:count]


def display_question(question: Dict[str, Any], index: int = None) -> None:
    """Display a question in a readable format."""
    if index is not None:
        print(f"\n{'='*80}")
        print(f"QUESTION {index}")
        print(f"{'='*80}")
    else:
        print(f"\n{'='*80}")
        print("QUESTION")
        print(f"{'='*80}")

    print(f"ID: {question['id']}")
    print(f"Subject: {question['subject']}")
    print(f"Difficulty: {question['difficulty']}")
    print(f"\nQuestion: {question['question']}")
    print(f"\nOptions:")
    for i, option in enumerate(question['options']):
        marker = " <-- MARKED CORRECT" if i == question['correctAnswer'] else ""
        print(f"  {i}. {option}{marker}")
    print(f"\nCurrent explanation: {question['explanation']}")
    print(f"{'='*80}\n")


def add_explanation(
    question_id: str,
    explanation: str,
    reasoning: str,
    steps: List[str],
    correct_answer_override: int = None
) -> Dict[str, Any]:
    """Create a new explanation object."""

    explanation_obj = {
        'questionId': question_id,
        'explanation': explanation.strip(),
        'reasoning': reasoning.strip(),
        'steps': steps,
        'generatedAt': datetime.utcnow().isoformat() + 'Z'
    }

    # Add correct answer override if the marked answer is wrong
    if correct_answer_override is not None:
        explanation_obj['correctAnswerOverride'] = correct_answer_override

    return explanation_obj


def show_progress(questions: List[Dict], explanations: List[Dict]) -> None:
    """Display current progress."""
    total = len(questions)
    completed = len(explanations)
    remaining = total - completed
    percent = (completed / total * 100) if total > 0 else 0

    print(f"\n{'='*80}")
    print(f"PROGRESS: {completed}/{total} ({percent:.2f}%)")
    print(f"Remaining: {remaining}")
    print(f"{'='*80}\n")


if __name__ == '__main__':
    questions = load_questions()
    explanations = load_explanations()

    show_progress(questions, explanations)

    # Show next questions
    next_questions = get_next_questions(questions, explanations, count=5)

    if not next_questions:
        print("🎉 All questions have explanations!")
        sys.exit(0)

    print(f"\nNext {len(next_questions)} questions needing explanations:\n")
    for i, q in enumerate(next_questions, 1):
        display_question(q, i)

    print("\n" + "="*80)
    print("To add explanations, use the add_explanation() function in your code")
    print("Example:")
    print("""
from generate_explanations import add_explanation, save_explanations, load_explanations

explanations = load_explanations()

new_exp = add_explanation(
    question_id='high_school_geography_99',
    explanation='Your detailed explanation here...',
    reasoning='Your concise reasoning...',
    steps=['Step 1', 'Step 2', 'Answer: X'],
    correct_answer_override=2  # Only if the marked answer is wrong
)

explanations.append(new_exp)
save_explanations(explanations)
""")
    print("="*80)
