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


s = requests.Session()


def get_data_from_server() -> dict:
   '''
   
   '''
   global s
   
   headers = {"x-access-tokens": 'az4fvf7nzi1XPIsYiMEu'}
   req = s.get("https://dt.miet.ru/ppo_it/api/watch/", headers=headers)
   
   return json.loads(req.text)


if __name__=="__main__":
   for _ in range(10):
      print(get_data_from_server())

