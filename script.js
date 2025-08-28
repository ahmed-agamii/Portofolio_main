function toggleMenu() {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");
  menu.classList.toggle("open");
  icon.classList.toggle("open");
}


// === Experience since Dec 2022, always up-to-date ===
const EXPERIENCE_START_ISO = "2022-12-01"; // change if needed
const EXP_NODE_ID = "experience-years";

function calculateExperienceLabel(startISO) {
  const start = new Date(startISO);
  const now = new Date();

  // years/months diff (month-accurate)
  let years = now.getFullYear() - start.getFullYear();
  let months = now.getMonth() - start.getMonth();

  if (months < 0 || (months === 0 && now.getDate() < start.getDate())) {
    years--;
    months += 12;
  }

  const totalMonths = years * 12 + months;

  // < 1 year → show months
  if (totalMonths < 12) {
    const m = Math.max(0, totalMonths);
    return `${m} month${m === 1 ? "" : "s"}`;
  }

  // 1.0 to <1.5 years → "1+ years"
  if (totalMonths >= 12 && totalMonths < 18) {
    return "1+ years";
  }

  // ≥ 1.5 years → round to nearest year (so 18–29 months → 2 years, etc.)
  const roundedYears = Math.round(totalMonths / 12);
  return `${roundedYears} year${roundedYears === 1 ? "" : "s"}`;
}

function renderExperience() {
  const el = document.getElementById(EXP_NODE_ID);
  if (el) el.textContent = calculateExperienceLabel(EXPERIENCE_START_ISO);
}

// Re-render now, then every midnight (local time)
function scheduleMidnightUpdate() {
  const now = new Date();
  const next = new Date(now);
  next.setDate(now.getDate() + 1);
  next.setHours(0, 5, 0, 0); // update at 00:05 to avoid DST edge cases
  const ms = next - now;
  setTimeout(() => {
    renderExperience();
    scheduleMidnightUpdate(); // reschedule again for the following day
  }, ms);
}

document.addEventListener("DOMContentLoaded", () => {
  renderExperience();
  scheduleMidnightUpdate();
});

// 1) Dynamic footer year
(function setFooterYear() {
  const el = document.getElementById('year');
  if (el) el.textContent = new Date().getFullYear();
})();

// 2) Open external links in a new tab safely
function openExternal(url) {
  window.open(url, '_blank', 'noopener,noreferrer');
}

// 3) OPTIONAL: Auto-calc experience years (set your start year)
(function setExperienceYears() {
  const START_YEAR = 2023; // <— change if needed
  const years = Math.max(0, new Date().getFullYear() - START_YEAR);
  const el = document.getElementById('experience-years');
  if (el) {
    el.textContent = years === 0 ? 'Less than 1 year' : `${years}+ years`;
  }
})();
