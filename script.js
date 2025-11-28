const NUMBER = "4368110521180";

const messages = {
  ru: encodeURIComponent("Здравствуйте! Я хочу записаться на урок в B.A.D. School. Меня интересует: "),
  en: encodeURIComponent("Hello! I'd like to book a lesson at B.A.D. School. I'm interested in: "),
  de: encodeURIComponent("Hallo! Ich möchte eine Stunde bei B.A.D. School buchen. Mich interessiert: ")
};

let currentLang = "ru";

document.addEventListener("DOMContentLoaded", () => {

  // === ПЕРЕКЛЮЧЕНИЕ ЦЕН ===
  function applyPrices(lang) {
    const ind = document.getElementById("price-individual");
    const grp = document.getElementById("price-group");

    if (!ind || !grp) return;

    if (lang === "de") {
      ind.textContent = "40 €";
      grp.textContent = "35 €";
    } else if (lang === "en") {
      ind.textContent = "$40";
      grp.textContent = "$45";
    } else if (lang === "ru") {
      ind.textContent = "1500 ₽";
      grp.textContent = "1000 ₽";
    }
  }

  // === ПЕРЕКЛЮЧАТЕЛЬ ЯЗЫКА ===
  function applyLang(l) {
    currentLang = l;

    // обновляем цены
    applyPrices(l);

    // показываем нужные тексты
    document.querySelectorAll("[data-lang]").forEach(el => {
      el.style.display = el.getAttribute("data-lang") === l ? "block" : "none";
    });

    // Whatsapp ссылка
    const url = `https://wa.me/${NUMBER}?text=${messages[l]}`;
    ["cta-main", "cta-side", "cta-bottom"].forEach(id => {
      const a = document.getElementById(id);
      if (a) a.href = url;
    });

    // сохраняем язык
    localStorage.setItem("bad-school-lang", l);
  }

  // кнопки языка
  document.querySelectorAll("[data-set-lang]").forEach(btn => {
    btn.addEventListener("click", () => applyLang(btn.dataset.setLang));
  });

  // выбираем язык при загрузке
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