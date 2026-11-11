/* ====== EDITA AQUÍ ====== */
// Fotos de cada viaje: img/<slug>-1.webp e img/<slug>-2.webp
const VIAJES = [
  { slug: "pichilemu", lugar: "Pichilemu", fecha: "Oct 2023", motivo: "Primer viaje", vuelo: "SUP 001", puerta: "A2", asiento: "12A · 12B" },
  { slug: "santiago", lugar: "Santiago", fecha: "Verano 2024", motivo: "Paseo", vuelo: "SUP 014", puerta: "B5", asiento: "7C · 7D" },
  { slug: "argentina", lugar: "Argentina", fecha: "Mayo 2024", motivo: "Camp de SUP", vuelo: "SUP 027", puerta: "C1", asiento: "21E · 21F" },
  { slug: "eeuu", lugar: "Estados Unidos", fecha: "Nov 2024", motivo: "Primer mundial", vuelo: "SUP 038", puerta: "D9", asiento: "3A · 3B" },
  { slug: "iquique-1", lugar: "Iquique", fecha: "Abr 2025", motivo: "Competencia", vuelo: "SUP 046", puerta: "A7", asiento: "15C · 15D" },
  { slug: "mejillones", lugar: "Mejillones", fecha: "Oct 2025", motivo: "Competencia", vuelo: "SUP 059", puerta: "B3", asiento: "9A · 9B" },
  { slug: "el-salvador", lugar: "El Salvador", fecha: "Nov 2025", motivo: "Segundo mundial", vuelo: "SUP 063", puerta: "E4", asiento: "18E · 18F" },
  { slug: "iquique-2", lugar: "Iquique", fecha: "Abr 2026", motivo: "Competencia", vuelo: "SUP 072", puerta: "C8", asiento: "5C · 5D" }
];
const PAISES = 4, MUNDIALES = 2;
const BINGO = [
  { t: "Salir en la tele", c: "Pichilemu, octubre de 2023." },
  { t: "UNO en la playa", c: "Una carta verde, una pregunta." },
  { t: "Dos mundiales", c: "Estados Unidos y El Salvador." },
  { t: "Iquique ×2", c: "Abril de 2025 y abril de 2026." },
  { t: "Camp en Argentina", c: "Mayo de 2024." },
  { t: "Surfear juntos", c: "Las olas de Pichilemu." },
  { t: "Mejillones", c: "Octubre de 2025." },
  { t: "Un mundial más", c: "Falta. Lo vamos a hacer." },
  { t: "Otro país juntos", c: "Falta. Tú eliges el destino." }
];
// Pon tus mp3 en la carpeta /audio con estos nombres
const TRACKS = [
  { t: "Nuestra canción", a: "Artista", src: "audio/cancion-1.mp3" },
  { t: "La del viaje", a: "Artista", src: "audio/cancion-2.mp3" },
  { t: "La del mundial", a: "Artista", src: "audio/cancion-3.mp3" },
  { t: "La que me recuerda a ti", a: "Artista", src: "audio/cancion-4.mp3" },
  { t: "La de las competencias", a: "Artista", src: "audio/cancion-5.mp3" },
  { t: "La del auto", a: "Artista", src: "audio/cancion-6.mp3" },
  { t: "La que siempre repetimos", a: "Artista", src: "audio/cancion-7.mp3" },
  { t: "La del final", a: "Artista", src: "audio/cancion-8.mp3" }
];
// Cartas: la primera es la grande. Cada una se abre a pantalla completa.
const LETRAS = [
  { lbl: "Para Vicente", seal: "V", grande: true, t: "Vicente,", f: "Muriel",
    b: ["Tres años se miden en kilómetros, entrenamientos y madrugadas. También en lo que no sale en ninguna foto.", "Gracias por ser parte de lo que más me importa.", "Seguimos."] },
  { lbl: "Cuando me extrañes", t: "Falta menos de lo que parece.", f: "M.",
    b: ["Mientras tanto, abre cualquiera de las fotos de este sitio y quédate un rato ahí.", "Yo también estoy en algún lugar pensando en lo mismo."] },
  { lbl: "Cuando una competencia salga mal", t: "Un resultado es solo eso.", f: "M.",
    b: ["Lo que entrenaste, lo que viajaste y lo que has aprendido no se borra con un día malo.", "Descansa, come algo rico y mañana lo miramos juntos."] },
  { lbl: "Cuando necesites reírte", t: "Busca la foto de la tele.", f: "M.",
    b: ["Si no funciona, escríbeme: algo se me va a ocurrir."] },
  { lbl: "Cuando dudes de ti", t: "Una carta de UNO, una pregunta escrita a mano.", f: "M.",
    b: ["Ya lo hiciste una vez: dar el paso sin saber qué iba a pasar.", "Eso también eres tú."] }
];
// Cupones: cámbialos por los que quieras regalar
const CUPONES = [
  { t: "Cena a tu elección", d: "Tú eliges el lugar. Yo invito." },
  { t: "Un día a tu manera", d: "Todos los planes los decides tú." },
  { t: "Masaje de 20 minutos", d: "Sin apuro y sin celular." },
  { t: "Fotomatón", d: "Una sesión de cabina de fotos para los dos." },
  { t: "Plan sorpresa", d: "Lo organizo yo. Tú solo apareces." },
  { t: "Escapada corta", d: "Un fin de semana, a donde quieras ir." }
];
/* ========================= */

