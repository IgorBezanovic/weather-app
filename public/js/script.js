console.log("Client's side");

const weatherForm = document.querySelector("form");
const searchLocation = document.querySelector("input");
const errorMessage = document.getElementById("error-message");
const messageText = document.getElementById("message")

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();

  let location = searchLocation.value;
  errorMessage.textContent = '';
  
  if (!location) return errorMessage.textContent = 'You must enter location...';
  messageText.textContent = "Loading..."
  
  fetch(`/weather?address=${location}`).then(
    (response) => {
      response.json().then((data) => {
        messageText.textContent = '';
        if (data.error) return errorMessage.textContent = data.error;

        messageText.textContent = data.forecast
        console.log(data);
      });
    }
  );
});
