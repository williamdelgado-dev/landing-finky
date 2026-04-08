/**
 * renderer.js — Motor de renderizado dinámico para Plantilla 1
 *
 * Implementa las 6 Reglas de Oro:
 *  1. Banners: Desktop (1920×600) / Mobile (768×400). Aviso si no cumple.
 *  2. Logo: requiere fondo blanco (aviso visual).
 *  3. Texto Banner: titulo y contenido, máximo 100 caracteres cada uno.
 *  4. Bullets: 1–10 items. Título exactamente 2 palabras, desc ≤ 20 chars.
 *  5. Oferta Académica: select dinámico → scroll automático al simulador.
 *  6. Colores: 2 obligatorios (oscuro + claro) aplicados vía variables CSS.
 */

// ─── CONFIG POR DEFECTO (se sobreescribe con datos de DB) ─────────────────────
const DEFAULT_CONFIG = {
  plantilla: 1,
  colores: {
    oscuro: "#f91100ff",
    claro: "#ffffffff"
  },
  banner: {
    pc: "./images/ucc_campus_bg_1774448798607.png",        // URL imagen desktop (1920×600 recomendado)
    movil: "",     // URL imagen móvil  (768×400 recomendado)
    titulo: "Tu Futuro Académico Comienza Aquí",
    contenido: "Financia tu educación superior con planes flexibles diseñados para alcanzar tus metas profesionales"
  },
  bullets: [
    { titulo: "Aprobación Rápida", desc: "Solo 4 minutos" },
    { titulo: "Sin Codeudor", desc: "Proceso fácil" },
    { titulo: "100% Digital", desc: "Desde tu celular" },
    { titulo: "Sin Historial", desc: "Aplica ya mismo" },
    { titulo: "Inclusión Financiera", desc: "Para todos" },
    { titulo: "Prueba de bullets", desc: "Para todos" }
  ],
  oferta: ["Pregrado", "Posgrado", "Técnico", "Tecnólogo"]
};

// ─── DIMENSIONES DE REFERENCIA ────────────────────────────────────────────────
const BANNER_SIZES = {
  pc: { w: 1920, h: 600 },
  movil: { w: 768, h: 400 }
};

// ─── UTILIDADES ───────────────────────────────────────────────────────────────

/**
 * Muestra un toast de advertencia no bloqueante.
 * @param {string} message
 */
function showWarning(message) {
  const existing = document.getElementById('renderer-toast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.id = 'renderer-toast';
  toast.setAttribute('role', 'alert');
  toast.style.cssText = `
    position: fixed; bottom: 100px; left: 50%; transform: translateX(-50%);
    background: #ff9800; color: #fff; padding: 12px 24px; border-radius: 8px;
    font-family: 'Inter', sans-serif; font-size: 0.9rem; z-index: 9999;
    box-shadow: 0 4px 12px rgba(0,0,0,0.2); max-width: 90vw; text-align: center;
    animation: slideUp 0.3s ease;
  `;
  toast.textContent = `⚠️ ${message}`;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 5000);
}

/**
 * Verifica dimensiones reales de una imagen URL.
 * @param {string} url
 * @param {'pc'|'movil'} type
 */
function checkImageDimensions(url, type) {
  if (!url) return;
  const img = new Image();
  img.onload = () => {
    const { w, h } = BANNER_SIZES[type];
    if (img.naturalWidth !== w || img.naturalHeight !== h) {
      showWarning(
        `Banner ${type === 'pc' ? 'Desktop' : 'Móvil'}: se recomienda ${w}×${h}px. ` +
        `La imagen actual es ${img.naturalWidth}×${img.naturalHeight}px. ` +
        `Se cargará igual pero el ajuste podría no ser ideal.`
      );
    }
  };
  img.src = url;
}

/**
 * Valida que el texto del banner no supere 100 caracteres.
 * @param {string} text
 * @returns {string} texto truncado + aviso si excede
 */
function validateBannerText(text) {
  if (!text) return '';
  if (text.length > 100) {
    showWarning(`Texto del banner excede 100 caracteres (${text.length}). Se truncará.`);
    return text.slice(0, 100) + '…';
  }
  return text;
}

/**
 * Valida un bullet individual.
 * @param {{ titulo: string, desc: string }} bullet
 * @param {number} index
 * @returns {{ titulo: string, desc: string }}
 */
function validateBullet(bullet, index) {
  const palabras = (bullet.titulo || '').trim().split(/\s+/);
  if (palabras.length !== 2) {
    showWarning(`Bullet #${index + 1}: El título debe tener exactamente 2 palabras ("${bullet.titulo}").`);
  }

  let desc = (bullet.desc || '').trim();
  if (desc.length > 20) {
    showWarning(`Bullet #${index + 1}: La descripción excede 20 caracteres. Se truncará.`);
    desc = desc.slice(0, 20) + '…';
  }

  return { titulo: bullet.titulo, desc };
}

// ─── REGLAS DE ORO ────────────────────────────────────────────────────────────

/** REGLA 6: Aplica los 2 colores obligatorios vía variables CSS */
function applyColors(colores) {
  if (!colores || !colores.oscuro || !colores.claro) {
    showWarning('Colores incompletos. Se usan los valores por defecto.');
    return;
  }
  document.documentElement.style.setProperty('--color-oscuro', colores.oscuro);
  document.documentElement.style.setProperty('--color-claro', colores.claro);

  // Aplica alias para compatibilidad con las clases actuales
  document.documentElement.style.setProperty('--secondary-blue', colores.oscuro);
  document.documentElement.style.setProperty('--dark-bg', colores.oscuro);
  document.documentElement.style.setProperty('--gray-light', colores.claro);
}

