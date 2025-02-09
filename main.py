print("Hello, AI Beacon!")
import requests

response = requests.get("https://api.github.com")
print("Status Code:", response.status_code)
print("Response Headers:", response.headers)
print("Response Body:", response.json())
