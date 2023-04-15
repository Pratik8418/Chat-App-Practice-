const socket = io()

socket.on('welcome', (msg) => {
  console.log(" ", msg);
})

document.querySelector('#target').addEventListener('click', () => {
   var input = document.getElementById('input').value;
   socket.emit('inputMsg', input , (msg) => {
    console.log("Msg send ", msg);
   })
})

document.querySelector("#send-location").addEventListener('click', () => {

  if(!navigator.geolocation){
    return alert("GeoLocation is not supported by your browser")
  }

  navigator.geolocation.getCurrentPosition( (position) => {
    var data = {
      "latitude" : position.coords.latitude,
      "longitude" : position.coords.longitude
    }
    //console.log(data.latitude + " " + data.longitude)
    socket.emit("location",data);
  
  })
})