/** REGLA 1+2+3: Renderiza el banner hero con imagen responsive y texto */
function renderBanner(banner) {
  const hero = document.getElementById('banner-hero');
  if (!hero) return;

  // Detecta si es móvil
  const isMobile = window.innerWidth <= 768;
  const url = isMobile ? (banner.movil || banner.pc) : (banner.pc || banner.movil);

  if (url) {
    hero.style.backgroundImage = `url('${url}')`;
    checkImageDimensions(url, isMobile ? 'movil' : 'pc');
  }

  // REGLA 3: titulo y contenido ≤ 100 chars cada uno
  const titulo = validateBannerText(banner.titulo || '');
  const contenido = validateBannerText(banner.contenido || '');

  const bannerTitleEl = document.getElementById('banner-title');
  const bannerSubEl = document.getElementById('banner-subtitle');

  if (bannerTitleEl) bannerTitleEl.textContent = titulo;
  if (bannerSubEl) bannerSubEl.textContent = contenido;

  // Re-render en resize para cambiar pc/móvil
  window.addEventListener('resize', () => {
    const nowMobile = window.innerWidth <= 768;
    const newUrl = nowMobile ? (banner.movil || banner.pc) : (banner.pc || banner.movil);
    if (newUrl) hero.style.backgroundImage = `url('${newUrl}')`;
  }, { passive: true });
}

/** REGLA 4: Renderiza bullets dinámicos (1–10) */
function renderBullets(bullets) {
  const container = document.getElementById('container-bullets');
  if (!container) return;

  if (!Array.isArray(bullets) || bullets.length === 0) {
    container.innerHTML = '';
    return;
  }

  // Limitar a máximo 10
  const items = bullets.slice(0, 10);

  const html = items.map((bullet, i) => {
    const validated = validateBullet(bullet, i);
    return `
      <li class="benefits-list__item">
        
        <div class="benefits-list__content">
          <strong class="benefits-list__title">${escapeHtml(validated.titulo)}</strong>
          <span class="benefits-list__desc">${escapeHtml(validated.desc)}</span>
        </div>
      </li>
    `;
  }).join('');

  container.innerHTML = `<ul class="benefits-list">${html}</ul>`;
}

/** REGLA 5: Renderiza el select de oferta académica + scroll al simulador */
function renderOferta(oferta) {
  const select = document.getElementById('select-oferta');
  if (!select) return;

  // Limpiar opciones previas
  select.innerHTML = '<option value="">Ofertas académicas</option>';

  if (Array.isArray(oferta) && oferta.length > 0) {
    oferta.forEach((item, i) => {
      const opt = document.createElement('option');
      opt.value = i + 1;
      opt.textContent = item;
      select.appendChild(opt);
    });
  }

  // Scroll automático al simulador al seleccionar una oferta
  select.addEventListener('change', () => {
    if (select.value) {
      const simulador = document.getElementById('seccion-simulador');
      if (simulador) {
        simulador.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  });
}

/** Helper: escapa HTML para prevenir XSS */
function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// ─── FUNCIÓN PRINCIPAL ────────────────────────────────────────────────────────

/**
 * Inicializa la plantilla con datos del JSON.
 * Puede llamarse con datos reales de tu DB o con el DEFAULT_CONFIG.
 * @param {{ config: object }} data
 */
function initPlantilla(data) {
  const config = (data && data.config) ? data.config : DEFAULT_CONFIG;

  // REGLA 6: Colores primero (afectan todo el CSS)
  applyColors(config.colores);

  // REGLA 1-2-3: Banner
  if (config.banner) {
    renderBanner(config.banner);
  }

  // REGLA 4: Bullets
  if (config.bullets) {
    renderBullets(config.bullets);
  }

  // REGLA 5: Oferta académica
  if (config.oferta) {
    renderOferta(config.oferta);
  }
}

// ─── ANIMACIÓN TOAST ──────────────────────────────────────────────────────────
(function injectToastAnimation() {
  if (document.getElementById('renderer-styles')) return;
  const style = document.createElement('style');
  style.id = 'renderer-styles';
  style.textContent = `
    @keyframes slideUp {
      from { opacity: 0; transform: translateX(-50%) translateY(20px); }
      to   { opacity: 1; transform: translateX(-50%) translateY(0); }
    }

    /* Bullets generados dinámicamente */
    .benefits-list {
      list-style: none;
      margin: 30px 0;
      padding: 0;
    }
    .benefits-list__item {
      display: flex;
      align-items: flex-start;
      gap: 12px;
      margin-bottom: 15px;
      font-size: 1.1rem;
      font-weight: 500;
    }
    .benefits-list__icon {
      color: var(--color-oscuro, var(--secondary-blue));
      font-weight: 700;
      flex-shrink: 0;
      margin-top: 2px;
    }
    .benefits-list__content {
      display: flex;
      flex-direction: column;
    }
    .benefits-list__title {
      font-weight: 700;
    }
    .benefits-list__desc {
      font-size: 0.9rem;
      color: #666;
    }
  `;
  document.head.appendChild(style);
})();

// ─── AUTO-INICIO con datos por defecto ───────────────────────────────────────
// Cuando lleguen datos reales de la DB, llama a: initPlantilla({ config: tuJSON })
document.addEventListener('DOMContentLoaded', () => {
  initPlantilla({ config: DEFAULT_CONFIG });
});

// Expone la función globalmente para uso externo (e.g., llamada desde fetch)
window.initPlantilla = initPlantilla;
