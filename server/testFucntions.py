import asyncio
import websockets
import json

async def handle_websocket(websocket, path):
    # Принимаем данные от клиента
    data = await websocket.recv()
    received_data = json.loads(data)
    print(f"Received data from client: {received_data}")

    # Делаем что-то с полученными данными, например, отправляем обратно
    response_data = {"message": "Data received successfully"}
    await websocket.send(json.dumps(response_data))

start_server = websockets.serve(handle_websocket, "localhost", 8765)

asyncio.get_event_loop().run_until_complete(start_server)
asyncio.get_event_loop().run_forever()
