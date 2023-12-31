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

SENDREQUEST:bool = False

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
        # оформление запроса
        task = data[0]
        # если пришел запрос на авторизацию пользователя
        if task == "SignIn":
            # если пользователь есть и пароль подходит
            if data[1] in getUsers() and data[2]==getUserPassword(data[1]):
                await websocket.send("Success")
                
            else:
                await websocket.send("Failed")
        
        # обработка запроса на регистрацию пользователя
        elif task == "SignUp":
            if addUsers(data[1], data[2]) == "Success":
                await websocket.send("Success")
            else:
                await websocket.send("Failed")
                
        elif task == "GetHistory":
            await list(getHistory(data[1]))
            
        elif task == "GetPlans":
            await list(getRoutes(data[1]))
            
        elif task == "DeleteAccount":
            if getUserPassword(data[1]) == data[2]:
                deleteUser(data[1])
                await "Success"
            else:
                await "Failed"
        
        elif task == "CreatePlan":
            addRoute(data[1], data[2], data[3], data[4], data[5])
            await "Success"
            
        else:
            print(f"Неизвестный тип запроса: {task}")
            await "Failed"
        
    except:
        print("Disconnect")
    
    


if __name__=="__main__":
    createDataBaseUsers()
    createDataBaseRoute()
    createDataBaseHistory()

    # обработчик запросов
    servercode = websockets.serve(main, IP, PORT)
    asyncio.get_event_loop().run_until_complete(servercode)
    asyncio.get_event_loop().run_forever()