document.documentElement.classList.add("js");
// Tus fotos pueden ser .webp, .jpg, .jpeg o .png (con el mismo nombre): si una no existe, prueba la siguiente extensión
const EXTS = [".webp", ".jpg", ".jpeg", ".png", ".JPG", ".JPEG", ".PNG"];
const EXT_RE = /\.(webp|jpe?g|png)(\?.*)?$/i;
addEventListener("error", (e) => {
  const im = e.target;
  if (!(im instanceof HTMLImageElement) || !/\/img\//.test(im.src) || !EXT_RE.test(im.src)) return;
  const k = +(im.dataset.k || 0) + 1;
  if (k < EXTS.length) { e.stopImmediatePropagation(); im.dataset.k = k; im.src = im.src.replace(EXT_RE, EXTS[k]); }
}, true);
function carga(src, ok) {
  let k = 0; const im = new Image(); im.alt = "";
  im.onload = () => ok(im);
  im.onerror = () => { if (++k < EXTS.length) im.src = src.replace(EXT_RE, EXTS[k]); };
  im.src = src;
}
// Para volver a probar desde cero en tu dispositivo: abre index.html?reset
if (location.search.includes("reset")) { try { ["bingo", "bingo2", "cupones", "cupones2"].forEach(k => localStorage.removeItem(k)); } catch (e) {} }
const $ = (id) => document.getElementById(id);
const REDUCE = matchMedia("(prefers-reduced-motion:reduce)").matches;
const ph = (src, cls = "") => `<figure class="ph bn ${cls}"><img src="${src}" alt="" loading="lazy" onerror="this.remove()"></figure>`;
const unoHTML = (t) => `<span class="ovalo"></span><span class="txt">${t}</span><svg class="cn" aria-hidden="true"><use href="#rev"/></svg><svg class="cn b" aria-hidden="true"><use href="#rev"/></svg>`;
document.querySelectorAll("[data-uno]").forEach(el => el.innerHTML = unoHTML(el.dataset.uno));
const toggle = (el) => el.setAttribute("aria-pressed", String(el.getAttribute("aria-pressed") !== "true"));
const vib = (n = 12) => { try { navigator.vibrate && navigator.vibrate(n); } catch (e) {} };

function burst(el, n = 8) {
  if (REDUCE) return;
  for (let i = 0; i < n; i++) {
    const h = document.createElement("i"); h.className = "bh"; h.textContent = "♥";
    const a = Math.random() * Math.PI * 2, r = 26 + Math.random() * 28;
    h.style.setProperty("--dx", Math.cos(a) * r + "px"); h.style.setProperty("--dy", Math.sin(a) * r + "px");
    el.appendChild(h); setTimeout(() => h.remove(), 900);
  }
}
function lluvia(n = 30) {
  if (REDUCE) return;
  for (let i = 0; i < n; i++) {
    const h = document.createElement("span"); h.className = "confe"; h.textContent = "♥";
    h.style.left = Math.random() * 100 + "vw"; h.style.fontSize = 14 + Math.random() * 22 + "px"; h.style.animationDelay = Math.random() * 0.9 + "s";
    document.body.appendChild(h); setTimeout(() => h.remove(), 4200);
  }
}
$("uno1").onclick = (e) => { toggle(e.currentTarget); vib(); };
$("uno2").onclick = (e) => { toggle(e.currentTarget); vib(); };

/* ---- Fondo de cada sección ---- */
const lum = (h) => { const n = parseInt(h.slice(1), 16), c = [n >> 16, (n >> 8) & 255, n & 255].map(v => { v /= 255; return v <= .03928 ? v / 12.92 : ((v + .055) / 1.055) ** 2.4; }); return .2126 * c[0] + .7152 * c[1] + .0722 * c[2]; };
document.querySelectorAll("#v-inicio .sec[data-bg]").forEach(s => { const c = s.dataset.bg; s.style.backgroundColor = c; s.classList.toggle("dk", lum(c) < 0.2); });

/* ---- Hojas a pantalla completa (bingo y cupones) ---- */
let hojaAb = null;
function abreHoja(id) { const h = $("sh-" + id); h.hidden = false; hojaAb = h; document.body.style.overflow = "hidden"; h.scrollTop = 0; h.querySelector("[data-close]").focus(); vib(8); }
function cierraHoja() { $("bingo-fin").hidden = true; if (!hojaAb) return; hojaAb.hidden = true; hojaAb = null; document.body.style.overflow = ""; }
document.querySelectorAll("[data-sheet]").forEach(b => b.addEventListener("click", () => abreHoja(b.dataset.sheet)));
document.querySelectorAll("[data-close]").forEach(b => b.addEventListener("click", cierraHoja));
$("arriba").onclick = () => scrollTo({ top: 0, behavior: "smooth" });

/* ---- Calendario interactivo: recorre los meses y toca el 13 de noviembre ---- */
const MESES = ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];
const EVT = { "2023-09": "Empezamos a juntarnos solos", "2023-10": "Pichilemu", "2023-11": "Una carta verde", "2024-01": "Santiago", "2024-02": "Santiago",
  "2024-05": "Camp de SUP en Argentina", "2024-11": "Primer mundial · Estados Unidos", "2025-04": "Iquique", "2025-10": "Mejillones",
  "2025-11": "Segundo mundial · El Salvador", "2026-04": "Iquique otra vez", "2026-11": "Tres años" };
