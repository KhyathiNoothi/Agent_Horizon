import json
import os

def save_report(startup, report):

    os.makedirs("output", exist_ok=True)

    data = {
        "Startup Name": startup.name,
        "Idea": startup.idea,
        "Target Users": startup.target_users,
        "Revenue Model": startup.revenue_model,
        "Budget": startup.budget,
        "Report": report
    }

    with open("output/report.json", "w", encoding="utf-8") as f:
        json.dump(data, f, indent=4)

    with open("output/report.txt", "w", encoding="utf-8") as f:
        f.write(report)

    print("\nReports saved successfully.")