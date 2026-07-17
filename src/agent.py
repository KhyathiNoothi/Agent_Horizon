from ollama import chat
from tools.system_tools import get_system_info, calculator

# Read the system prompt from the file
with open("prompts/system_prompt.txt", "r", encoding="utf-8") as f:
    SYSTEM_PROMPT = f.read()


def ask_llm(messages):

    user_message = messages[-1]["content"]
    lower = user_message.lower()

    # System Info Tool
    if "system info" in lower:
        return get_system_info()

    # Calculator Tool
    if lower.startswith("calc "):
        expression = user_message[5:]
        return calculator(expression)

    # Add the system prompt before the user's messages
    response = chat(
        model="qwen2.5:3b",
        messages=[
            {
                "role": "system",
                "content": SYSTEM_PROMPT
            }
        ] + messages
    )

    return response["message"]["content"]