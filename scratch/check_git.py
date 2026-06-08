import subprocess

print("--- GIT LOG ---")
subprocess.run(["git", "log", "-n", "5", "--oneline"])

print("--- GIT STATUS ---")
subprocess.run(["git", "status"])
