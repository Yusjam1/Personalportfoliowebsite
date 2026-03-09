const modeToggle = document.getElementById("mode-toggle");
const root = document.documentElement;
const cursorLight = document.querySelector(".cursor-light");
const toast = document.getElementById("toast");

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

document.querySelectorAll(".room-item").forEach((item) => {
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

  projectList.forEach((project) => {
    const card = document.createElement("article");
    card.className = "panel project-card";

    card.innerHTML = `
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
      card.style.setProperty("--x", `${x}%`);
      card.style.setProperty("--y", `${y}%`);
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

initializeTheme();
renderProjects();
rotateInterests();
