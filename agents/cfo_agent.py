from src.agent import ask_llm

def financial_analysis(startup):

    prompt = f"""
You are the CFO Agent.

Startup:

{startup.idea}

Estimate:

• Development Cost

• Marketing Cost

• Operational Cost

• Monthly Expenses

• Revenue Forecast

• Break-even Analysis

• Profitability
"""

    return ask_llm([
        {
            "role": "user",
            "content": prompt
        }
    ])