let cy = 2026, cmo = 10;
function cal() {
  const ini = (new Date(cy, cmo, 1).getDay() + 6) % 7, nd = new Date(cy, cmo + 1, 0).getDate();
  $("cal-title").textContent = `${MESES[cmo]} ${cy}`;
  let h = "LMMJVSD".split("").map(d => `<i class="d">${d}</i>`).join("") + "<i></i>".repeat(ini);
  for (let d = 1; d <= nd; d++) h += (cmo === 10 && cy >= 2023 && d === 13) ? `<button class="hoy" data-y="${cy}" aria-label="13 de noviembre de ${cy}">13</button>` : `<i>${d}</i>`;
  $("cal-grid").innerHTML = h;
  $("cal-cap").textContent = EVT[`${cy}-${String(cmo + 1).padStart(2, "0")}`] || "Un mes más";
  $("cal-dias").hidden = true;
  $("cal-prev").disabled = cy === 2023 && cmo === 8; $("cal-next").disabled = cy === 2026 && cmo === 10;
}
function mes(d) { cmo += d; if (cmo < 0) { cmo = 11; cy--; } if (cmo > 11) { cmo = 0; cy++; } cal(); vib(6); }
$("cal-prev").onclick = () => mes(-1); $("cal-next").onclick = () => mes(1);
$("cal-grid").addEventListener("click", (e) => {
  const b = e.target.closest(".hoy"); if (!b) return;
  burst(b, 10); vib(15);
  const N = Math.round((Date.UTC(+b.dataset.y, 10, 13) - Date.UTC(2023, 10, 13)) / 864e5), out = $("cal-dias");
  out.hidden = false;
  if (N === 0) { out.innerHTML = "<b>Día 1</b><span>Empezó aquí</span>"; return; }
  out.innerHTML = `<b id="cal-n">0</b><span>días juntos</span>`;
  if (REDUCE) { $("cal-n").textContent = N; return; }
  const t0 = performance.now();
  (function f(t) { const p = Math.min(1, (t - t0) / 1200); const n = $("cal-n"); if (!n) return; n.textContent = Math.round(N * (1 - (1 - p) ** 3)); if (p < 1) requestAnimationFrame(f); })(t0);
});
cal();

