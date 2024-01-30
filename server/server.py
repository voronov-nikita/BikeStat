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


import sys
sys.path.append('../AI')

from datarequest import *
from database import *

import websockets
import asyncio
import socket
import random
import json

# import AI.study as network

# получаем имя компьютера в сети и находим по ARP таблице его IP адресс
IP:str = socket.gethostbyname(socket.gethostname())
# 0-65535, но не {22, 23, 80, 443, 1, 5000, 8000}
PORT:int = 8090

SENDREQUEST:bool = False

print(f"IP SERVER: {IP}\nPORT: {PORT}\n")

# Словарь, содержащий в себе рекомендации для разных уровней подготовки.
RECOMMENDATION:dict = {
    "1":[
        "Начинайте с небольших поездок, чтобы ваш организм мог постепенно привыкнуть к физической нагрузке. Не старайтесь сразу преодолевать большие дистанции.",
        "Начинайте с умеренного темпа. С течением времени вы сможете увеличивать скорость.",
        "Чаще обращайте внимание на статичтику, по ней вы смоежте отследить собственный прогресс",
        "Научитесь эффективно использовать педали, равномерно распределяя усилие на обе ноги. Это поможет снизить нагрузку на мышцы и суставы.",
        "Важно пить достаточное количество воды во время поездок, чтобы избежать обезвоживания.",
        "Внимательно отслеживайте свои ощущения. Если у вас болит что-то или вы устали, предоставьте себе достаточно времени на отдых и восстановление.",
        "Поддерживайте ритм дыхания. Оптимальная дыхательная техника поможет улучшить выносливость и уменьшить усталость во время поездки.",
        "Перед тяжелыми тренировками уделяйте внимание разминке и растяжке. Это поможет предотвратить травмы и улучшить гибкость мышц.",
        "Выбирайте разнообразные маршруты. Это не только делает тренировки интереснее, но также разнообразит нагрузку на различные группы мышц.",
        "Включайте кратковременные интервалы более высокой интенсивности в ваши поездки. Это поможет улучшить физическую форму и эффективность тренировок."

    ],
    "2":[
        "Экспериментируйте с различными видами тренировок, такими как велосипедные тренировки высокой интенсивности (HIIT) или длинные дистанционные поездки, чтобы разнообразить свою тренировочную программу.",
        "Настройте свои тренировки в соответствии с целями: развивайте выносливость для длинных поездок или работайте над скоростью и мощностью для коротких и интенсивных тренировок.",
        "Развивайте навыки пилотирования велосипеда, такие как навыки спусков и управление в сложных условиях, чтобы повысить уверенность и безопасность на дороге.",
        "Понемногу увеличивайте темпы тренировок.",
        "Планируйте долгосрочные тренировочные циклы с периодами активного тренировочного нагрузки и периодами восстановления, чтобы избежать перетренировки и повысить производительность.",
        "Модете поучавтствовать в мероприятиях, таких как веломарафоны или групповые поездки, чтобы наслаждаться обществом других велосипедистов и находить новые вызовы.",
        "Не забывайте про отдых!",
        "Поддерживайте свое физическое здоровье, регулярно занимаясь растяжкой и укрепляя мышцы, чтобы предотвращать повреждения и улучшать общую производительность.",
        "Планируйте ваши тренировки в зависимости от времени суток и условий погоды, чтобы адаптироваться к переменам и сохранять регулярность тренировок.",
        "Регулярно обновляйте свой велосипедный экипаж и оборудование, чтобы поддерживать и улучшать ваш опыт велосипедиста.",
        
    ],
    "3":[
        "Отправляйтесь в большие и долгие поездки. Это положителньо скажется на вашем здоровье.",
        'Применяйте методику "интервальной тренировки", разделяя тренировку на интенсивные и восстановительные периоды, для улучшения аэробной и анаэробной выносливости.',
        'Используйте технику "тренировочного блочного периода", чтобы фокусироваться на конкретных аспектах подготовки, например, силовых тренировках или улучшении техники велосипедного движения.',
        "Чаще проводите анализ данных с прошлых соревнований, выделяя сильные и слабые стороны своей подготовки, и разрабатывайте индивидуализированные программы тренировок.",
        "Чаще учавствуте в вело-соревнованиях.",
        "Соревнуйтесь с другими велосипедистами в скорости и выносливости.",
        "Практикуйте тренировки на выносливость в условиях имитации реальных гонок, чтобы адаптировать свои стратегии согласно требованиям соревновательной динамики.",
        "Работайте над техникой спусков и кривых с высокой скоростью, чтобы увеличить свою уверенность в технически сложных условиях.",
        "Участвуйте в международных соревнованиях и гонках, чтобы испытать свои силы с ведущими велосипедистами со всего мира и поддерживать высокий уровень мотивации.",
        "Внедряйте в тренировочный процесс технологии анализа биометрии, такие как мониторинг мощности и измерение частоты вращения педалей, для более детального контроля за тренировками и оптимизации производительности. Используйте из по максимуму."
    ]
}


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
            history = getHistory(data[1])
            await  websocket.send(json.dumps(history))
        
        
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
        
        # запланировать поездку и добавить ее в базу данных поездок
        elif task == "AddPlan":
            login = data[1]
            name = data[2]
            
            # дата в формет {ГОД-МЕСЯЦ-ДЕНЬ}
            date = data[3]
            one = data[4]
            two = data[5]
            # пусть координаты будут выглядеть так:
            #       X1;Y1
            #       X2;Y2
            startPoint = str(one[0]) + "; " + str(one[1])
            endPoint = str(two[0]) + "; " + str(two[1])
            
            
            length = data[6]
            time = data[7]
            
            level = network.generateLevel([])
            
            addRoute(login, name, level, date, startPoint, endPoint, length, time)
            await websocket.send("Success")
        
        # обработать запрос на завершение запланированной поездки
        # сразу разделим данные и сохраним в БД
        elif task == "CompletePlan":
            login = data[1]
            name = data[2]
            level = data[3]
            date = data[4]
            startPoint = data[5]
            endPoint = data[6]
            maxPulse = data[7]
            minPulse = data[8]
            averagePulse = data[9]
            lengthWay = data[10]
            time = data[11]
            
            deleteRoute(login, name)
            addHistory(login, name, level, date, startPoint, endPoint, maxPulse, minPulse, averagePulse, lengthWay, time)
            
            await websocket.send("Success")
        
        # отправка ответа на запрос на получение рекомендаций пользователю
        elif task == "GetRecomm":
            info = data[1]
            
            await websocket.send(random.choices(RECOMMENDATION[str(info)]))
            
            
        else:
            print(f"Неизвестный тип запроса: {task}")
            await websocket.send("Failed")
        
    except:
        print("Disconnect")
    
    


if __name__=="__main__":
    # создаем все таблицы
    createDataBaseUsers()
    createDataBaseRoute()
    createDataBaseHistory()

    # addUsers("login", "1234")
    # addHistory("login", "test", 1, "2024-12-12", "5422352; 23424", "324234; 234324", 45.4, 11.4, 12, 12345.3, 1000)
    # обработчик запросов
    servercode = websockets.serve(main, IP, PORT)
    asyncio.get_event_loop().run_until_complete(servercode)
    asyncio.get_event_loop().run_forever()

