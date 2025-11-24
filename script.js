const NUMBER = "4368110521180";

const messages = {
  ru: encodeURIComponent("Здравствуйте! Я хочу записаться на урок в B.A.D. School. Меня интересует: "),
  en: encodeURIComponent("Hello! I'd like to book a lesson at B.A.D. School. I'm interested in: "),
  de: encodeURIComponent("Hallo! Ich möchte eine Stunde bei B.A.D. School buchen. Mich interessiert: ")
};

let currentLang = "ru";

function applyLang(l) {
  currentLang = l;

  // show/hide by class instead of changing display
  document.querySelectorAll("[data-lang]").forEach(el => {
    if (el.getAttribute("data-lang") === l) {
      el.classList.remove("hidden-lang");
    } else {
      el.classList.add("hidden-lang");
    }
  });

  // change WhatsApp link
  const url = `https://wa.me/${NUMBER}?text=${messages[l]}`;
  ["cta-main", "cta-side", "cta-bottom"].forEach(id => {
    const a = document.getElementById(id);
    if (a) a.href = url;
  });

  // save preference
  localStorage.setItem("bad-school-lang", l);
}

document.addEventListener("DOMContentLoaded", () => {
  // language buttons
  document.querySelectorAll("[data-set-lang]").forEach(btn => {
    btn.addEventListener("click", () => {
      applyLang(btn.getAttribute("data-set-lang"));
    });
  });

  // initial language
  const saved = localStorage.getItem("bad-school-lang");
  if (saved && ["ru", "en", "de"].includes(saved)) {
    applyLang(saved);
  } else {
    const nav = (navigator.language || "ru").toLowerCase();
    if (nav.startsWith("de")) applyLang("de");
    else if (nav.startsWith("en")) applyLang("en");
    else applyLang("ru");
  }
});