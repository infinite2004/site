document.addEventListener("DOMContentLoaded", function () {
    let startBtn = document.getElementById("start-btn");
    let dropdown = document.querySelector(".dropdown");

    // Toggle menu visibility when clicking the Start button
    startBtn.addEventListener("click", function (event) {
        event.stopPropagation();
        dropdown.classList.toggle("show");
    });

    // Hide menu when clicking outside
    document.addEventListener("click", function (event) {
        if (!dropdown.contains(event.target) && !startBtn.contains(event.target)) {
            dropdown.classList.remove("show");
        }
    });

    // Ensure Windows open properly
    window.openWindow = function (id) {
        let win = document.getElementById(`window-${id}`);
        win.style.display = "block";
        setTimeout(() => {
            win.classList.add("active");
        }, 50);
    };

    // Close window with animation
    window.closeWindow = function (id) {
        let win = document.getElementById(`window-${id}`);
        win.classList.remove("active");
        setTimeout(() => {
            win.style.display = "none";
        }, 300);
    };

    // Update Clock
    function updateClock() {
        const now = new Date();
        document.getElementById("clock").innerText = now.toLocaleTimeString();
    }
    setInterval(updateClock, 1000);
    updateClock();
});

