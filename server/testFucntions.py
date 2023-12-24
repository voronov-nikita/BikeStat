import asyncio
import websockets

async def handle_client(websocket, path):
    try:
        print(f"Connection from {websocket.remote_address}")
        # Простой пример: отправляем клиенту приветствие
        await websocket.send("Hello from the server!")

        # Бесконечный цикл получения и отправки сообщений
        async for message in websocket:
            print(f"Received message: {message}")
            # Пример обработки сообщения и отправки ответа
            response = f"Received your message: {message}"
            await websocket.send(response)
    except websockets.exceptions.ConnectionClosed:
        print(f"Connection with {websocket.remote_address} closed.")

# Запуск WebSocket-сервера
start_server = websockets.serve(handle_client, "192.168.0.10", 8888)

# Запуск основного цикла событий
asyncio.get_event_loop().run_until_complete(start_server)
asyncio.get_event_loop().run_forever()
