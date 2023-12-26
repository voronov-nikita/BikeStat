
// адрес сервера с портом, протокол обязательно должен быть Websoket
const adressServer = "ws://192.168.0.10:8090"


export function connectServer(){
  
  const newSocket = new WebSocket(host);

  newSocket.onopen = () => {
    console.log('WebSocket connected.');
    setSocket(newSocket);
  };

  newSocket.onmessage = (event) => {
    const receivedData = JSON.parse(event.data);
    console.log('Received data from server:', receivedData);
  };
}


export function sendServer(data){
  connectServer();

  if (socket && socket.readyState === WebSocket.OPEN) {
    socket.send(JSON.stringify(data));
  }

  socket.close();
  setWs(null);
};


export function getServer(){
  ;
}