from quart import Quart, websocket

app = Quart(__name__)

# This list will hold all connected WebSocket clients
clients = []

# Define the WebSocket endpoint
@app.websocket('/data')
async def data():
    # Add the client to the list of clients
    clients.append(websocket._get_current_object())

    # Wait for data from the client
    while True:
        data = await websocket.receive()

        # Broadcast the data to all connected clients
        for client in clients:
            await client.send(data)

# Start the app
if __name__ == '__main__':
    app.run()
