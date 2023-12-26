# 
# The main file with the server code.
# The server for the WEB application is configured to work on web sockets.
# The server concept is based on a TPC connection
# The storage location of the user database, 
# with their history and other confidential information
# 
# To start the server, you need to register 
# >> pip install -r requirements.txt
# 
# Then run 
# >> python server.py
# 

from datarequest import *
from database import *

import websockets
import asyncio
import socket
import json


IP:str = socket.gethostbyname(socket.gethostname())
# 0-65535
PORT:int = 8090

print(f"IP SERVER: {IP}\nPORT: {PORT}\n")


async def main(websocket, path) -> None:
    '''
    A function describing how the server request handler works.
    '''
    
    try:
        # получаем полный запрос от клиента
        fromClient = await websocket.recv()
        # обработанный ответ
        data = json.loads(fromClient)
        print(data)
        
        task = data[0]
        
        # если пришел запрос на авторизацию
        if task=="SignIn":
            print(data[1], data[2])
        else:
            print("Неизвестный тип запроса")
        
    except websockets.exceptions.ConnectionClosedOK:
        print("Disconnect")
        return 
    
    


if __name__=="__main__":
    # обработчик запросов
    servercode = websockets.serve(main, IP, PORT)
    asyncio.get_event_loop().run_until_complete(servercode)
    asyncio.get_event_loop().run_forever()