/* ---- Tele: cambia de canal al tocar (el CH 11 es la foto de ustedes) ---- */
const CANALES = [
  { n: 10, tick: "PICHILEMU · OCTUBRE 2023 · EN VIVO" },
  { n: 11, tick: "NOSOTROS · EN VIVO" },
  { n: 12, tick: "TRES AÑOS · EN VIVO" }
];
let tc = 0, tok = 0;
function canal(i, anim) {
  const s = $("screen"), my = ++tok, c = CANALES[i];
  $("canal").textContent = `CH ${c.n}`;
  $("tick").textContent = (c.tick + " · ").repeat(3);
  if (anim && !REDUCE) { const e = $("estatica"); e.classList.remove("on"); void e.offsetWidth; e.classList.add("on"); }
  s.querySelectorAll("img").forEach(im => im.remove());
  carga(`img/tele-${i + 1}.webp`, (im) => { if (my === tok) s.prepend(im); });
}
$("screen").onclick = () => { tc = (tc + 1) % CANALES.length; canal(tc, true); vib(8); };
canal(0, false);

/* ---- Viajes: boletos y avión que sigue el scroll ---- */
$("stats").innerHTML = [[VIAJES.length, "viajes"], [PAISES, "países"], [MUNDIALES, "mundiales"]]
  .map(([n, l]) => `<div><b data-n="${n}">0</b><small>${l}</small></div>`).join("");
$("viajes").innerHTML = VIAJES.map((v, i) => {
  const [a, b] = v.asiento.split(" · ");
  return `<article class="viaje rv">
    <p class="k">Viaje ${String(i + 1).padStart(2, "0")} / ${String(VIAJES.length).padStart(2, "0")}</p>
    <h3 class="city">${v.lugar}</h3>
    <div class="duo">${ph(`img/${v.slug}-1.webp`)}${ph(`img/${v.slug}-2.webp`)}</div>
    <div class="bt">
      <div class="bt-top"><span>Pase de abordar</span><span>${v.vuelo}</span></div>
      <div class="bt-body">
        <div class="bt-main">
          <div><small>Pasajeros</small><b>Muriel · Vicente</b></div>
          <div class="bt-dest"><small>Destino</small><b>${v.lugar}</b></div>
          <div class="bt-row"><div><small>Fecha</small>${v.fecha}</div><div><small>Motivo</small>${v.motivo}</div><div><small>Puerta</small>${v.puerta}</div></div>
        </div>
        <div class="bt-stub"><div><small>Asiento</small><b>${a}<br>${b}</b></div><i class="bar"></i></div>
      </div>
    </div>
  </article>`;
}).join("");
const cards = [...document.querySelectorAll(".viaje")];
$("via").insertAdjacentHTML("afterbegin", VIAJES.map((v, i) => `<button style="left:${i / (VIAJES.length - 1) * 100}%" aria-label="Ir a ${v.lugar}" data-i="${i}"></button>`).join("")
  + `<svg class="avion" id="avion" aria-hidden="true"><use href="#avion"/></svg>`);
