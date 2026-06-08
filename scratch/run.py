import subprocess
import time

print("Waiting 5 seconds to run in the background...")
time.sleep(5)

print("Running git commit...")
res_commit = subprocess.run("git commit -am 'design: Reduce logo size in header'", shell=True, capture_output=True, text=True)
print("Commit stdout:", res_commit.stdout)
print("Commit stderr:", res_commit.stderr)

print("Running git push...")
res_push = subprocess.run("git push", shell=True, capture_output=True, text=True)
print("Push stdout:", res_push.stdout)
print("Push stderr:", res_push.stderr)

print("Background script finished!")
