// Password Check
function checkPassword() {
  const input = document.getElementById("password").value;
  if (input === "2004@aq") {
    document.getElementById("login-screen").style.display = "none";
    document.getElementById("dashboard").style.display = "block";
  } else {
    document.getElementById("error-msg").textContent = "Incorrect password. Try again.";
  }
}

// Weather Widget
function loadWeather() {
  const apiKey = "52c74a789388af983452ea38763f03b7"; // Replace with your API key
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
  document.getElementById("spotify-info").innerHTML = `
    To integrate Spotify, you'll need to authenticate with the <a href="https://developer.spotify.com/documentation/web-api/" target="_blank" style="color:lightgreen;">Spotify Web API</a>.
  `;
}

// Run on Load
window.onload = () => {
  loadWeather();
  loadNotes();
  loadSpotify();
};