from src.agent import ask_llm

def market_analysis(startup):

    prompt = f"""
You are the Market Research Agent.

Startup:

{startup.idea}

Provide:

• Target Audience

• Market Size

• Market Trends

• Demand

• Opportunities

• Challenges
"""

    return ask_llm([
        {
            "role": "user",
            "content": prompt
        }
    ])