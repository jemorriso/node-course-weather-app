console.log("Client JS loaded");

const weatherForm = document.querySelector("form");
const search = document.querySelector('input');
const messageOne = document.querySelector("#loading");
const messageTwo = document.querySelector("#forecast");

// event listener callback provided by JS with event, by convention call it e
weatherForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const location = search.value;

    messageOne.textContent = 'Loading...';
    messageTwo.textContent = '';

    // callback function runs when fetch is done
    fetch("http://localhost:8000/weather?address=" + location).then((response) => {
        // this callback function runs when the JSON data has arrived and been parsed
        response.json().then(({ error, location, forecast }) => {
            if (error) {
                messageOne.textContent = error;
            } else {
                messageOne.textContent = location;
                messageTwo.textContent = forecast;
            }
        });
    });
}); 