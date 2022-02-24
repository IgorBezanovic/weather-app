console.log("Client's side");

const weatherForm = document.querySelector("form");
const searchLocation = document.querySelector("input");
const errorMessage = document.getElementById("error-message");
const messageText = document.getElementById("message")
const locationText = document.getElementById("location")
const uv_index = document.getElementById("uv_index")
const weather_img = document.getElementById("weather_img")
const visibility = document.getElementById("visibility")

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();

  let location = searchLocation.value;
  errorMessage.textContent = '';
  locationText.textContent = '';
  uv_index.textContent = '';
  visibility.textContent = '';
  weather_img.style.display = 'none'

  if (!location) return errorMessage.textContent = 'You must enter location...';
  messageText.textContent = "Loading..."
  
  fetch(`/weather?address=${location}`).then(
    (response) => {
      response.json().then((data) => {
        messageText.textContent = '';
        if (data.error) return errorMessage.textContent = data.error;

        locationText.textContent = data.location
        messageText.textContent = `It is currently ${data.forecast.temperature} degrees out`
        if(data.forecast.uv_index > 0 && data.forecast.uv_index <= 2 ){
          uv_index.style.color = 'green'
        } else if(data.forecast.uv_index >= 3 && data.forecast.uv_index <= 5){
          uv_index.style.color = 'yellow'
        } else if(data.forecast.uv_index >= 6 && data.forecast.uv_index <= 7){
          uv_index.style.color = 'orange'
        } else if(data.forecast.uv_index >= 8 && data.forecast.uv_index <= 10){
          uv_index.style.color = 'red'
        } else {
          uv_index.style.color = 'violet'
        }
        uv_index.textContent = `UV index is: ${data.forecast.uv_index}`;
        visibility.textContent = `Visibility is: ${data.forecast.visibility}km`;
        weather_img.src = data.forecast.image
        weather_img.style.display = 'block'
      });
    }
  );
});
