const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

// El panel se fija con CSS. JavaScript traduce la distancia recorrida a una fila.
const countTrack = document.querySelector(".count-track");
const countPanel = countTrack.querySelector(".count-panel");
const countRows = Array.from(document.querySelectorAll(".count-record tbody tr"), (row) =>
  Array.from(row.cells, (cell) => Number(cell.textContent))
);
const counters = ["birds", "pigs"].map((group) => ({
  total: countPanel.querySelector(`[data-total="${group}"]`),
  tokens: Array.from(countPanel.querySelectorAll(`.count-${group} [data-order]`))
    .sort((a, b) => Number(a.dataset.order) - Number(b.dataset.order)),
}));
const lastShot = countRows.length - 1;
let activeShot = -1;
let scrollFrame = 0;

function fitCountPanel() {
  // Si la pila supera la ventana, el scroll permite recorrerla y fija los contadores al pie.
  countTrack.style.setProperty("--pin-top", `${Math.min(12, window.innerHeight - countPanel.offsetHeight - 80)}px`);
}

function updateCount() {
  scrollFrame = 0;
  fitCountPanel();
  const stickyTop = parseFloat(getComputedStyle(countPanel).top);
  const travel = countTrack.offsetHeight - countPanel.offsetHeight;
  const distance = stickyTop - countTrack.getBoundingClientRect().top;
  const progress = Math.max(0, Math.min(1, distance / travel));
  const shot = Math.round(progress * lastShot);
  if (shot === activeShot) return;

  // Cada figura conserva su lugar. Solo se anima al entrar en el montón.
  activeShot = shot;
  counters.forEach(({ total, tokens }, index) => {
    const value = countRows[shot][index];
    total.textContent = value;
    tokens.forEach((token, tokenIndex) => token.classList.toggle("is-counted", tokenIndex < value));
  });
}

function scheduleCount() {
  if (!scrollFrame) scrollFrame = requestAnimationFrame(updateCount);
}

countTrack.classList.add("is-scrolling");
updateCount();
window.addEventListener("scroll", scheduleCount, { passive: true });
window.addEventListener("resize", scheduleCount);
window.addEventListener("pageshow", scheduleCount);
// Compara el diseño conservando el lanzamiento visible, aunque cambie la tipografía.
const brandbookSwitch = document.querySelector("#brandbook-switch");
let comparisonShot = null;
function rememberComparisonShot() {
  const top = countPanel.getBoundingClientRect().top;
  const pinTop = parseFloat(getComputedStyle(countPanel).top);
  comparisonShot = Math.abs(top - pinTop) < 3 ? activeShot : null;
}
brandbookSwitch.closest("label").addEventListener("pointerdown", rememberComparisonShot);
brandbookSwitch.addEventListener("keydown", (event) => {
  if (event.key === " " || event.key === "Enter") rememberComparisonShot();
});
brandbookSwitch.addEventListener("change", () => {
  const shot = comparisonShot;
  comparisonShot = null;
  requestAnimationFrame(() => {
    fitCountPanel();
    if (shot !== null) {
      const pinTop = parseFloat(getComputedStyle(countPanel).top);
      const travel = countTrack.offsetHeight - countPanel.offsetHeight;
      const top = window.scrollY + countTrack.getBoundingClientRect().top - pinTop + travel * shot / lastShot;
      window.scrollTo({ top, behavior: "instant" });
    }
    updateCount();
  });
});

// La curva se dibuja sobre el paisaje. Al llegar al suelo, el ciclo se repite.
document.querySelectorAll(".outcome-chart").forEach((chart) => {
  const path = chart.querySelector("[data-outcome-path]");
  const outline = chart.querySelector("[data-outcome-outline]");
  const icon = chart.querySelector("[data-outcome-icon]");
  const length = path.getTotalLength();
  const dive = icon.hasAttribute("data-dive");
  const startPause = 250;
  const travelDuration = 2900;
  const endPause = 1300;
  const cycle = startPause + travelDuration + endPause;
  let visible = false;
  let start = 0;
  let frame = 0;

  function paint(progress) {
    const distance = progress * length;
    const point = path.getPointAtLength(distance);
    const before = path.getPointAtLength(Math.max(0, distance - 2));
    const after = path.getPointAtLength(Math.min(length, distance + 2));
    const slope = Math.atan2(after.y - before.y, after.x - before.x) * 180 / Math.PI;
    const rotation = dive ? slope + 5 : progress * 125;
    icon.setAttribute("transform", `translate(${point.x} ${point.y - 48}) rotate(${rotation})`);
    for (const line of [path, outline]) {
      line.style.strokeDasharray = length;
      line.style.strokeDashoffset = length * (1 - progress);
    }
    chart.classList.toggle("has-impact", progress === 1 && !reducedMotion.matches);
  }

  function animate(now) {
    const elapsed = (now - start) % cycle;
    const linear = Math.max(0, Math.min(1, (elapsed - startPause) / travelDuration));
    // La aceleración hace visible la caída de cada especie.
    paint(linear * linear);
    frame = requestAnimationFrame(animate);
  }

  function sync() {
    cancelAnimationFrame(frame);
    if (reducedMotion.matches) {
      paint(1);
      return;
    }
    if (!visible || document.hidden) return;
    start = performance.now();
    frame = requestAnimationFrame(animate);
  }

  if ("IntersectionObserver" in window) {
    new IntersectionObserver(([entry]) => {
      visible = entry.intersectionRatio >= .2;
      sync();
    }, { threshold: .2 }).observe(chart);
  }
  reducedMotion.addEventListener("change", sync);
  document.addEventListener("visibilitychange", sync);
  if (reducedMotion.matches) paint(1);
});

