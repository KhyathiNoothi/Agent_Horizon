from src.agent import ask_llm

def competitor_analysis(startup):

    prompt = f"""
You are the Competitor Analysis Agent.

Startup:

{startup.idea}

Identify:

• Top Competitors

• Strengths

• Weaknesses

• Competitive Advantages

• Differentiation Strategy
"""

    return ask_llm([
        {
            "role": "user",
            "content": prompt
        }
    ])