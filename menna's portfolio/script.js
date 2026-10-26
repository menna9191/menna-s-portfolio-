// Theme toggle (remembered when storage is available)
const root = document.documentElement;
try {
  const saved = localStorage.getItem("theme");
  if (saved) root.setAttribute("data-theme", saved);
} catch (e) {}

document.getElementById("themeToggle").addEventListener("click", () => {
  const next = root.getAttribute("data-theme") === "light" ? "dark" : "light";
  root.setAttribute("data-theme", next);
  try { localStorage.setItem("theme", next); } catch (e) {}
});

// Mobile menu
const menu = document.getElementById("menu");
document.getElementById("menuToggle").addEventListener("click", () => menu.classList.toggle("open"));
menu.querySelectorAll("a").forEach(a => a.addEventListener("click", () => menu.classList.remove("open")));

// Typing effect
const roles = ["Full-Stack Developer", "ASP.NET Core Developer", "React.js Developer", "AI & Cybersecurity Enthusiast"];
const typed = document.getElementById("typed");
let r = 0, c = 0, deleting = false;

function type() {
  const word = roles[r];
  typed.textContent = word.slice(0, c);
  if (!deleting && c < word.length) { c++; return setTimeout(type, 90); }
  if (!deleting) { deleting = true; return setTimeout(type, 1400); }
  if (c > 0) { c--; return setTimeout(type, 45); }
  deleting = false;
  r = (r + 1) % roles.length;
  setTimeout(type, 300);
}
type();

// Scroll reveal
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add("visible"); io.unobserve(e.target); }
  });
}, { threshold: 0.12 });
document.querySelectorAll(".reveal").forEach(el => io.observe(el));

// Contact form: opens the visitor's email app with the message filled in
document.getElementById("contactForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();
  const subject = encodeURIComponent("Portfolio contact from " + name);
  const body = encodeURIComponent(message + "\n\n— " + name + " (" + email + ")");
  window.location.href = "mailto:mennaalaa2811@gmail.com?subject=" + subject + "&body=" + body;
});

// Footer year
document.getElementById("year").textContent = new Date().getFullYear();