$("via").addEventListener("click", (e) => { const b = e.target.closest("button"); if (b) cards[+b.dataset.i].scrollIntoView({ behavior: "smooth", block: "start" }); });
function avion() {
  const y = innerHeight * 0.5; let f = 0;
  cards.forEach((c, i) => { const r = c.getBoundingClientRect(); if (r.top <= y) f = i + Math.max(0, Math.min(1, (y - r.top) / r.height)); });
  f = Math.min(f, VIAJES.length - 1);
  const pos = f / (VIAJES.length - 1) * 100;
  $("avion").style.left = pos + "%"; $("fill").style.width = pos + "%";
  const k = Math.round(f);
  $("cur").textContent = `${VIAJES[k].lugar} · ${VIAJES[k].fecha}`;
  document.querySelectorAll("#via button").forEach((b, i) => b.classList.toggle("ok", i <= f + 0.05));
}
let tick = false;
addEventListener("scroll", () => { if (!tick) { tick = true; requestAnimationFrame(() => { avion(); tick = false; }); } }, { passive: true });
addEventListener("resize", avion);

/* ---- Visor de fotos ---- */
let lista = [], li = 0;
const swipe = (el, fn) => { let x0 = null; el.addEventListener("touchstart", e => { x0 = e.touches[0].clientX; }, { passive: true });
  el.addEventListener("touchend", e => { if (x0 === null) return; const dx = e.changedTouches[0].clientX - x0; if (Math.abs(dx) > 45) fn(dx < 0 ? 1 : -1); x0 = null; }, { passive: true }); };
function visor(l, i) { lista = l; li = i; muestra(); $("lb").hidden = false; }
function muestra() { const im = $("lb").querySelector("img"); delete im.dataset.k; im.src = lista[li]; $("lb-n").textContent = `${li + 1} / ${lista.length}`; }
const lbMueve = (d) => { li = (li + d + lista.length) % lista.length; muestra(); };
$("lb-p").onclick = () => lbMueve(-1); $("lb-s").onclick = () => lbMueve(1); $("lb-x").onclick = () => { $("lb").hidden = true; };
swipe($("lb"), lbMueve);
document.addEventListener("click", (e) => {
  const f = e.target.closest(".cap2 .ph, .duo .ph"); const img = f && f.querySelector("img");
  if (img) visor([img.src], 0);
});

/* ---- Tablero enmarcado de fotos ---- */
const GAL = Array.from({ length: 8 }, (_, i) => `img/galeria-${i + 1}.webp`);
const gi = (i) => `<div class="ft" data-i="${i}"><img src="${GAL[i]}" alt="" loading="lazy" onerror="this.remove()"></div>`;
$("tablero").innerHTML = `
  <div class="film">${[0, 1, 2, 3].map(gi).join("")}</div>
  <figure class="pola">${gi(4)}<figcaption>2023</figcaption></figure>
  <figure class="pola">${gi(5)}<figcaption>2024</figcaption></figure>
  <div class="postal"><small>POSTCARD</small><i class="sello-p"></i><span class="marker-t">para ti</span><u></u></div>
  <div class="encend"><span>13 · 11 · 2023</span></div>
  <div class="locks"><div class="loc" data-i="6"><span class="im"><img src="${GAL[6]}" alt="" loading="lazy" onerror="this.remove()"></span></div><div class="loc" data-i="7"><span class="im"><img src="${GAL[7]}" alt="" loading="lazy" onerror="this.remove()"></span></div></div>
  <div class="pase-l"><b>Pase libre</b><small>usos: ilimitados</small><small>vence: nunca</small></div>`;
$("tablero").addEventListener("click", (e) => { const f = e.target.closest("[data-i]"); const im = f && f.querySelector("img"); if (im) visor(GAL, +f.dataset.i); });

