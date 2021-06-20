const url = new URL('/api/ws', window.location.href);
url.protocol = url.protocol.replace('http', 'ws');
const socket = new WebSocket(url.href);

const connect = (): void => {
  console.log('Attempting Connection...');

  socket.onopen = () => {
    console.log('Successfully Connected');
  };

  socket.onmessage = (msg) => {
    console.log(msg);
  };

  socket.onclose = (event) => {
    console.log('Socket Closed Connection: ', event);
  };

  socket.onerror = (error) => {
    console.log('Socket Error: ', error);
  };
};

const sendMsg = (msg: string): void => {
  console.log('sending msg: ', msg);
  socket.send(msg);
};

export { connect, sendMsg };
