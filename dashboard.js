function getJoke() {
  fetch("https://v2.jokeapi.dev/joke/Programming?type=single")
    .then(res => res.json())
    .then(data => {
      document.getElementById("joke-text").textContent = data.joke;
    })
    .catch(() => {
      document.getElementById("joke-text").textContent = "Couldn't load a joke!";
    });
}

const localQuotes = [
  { content: "Creativity is intelligence having fun.", author: "Albert Einstein" },
  { content: "Simplicity is the ultimate sophistication.", author: "Leonardo da Vinci" },
  { content: "Design is not just what it looks like and feels like. Design is how it works.", author: "Steve Jobs" },
  { content: "The best way to get started is to quit talking and begin doing.", author: "Walt Disney" },
  { content: "Success is not in what you have, but who you are.", author: "Bo Bennett" }
];

function getQuote() {
  const random = localQuotes[Math.floor(Math.random() * localQuotes.length)];
  document.getElementById("quote-text").textContent = `"${random.content}" — ${random.author}`;
}

// Load on page load
getJoke();
getQuote();

// Button listeners
document.getElementById("joke-btn").addEventListener("click", getJoke);
document.getElementById("quote-btn").addEventListener("click", getQuote);