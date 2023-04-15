const socket = io()

const $messageForm = document.querySelector('#message-form')
const $messageSendButton = document.querySelector('#target')
const $messageInput = document.querySelector('#input')
const $sendLocationButton = document.querySelector('#send-location')

socket.on('welcome', (msg) => {
  console.log(" ", msg);
})

$messageForm.addEventListener('submit', (e) => {
  e.preventDefault()

  $messageSendButton.setAttribute('disabled','disabled');
    
   const input = document.querySelector('#input').value;
   socket.emit('inputMsg', input , (error) => {

    $messageSendButton.removeAttribute('disabled')
    $messageInput.value = ''
    $messageInput.focus()

    if(error){
      return console.log(error);
    }
    console.log("message delivered!");
    
   })
})

document.querySelector("#send-location").addEventListener('click', () => {

  $sendLocationButton.setAttribute('disabled','disabled')

  if(!navigator.geolocation){
    return alert("GeoLocation is not supported by your browser")
  }

  navigator.geolocation.getCurrentPosition( (position) => {
    var data = {
      "latitude" : position.coords.latitude,
      "longitude" : position.coords.longitude
    }
    //console.log(data.latitude + " " + data.longitude)
    socket.emit("location",data, () => {
      console.log("Location send successfully")
      $sendLocationButton.removeAttribute('disabled')
    });
  
  })
})

