from src.agent import ask_llm

def analyze_technology(startup):

    prompt = f"""
You are the CTO Agent.

Startup:

{startup.idea}

Recommend:

1. Tech Stack

2. Programming Languages

3. Database

4. Backend

5. Frontend

6. Cloud Platform

7. AI Model

8. Estimated Development Time
"""

    return ask_llm([
        {
            "role": "user",
            "content": prompt
        }
    ])