/* ---- Baraja ---- */
const VAL = ["7", "2", "J", "Q", null, "A", "8", "K", "3"]; let nf = 0;
const NAI = Array.from({ length: 8 }, (_, i) => `img/naipe-${i + 1}.webp`);
$("mesa").innerHTML = VAL.map(v => v === null
  ? `<div class="naipe ucard" style="--c:#B3342A">${unoHTML("te quiero más")}</div>`
  : `<div class="naipe"><i class="v">${v}<br>♥</i><div class="foto" data-i="${nf}"><img src="${NAI[nf++]}" alt="" loading="lazy" onerror="this.remove()"></div><i class="v b">${v}<br>♥</i></div>`).join("");
$("mesa").addEventListener("click", (e) => { const f = e.target.closest(".foto"); if (f && f.querySelector("img")) visor(NAI, +f.dataset.i); });

/* ---- Sobres: la carta se despliega a pantalla completa ---- */
$("sobres").innerHTML = LETRAS.map((l, i) => `<button class="sobre2 ${l.grande ? "grande" : ""}" data-i="${i}" aria-label="Abrir: ${l.lbl}"><span class="flap"></span><span class="seal">${l.seal || ""}</span><span class="lbl">${l.lbl}</span></button>`).join("");
let sobreAbierto = null;
$("sobres").addEventListener("click", (e) => {
  const b = e.target.closest(".sobre2"); if (!b || sobreAbierto) return;
  sobreAbierto = b; b.classList.add("abre"); vib(15);
  const l = LETRAS[+b.dataset.i];
  $("hoja-txt").innerHTML = `<p class="meta">13 · 11 · 2026</p><h3>${l.t}</h3>${l.b.map(p => `<p>${p}</p>`).join("")}<p class="firma">${l.f}</p>`;
  setTimeout(() => { $("ov").hidden = false; document.body.style.overflow = "hidden"; $("hoja2").scrollTop = 0; $("cerrar").focus(); }, REDUCE ? 0 : 450);
});
function cierra() {
  if ($("ov").hidden) return;
  $("ov").hidden = true; document.body.style.overflow = "";
  if (sobreAbierto) { const s = sobreAbierto; sobreAbierto = null; setTimeout(() => s.classList.remove("abre"), 200); s.focus(); }
}
$("cerrar").onclick = cierra;
$("ov").addEventListener("click", (e) => { if (e.target === $("ov")) cierra(); });
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") { cierra(); cierraHoja(); $("lb").hidden = true; }
  if (!$("lb").hidden) { if (e.key === "ArrowRight") lbMueve(1); if (e.key === "ArrowLeft") lbMueve(-1); }
});

