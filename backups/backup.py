import requests
import json
import datetime

response = requests.get('https://desolate-island-79582.herokuapp.com/data/backup?token=jVu6smRDDdFgkzKb')
now = datetime.datetime.now().strftime("%d-%m-%Y-%H-%M-%S")
data = response.json()

with open ('backups/backup-{}.json'.format(now), 'w') as json_file:
    json.dump(data, json_file)