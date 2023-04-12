const socket = io()

socket.on('countUpdated', (count) => {
  console.log("count updated ",count);
})

document.querySelector('#target').addEventListener('click', () => {
   socket.emit('increment')
})

