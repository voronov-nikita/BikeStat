
// сюда будут отправляться запросы от приложения
// условно это адрес сервера
const URL = "ws://192.168.11.69:8090"

// отправляем данные на сервер
const sendDataToServer = (data) => {
  const socket = new WebSocket(URL);

  socket.onopen = () => {
    socket.send(JSON.stringify(data));
  };

  socket.onmessage = (dataFrom) => {
    console.log(dataFrom);
  };

  return socket;
};


// получаем данные от сервера
const getDataFromServer = (type) => {
  return new Promise((resolve) => {
    const socket = new WebSocket(URL);

    // открываем мост для соединения с сервером
    socket.onopen = () => {
      socket.send(JSON.stringify(type));
    };

    // слушаем полученные сообщения
    socket.onmessage = (fromServer) => {
      const parsedData = fromServer.data;
      resolve(parsedData);
      socket.close();
    };
  });
};


const Sockets = {
  sendServer: (data) => {
    sendDataToServer(data);
  },

  getServer: (type) => {
    return getDataFromServer(type);
  }
}

export default Sockets;
