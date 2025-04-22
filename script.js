document.addEventListener("DOMContentLoaded", function () {
    let startBtn = document.getElementById("start-btn");
    let dropdown = document.querySelector(".dropdown");
  
    // Toggle menu visibility with animation
    startBtn.addEventListener("click", function (event) {
      event.stopPropagation();
      dropdown.classList.toggle("show");
  
      if (dropdown.classList.contains("show")) {
        gsap.fromTo(
          ".dropdown",
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.3, ease: "power2.out" }
        );
      }
    });
  
    // Hide dropdown when clicking outside
    document.addEventListener("click", function (event) {
      if (!dropdown.contains(event.target) && !startBtn.contains(event.target)) {
        dropdown.classList.remove("show");
      }
    });
  
    // Animate window open
    window.openWindow = function (id) {
      let win = document.getElementById(`window-${id}`);
      win.style.display = "block";
  
      setTimeout(() => {
        win.classList.add("active");
      }, 50);
  
      gsap.fromTo(
        `#window-${id}`,
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.4, ease: "back.out(1.7)" }
      );
    };
  
    // Animate window close
    window.closeWindow = function (id) {
      let win = document.getElementById(`window-${id}`);
      gsap.to(`#window-${id}`, {
        scale: 0.8,
        opacity: 0,
        duration: 0.3,
        onComplete: () => {
          win.classList.remove("active");
          win.style.display = "none";
        }
      });
    };
  
    // Update Clock
    function updateClock() {
      const now = new Date();
      document.getElementById("clock").innerText = now.toLocaleTimeString();
    }
    setInterval(updateClock, 1000);
    updateClock();
  
    // Animate desktop icons on load
    gsap.from(".icon", {
      opacity: 0,
      y: 30,
      duration: 1,
      stagger: 0.2,
      ease: "power2.out"
    });
  
    // Add hover scale to icons
    document.querySelectorAll(".icon").forEach((icon) => {
      icon.addEventListener("mouseenter", () => {
        gsap.to(icon, { scale: 1.1, duration: 0.2 });
      });
      icon.addEventListener("mouseleave", () => {
        gsap.to(icon, { scale: 1, duration: 0.2 });
      });
    });
  });


  function makeDraggable(el) {
    const titleBar = el.querySelector(".title-bar");
    let isDragging = false;
    let offsetX, offsetY;
  
    titleBar.addEventListener("mousedown", (e) => {
      isDragging = true;
      offsetX = e.clientX - el.offsetLeft;
      offsetY = e.clientY - el.offsetTop;
      el.style.transition = "none"; // disable transition while dragging
    });
  
    document.addEventListener("mousemove", (e) => {
      if (isDragging) {
        el.style.left = `${e.clientX - offsetX}px`;
        el.style.top = `${e.clientY - offsetY}px`;
      }
    });
  
    document.addEventListener("mouseup", () => {
      isDragging = false;
      el.style.transition = ""; // re-enable transition
    });
  }
  
  // Apply to all windows after DOM is loaded
  document.querySelectorAll(".window").forEach(makeDraggable);


  // Replace setTimeout/openWindow with:
window.openWindow = function (id) {
  const win = document.getElementById(`window-${id}`);
  win.style.display = "block";
  gsap.fromTo(win, { scale: 0.5, opacity: 0 }, { scale: 1.4, opacity: 1, duration: 0.4, ease: "power2.out" });
};

// Replace closeWindow with:
window.closeWindow = function (id) {
  const win = document.getElementById(`window-${id}`);
  gsap.to(win, {
    scale: 0.5,
    opacity: 0,
    duration: 0.3,
    ease: "power1.in",
    onComplete: () => {
      win.style.display = "none";
    }
  });
};

document.querySelectorAll(".icon").forEach(icon => {
  icon.addEventListener("mouseenter", () => {
    gsap.to(icon, { scale: 1.1, duration: 0.2 });
  });
  icon.addEventListener("mouseleave", () => {
    gsap.to(icon, { scale: 1.0, duration: 0.2 });
  });
});

gsap.from(".desktop", { opacity: 0, y: 30, duration: 5, ease: "power3.out" });


document.addEventListener("DOMContentLoaded", () => {
  const videoElement = document.getElementById("bg-video");

  const videoSources = [
    "./assets/aesthetic-japan.mp4",
    "./assets/chillout.mp4",
    "./assets/aesthetic_three.mp4",
    "./assets/asthetic_four.mp4",
    "./assets/asthetic_six.mp4",
    "./assets/asthetic_seven.mp4",
    "./assets/asthetic_eight.mp4"
  

    
    // Add more videos if needed
  ];

  let currentVideoIndex = 0;
  let videoLooping = true;
  let loopTimeout;

  function playVideo(index) {
    const source = videoSources[index];
    videoElement.src = source;
    videoElement.load();
    videoElement.play();
  }

  function loopForDuration(duration = 30000) {
    playVideo(currentVideoIndex);

    // Allow video to loop
    videoElement.loop = true;

    // After duration ends, move to the next video
    loopTimeout = setTimeout(() => {
      currentVideoIndex = (currentVideoIndex + 1) % videoSources.length;
      loopForDuration(duration); // start next video looping
    }, duration);
  }

  // Start looping the first video
  loopForDuration();
});

function playNextVideo() {
  gsap.to(videoElement, { opacity: 0, duration: 1, onComplete: () => {
    videoElement.src = videoSources[currentVideoIndex];
    videoElement.load();
    videoElement.play();
    gsap.to(videoElement, { opacity: 1, duration: 1 });
    currentVideoIndex = (currentVideoIndex + 1) % videoSources.length;
  }});
}