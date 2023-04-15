const socket = io()

const $messageForm = document.querySelector('#message-form')
const $messageSendButton = document.querySelector('#target')
const $messageInput = document.querySelector('#input')
const $sendLocationButton = document.querySelector('#send-location')
const $messagesDiv = document.querySelector("#messages")

//Templates
const messageTemplate = document.querySelector('#message-template').innerHTML
const locationTemplate = document.querySelector('#location-message-template').innerHTML

//Options
const {username,room } = Qs.parse(location.search , {ignoreQueryPrefix:true})

socket.on('welcome', (msg) => {
  console.log(msg);
  const html = Mustache.render(messageTemplate,{
    msg : msg.text,
    createdAt : moment(msg.createdAt).format('h:mm a')
  })

  $messagesDiv.insertAdjacentHTML('beforeend',html)
})

socket.on('locationMessages', (message) => {
   console.log(message);
   const html = Mustache.render(locationTemplate,{
    url : message.url,
    createdAt : moment(message.createdAt).format('h:mm a')
   })

   $messagesDiv.insertAdjacentHTML('beforeend',html)
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

socket.emit('join',{username,room})