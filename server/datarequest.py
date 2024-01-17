# 
# A file containing the code for requests to an external API server.
# 
# Using the requests library, 
# requests are sent to the server via a link. 
# It turns out the answer, we can process it in 
# json format using the built-in python json library
#

import requests
import json


def get_data_from_server():
   s = requests.Session()
   headers = {"x-access-tokens": 'az4fvf7nzi1XPIsYiMEu'}
   req = s.get("https://dt.miet.ru/ppo_it/api/watch/", headers=headers)
   return req.text


print(json.loads(get_data_from_server()))