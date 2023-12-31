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
        
        
        # получение данных об истории
        elif task == "GetHistory":
            await  websocket.send(list(getHistory(data[1])))
        
        # получить данные о всех планах
        elif task == "GetPlans":
            result = getRoutes(data[1])
            await websocket.send(json.dumps(result, ensure_ascii=False))
            
        
        elif task == "DeleteAccount":
            if getUserPassword(data[1]) == data[2]:
                deleteUser(data[1])
                await websocket.send("Success")
            else:
                await websocket.send("Failed")
        
        elif task == "AddPlan":
            login = data[1]
            name = data[2]
            
            # дата в формет {ГОД-МЕСЯЦ-ДЕНЬ}
            date = data[3]
            
            one = data[4]['coordinate']
            two = data[5]['coordinate']
            # пусть координаты будут выглядеть так:
            #       X1;Y1
            #       X2;Y2
            startPoint = str(one['latitude']) + "; " + str(one['longitude'])
            endPoint = str(two['latitude']) + "; " + str(two['longitude'])
            
            level = 1
            addRoute(login, name, level, date, startPoint, endPoint)
            
            await websocket.send("Success")
                        
        elif task == "CompletePlan":
            login = data[1]
            name = data[2]
            level = data[3]
            startPoint = data[4]
            endPoint = data[5]
            maxPulse = data[6]
            minPulse = data[7]
            averagePulse = data[8]
            
            
            deleteRoute(login, name)
            addHistory(login, name, level, startPoint, endPoint, maxPulse, minPulse, averagePulse)
            
            await websocket.send("Success")
            
        else:
            print(f"Неизвестный тип запроса: {task}")
            await websocket.send("Failed")
        
    except:
        print("Disconnect")
    
    


if __name__=="__main__":
    createDataBaseUsers()
    createDataBaseRoute()
    createDataBaseHistory()

    addUsers("login", "1234")
    # обработчик запросов
    servercode = websockets.serve(main, IP, PORT)
    asyncio.get_event_loop().run_until_complete(servercode)
    asyncio.get_event_loop().run_forever()

