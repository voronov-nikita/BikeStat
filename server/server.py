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

import websockets
import asyncio
import socket


IP:str = socket.gethostbyname(socket.gethostname())
# 0-65535
PORT:int = 8090

print(f"IP SERVER: {IP}\nPORT: {PORT}\n")


async def main(websocket, path):
    '''
    
    '''
    
    try:
        print(f"Connection from {websocket.remote_address}")
        
        # отправка
        await websocket.send("Hello from the server!")

        # Бесконечный цикл получения и отправки сообщений
        async for message in websocket:
            print(f"Received message: {message}")
            response = f"Received your message: {message}"
            await websocket.send(response)
            
    except websockets.exceptions.ConnectionClosed:
        print(f"Connection with {websocket.remote_address} closed.")
    


if __name__=="__main__":
    servercode = websockets.serve(main, IP, PORT)
    asyncio.get_event_loop().run_until_complete(servercode)
    asyncio.get_event_loop().run_forever()