/* ---- Bingo de corazones (widget + hoja) ---- */
$("fichas").innerHTML = "<i></i>".repeat(9);
const fi = [...$("fichas").children];
[1, 4, 6].forEach(i => fi[i].classList.add("on"));
if (!REDUCE) setInterval(() => fi[Math.floor(Math.random() * 9)].classList.toggle("on"), 900);
let bingoDone = false;
try { bingoDone = localStorage.getItem("bingo2") === "1"; } catch (e) {}
$("bingo").innerHTML = BINGO.map((b, i) => `<button class="corazon" aria-pressed="false" data-i="${i}"><span>${b.t}</span></button>`).join("");
$("bingo").addEventListener("click", (e) => {
  const h = e.target.closest(".corazon"); if (!h) return;
  toggle(h); vib(10);
  const on = h.getAttribute("aria-pressed") === "true";
  if (on) burst(h, 9);
  $("bingo-nota").textContent = on ? BINGO[+h.dataset.i].c : "Toca un corazón.";
  const n = document.querySelectorAll('.corazon[aria-pressed="true"]').length;
  $("bingo-n").textContent = `${n} de 9`;
  if (n === 9) bingoFinal();
});
function bingoFinal() {
  setTimeout(() => {
    lluvia(36); $("bingo-fin").hidden = false; rasca();
    if (!bingoDone) { bingoDone = true; try { localStorage.setItem("bingo2", "1"); } catch (e) {} cupones(); }
  }, REDUCE ? 0 : 500);
}
$("fin-seguir").onclick = () => { $("bingo-fin").hidden = true; };
// Tarjeta para raspar: el premio queda guardado en los cupones, sin cambiar de pantalla
function rasca() {
  const cv = $("rasca-cv"), w = cv.parentElement.clientWidth, h = cv.parentElement.clientHeight, dpr = Math.min(devicePixelRatio || 1, 2);
  cv.width = w * dpr; cv.height = h * dpr; cv.style.opacity = 1; cv.style.pointerEvents = "auto";
  $("rasca-nota").textContent = "Raspa la tarjeta.";
  const x = cv.getContext("2d"); x.setTransform(dpr, 0, 0, dpr, 0, 0); x.globalCompositeOperation = "source-over";
  const g = x.createLinearGradient(0, 0, w, h); g.addColorStop(0, "#c4c8ce"); g.addColorStop(.5, "#eceef1"); g.addColorStop(1, "#a7acb4");
  x.fillStyle = g; x.fillRect(0, 0, w, h);
  x.fillStyle = "#6b7280"; x.font = "700 14px 'Plus Jakarta Sans',sans-serif"; x.textAlign = "center"; x.textBaseline = "middle"; x.fillText("RASPA AQUÍ", w / 2, h / 2);
  x.globalCompositeOperation = "destination-out";
  let down = false, n = 0;
  const borra = (e) => {
    if (!down) return;
    const r = cv.getBoundingClientRect(); x.beginPath(); x.arc(e.clientX - r.left, e.clientY - r.top, 20, 0, 7); x.fill();
    if (++n % 5 === 0) revisa();
  };
  function revisa() {
    const d = x.getImageData(0, 0, cv.width, cv.height).data; let vacios = 0, total = 0;
    for (let i = 3; i < d.length; i += 64) { total++; if (d[i] === 0) vacios++; }
    if (vacios / total > 0.5) { cv.style.opacity = 0; cv.style.pointerEvents = "none"; $("rasca-nota").textContent = "Guardado en tus cupones."; vib(25); burst($("bingo-fin").querySelector(".rasca"), 12); }
  }
  cv.onpointerdown = (e) => { down = true; cv.setPointerCapture(e.pointerId); borra(e); };
  cv.onpointermove = borra;
  cv.onpointerup = cv.onpointercancel = () => { down = false; };
}

/* ---- Música (widget + página; sigue sonando en todo el sitio) ---- */
const audio = new Audio(); let ti = -1;
$("tracks").innerHTML = TRACKS.map((t, i) => `<li><button data-i="${i}" aria-current="false">${t.t}<small>${t.a}</small></button></li>`).join("");
function pista(i) {
  ti = i; const t = TRACKS[i];
  $("np-t").textContent = t.t; $("np-a").textContent = t.a; $("np-msg").textContent = "";
  document.querySelectorAll("#tracks button").forEach((b, k) => b.setAttribute("aria-current", String(k === i)));
  audio.src = t.src;
  audio.play().catch(() => { $("np-msg").textContent = `Agrega el archivo ${t.src} para escucharla`; });
}
$("tracks").addEventListener("click", (e) => { const b = e.target.closest("button"); if (b) pista(+b.dataset.i); });
const alterna = () => { if (ti < 0) pista(0); else if (audio.paused) audio.play().catch(() => {}); else audio.pause(); };
$("play").onclick = alterna; $("mini").onclick = alterna;
const etq = (playing) => { const g = playing ? "❚❚" : "▶"; $("play").textContent = g; $("mini").textContent = g;
  [$("play"), $("mini")].forEach(b => b.setAttribute("aria-label", playing ? "Pausar" : "Reproducir")); };
