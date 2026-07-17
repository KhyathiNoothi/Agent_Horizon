import platform
import psutil

def get_system_info():
    return f"""
System      : {platform.system()}
Release     : {platform.release()}
Machine     : {platform.machine()}
Processor   : {platform.processor()}

CPU Usage   : {psutil.cpu_percent()}%
RAM Usage   : {psutil.virtual_memory().percent}%
"""

def calculator(expression):
    try:
        result = eval(expression)
        return f"Answer: {result}"
    except Exception as e:
        return f"Error: {e}"