// Una fila de la tabla por refugio: funciona también sin un servidor de datos.
const protectionStory = document.querySelector(".protection-story");
const protectionRows = new Map(
  Array.from(protectionStory.querySelectorAll(".protection-record tbody tr"), (row) => [
    row.dataset.protection,
    {
      label: row.cells[0].textContent,
      birds: Number(row.cells[1].textContent),
      defeated: Number(row.cells[2].textContent),
      safe: Number(row.cells[3].textContent)
    }
  ])
);
const protectionButtons = Array.from(protectionStory.querySelectorAll("[data-protection-choice]"));
const protectionPigs = Array.from(protectionStory.querySelectorAll(".protection-pig"));
const protectionProjectile = protectionStory.querySelector(".protection-projectile");
const protectionWorld = protectionStory.querySelector(".protection-world");
const protectionResult = protectionStory.querySelector(".protection-result");
const protectionStatus = protectionStory.querySelector(".protection-equation");
let protectionAnimations = [];
let protectionRun = 0;

function stopProtectionAnimation() {
  protectionAnimations.forEach((animation) => animation.cancel());
  protectionAnimations = [];
}

function paintProtectionCount(birds, defeated) {
  protectionStory.querySelector("[data-protection-birds]").textContent = birds;
  protectionStory.querySelector("[data-protection-bird-label]").textContent = birds === 1 ? "Angry Bird lanzado" : "Angry Birds lanzados";
  protectionStory.querySelector("[data-protection-defeated]").textContent = defeated;
  protectionStory.querySelector("[data-protection-safe]").textContent = protectionPigs.length - defeated;
}

function paintProtectionPig(pig, defeated) {
  const sprite = pig.querySelector("img");
  pig.classList.toggle("is-defeated", defeated);
  sprite.src = defeated ? "assets/minion-pig-damaged-2.png" : "assets/minion-pig-normal.png";
  sprite.className = defeated ? "sprite-damaged" : "sprite-normal";
}

// La trayectoria llega al primer chancho y se adapta al tamaño de la pantalla.
function protectionGeometry() {
  const world = protectionWorld.getBoundingClientRect();
  const target = protectionPigs[0].getBoundingClientRect();
  const startX = protectionProjectile.offsetLeft + protectionProjectile.offsetWidth / 2;
  const startY = protectionProjectile.offsetTop + protectionProjectile.offsetHeight / 2;
  const dx = target.left - world.left - startX - protectionProjectile.offsetWidth * .2;
  const dy = target.top - world.top + target.height * .6 - startY;
  const arc = Math.min(95, protectionWorld.clientHeight * .25);
  const ground = protectionWorld.clientHeight - 36 - protectionProjectile.offsetTop - protectionProjectile.offsetHeight;
  protectionStory.style.setProperty("--flight-x", `${dx - 12}px`);
  protectionStory.style.setProperty("--flight-ground-y", `${ground}px`);
  const trail = protectionStory.querySelector(".protection-trajectory");
  trail.setAttribute("viewBox", `0 0 ${world.width} ${world.height}`);
  trail.querySelector("path").setAttribute("d", `M${startX} ${startY} Q${startX + dx / 2} ${startY + dy / 2 - 2 * arc} ${startX + dx} ${startY + dy}`);
  return { dx, dy, arc, ground };
}

function animateProtection(element, frames, options) {
  const animation = element.animate(frames, options);
  protectionAnimations.push(animation);
  return animation;
}

async function protectionAnimationFinished(animation, run) {
  try { await animation.finished; } catch { return false; }
  return run === protectionRun;
}

function finishProtection(row) {
  protectionPigs.forEach((pig, index) => paintProtectionPig(pig, index < row.defeated));
  paintProtectionCount(row.birds, row.defeated);
  protectionStatus.textContent = `${row.label}: ${row.defeated} chanchos derrotados con un solo lanzamiento.`;
  protectionStory.dataset.phase = "done";
  stopProtectionAnimation();
  protectionResult.setAttribute("aria-busy", "false");
}

