from src.agent import ask_llm
from memory.memory import load_memory, save_memory

from agents.ceo_agent import analyze_startup
from agents.cto_agent import analyze_technology
from agents.cfo_agent import financial_analysis
from agents.market_agent import market_analysis
from agents.competitor_agent import competitor_analysis

from models.startup import Startup
from output.report_generator import save_report

messages = load_memory()

print("===== FoundrAI =====")
print("1. Chat")
print("2. Startup Analysis")

choice = input("Choose: ")

if choice == "2":

    startup = Startup(
        name=input("Startup Name: "),
        idea=input("Startup Idea: "),
        target_users=input("Target Users: "),
        revenue_model=input("Revenue Model: "),
        budget=input("Budget: ")
    )

    print("\nCEO Agent is analyzing...\n")
    ceo = analyze_startup(startup)

    print("\nCTO Agent is analyzing...\n")
    cto = analyze_technology(startup)

    print("\nCFO Agent is analyzing...\n")
    cfo = financial_analysis(startup)

    print("\nMarket Agent is analyzing...\n")
    market = market_analysis(startup)

    print("\nCompetitor Agent is analyzing...\n")
    competitor = competitor_analysis(startup)

    final_report = f"""
=============================
        FoundrAI Report
=============================

CEO AGENT
----------
{ceo}

CTO AGENT
----------
{cto}

CFO AGENT
----------
{cfo}

MARKET AGENT
------------
{market}

COMPETITOR AGENT
----------------
{competitor}
"""

    print(final_report)

    save_report(startup, final_report)

else:

    print("Type exit to quit.\n")

    while True:

        user = input("You: ")

        if user.lower() == "exit":
            save_memory(messages)
            break

        messages.append({
            "role": "user",
            "content": user
        })

        reply = ask_llm(messages)

        print("\nFoundrAI:", reply)

        messages.append({
            "role": "assistant",
            "content": reply
        })