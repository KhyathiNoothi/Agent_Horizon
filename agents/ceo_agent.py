from src.agent import ask_llm

def analyze_startup(startup):

    prompt = f"""
You are the CEO Agent of FoundrAI.

Analyze the following startup.

Startup Name:
{startup.name}

Idea:
{startup.idea}

Target Users:
{startup.target_users}

Revenue Model:
{startup.revenue_model}

Budget:
{startup.budget}

Provide:

1. Startup Score (0-100)
2. SWOT Analysis
3. Risks
4. Suggestions
5. Final Verdict
"""

    messages = [
        {
            "role": "user",
            "content": prompt
        }
    ]

    return ask_llm(messages)