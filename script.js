const modeToggle = document.getElementById("mode-toggle");
const root = document.documentElement;
const cursorLight = document.querySelector(".cursor-light");
const toast = document.getElementById("toast");
const storyScene = document.querySelector("[data-scroll-scene]");
const storyCaption = document.getElementById("story-caption");
const storySteps = Array.from(document.querySelectorAll(".story-step"));

const projectList = [
  {
    title: "Expense Vision",
    type: "FinTech",
    year: "2026",
    description:
      "Smart personal budgeting dashboard with forecasting and spending category insights.",
    github: "https://github.com/Yusjam1/Personalportfoliowebsite",
  },
  {
    title: "Market Pulse AI",
    type: "AI",
    year: "2026",
    description:
      "News sentiment + indicator tracker for market research and quick decision support.",
    github: "https://github.com/Yusjam1",
  },
  {
    title: "Campus Capital",
    type: "FinTech + Web",
    year: "2026",
    description:
      "Student-focused tool for savings goals, monthly planning, and bill reminders.",
    github: "https://github.com/Yusjam1",
  },
];

const interests = [
  "Machine Learning for Finance",
  "AI Product Development",
  "FinTech UX + Data Design",
  "Automation for Business Workflows",
];

function initializeTheme() {
  const savedTheme = localStorage.getItem("theme") || "day";
  root.setAttribute("data-theme", savedTheme);
  modeToggle.textContent = savedTheme === "night" ? "Light View" : "Dark View";
}

modeToggle.addEventListener("click", () => {
  const current = root.getAttribute("data-theme") === "night" ? "night" : "day";
  const next = current === "day" ? "night" : "day";
  root.setAttribute("data-theme", next);
  localStorage.setItem("theme", next);
  modeToggle.textContent = next === "night" ? "Light View" : "Dark View";
});

window.addEventListener("mousemove", (event) => {
  if (!cursorLight) {
    return;
  }

  cursorLight.style.left = `${event.clientX}px`;
  cursorLight.style.top = `${event.clientY}px`;
});

document.querySelectorAll(".hero-chip").forEach((item) => {
  item.addEventListener("click", () => {
    const target = item.getAttribute("data-target");
    const section = target ? document.querySelector(target) : null;

    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});

function renderProjects() {
  const grid = document.getElementById("projects-grid");
  grid.innerHTML = "";

  projectList.forEach((project, index) => {
    const card = document.createElement("article");
    card.className = `panel project-card${index === 0 ? " is-featured" : ""}`;
    const label = index === 0 ? "Featured Build" : `Selected Work ${index}`;

    card.innerHTML = `
      <p class="project-kicker">${label}</p>
      <div class="project-top">
        <span>${project.type}</span>
        <span>${project.year}</span>
      </div>
      <h3>${project.title}</h3>
      <p>${project.description}</p>
      <a class="project-link" href="${project.github}" target="_blank" rel="noreferrer">View on GitHub</a>
    `;

    card.addEventListener("mousemove", (event) => {
      const rect = card.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 100;
      const y = ((event.clientY - rect.top) / rect.height) * 100;
      const tiltX = ((event.clientX - rect.left) / rect.width - 0.5) * 8;
      const tiltY = (0.5 - (event.clientY - rect.top) / rect.height) * 8;
      card.style.setProperty("--x", `${x}%`);
      card.style.setProperty("--y", `${y}%`);
      card.style.setProperty("--tilt-x", tiltX.toFixed(2));
      card.style.setProperty("--tilt-y", tiltY.toFixed(2));
      card.style.setProperty("--lift", "8");
    });

    card.addEventListener("mouseleave", () => {
      card.style.setProperty("--tilt-x", "0");
      card.style.setProperty("--tilt-y", "0");
      card.style.setProperty("--lift", "0");
    });

    grid.appendChild(card);
  });
}

function rotateInterests() {
  const text = document.getElementById("interest-text");
  let index = 0;

  setInterval(() => {
    index = (index + 1) % interests.length;
    text.textContent = interests[index];
  }, 2300);
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");

  window.setTimeout(() => {
    toast.classList.remove("show");
  }, 1400);
}

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function updateStoryScene() {
  if (!storyScene || !storyCaption || storySteps.length === 0) {
    return;
  }

  const rect = storyScene.getBoundingClientRect();
  const available = Math.max(rect.height - window.innerHeight, 1);
  const progress = clamp(-rect.top / available, 0, 1);
  root.style.setProperty("--scene-progress", progress.toFixed(3));

  const stage =
    progress < 0.34
      ? 0
      : progress < 0.68
        ? 1
        : 2;

  const captions = [
    "Start with the parts: finance, systems, and AI thinking.",
    "Then connect them into one product direction.",
    "Finally turn that direction into projects people can actually use.",
  ];

  storyCaption.textContent = captions[stage];
  storySteps.forEach((step, index) => {
    step.classList.toggle("is-active", index === stage);
  });
}

document.querySelectorAll(".copy-btn").forEach((button) => {
  button.addEventListener("click", async () => {
    const value = button.getAttribute("data-copy");

    try {
      await navigator.clipboard.writeText(value || "");
      showToast("Copied to clipboard");
    } catch {
      showToast("Copy failed");
    }
  });
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  { threshold: 0.18 }
);

document
  .querySelectorAll(".reveal-on-scroll")
  .forEach((element) => observer.observe(element));

window.addEventListener("scroll", updateStoryScene, { passive: true });
window.addEventListener("resize", updateStoryScene);

initializeTheme();
renderProjects();
rotateInterests();
updateStoryScene();
