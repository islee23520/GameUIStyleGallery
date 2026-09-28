const toggle = document.querySelector(".nav-toggle");
const body = document.getElementById("nav-body");

if (toggle && body) {
  toggle.addEventListener("click", () => {
    const open = toggle.getAttribute("aria-expanded") !== "true";
    toggle.setAttribute("aria-expanded", String(open));
    body.dataset.open = String(open);
  });
}
