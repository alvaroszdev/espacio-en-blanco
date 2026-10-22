(function () {
  "use strict";
  const C = window.EB_CONFIG;
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];

  /* ---------- Datos de contacto desde config ---------- */
  $("#demoBar").hidden = !C.demo;
  $$("[data-senal]").forEach(el => (el.textContent = C.senal));
  $$("[data-dir]").forEach(el => (el.textContent = C.direccion));
  $$("[data-maps]").forEach(a => (a.href = "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(C.direccion)));
  $$("[data-tel]").forEach(a => { a.href = "tel:+" + C.whatsapp; a.textContent = C.telefonoVisible; });
  $$("[data-mail]").forEach(a => { a.href = "mailto:" + C.email; a.textContent = C.email; });
  $$("[data-ig]").forEach(a => { a.href = "https://www.instagram.com/" + C.instagram; a.textContent = "@" + C.instagram; });

  const waLink = text => "https://wa.me/" + C.whatsapp + "?text=" + encodeURIComponent(text);
  $("#waFloat").href = waLink("Hola, quería información sobre Espacio en Blanco.");

  /* ---------- Fechas ---------- */
  const pad = n => String(n).padStart(2, "0");
  const iso = d => d.getFullYear() + "-" + pad(d.getMonth() + 1) + "-" + pad(d.getDate());
  const today = new Date(); today.setHours(0, 0, 0, 0);
  // Estado de cada fecha: "reservado" | "pendiente" | "bloqueado"
  let busy = new Map();
  const setFromConfig = () => {
    busy = new Map();
    C.ocupadas.forEach(d => busy.set(d, "reservado"));
    C.bloqueadas.forEach(d => busy.set(d, "bloqueado"));
  };
  setFromConfig();
  const fmtLong = new Intl.DateTimeFormat("es-ES", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
  const fmtMonth = new Intl.DateTimeFormat("es-ES", { month: "long", year: "numeric" });
  const fromIso = s => { const [y, m, d] = s.split("-").map(Number); return new Date(y, m - 1, d); };

  const isFree = s => !busy.has(s) && fromIso(s) >= today;

  /* ---------- Calendario ---------- */
  let view = new Date(today.getFullYear(), today.getMonth(), 1);
  const maxView = new Date(today.getFullYear(), today.getMonth() + 12, 1);
  let selected = null;

  function renderCal() {
    const mt = fmtMonth.format(view);
    $("#calTitle").textContent = mt.charAt(0).toUpperCase() + mt.slice(1);
    $("#prevMonth").disabled = view <= new Date(today.getFullYear(), today.getMonth(), 1);
    $("#nextMonth").disabled = view >= maxView;

    const grid = $("#calDays");
    grid.innerHTML = "";
    const offset = (view.getDay() + 6) % 7; // lunes = 0
    const daysInMonth = new Date(view.getFullYear(), view.getMonth() + 1, 0).getDate();

    for (let i = 0; i < offset; i++) grid.appendChild(document.createElement("span"));

    for (let d = 1; d <= daysInMonth; d++) {
      const date = new Date(view.getFullYear(), view.getMonth(), d);
      const key = iso(date);
      const b = document.createElement("button");
      b.type = "button";
      b.className = "day";
      b.textContent = d;
      b.dataset.date = key;
      if (date < today) { b.classList.add("past"); b.disabled = true; }
      else if (busy.get(key) === "pendiente") { b.classList.add("hold"); b.disabled = true; b.setAttribute("aria-label", d + ", pre-reservado"); }
      else if (busy.has(key)) { b.classList.add("busy"); b.disabled = true; b.setAttribute("aria-label", d + ", reservado"); }
      else { b.classList.add("free"); b.setAttribute("aria-label", d + ", libre"); }
      if (+date === +today) b.classList.add("today");
      if (key === selected) b.classList.add("selected");
      grid.appendChild(b);
    }
  }

  $("#calDays").addEventListener("click", e => {
    const b = e.target.closest(".day.free");
    if (!b) return;
    selected = b.dataset.date;
    renderCal();
    updateChosen();
    if (window.innerWidth < 960) $("#bookingForm").scrollIntoView({ behavior: "smooth", block: "start" });
  });
  $("#prevMonth").addEventListener("click", () => { view.setMonth(view.getMonth() - 1); renderCal(); });
  $("#nextMonth").addEventListener("click", () => { view.setMonth(view.getMonth() + 1); renderCal(); });

  /* ---------- Formulario de reserva ---------- */
  const form = $("#bookingForm");
  $("#tipo").innerHTML = '<option value="">Elige…</option>' + C.tiposEvento.map(t => `<option>${t}</option>`).join("");
  $("#extras").innerHTML = C.extras.map(x => `
    <label class="extra">
      <input type="checkbox" name="extra" value="${x.id}">
      <span><strong>${x.nombre}</strong><small>${x.nota}</small></span>
    </label>`).join("");

  function dayBefore(s) { const d = fromIso(s); d.setDate(d.getDate() - 1); return iso(d); }

  function updateChosen() {
    const box = $("#chosenDate");
    if (!selected) { box.className = "chosen"; box.textContent = "Elige un día libre en el calendario"; return; }
    const txt = fmtLong.format(fromIso(selected));
    const wantsAlmacen = form.querySelector('input[value="almacen"]')?.checked;
    const prev = dayBefore(selected);
    if (wantsAlmacen && !isFree(prev)) {
      box.className = "chosen warn";
      box.textContent = txt + " · Ojo: la víspera ya está reservada, el almacén puede no estar disponible.";
    } else {
      box.className = "chosen ok";
      box.textContent = txt.charAt(0).toUpperCase() + txt.slice(1);
    }
  }
  form.addEventListener("change", e => { if (e.target.value === "almacen") updateChosen(); });

  form.addEventListener("submit", e => {
    e.preventDefault();
    const err = $("#formError");
    const f = new FormData(form);
    const missing = [];
    if (!selected) missing.push("el día");
    if (!f.get("tipo")) missing.push("el tipo de evento");
    if (!f.get("invitados")) missing.push("los invitados");
    if (!String(f.get("nombre") || "").trim()) missing.push("tu nombre");
    if (missing.length) { err.textContent = "Falta " + missing.join(", ") + "."; return; }
    err.textContent = "";

    const extras = f.getAll("extra").map(id => C.extras.find(x => x.id === id).nombre);
    const lines = [
      "Hola, quiero reservar en Espacio en Blanco:",
      "",
      "- Fecha: " + fmtLong.format(fromIso(selected)),
      "- Evento: " + f.get("tipo"),
      "- Invitados: " + f.get("invitados"),
      "- Horario: " + f.get("horario"),
      extras.length ? "- Extras: " + extras.join(", ") : null,
      String(f.get("comentarios") || "").trim() ? "- Comentarios: " + f.get("comentarios").trim() : null,
      "",
      "Nombre: " + f.get("nombre").trim(),
      "",
      "¿Me confirmáis disponibilidad para hacer el Bizum de " + C.senal + " € de señal?"
    ].filter(l => l !== null);

    window.open(waLink(lines.join("\n")), "_blank", "noopener");
  });

  /* ---------- Visita ---------- */
  const vDate = $("#visitDate");
  vDate.min = iso(today);
  $("#visitSlot").innerHTML = C.franjasVisita.map(s => `<option>${s}</option>`).join("");
  $("#visitForm").addEventListener("submit", e => {
    e.preventDefault();
    const f = new FormData(e.target);
    if (!f.get("dia") || !String(f.get("nombre")).trim()) { e.target.reportValidity(); return; }
    const msg = "Hola, me gustaría visitar Espacio en Blanco.\n\n- Día: " + fmtLong.format(fromIso(f.get("dia"))) +
      "\n- Franja: " + f.get("franja") + "\nNombre: " + f.get("nombre").trim() + "\n\n¿Me confirmáis la hora?";
    window.open(waLink(msg), "_blank", "noopener");
  });

  /* ---------- Galería ---------- */
  const lb = $("#lightbox");
  $("#gallery").addEventListener("click", e => {
    const g = e.target.closest(".g");
    if (!g || typeof lb.showModal !== "function") return;
    const img = $("img", lb);
    img.src = g.dataset.full;
    img.alt = $("img", g).alt;
    lb.showModal();
  });
  lb.addEventListener("click", () => lb.close());

  /* ---------- Calendario desde Google Sheets ---------- */
  // Acepta 2026-11-14, 14/11/2026, 14-11-2026 o 14/11/26
  function parseDate(raw) {
    const t = String(raw || "").trim().replace(/^"|"$/g, "");
    let m = t.match(/^(\d{4})-(\d{1,2})-(\d{1,2})/);
    if (m) return m[1] + "-" + pad(+m[2]) + "-" + pad(+m[3]);
    m = t.match(/^(\d{1,2})[\/.-](\d{1,2})[\/.-](\d{2,4})/);
    if (m) { const y = m[3].length === 2 ? "20" + m[3] : m[3]; return y + "-" + pad(+m[2]) + "-" + pad(+m[1]); }
    return null;
  }
  function parseEstado(raw) {
    const t = String(raw || "").trim().replace(/^"|"$/g, "").toLowerCase();
    if (!t || t.startsWith("reserv") || t.startsWith("confirm") || t === "ocupado") return "reservado";
    if (t.startsWith("pend") || t.startsWith("pre")) return "pendiente";
    if (t.startsWith("bloq") || t.startsWith("cerr")) return "bloqueado";
    return null; // "libre", "cancelado"… → no se marca
  }

  async function loadSheet() {
    if (!C.calendarioCsv) return;
    const status = $("#calStatus");
    try {
      const url = C.calendarioCsv + (C.calendarioCsv.includes("?") ? "&" : "?") + "t=" + Date.now();
      const res = await fetch(url, { cache: "no-store" });
      if (!res.ok) throw new Error(res.status);
      const map = new Map();
      const txt = await res.text();
      txt.split(/\r?\n/).forEach(line => {
        const [fecha, estado] = line.split(/[,;\t]/);
        const d = parseDate(fecha), e = parseEstado(estado);
        if (d && e) map.set(d, e);
      });
      busy = map;
      if (selected && busy.has(selected)) { selected = null; updateChosen(); }
      renderCal();
      if (status) status.textContent = "";
    } catch (err) {
      console.warn("No se pudo leer el calendario:", err);
      if (status) status.textContent = "Disponibilidad orientativa. Confírmala por WhatsApp.";
    }
  }

  renderCal();
  loadSheet();
})();
