import os
import sys
from ftplib import FTP

server = os.environ.get("FTP_SERVER", "").strip()
username = os.environ.get("FTP_USERNAME", "").strip()
password = os.environ.get("FTP_PASSWORD", "").strip()

# 1. Clean server host (remove ftp:// or ftps:// prefixes if present)
if server.startswith("ftp://"):
    server = server[6:]
elif server.startswith("ftps://"):
    server = server[7:]
if "/" in server:
    server = server.split("/")[0]

print(f"Connecting to FTP server: '{server}'...")
ftp = FTP()
try:
    ftp.connect(server, 21, timeout=30)
    print("Connected successfully to host!")
except Exception as e:
    print(f"🔴 Connection failed: {e}")
    sys.exit(1)

# 2. Try variations of the username to be resilient
usernames_to_try = [username]
if "." in username:
    usernames_to_try.append(username.split(".")[0])

logged_in = False
for u in usernames_to_try:
    print(f"Attempting login with username: '{u}'...")
    try:
        ftp.login(u, password)
        print(f"✅ Successfully logged in as '{u}'!")
        logged_in = True
        break
    except Exception as e:
        print(f"❌ Login failed for '{u}': {e}")

if not logged_in:
    print("🔴 Could not log in with any username variation. Please double-check your FTP_PASSWORD.")
    sys.exit(1)

# 3. Enter active mode or passive mode (passive is standard for CI/CD runners)
ftp.set_pasv(True)
print("Passive mode enabled.")

# 4. Change directory to /public_html/ if possible (often root is already public_html)
try:
    ftp.cwd("/public_html")
    print("Changed directory to /public_html")
except Exception as e:
    print(f"Note: Could not change directory to /public_html: {e}")
    try:
        ftp.cwd("public_html")
        print("Changed directory to public_html")
    except Exception as e2:
        print(f"Note: Could not change directory to public_html: {e2}. Attempting to deploy directly to the current directory.")


# 5. Recursive upload function
def upload_dir(local_dir):
    for item in os.listdir(local_dir):
        local_path = os.path.join(local_dir, item)
        if os.path.isfile(local_path):
            print(f"Uploading file: {item} ...")
            try:
                with open(local_path, "rb") as f:
                    ftp.storbinary(f"STOR {item}", f)
            except Exception as e:
                print(f"⚠️ Failed to upload {item}: {e}")
        elif os.path.isdir(local_path):
            print(f"Creating directory: {item} ...")
            try:
                ftp.mkd(item)
            except Exception:
                # Directory already exists, which is fine
                pass
            try:
                ftp.cwd(item)
                upload_dir(local_path)
                ftp.cwd("..")
            except Exception as e:
                print(f"⚠️ Failed to navigate directory {item}: {e}")

# 6. Start upload from the 'dist' directory
if not os.path.exists("dist"):
    print("🔴 Error: 'dist' directory not found. Please build the application first.")
    sys.exit(1)

print("Starting upload of build assets...")
upload_dir("dist")
print("🎉 Deployment completed successfully!")

try:
    ftp.quit()
except Exception:
    ftp.close()