audio.onplay = () => { document.body.classList.add("sonando"); $("mini").hidden = false; etq(true); };
audio.onpause = () => { document.body.classList.remove("sonando"); etq(false); };
audio.onended = () => pista((ti + 1) % TRACKS.length);
audio.ontimeupdate = () => { $("pbar").style.width = (audio.duration ? audio.currentTime / audio.duration * 100 : 0) + "%"; };

/* ---- Cupones (widget + hoja; se guardan en este dispositivo) ---- */
$("abanico").innerHTML = CUPONES.slice(0, 3).map((c, i) => `<div class="mt"><i>${String(i + 1).padStart(2, "0")}</i><b>${c.t}</b></div>`).join("");
let canj = {};
try { canj = JSON.parse(localStorage.getItem("cupones2") || "{}"); } catch (e) {}
const SECRETO = { t: "Cupón sorpresa", d: "Un deseo a elección. Sin preguntas.", secreto: true };
function cupones() {
  const lista = CUPONES.concat(bingoDone ? [SECRETO] : []);
  let h = lista.map((c, i) => `
    <article class="cupon ${c.secreto ? "secreto" : ""} ${canj[i] ? "done" : ""}"><div class="stub">${c.secreto ? "★" : String(i + 1).padStart(2, "0")}</div>
    <div class="cuerpo"><h3>${c.t}</h3><p>${canj[i] ? "Canjeado el " + canj[i] : c.d}</p>
    <button data-i="${i}" ${canj[i] ? "disabled" : ""}>${canj[i] ? "Canjeado" : "Canjear"}</button></div></article>`).join("");
  if (!bingoDone) h += `<article class="cupon lock"><div class="stub">?</div><div class="cuerpo"><h3>Cupón secreto</h3><p>Se desbloquea al completar el bingo.</p></div></article>`;
  $("cupones").innerHTML = h;
  $("cup-extra").hidden = bingoDone;
}
function guardaCanj() { try { localStorage.setItem("cupones2", JSON.stringify(canj)); } catch (e) {} }
function toast(msg, undo) {
  document.querySelectorAll(".toast").forEach(t => t.remove());
  const t = document.createElement("div"); t.className = "toast"; t.setAttribute("role", "status");
  t.innerHTML = `<span>${msg}</span><button>Deshacer</button>`;
  t.querySelector("button").onclick = () => { undo(); t.remove(); };
  document.body.appendChild(t); setTimeout(() => t.remove(), 7000);
}
$("cupones").addEventListener("click", (e) => {
  const b = e.target.closest("button"); if (!b || b.disabled) return;
  const i = b.dataset.i;
  if (!b.classList.contains("conf")) { b.classList.add("conf"); b.textContent = "¿Confirmar?"; setTimeout(() => { if (b.isConnected && !canj[i]) { b.classList.remove("conf"); b.textContent = "Canjear"; } }, 3000); return; }
  canj[i] = new Date().toLocaleDateString("es-CL", { day: "numeric", month: "long" });
  guardaCanj(); vib(20); cupones();
  toast("Cupón canjeado", () => { delete canj[i]; guardaCanj(); cupones(); });
});
cupones();

/* ---- Aparecer al hacer scroll + contadores ---- */
const io = new IntersectionObserver((es) => es.forEach(en => {
  if (!en.isIntersecting) return;
  en.target.classList.add("in"); io.unobserve(en.target);
  en.target.querySelectorAll("[data-n]").forEach(el => {
    const n = +el.dataset.n; let k = 0;
    const t = setInterval(() => { el.textContent = ++k; if (k >= n) clearInterval(t); }, 140);
  });
}), { threshold: 0.15 });
document.querySelectorAll(".rv").forEach(el => io.observe(el));

/* ---- Estampados de texto (LOVE / love you) ---- */
document.querySelectorAll(".pat-love,.pat-you").forEach(sec => {
  const d = document.createElement("div"); d.className = "lovebg"; d.setAttribute("aria-hidden", "true");
  d.textContent = sec.classList.contains("pat-love") ? "LOVE".repeat(900) : "love you  ".repeat(300);
  sec.prepend(d);
});

avion();
