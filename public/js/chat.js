const socket = io()

socket.on('welcome', (msg) => {
  console.log(" ", msg);
})

document.querySelector('#target').addEventListener('click', () => {
   var input = document.getElementById('input').value;
   socket.emit('inputMsg', input)
})

