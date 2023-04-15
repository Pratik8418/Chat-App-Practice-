const socket = io()

socket.on('welcome', (msg) => {
  console.log(" ", msg);
})

document.querySelector('#target').addEventListener('click', () => {
   var input = document.getElementById('input').value;
   socket.emit('inputMsg', input , (error) => {
    if(error){
      return console.log(error);
    }
    console.log("message delivered!");
    
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
    socket.emit("location",data, () => {
      console.log("Location send successfully")
    });
  
  })
})

