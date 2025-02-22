import os
import requests
import base64
from git import Repo

GITHUB_TOKEN = 'your_github_token_here'
REPO_OWNER = 'your_github_username'
REPO_NAME = 'your_repo_name'
FILE_PATH = 'path/to/file.txt'
COMMIT_MESSAGE = 'AI self-modification commit'

def modify_file(content):
    # Modify the file content
    with open(FILE_PATH, 'w') as file:
        file.write(content)

def commit_and_push_changes():
    # Initialize the repository
    repo = Repo('.')
    repo.git.add(FILE_PATH)
    repo.index.commit(COMMIT_MESSAGE)
    origin = repo.remote(name='origin')
    origin.push()

def update_github_file(content):
    url = f'https://api.github.com/repos/{REPO_OWNER}/{REPO_NAME}/contents/{FILE_PATH}'
    headers = {
        'Authorization': f'token {GITHUB_TOKEN}',
        'Accept': 'application/vnd.github.v3+json'
    }
    response = requests.get(url, headers=headers)
    if response.status_code == 200:
        sha = response.json()['sha']
        encoded_content = base64.b64encode(content.encode('utf-8')).decode('utf-8')
        data = {
            'message': COMMIT_MESSAGE,
            'content': encoded_content,
            'sha': sha,
            'branch': 'main'
        }
        response = requests.put(url, json=data, headers=headers)
        if response.status_code == 200 or response.status_code == 201:
            print('File updated successfully on GitHub.')
        else:
            print(f'Error updating file on GitHub: {response.status_code}')
            print(response.json())
    else:
        print(f'Error fetching file from GitHub: {response.status_code}')
        print(response.json())

if __name__ == '__main__':
    new_content = 'New content added by AI.'
    modify_file(new_content)
    commit_and_push_changes()
    update_github_file(new_content)