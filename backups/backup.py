import requests
import json
import datetime

with open('token.txt', 'r') as token_file:
    token = token_file.read()

response = requests.get('https://desolate-island-79582.herokuapp.com/data/backup?token={}'.format(token))
now = datetime.datetime.now().strftime("%d-%m-%Y-%H-%M-%S")
data = response.json()
with open ('backups/backup-{}.json'.format(now), 'w') as json_file:
    json.dump(data, json_file)

response = requests.get('https://desolate-island-79582.herokuapp.com/data/logs?token={}'.format(token))
now = datetime.datetime.now().strftime("%d-%m-%Y-%H-%M-%S")
data = response.json()
with open ('logs/log-{}.json'.format(now), 'w') as json_file:
    json.dump(data, json_file)