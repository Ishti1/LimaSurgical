(() => {
  const $ = (sel, root = document) => root.querySelector(sel);

  function waUrl(text) {
    const num = (window.LIMA.whatsapp || "").replace(/\D/g, "");
    return `https://wa.me/${num}?text=${encodeURIComponent(text)}`;
  }

  function productMessage(p, extra = "") {
    const specs = Object.entries(p.specs)
      .map(([k, v]) => `• ${k}: ${v}`)
      .join("\n");
    return [
      `Hello ${window.LIMA.brand},`,
      `I want to inquire / pre-order:`,
      ``,
      `Product: ${p.name}`,
      `Delivery (listed): ${p.delivery}`,
      `Price: to be confirmed (custom quotation)`,
      extra ? `\n${extra}` : "",
      ``,
      `Key specifications:`,
      specs,
      ``,
      `Please confirm availability, colour, magnification, and final price.`,
    ]
      .filter((line) => line !== "")
      .join("\n");
  }

  function iconWa() {
    return `<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M20 11.5A8.5 8.5 0 0 1 7.4 19.1L3.5 20.5l1.5-3.8A8.5 8.5 0 1 1 20 11.5zm-8.5 6.7c1.2 0 2.3-.3 3.3-.8l.2-.1 2.1.7-.7-2 .1-.2a6.7 6.7 0 1 0-5 2.4zm3.7-4.9c-.2-.1-1.2-.6-1.4-.7-.2-.1-.3-.1-.5.1l-.5.6c-.1.1-.3.2-.5.1-.7-.3-1.4-.8-1.9-1.5-.2-.2 0-.4.1-.5l.4-.5c.1-.1.1-.3 0-.5l-.7-1.6c-.2-.4-.4-.4-.5-.4h-.4c-.2 0-.5.1-.7.3-.2.3-.9.9-.9 2.1s.9 2.4 1 2.6c.1.2 1.8 2.8 4.4 3.8 1.8.7 2.2.6 2.6.5.4-.1 1.2-.5 1.4-1 .2-.5.2-.9.1-1 0-.1-.2-.1-.4-.2z"/></svg>`;
  }

  function header(active) {
    const link = (href, label, key) =>
      `<a href="${href}" class="${active === key ? "is-active" : ""}">${label}</a>`;
    return `
      <div class="topbar">
        <span>For dentists, oral surgeons, ENT & theatre teams</span>
        <a href="${waUrl("Hello Lima Surgical Equipment, I would like product guidance.")}">WhatsApp ${window.LIMA.whatsappDisplay}</a>
      </div>
      <header class="site-header">
        <a class="brand" href="index.html">
          <span class="brand-mark" aria-hidden="true">L</span>
          <span>
            <strong>LIMA</strong>
            <em>Surgical Equipment</em>
          </span>
        </a>
        <button class="nav-toggle" type="button" aria-label="Open menu">Menu</button>
        <nav class="nav">
          ${link("index.html", "Home", "home")}
          ${link("products.html", "Loupes & lights", "products")}
          ${link("why-loupes.html", "Why loupes", "why")}
          ${link("sectors.html", "Who we serve", "sectors")}
          ${link("preorder.html", "Pre-order", "preorder")}
          ${link("about.html", "About", "about")}
          <a class="btn btn-wa" href="${waUrl("Hello Lima Surgical Equipment, I want to pre-order surgical loupes.")}">${iconWa()} Chat on WhatsApp</a>
        </nav>
      </header>`;
  }

  function footer() {
    return `
      <footer class="site-footer">
        <div class="footer-grid">
          <div>
            <div class="brand brand-foot">
              <span class="brand-mark">L</span>
              <span><strong>LIMA</strong><em>Surgical Equipment</em></span>
            </div>
            <p>Clinical magnification and coaxial lighting for surgery- and dentistry-related practice. Prices are quoted per order on WhatsApp.</p>
          </div>
          <div>
            <h4>Catalogue</h4>
            <a href="products.html">All products</a>
            <a href="why-loupes.html">Why surgical loupes</a>
            <a href="sectors.html">Dental & surgical sectors</a>
            <a href="preorder.html">Pre-order</a>
          </div>
          <div>
            <h4>Order desk</h4>
            <p>WhatsApp ${window.LIMA.whatsappDisplay}</p>
            <p>Typical delivery ${window.LIMA.deliveryDefault}</p>
            <p>${window.LIMA.preorderNote}</p>
          </div>
        </div>
        <p class="legal">© ${new Date().getFullYear()} Lima Surgical Equipment. Product images from the current loupe catalogue. Specifications as provided by the manufacturer sheet.</p>
      </footer>
      <a class="wa-float" href="${waUrl("Hello Lima Surgical Equipment, I need help choosing a surgical loupe.")}" aria-label="WhatsApp">${iconWa()}</a>`;
  }

  function card(p) {
    return `
      <article class="card">
        <a class="card-media" href="product.html?id=${p.id}">
          <img src="${p.image}" alt="${p.name}">
          <span class="badge">${p.badge}</span>
        </a>
        <div class="card-body">
          <p class="kicker">${p.category}</p>
          <h3><a href="product.html?id=${p.id}">${p.name}</a></h3>
          <p>${p.short}</p>
          <ul class="meta">
            <li>${p.priceLabel}</li>
            <li>Delivery ${p.delivery}</li>
            <li>${p.preorder ? "Pre-order open" : ""}</li>
          </ul>
          <div class="card-actions">
            <a class="btn btn-wa" href="${waUrl(productMessage(p))}">${iconWa()} WhatsApp</a>
            <a class="btn btn-ghost" href="product.html?id=${p.id}">Full specs</a>
          </div>
        </div>
      </article>`;
  }

  window.LimaUI = {
    waUrl,
    productMessage,
    iconWa,
    mountShell(active) {
      const shell = document.createElement("div");
      shell.innerHTML = header(active) + `<main id="app-main"></main>` + footer();
      document.body.prepend(...shell.childNodes);
      const toggle = $(".nav-toggle");
      const nav = $(".nav");
      toggle?.addEventListener("click", () => nav.classList.toggle("open"));
    },
    renderCards(list, target) {
      target.innerHTML = list.map(card).join("");
    },
    byId(id) {
      return window.LIMA_PRODUCTS.find((p) => p.id === id);
    },
    qs(name) {
      return new URLSearchParams(location.search).get(name);
    },
  };
})();
