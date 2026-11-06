(() => {
  const toggle = document.querySelector("#layout-switch");
  const overlay = document.querySelector("#layout-overlay");
  const layer = overlay.querySelector("svg");
  const legend = document.querySelector("#layout-legend");
  const measurements = document.querySelector("#layout-measurements");
  const page = ".site-header, main, .site-footer";
  const grids = document.querySelectorAll(
    ".masthead-edition, .cover figcaption, .count-grid, .story, .cause-diagram, " +
    ".cause-diagram figcaption, .outcomes-intro, .outcome-grid, .protection-colony"
  );
  let point = null;
  let selected = null;
  let frame = 0;

  const px = (value) => Number.parseFloat(value) || 0;

  function sides(style, property, suffix = "") {
    return ["Top", "Right", "Bottom", "Left"].map((side) => px(style[property + side + suffix]));
  }

  function shape(parent, type, attributes) {
    const element = document.createElementNS(layer.namespaceURI, type);
    for (const [name, value] of Object.entries(attributes)) element.setAttribute(name, value);
    parent.append(element);
    return element;
  }

  function rectangle(parent, x, y, width, height, fill, stroke = "none") {
    if (width > 0 && height > 0) {
      shape(parent, "rect", { x, y, width, height, fill, stroke });
    }
  }

  function drawGrid(element, drawing) {
    const box = element.getBoundingClientRect();
    if (!box.width || box.bottom <= 0 || box.top >= window.innerHeight) return;
    const css = getComputedStyle(element);
    if (css.display !== "grid" && css.display !== "inline-grid") return;

    const padding = sides(css, "padding");
    const [top, right, bottom, left] = sides(css, "border", "Width")
      .map((width, i) => width + padding[i]);
    const x = box.left + left;
    const y = box.top + top;
    const width = box.width - left - right;
    const height = box.height - top - bottom;
    const purple = "#6d28d9";
    rectangle(drawing, x, y, width, height, "none", purple);

    function tracks(template, gap, horizontal) {
      let offset = 0;
      const sizes = template.match(/(?:\d*\.)?\d+px/g) || [];
      for (const size of sizes.slice(0, -1)) {
        offset += px(size);
        const line = horizontal
          ? `M${x + offset} ${y}v${height}`
          : `M${x} ${y + offset}h${width}`;
        shape(drawing, "path", { d: line, stroke: purple, "stroke-dasharray": "5 3" });
        if (horizontal) rectangle(drawing, x + offset, y, gap, height, "#7c3aed28");
        else rectangle(drawing, x, y + offset, width, gap, "#7c3aed28");
        offset += gap;
      }
    }
    tracks(css.gridTemplateColumns, px(css.columnGap), true);
    tracks(css.gridTemplateRows, px(css.rowGap), false);
  }

  function inspectable(element) {
    if (!element?.closest(page)) return null;
    // Inspecciona la caja de la figura o del montón, sin seleccionar cada trazo o ficha.
    element = element.closest("svg, .pile-layer")?.parentElement || element;
    while (element && (getComputedStyle(element).display === "inline" || !element.getBoundingClientRect().width)) {
      element = element.parentElement;
    }
    return element;
  }

  function drawBox(element, drawing) {
    const css = getComputedStyle(element);
    const box = element.getBoundingClientRect();
    const margin = sides(css, "margin");
    const padding = sides(css, "padding");
    const [bt, br, bb, bl] = sides(css, "border", "Width");
    let { width, height } = box;
    let transform = `translate(${box.left} ${box.top})`;
    if (css.transform !== "none" && element.offsetWidth) {
      const { a, b, c, d } = new DOMMatrixReadOnly(css.transform);
      width = element.offsetWidth;
      height = element.offsetHeight;
      const x = box.left - Math.min(0, a * width, c * height, a * width + c * height);
      const y = box.top - Math.min(0, b * width, d * height, b * width + d * height);
      transform = `matrix(${a} ${b} ${c} ${d} ${x} ${y})`;
    }
    const group = shape(drawing, "g", { transform });
    const [mt, mr, mb, ml] = margin.map((value) => Math.max(0, value));
    const [pt, pr, pb, pl] = padding;
    const orange = "#f973166b";
    const green = "#22c55e6b";
    rectangle(group, -ml, -mt, width + ml + mr, mt, orange);
    rectangle(group, -ml, height, width + ml + mr, mb, orange);
    rectangle(group, -ml, 0, ml, height, orange);
    rectangle(group, width, 0, mr, height, orange);
    rectangle(group, bl, bt, width - bl - br, pt, green);
    rectangle(group, bl, height - bb - pb, width - bl - br, pb, green);
    rectangle(group, bl, bt + pt, pl, height - bt - bb - pt - pb, green);
    rectangle(group, width - br - pr, bt + pt, pr, height - bt - bb - pt - pb, green);
    rectangle(group, 0, 0, width, height, "none", "#176298");

    const label = element.localName + (element.classList[0] ? "." + element.classList[0] : "");
    const values = (list) => list.map((value, i) => `${"↑→↓←"[i]}${Number(value.toFixed(1))}`).join(" ");
    const description = `${label} · Margen ${values(margin)} px · Padding ${values(padding)} px`;
    if (measurements.textContent !== description) measurements.textContent = description;
  }

  function visible(element) {
    const box = element?.getBoundingClientRect();
    return box && box.width > 0 && box.bottom > 0 && box.top < window.innerHeight;
  }

  function draw() {
    frame = 0;
    if (!toggle.checked) return;
    const drawing = document.createDocumentFragment();
    grids.forEach((element) => drawGrid(element, drawing));
    const hovered = point && inspectable(document.elementFromPoint(point.x, point.y));
    const hero = document.querySelector(".hero-copy");
    const element = hovered || (visible(selected) && selected) ||
      (visible(hero) && hero) || inspectable(document.elementFromPoint(window.innerWidth / 2, window.innerHeight / 2));
    if (element) drawBox(element, drawing);
    else measurements.textContent = "";
    layer.replaceChildren(drawing);
  }

  function schedule() {
    if (toggle.checked && !frame) frame = requestAnimationFrame(draw);
  }

  function aim(event) {
    if (!toggle.checked || event.target.closest(".demo-controls")) return;
    point = { x: event.clientX, y: event.clientY };
    selected = inspectable(event.target);
    schedule();
  }

  function updateVisibility() {
    overlay.hidden = legend.hidden = !toggle.checked;
    if (toggle.checked) schedule();
    else {
      point = selected = null;
      layer.replaceChildren();
    }
  }

  toggle.addEventListener("change", updateVisibility);
  window.addEventListener("scroll", schedule, { passive: true });
  window.addEventListener("resize", schedule);
  document.addEventListener("change", schedule);
  document.addEventListener("pointermove", (event) => {
    if (event.pointerType !== "touch") aim(event);
  }, { passive: true });
  document.addEventListener("pointerdown", aim, { passive: true });
  document.addEventListener("focusin", (event) => {
    if (!toggle.checked || !event.target.closest(page)) return;
    point = null;
    selected = inspectable(event.target);
    schedule();
  });
  document.querySelector("#layout-toggle").hidden = false;
  updateVisibility();
})();
