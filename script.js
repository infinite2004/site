document.addEventListener("DOMContentLoaded", function () {
    const startBtn = document.getElementById("start-btn");
    const dropdown = document.querySelector(".dropdown");
  
    // Toggle menu visibility with animation
    startBtn.addEventListener("click", function (event) {
      event.stopPropagation();
      const willShow = !dropdown.classList.contains("show");
      dropdown.classList.toggle("show");
      startBtn.setAttribute("aria-expanded", String(willShow));
  
      if (willShow) {
        gsap.fromTo(
          ".dropdown",
          { y: 8, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.18, ease: "power2.out" }
        );
      }
    });
  
    // Hide dropdown when clicking outside
    document.addEventListener("click", function (event) {
      if (!dropdown.contains(event.target) && !startBtn.contains(event.target)) {
        dropdown.classList.remove("show");
        startBtn.setAttribute("aria-expanded", "false");
      }
    });
  
    // Animate window open
    window.openWindow = function (id) {
      const win = document.getElementById(`window-${id}`);
      if (!win) return;
      win.style.display = "block";
      win.classList.add("active");
      gsap.fromTo(win, { scale: 0.9, opacity: 0 }, { scale: 1.4, opacity: 1, duration: 0.28, ease: "power2.out" });
    };
  
    // Animate window close
    window.closeWindow = function (id) {
      const win = document.getElementById(`window-${id}`);
      if (!win) return;
      gsap.to(win, {
        scale: 0.9,
        opacity: 0,
        duration: 0.22,
        ease: "power1.in",
        onComplete: () => {
          win.classList.remove("active");
          win.style.display = "none";
        }
      });
    };
  
    // Update Clock
    function updateClock() {
      const now = new Date();
      const el = document.getElementById("clock");
      if (el) el.innerText = now.toLocaleTimeString();
    }
    setInterval(updateClock, 1000);
    updateClock();
  
    // Animate desktop icons and groups on load
    gsap.from(".icon, .group", {
      opacity: 0,
      y: 18,
      duration: 0.6,
      stagger: 0.12,
      ease: "power2.out"
    });
  
    // Add hover scale to icons and card groups
    document.querySelectorAll(".icon, .group").forEach((el) => {
      el.addEventListener("mouseenter", () => {
        gsap.to(el, { scale: 1.02, duration: 0.15 });
      });
      el.addEventListener("mouseleave", () => {
        gsap.to(el, { scale: 1, duration: 0.15 });
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
// (deduplicated openWindow/closeWindow above)

document.querySelectorAll(".icon").forEach(icon => {
  icon.addEventListener("mouseenter", () => {
    gsap.to(icon, { scale: 1.1, duration: 0.2 });
  });
  icon.addEventListener("mouseleave", () => {
    gsap.to(icon, { scale: 1.0, duration: 0.2 });
  });
});

gsap.from(".desktop", { opacity: 0, y: 30, duration: 5, ease: "power3.out" });


// (video rotation moved into the main DOMContentLoaded above)

// (unused helper removed)

// (dead code removed)

