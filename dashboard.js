// Password Check
function checkPassword() {
  document.getElementById("error-msg").textContent =
    "This public prototype is disabled. Real access requires server-side authentication.";
}

// Weather Widget
function loadWeather() {
  const apiKey = ""; // Replace with your API key
  const city = "New York";
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`)
    .then(res => res.json())
    .then(data => {
      const weather = `${data.weather[0].main}, ${data.main.temp}°F`;
      document.getElementById("weather-info").textContent = weather;
    })
    .catch(() => {
      document.getElementById("weather-info").textContent = "Failed to load weather.";
    });
}

// Notes Storage
function saveNotes() {
  const notes = document.getElementById("note-area").value;
  localStorage.setItem("dashboard-notes", notes);
}

function loadNotes() {
  const saved = localStorage.getItem("dashboard-notes");
  if (saved) document.getElementById("note-area").value = saved;
}

// Spotify Placeholder (add auth later)
function loadSpotify() {
  const spotifyInfo = document.getElementById("spotify-info");
  if (!spotifyInfo) return;
  const link = document.createElement("a");
  link.href = "https://developer.spotify.com/documentation/web-api/";
  link.target = "_blank";
  link.rel = "noopener noreferrer";
  link.style.color = "lightgreen";
  link.textContent = "Spotify Web API";
  spotifyInfo.replaceChildren("To integrate Spotify, authenticate with the ", link, ".");
}

// Run on Load
window.onload = () => {
  loadWeather();
  loadNotes();
  loadSpotify();
};