async function chooseProtection(key) {
  const row = protectionRows.get(key);
  if (!row) return;
  const run = ++protectionRun;
  stopProtectionAnimation();
  protectionStory.dataset.protection = key;
  protectionStory.dataset.phase = "flying";
  protectionResult.setAttribute("aria-busy", "true");
  protectionButtons.forEach((button) => {
    button.setAttribute("aria-pressed", String(button.dataset.protectionChoice === key));
  });
  protectionPigs.forEach((pig) => paintProtectionPig(pig, false));
  paintProtectionCount(1, 0);
  protectionStatus.textContent = "Un Angry Bird en vuelo…";
  const { dx, dy, arc, ground } = protectionGeometry();

  if (reducedMotion.matches) {
    finishProtection(row);
    return;
  }

  const flight = animateProtection(protectionProjectile, Array.from({ length: 25 }, (_, index) => {
    const t = index / 24;
    return { offset: t, transform: `translate(${dx * t}px, ${dy * t - 4 * arc * t * (1 - t)}px) rotate(${-17 + 37 * t}deg)` };
  }), { duration: 1250, easing: "ease-in", fill: "forwards" });
  if (!await protectionAnimationFinished(flight, run)) return;

  // Solo después del impacto cambian los personajes y el contador, uno a uno.
  protectionStory.dataset.phase = "impact";
  animateProtection(protectionProjectile, [
    { transform: `translate(${dx}px, ${dy}px) rotate(20deg)` },
    { transform: `translate(${dx - 12}px, ${ground}px) rotate(36deg)` }
  ], { duration: 300, easing: "ease-out", fill: "forwards" });
  if (key !== "none") {
    animateProtection(protectionStory.querySelector(".protection-shelter"), [
      { transform: "translateX(0)" }, { transform: "translateX(5px)" },
      { transform: "translateX(-3px)" }, { transform: "none" }
    ], { duration: 280 });
  }
  for (let index = 0; index < row.defeated; index++) {
    paintProtectionPig(protectionPigs[index], true);
    paintProtectionCount(1, index + 1);
    protectionStatus.textContent = `Impacto: ${index + 1} ${index === 0 ? "chancho derrotado" : "chanchos derrotados"}…`;
    const fall = animateProtection(protectionPigs[index], [
      { transform: "translate(-5px, -18px) rotate(-25deg)" },
      { transform: "translate(3px, 3px) rotate(6deg)", offset: .7 },
      { transform: "none" }
    ], { duration: 320, easing: "ease-out" });
    if (!await protectionAnimationFinished(fall, run)) return;
  }
  finishProtection(row);
}

protectionButtons.forEach((button) => {
  button.addEventListener("click", () => chooseProtection(button.dataset.protectionChoice));
});
protectionStory.querySelector(".protection-controls").hidden = false;
protectionStory.dataset.phase = "ready";
protectionPigs.forEach((pig) => paintProtectionPig(pig, false));
paintProtectionCount(0, 0);
protectionStatus.textContent = "Elige una protección. Cada clic comienza un nuevo lanzamiento.";

function refreshProtectionLayout() {
  if (["flying", "impact"].includes(protectionStory.dataset.phase)) {
    ++protectionRun;
    finishProtection(protectionRows.get(protectionStory.dataset.protection));
  }
  if (protectionStory.dataset.phase === "done") protectionGeometry();
}
window.addEventListener("resize", refreshProtectionLayout);
reducedMotion.addEventListener("change", refreshProtectionLayout);
brandbookSwitch.addEventListener("change", () => requestAnimationFrame(refreshProtectionLayout));

// El cierre dibuja dos trayectorias que se aplanan por encima de cero.
const equilibriumChart = document.querySelector(".equilibrium-chart");
const equilibriumSeries = Array.from(equilibriumChart.querySelectorAll(".equilibrium-series"), (series) => {
  const path = series.querySelector("[data-balance-path]");
  return { path, outline: series.querySelector("[data-balance-outline]"), icon: series.querySelector("[data-balance-icon]"), length: path.getTotalLength() };
});
let equilibriumVisible = false;
let equilibriumFrame = 0;
let equilibriumStart = 0;

function paintEquilibrium(progress) {
  equilibriumSeries.forEach(({ path, outline, icon, length }) => {
    const point = path.getPointAtLength(progress * length);
    icon.setAttribute("transform", `translate(${point.x} ${point.y})`);
    for (const line of [path, outline]) {
      line.style.strokeDasharray = length;
      line.style.strokeDashoffset = length * (1 - progress);
    }
  });
}

function animateEquilibrium(now) {
  const elapsed = (now - equilibriumStart) % 7500;
  paintEquilibrium(Math.min(1, elapsed / 4800));
  equilibriumFrame = requestAnimationFrame(animateEquilibrium);
}

function syncEquilibrium() {
  cancelAnimationFrame(equilibriumFrame);
  if (reducedMotion.matches) { paintEquilibrium(1); return; }
  if (!equilibriumVisible || document.hidden) return;
  equilibriumStart = performance.now();
  equilibriumFrame = requestAnimationFrame(animateEquilibrium);
}

if ("IntersectionObserver" in window) {
  new IntersectionObserver(([entry]) => {
    equilibriumVisible = entry.intersectionRatio >= .3;
    syncEquilibrium();
  }, { threshold: .3 }).observe(equilibriumChart);
}
reducedMotion.addEventListener("change", syncEquilibrium);
document.addEventListener("visibilitychange", syncEquilibrium);
if (reducedMotion.matches) paintEquilibrium(1);

