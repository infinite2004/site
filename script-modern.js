// Modern Portfolio JavaScript - compact static-site bundle.
(function() {
  "use strict";

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));
  const reduced = () => window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const debounce = (fn, wait) => {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => fn(...args), wait);
    };
  };

  function initMobileMenu() {
    const button = $("#mobile-menu-btn");
    const menu = $("#mobile-menu");
    if (!button || !menu) return;

    const close = () => {
      menu.classList.add("hidden");
      menu.classList.remove("show");
      button.setAttribute("aria-expanded", "false");
    };
    const open = () => {
      menu.classList.remove("hidden");
      menu.classList.add("show");
      button.setAttribute("aria-expanded", "true");
      const firstLink = menu.querySelector("a");
      if (firstLink) firstLink.focus();
    };

    button.addEventListener("click", (event) => {
      event.preventDefault();
      button.getAttribute("aria-expanded") === "true" ? close() : open();
    });
    menu.querySelectorAll("a").forEach((link) => link.addEventListener("click", close));
    document.addEventListener("click", (event) => {
      if (!menu.contains(event.target) && !button.contains(event.target)) close();
    });
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && button.getAttribute("aria-expanded") === "true") {
        close();
        button.focus();
      }
    });
  }

  function initTyping() {
    const prefersReduced = reduced();
    $$("[id$='-typed']").forEach((el) => {
      const text = el.dataset.text || el.textContent;
      if (!text) return;
      if (prefersReduced) {
        el.textContent = text;
        return;
      }
      el.textContent = "";
      el.setAttribute("aria-live", "polite");
      let index = 0;
      const tick = () => {
        if (index > text.length) return;
        el.textContent = text.slice(0, index);
        index += 1;
        setTimeout(tick, text[index - 1] === "," ? 100 : 50);
      };
      setTimeout(tick, 300);
    });
  }

  function initMedia() {
    $$("video").forEach((video) => {
      const parent = video.parentElement;
      video.addEventListener("loadstart", () => parent && parent.classList.add("loading"));
      video.addEventListener("canplay", () => {
        if (!parent) return;
        parent.classList.remove("loading");
        parent.classList.add("loaded");
      });
      video.addEventListener("error", () => {
        if (!parent) return;
        parent.classList.remove("loading");
        const fallback = parent.querySelector(".video-fallback");
        if (fallback) fallback.style.display = "block";
      });
    });

    if (!("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const element = entry.target;
        if (element.tagName === "IFRAME" && element.dataset.src) {
          element.src = element.dataset.src;
          element.classList.add("loaded");
        }
        observer.unobserve(element);
      });
    }, { rootMargin: "50px" });
    $$("iframe[data-src]").forEach((element) => observer.observe(element));
  }

  function initSmoothScroll() {
    $$("a[href^='#']").forEach((link) => {
      link.addEventListener("click", (event) => {
        const href = link.getAttribute("href");
        if (!href || href === "#") return;
        const target = $(href);
        if (!target) return;
        event.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
        history.pushState(null, "", href);
      });
    });
  }

  function initProjectSearch() {
    const input = $("#project-search");
    const chips = $$(".filter-chip");
    const cards = $$("#project-grid > a");
    if (!input || !cards.length) return;

    const filter = debounce(() => {
      const query = input.value.toLowerCase().trim();
      const active = $(".filter-chip[aria-pressed='true']")?.dataset.filter || "all";
      cards.forEach((card) => {
        const tags = (card.dataset.tags || "").toLowerCase();
        const text = card.textContent.toLowerCase();
        const show = (!query || text.includes(query)) && (active === "all" || tags.includes(active));
        card.style.display = show ? "" : "none";
        card.setAttribute("aria-hidden", String(!show));
      });
    }, 150);

    input.addEventListener("input", filter);
    chips.forEach((chip) => {
      chip.addEventListener("click", () => {
        chips.forEach((item) => item.setAttribute("aria-pressed", "false"));
        chip.setAttribute("aria-pressed", "true");
        filter();
      });
    });
  }

  function init3DViewer() {
    const button = $("#eink-3d-toggle");
    const wrapper = $("#eink-3d-wrapper");
    const viewer = $("#eink-model-viewer");
    const status = $("#eink-3d-status");
    if (!button || !wrapper || !viewer) return;

    let initialized = false;
    button.addEventListener("click", async () => {
      const willShow = wrapper.classList.contains("hidden");
      wrapper.classList.toggle("hidden");
      button.textContent = willShow ? "Hide 3D model" : "View 3D model";
      if (willShow && status) status.textContent = "Loading model...";
      if (!willShow || initialized) return;
      initialized = true;
      try {
        const response = await fetch(viewer.getAttribute("src") || "/assets/E-ink_full_model.glb", { method: "HEAD" });
        if (!response.ok && status) status.textContent = "Model file not found.";
      } catch (error) {
        if (status) status.textContent = "Failed to load model.";
      }
    });
    viewer.addEventListener("load", () => status && (status.textContent = "Loaded."));
    viewer.addEventListener("error", () => status && (status.textContent = "Failed to load model."));
  }

  function initAccordions() {
    $$(".skill-acc").forEach((accordion) => {
      const button = accordion.querySelector(".skill-acc__toggle");
      const panel = accordion.querySelector(".skill-acc__panel");
      if (!button || !panel) return;

      button.addEventListener("click", () => {
        const isOpen = accordion.classList.contains("open");
        $$(".skill-acc").forEach((item) => {
          if (item === accordion) return;
          item.classList.remove("open");
          const otherButton = item.querySelector(".skill-acc__toggle");
          const otherPanel = item.querySelector(".skill-acc__panel");
          if (otherButton) otherButton.setAttribute("aria-expanded", "false");
          if (otherPanel) otherPanel.style.maxHeight = "0px";
        });
        accordion.classList.toggle("open", !isOpen);
        button.setAttribute("aria-expanded", String(!isOpen));
        panel.style.maxHeight = isOpen ? "0px" : `${panel.scrollHeight}px`;
      });
    });
  }

  function initActiveNav() {
    const path = location.pathname.replace(/index\.html$/, "").replace(/\/$/, "");
    $$("[data-nav]").forEach((link) => {
      const target = link.getAttribute("data-nav");
      const active = (target === "home" && (path === "" || path === "/")) || (target && target !== "home" && path.includes(target));
      if (active) link.setAttribute("aria-current", "page");
    });
  }

  function initReveal() {
    const selector = [
      "main > section",
      "main section > .site-container > *",
      "main section > .container > *",
      "main section > .container-narrow > *",
      "main figure",
      "main .card",
      "main .project-card",
      "main .experiment-card",
      "main .skill-card",
      "main .timeline-step",
      "main .decision-card",
      "main h1",
      "main h2",
      "main h3"
    ].join(",");

    document.querySelectorAll(selector).forEach((el) => {
      if (el.closest("[data-no-reveal]") || el.closest(".seed-story")) return;
      const hasReveal = Array.from(el.classList).some((cls) => cls === "reveal" || cls.startsWith("reveal-"));
      if (!hasReveal) el.classList.add("reveal-up");
    });

    const elements = $$(".reveal,.reveal-up,.reveal-fade,.reveal-scale,.reveal-left,.reveal-right,.reveal-blur,.reveal-stagger");
    if (!elements.length) return;
    if (reduced() || !("IntersectionObserver" in window)) {
      elements.forEach((el) => el.classList.add("in"));
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("in");
        observer.unobserve(entry.target);
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    elements.forEach((el) => observer.observe(el));
  }

  function initSeedStory() {
    if (document.body.dataset.scrollTheme !== "seed-planter") return;
    const story = $(".seed-story");
    const chapters = $$(".story-chapter");
    const bar = $(".story-progress__bar");
    const links = $$(".story-rail__link");
    if (!story || !chapters.length) return;

    const progress = () => {
      if (!bar) return;
      const total = story.offsetHeight - innerHeight;
      if (total <= 0) return;
      const scrolled = Math.min(Math.max(-story.getBoundingClientRect().top, 0), total);
      bar.style.width = `${(scrolled / total) * 100}%`;
    };
    const activate = (id) => {
      chapters.forEach((chapter) => chapter.classList.toggle("is-active", chapter.id === id));
      links.forEach((link) => link.classList.toggle("is-active", link.getAttribute("href") === `#${id}`));
    };

    if ("IntersectionObserver" in window && !reduced()) {
      const chapterObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) activate(entry.target.id);
        });
      }, { rootMargin: "-35% 0px -45% 0px" });
      chapters.forEach((chapter) => chapterObserver.observe(chapter));

      const beatObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("in");
        });
      }, { rootMargin: "0px 0px -8% 0px", threshold: 0.1 });
      $$(".story-beat,.story-pipeline__step").forEach((el) => beatObserver.observe(el));
    } else {
      $$(".story-beat,.story-pipeline__step").forEach((el) => el.classList.add("in"));
    }

    addEventListener("scroll", progress, { passive: true });
    addEventListener("resize", progress, { passive: true });
    progress();
    activate(chapters[0].id);
  }

  function initDesignSystem() {
    if (!document.body.classList.contains("ds-theme")) return;
    initSpotlight();
    initShine();
    initCommandPalette();
    initColorPanels();
  }

  function initSpotlight() {
    if (reduced()) return;
    let spot = $(".ds-spotlight");
    if (!spot) {
      spot = document.createElement("div");
      spot.className = "ds-spotlight";
      spot.setAttribute("aria-hidden", "true");
      document.body.prepend(spot);
    }
    document.body.classList.add("ds-spotlight-on");

    let ticking = false;
    document.addEventListener("mousemove", (event) => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        document.body.style.setProperty("--spot-x", `${event.clientX}px`);
        document.body.style.setProperty("--spot-y", `${event.clientY}px`);
        ticking = false;
      });
    }, { passive: true });
  }

  function initShine() {
    $$(".ds-shine").forEach((card) => {
      card.addEventListener("mousemove", (event) => {
        const rect = card.getBoundingClientRect();
        card.style.setProperty("--shine-x", `${event.clientX - rect.left}px`);
        card.style.setProperty("--shine-y", `${event.clientY - rect.top}px`);
      }, { passive: true });
    });
  }

  function initCommandPalette() {
    if ($(".ds-command-overlay")) return;
    const nav = $(".site-header nav");
    const items = [
      ["Work", "/pages/work.html", "Case studies"],
      ["About", "/pages/about.html", "Profile"],
      ["Resume", "/pages/resume.html", "PDF + preview"],
      ["Contact", "/pages/contact.html", "Email"],
      ["Monoscribe", "/pages/projects/monoscribe.html", "Centerpiece"],
      ["Seed Dropper System", "/pages/projects/seed-planter.html", "Hardware"],
      ["Signal", "/pages/projects/signal.html", "UX case study"],
      ["Quiet Machines", "/pages/design-system.html", "Design system"],
      ["Project Archive", "/pages/all-projects.html", "Browse all"]
    ];

    let previousFocus = null;
    const overlay = document.createElement("div");
    overlay.className = "ds-command-overlay";
    overlay.setAttribute("role", "dialog");
    overlay.setAttribute("aria-modal", "true");
    overlay.setAttribute("aria-label", "Quick navigation");
    overlay.innerHTML = "<div class=\"ds-command-panel\"><input class=\"ds-command-search\" type=\"search\" placeholder=\"Jump to a page or project...\" aria-label=\"Search pages and projects\"><div class=\"ds-command-list\"></div></div>";
    document.body.appendChild(overlay);

    const input = $(".ds-command-search", overlay);
    const list = $(".ds-command-list", overlay);

    function render(query = "") {
      const q = query.toLowerCase().trim();
      const shown = items.filter((item) => !q || item[0].toLowerCase().includes(q) || item[2].toLowerCase().includes(q));
      list.innerHTML = shown.map((item) => `<a class="ds-command-item" href="${item[1]}"><strong>${item[0]}</strong><span>${item[2]}</span></a>`).join("") || "<p class=\"px-4 py-5 text-sm text-neutral-500\">No matches yet.</p>";
    }
    function open() {
      previousFocus = document.activeElement;
      render(input.value);
      overlay.classList.add("is-open");
      document.body.style.overflow = "hidden";
      setTimeout(() => input.focus(), 0);
    }
    function close() {
      overlay.classList.remove("is-open");
      document.body.style.overflow = "";
      input.value = "";
      render("");
      if (previousFocus && previousFocus.focus) previousFocus.focus();
    }

    if (nav && !nav.querySelector(".ds-command-trigger")) {
      const trigger = document.createElement("button");
      trigger.type = "button";
      trigger.className = "ds-command-trigger";
      trigger.setAttribute("aria-haspopup", "dialog");
      trigger.innerHTML = "<span>Search</span><kbd>Ctrl</kbd><kbd>K</kbd>";
      nav.insertBefore(trigger, nav.lastElementChild);
      trigger.addEventListener("click", open);
    }

    input.addEventListener("input", () => render(input.value));
    list.addEventListener("click", (event) => {
      if (event.target.closest("a")) close();
    });
    overlay.addEventListener("click", (event) => {
      if (event.target === overlay) close();
    });
    document.addEventListener("keydown", (event) => {
      const key = event.key.toLowerCase();
      if ((event.metaKey || event.ctrlKey) && key === "k") {
        event.preventDefault();
        overlay.classList.contains("is-open") ? close() : open();
      }
      if (event.key === "Escape" && overlay.classList.contains("is-open")) close();
    });
    render("");
  }

  function initColorPanels() {
    $$("[data-color-panels]").forEach((canvas) => {
      const ctx = canvas.getContext && canvas.getContext("2d");
      if (!ctx) return;
      const styles = getComputedStyle(document.documentElement);
      const token = (name, fallback) => styles.getPropertyValue(name).trim() || fallback;
      const colors = [
        token("--ds-panel-1", "#3f596e"),
        token("--ds-panel-2", "#5d6f54"),
        token("--ds-panel-3", "#9b5c42"),
        token("--ds-panel-4", "#59615b"),
        token("--ds-panel-5", "#ad772f"),
        token("--ds-panel-6", "#cfd2c8")
      ];
      const prefersReduced = reduced();
      const animatePanels = canvas.hasAttribute("data-animate-panels") && !prefersReduced;
      const panelImageSrc = canvas.dataset.panelImage;
      const panelImage = panelImageSrc ? new Image() : null;
      const panelImageCrop = (canvas.dataset.panelImageCrop || "")
        .split(",")
        .map(Number);
      let time = 0;
      let raf = null;
      let visible = true;

      function drawPanelImage(width, height) {
        if (!panelImage?.complete || !panelImage.naturalWidth) return;

        const hasCrop = panelImageCrop.length === 4 && panelImageCrop.every(Number.isFinite);
        const sourceX = hasCrop ? panelImage.naturalWidth * panelImageCrop[0] : 0;
        const sourceY = hasCrop ? panelImage.naturalHeight * panelImageCrop[1] : 0;
        const sourceWidth = hasCrop ? panelImage.naturalWidth * panelImageCrop[2] : panelImage.naturalWidth;
        const sourceHeight = hasCrop ? panelImage.naturalHeight * panelImageCrop[3] : panelImage.naturalHeight;
        const scale = Math.min((width * 0.88) / sourceWidth, (height * 0.84) / sourceHeight);
        const drawWidth = sourceWidth * scale;
        const drawHeight = sourceHeight * scale;

        ctx.save();
        ctx.globalAlpha = 1;
        ctx.shadowColor = "rgba(23, 26, 24, 0.3)";
        ctx.shadowBlur = Math.min(width, height) * 0.06;
        ctx.shadowOffsetY = Math.min(width, height) * 0.035;
        ctx.drawImage(
          panelImage,
          sourceX,
          sourceY,
          sourceWidth,
          sourceHeight,
          (width - drawWidth) / 2,
          (height - drawHeight) / 2,
          drawWidth,
          drawHeight
        );
        ctx.restore();
      }

      function resize() {
        const dpr = Math.min(devicePixelRatio || 1, 2);
        const rect = canvas.getBoundingClientRect();
        if (!rect.width || !rect.height) return;
        canvas.width = Math.floor(rect.width * dpr);
        canvas.height = Math.floor(rect.height * dpr);
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        if (!animatePanels) drawStatic();
      }
      function drawStatic() {
        const width = canvas.clientWidth;
        const height = canvas.clientHeight;
        if (!width || !height) return;
        const gradient = ctx.createLinearGradient(0, 0, width, height);
        colors.forEach((color, index) => gradient.addColorStop(index / (colors.length - 1), color));
        ctx.globalAlpha = 1;
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);
        drawPanelImage(width, height);
      }
      function schedule() {
        if (!raf && visible) raf = requestAnimationFrame(draw);
      }
      function pause() {
        visible = false;
        if (raf) {
          cancelAnimationFrame(raf);
          raf = null;
        }
      }
      function draw() {
        raf = null;
        if (!visible) return;
        const width = canvas.clientWidth;
        const height = canvas.clientHeight;
        if (!width || !height) {
          schedule();
          return;
        }

        ctx.clearRect(0, 0, width, height);
        ctx.fillStyle = token("--qm-paper", "#f2f0e8");
        ctx.fillRect(0, 0, width, height);

        const panelWidth = width * 0.32;
        const angle = 0.42 + Math.sin(time * 0.0004) * 0.06;
        const drift = (time * 0.35) % (panelWidth * 1.2);
        for (let index = -1; index < 7; index += 1) {
          const x = index * panelWidth * 0.85 - drift;
          ctx.save();
          ctx.translate(width * 0.5, height * 0.5);
          ctx.rotate(angle);
          ctx.translate(-width * 0.5, -height * 0.5);
          ctx.fillStyle = colors[(index + 7) % colors.length];
          ctx.globalAlpha = 0.52 + Math.sin(time * 0.002 + index) * 0.04;
          ctx.fillRect(x, -height * 0.5, panelWidth, height * 2);
          ctx.restore();
        }
        ctx.globalAlpha = 1;
        drawPanelImage(width, height);
        time += 16;
        schedule();
      }

      if (panelImage) {
        panelImage.addEventListener("load", () => {
          animatePanels ? schedule() : drawStatic();
        }, { once: true });
        panelImage.src = panelImageSrc;
      }

      resize();
      animatePanels ? schedule() : drawStatic();
      addEventListener("resize", debounce(resize, 150), { passive: true });
      if ("IntersectionObserver" in window && animatePanels) {
        new IntersectionObserver((entries) => {
          const isVisible = entries[0]?.isIntersecting ?? true;
          if (isVisible) {
            visible = true;
            schedule();
          } else {
            pause();
          }
        }, { threshold: 0.05 }).observe(canvas);
      }
    });
  }

  function init() {
    initMobileMenu();
    initTyping();
    initMedia();
    initSmoothScroll();
    initProjectSearch();
    init3DViewer();
    initAccordions();
    initActiveNav();
    initReveal();
    initSeedStory();
    initDesignSystem();

    const year = $("#year");
    if (year) year.textContent = new Date().getFullYear();
    document.body.classList.add("loaded");
  }

  document.readyState === "loading" ? document.addEventListener("DOMContentLoaded", init) : init();
})();
