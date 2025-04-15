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