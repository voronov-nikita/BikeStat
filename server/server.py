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
        data:dict = json.loads(fromClient)
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
        
        elif task=="GetPulse":
            pulses = get_data_from_server()['data']['pulse']
            
            minPulse = pulses['min']
            maxPulse = pulses['max']
            avgPulse = pulses['avg']
            
            # отправляем данные
            data = [minPulse, maxPulse, avgPulse]
            await websocket.send(json.dumps(data, ensure_ascii=False))
            
        # получение данных об истории
        elif task == "GetHistory":
            await  websocket.send(list(getHistory(data[1])))
        
        
        elif task == "GetUserStatic":
            history = getHistory(data[1])
            newdata = [
                [elem[4] for elem in history],
                [elem[7] for elem in history],
                [elem[8] for elem in history],
                [elem[10] for elem in history]
            ]
            await  websocket.send(json.dumps(newdata, ensure_ascii=False))
            
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
            print(data)
            one = data[4]
            two = data[5]
            # пусть координаты будут выглядеть так:
            #       X1;Y1
            #       X2;Y2
            startPoint = str(one[0]) + "; " + str(one[1])
            endPoint = str(two[0]) + "; " + str(two[1])
            
            level = 1
            length = data[6]
            time = data[7]
            addRoute(login, name, level, date, startPoint, endPoint, length, time)
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
            lengthWay = data[9]
            time = data[10]
            
            
            deleteRoute(login, name)
            addHistory(login, name, level, startPoint, endPoint, maxPulse, minPulse, averagePulse, lengthWay, time)
            
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

    # addUsers("login", "1234")
    # addHistory("login", "name", 1, "2024-12-12", "5422352; 23424", "324234; 234324", 45.4, 11.4, 12, 12345.3, 1000)
    # обработчик запросов
    servercode = websockets.serve(main, IP, PORT)
    asyncio.get_event_loop().run_until_complete(servercode)
    asyncio.get_event_loop().run_forever()

