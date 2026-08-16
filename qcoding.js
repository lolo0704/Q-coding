/**
 * Q-Coding v1.8
 *
 * Mémoire structurée de développement pour les sessions de développement
 * avec une IA.
 *
 * Principes :
 * - Vanilla JS autonome, zéro dépendance.
 * - Intégration embarquée dans le fichier HTML de l'application.
 * - CSS strictement scopé au conteneur Q-Coding.
 * - Aucun framework ni build nécessaire.
 * - Affiche la mémoire structurée du projet :
 *   cap, exigences [req], bugs [bug], architecture [arch]
 *   et pistes différées [ad].
 */
(function () {
  'use strict';

  /* ===========================================================
     STYLES CSS STRICTEMENT SCOPÉS
     =========================================================== */
  const styles = `
    #qc-app-host {
      position: fixed !important;
      inset: 0 !important;
      width: 100% !important;
      height: 100% !important;
      z-index: 99999 !important;
      overflow: hidden !important;
      background: #0b0d13 !important;
    }
    #qc-btn-fermer {
      position: absolute;
      top: 12px;
      right: 16px;
      z-index: 100000;
      width: 36px;
      height: 36px;
      border: none;
      border-radius: 8px;
      background: #2a3142;
      color: #e6e8ec;
      font-size: 20px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: background 0.15s;
    }
    #qc-btn-fermer:hover {
      background: #e53e3e;
      color: white;
    }
    #qc-conteneur-global {
      --qc-fond: #0b0d13;
      --qc-surface: #141720;
      --qc-surface-2: #1c212d;
      --qc-bordure: #2a3142;
      --qc-texte: #e6e8ec;
      --qc-texte-atténué: #9ba1ad;
      --qc-accent: #6c9eff;
      --qc-accent-doux: rgba(108, 158, 255, 0.12);
      --qc-vert: #4ade80;
      --qc-orange: #fbbf24;
      --qc-rouge: #f87171;
      --qc-violet: #c084fc;
      --qc-largeur-barre: 290px;
      --qc-largeur-barre-reduite: 58px;
      width: 100%;
      height: 100%;
      min-height: 380px;
      display: flex;
      background: var(--qc-fond);
      color: var(--qc-texte);
      font-family: 'Inter', system-ui, -apple-system, sans-serif;
      box-sizing: border-box;
      position: relative;
      overflow: hidden;
      text-align: left;
    }
    #qc-conteneur-global *,
    #qc-conteneur-global *::before,
    #qc-conteneur-global *::after {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    /* 1. BARRE LATÉRALE */
    #qc-barre-laterale {
      width: var(--qc-largeur-barre);
      min-width: var(--qc-largeur-barre);
      height: 100%;
      background: var(--qc-surface);
      border-right: 1px solid var(--qc-bordure);
      display: flex;
      flex-direction: column;
      transition: width 0.22s ease, min-width 0.22s ease;
      overflow: hidden;
      flex-shrink: 0;
      z-index: 10;
    }
    #qc-barre-laterale.repliee {
      width: var(--qc-largeur-barre-reduite);
      min-width: var(--qc-largeur-barre-reduite);
    }
    .qc-barre-entete {
      height: 48px;
      padding: 0 14px;
      border-bottom: 1px solid var(--qc-bordure);
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-shrink: 0;
    }
    .qc-barre-entete-gauche {
      display: flex;
      align-items: center;
      gap: 6px;
      min-width: 0;
      overflow: hidden;
    }
    .qc-barre-titre {
      font-size: 12.5px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: var(--qc-texte-atténué);
      white-space: nowrap;
    }
    .qc-compteur {
      background: rgba(251, 191, 36, 0.15);
      color: var(--qc-orange);
      font-size: 12px;
      padding: 2px 7px;
      border-radius: 999px;
      font-weight: 700;
    }
    .qc-bouton-repli {
      width: 24px;
      height: 24px;
      border: 1px solid var(--qc-bordure);
      border-radius: 5px;
      background: var(--qc-surface-2);
      color: var(--qc-texte-atténué);
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 12px;
      transition: background 0.15s ease, color 0.15s ease;
    }
    .qc-bouton-repli:hover {
      background: rgba(255, 255, 255, 0.08);
      color: var(--qc-texte);
    }
    #qc-barre-laterale.repliee .qc-barre-entete-gauche {
      display: none;
    }
    #qc-barre-laterale.repliee .qc-barre-entete {
      justify-content: center;
      padding: 0;
    }
    .qc-barre-liste {
      flex: 1;
      overflow-y: auto;
      padding: 10px;
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    /* CARTES [ad] */
    .qc-item-card {
      background: var(--qc-surface-2);
      border: 1px solid var(--qc-bordure);
      border-radius: 7px;
      overflow: hidden;
      transition: border-color 0.2s ease;
    }
    .qc-item-card.ouvert {
      border-color: var(--qc-orange);
    }
    .qc-item-entete {
      padding: 8px 10px;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 7px;
      user-select: none;
      min-height: 38px;
    }
    .qc-item-entete:focus-visible {
      outline: 2px solid var(--qc-accent);
      outline-offset: -2px;
    }
    .qc-tag {
      font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
      font-size: 11px;
      font-weight: 700;
      padding: 2px 6px;
      border-radius: 4px;
      flex-shrink: 0;
      display: inline-block;
    }
    .qc-tag-ad { background: rgba(251, 191, 36, 0.15); color: var(--qc-orange); }
    .qc-tag-req { background: rgba(192, 132, 252, 0.15); color: var(--qc-violet); }
    .qc-tag-arch { background: rgba(108, 158, 255, 0.15); color: var(--qc-accent); }
    .qc-tag-bug-ouvert { background: rgba(248, 113, 113, 0.15); color: var(--qc-rouge); }
    .qc-tag-bug-cours { background: rgba(251, 191, 36, 0.15); color: var(--qc-orange); }
    .qc-tag-bug-resolu { background: rgba(74, 222, 128, 0.15); color: var(--qc-vert); }

    .qc-item-titre {
      flex: 1;
      font-size: 12.5px;
      font-weight: 500;
      color: var(--qc-texte);
      line-height: 1.35;
    }
    .qc-item-corps {
      display: none;
      padding: 0 10px 9px;
      font-size: 12px;
      color: var(--qc-texte-atténué);
      line-height: 1.45;
      border-top: 1px solid var(--qc-bordure);
    }
    .qc-item-card.ouvert .qc-item-corps {
      display: block;
    }
    .qc-item-corps p {
      margin-top: 5px;
    }

    /* Mode replié */
    #qc-barre-laterale.repliee .qc-item-titre,
    #qc-barre-laterale.repliee .qc-item-corps,
    #qc-barre-laterale.repliee .qc-item-card.ouvert .qc-item-corps {
      display: none !important;
    }
    #qc-barre-laterale.repliee .qc-item-entete {
      justify-content: center;
      padding: 5px 2px;
      min-height: 32px;
    }
    #qc-barre-laterale.repliee .qc-tag {
      width: 100%;
      text-align: center;
      padding: 3px 2px;
      font-size: 10.5px;
    }

    /* 2. ZONE PRINCIPALE */
    #qc-principal {
      flex: 1;
      height: 100%;
      overflow-y: auto;
      padding: 20px 24px;
      background: var(--qc-fond);
      display: flex;
      flex-direction: column;
      gap: 16px;
      min-width: 0;
    }
    .qc-header-bloc h1 {
      font-size: 19px;
      font-weight: 800;
      color: #ffffff;
      margin-bottom: 4px;
      letter-spacing: -0.01em;
    }
    .qc-header-bloc p {
      font-size: 13.5px;
      color: var(--qc-texte-atténué);
      line-height: 1.45;
    }
    .qc-cap-box {
      background: var(--qc-accent-doux);
      border: 1px solid rgba(108, 158, 255, 0.3);
      border-radius: 8px;
      padding: 10px 14px;
      display: flex;
      align-items: center;
      gap: 10px;
      margin-top: 6px;
    }
    .qc-cap-icon {
      font-size: 17px;
      flex-shrink: 0;
    }
    .qc-cap-texte {
      font-size: 13.5px;
      font-weight: 600;
      color: var(--qc-accent);
      line-height: 1.35;
    }
    .qc-section {
      background: var(--qc-surface);
      border: 1px solid var(--qc-bordure);
      border-radius: 9px;
      padding: 12px 14px;
    }
    .qc-section h2 {
      font-size: 12.5px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      margin-bottom: 10px;
      display: flex;
      align-items: center;
      gap: 6px;
    }
    .qc-ligne-elem {
      font-size: 13px;
      color: var(--qc-texte);
      line-height: 1.5;
      margin-bottom: 8px;
      padding-bottom: 8px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.04);
    }
    .qc-ligne-elem:last-child {
      margin-bottom: 0;
      padding-bottom: 0;
      border-bottom: none;
    }
    .qc-status-pill {
      font-size: 11px;
      font-weight: 700;
      padding: 2px 6px;
      border-radius: 4px;
      margin-left: 6px;
      text-transform: uppercase;
      display: inline-block;
    }
    .qc-status-resolu { background: rgba(74, 222, 128, 0.15); color: var(--qc-vert); }
    .qc-status-cours  { background: rgba(251, 191, 36, 0.15); color: var(--qc-orange); }
    .qc-status-ouvert { background: rgba(248, 113, 113, 0.15); color: var(--qc-rouge); }

    /* TOOLTIP */
    #qc-conteneur-global #qc-tooltip {
      position: absolute;
      z-index: 1000;
      background: #1c212d;
      border: 1px solid var(--qc-accent);
      color: #ffffff;
      padding: 6px 10px;
      border-radius: 6px;
      font-size: 12px;
      font-weight: 600;
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.6);
      pointer-events: none;
      display: none;
      white-space: nowrap;
      font-family: 'Inter', system-ui, -apple-system, sans-serif;
    }
  `;

  function injecterCSS() {
    if (document.getElementById('qc-styles-theme')) return;
    const styleEl = document.createElement('style');
    styleEl.id = 'qc-styles-theme';
    styleEl.textContent = styles;
    document.head.appendChild(styleEl);
  }

  function creerEl(tag, classe, texte) {
    const el = document.createElement(tag);
    if (classe) el.className = classe;
    if (texte !== undefined && texte !== null) el.textContent = String(texte);
    return el;
  }

  /* ===========================================================
     RENDU INTERNE
     =========================================================== */
  let hostElement = null;

  function renderQCoding(cible, customData) {
    injecterCSS();

    const data = customData || window.QCODING_DATA || {
      projet: { titre: 'Projet de Code', description: 'Session de développement' },
      cap: 'Développement en cours',
      exigences: [],
      bugs: [],
      architecture: [],
      aTraiter: []
    };

    let host = null;
    if (cible instanceof HTMLElement) {
      host = cible;
    } else if (typeof cible === 'string') {
      host = document.querySelector(cible);
    } else {
      host = document.getElementById('qc-app-host');
    }

    if (!host) {
      host = document.createElement('div');
      host.id = 'qc-app-host';
      document.body.appendChild(host);
    }

    hostElement = host;
    host.replaceChildren();
    host.style.display = 'none'; // caché par défaut

    // Bouton fermer
    const btnFermer = document.createElement('button');
    btnFermer.id = 'qc-btn-fermer';
    btnFermer.innerHTML = '✕';
    btnFermer.title = 'Fermer Q-Coding';
    btnFermer.addEventListener('click', () => {
      if (window.QCoding) window.QCoding.close();
    });
    host.appendChild(btnFermer);

    const conteneurGlobal = creerEl('div');
    conteneurGlobal.id = 'qc-conteneur-global';

    // --- Barre latérale ---
    const barre = creerEl('aside');
    barre.id = 'qc-barre-laterale';

    const enteteBarre = creerEl('div', 'qc-barre-entete');
    const enteteGauche = creerEl('div', 'qc-barre-entete-gauche');
    enteteGauche.appendChild(creerEl('span', 'qc-barre-titre', 'En attente'));
    const nbrAd = Array.isArray(data.aTraiter) ? data.aTraiter.length : 0;
    enteteGauche.appendChild(creerEl('span', 'qc-compteur', String(nbrAd)));
    enteteBarre.appendChild(enteteGauche);

    const btnRepli = creerEl('button', 'qc-bouton-repli', '◀');
    btnRepli.id = 'qc-btn-repli';
    btnRepli.title = 'Réduire / Agrandir';
    btnRepli.setAttribute('aria-label', 'Réduire ou agrandir la barre latérale');
    enteteBarre.appendChild(btnRepli);
    barre.appendChild(enteteBarre);

    const listeBarre = creerEl('div', 'qc-barre-liste');

    if (Array.isArray(data.aTraiter) && data.aTraiter.length > 0) {
      data.aTraiter.forEach(ad => {
        const card = creerEl('div', 'qc-item-card');
        const entete = creerEl('div', 'qc-item-entete');
        entete.setAttribute('role', 'button');
        entete.setAttribute('tabindex', '0');
        entete.setAttribute('aria-expanded', 'false');

        const id = ad.id || 'ad';
        const tag = creerEl('span', 'qc-tag qc-tag-ad', id);
        tag.setAttribute('data-tooltip', `[${id}] ${ad.titre || ''}`);
        entete.appendChild(tag);
        entete.appendChild(creerEl('span', 'qc-item-titre', ad.titre || ''));

        const toggle = () => {
          const ouvert = card.classList.toggle('ouvert');
          entete.setAttribute('aria-expanded', String(ouvert));
        };
        entete.addEventListener('click', toggle);
        entete.addEventListener('keydown', e => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            toggle();
          }
        });

        card.appendChild(entete);

        if (ad.quand || ad.raison) {
          const corps = creerEl('div', 'qc-item-corps');
          if (ad.quand) corps.appendChild(creerEl('p', '', `Quand : ${ad.quand}`));
          if (ad.raison) corps.appendChild(creerEl('p', '', `Raison : ${ad.raison}`));
          card.appendChild(corps);
        }
        listeBarre.appendChild(card);
      });
    } else {
      const vide = creerEl('p', 'qc-item-titre', 'Aucune piste en attente.');
      vide.style.padding = '8px';
      listeBarre.appendChild(vide);
    }

    barre.appendChild(listeBarre);
    conteneurGlobal.appendChild(barre);

    // --- Zone principale ---
    const principal = creerEl('main');
    principal.id = 'qc-principal';

    const headerBloc = creerEl('div', 'qc-header-bloc');
    headerBloc.appendChild(creerEl('h1', '', data.projet?.titre || 'Session Q-Coding'));
    headerBloc.appendChild(creerEl('p', '', data.projet?.description || 'Mémoire structurée du projet'));

    const capBox = creerEl('div', 'qc-cap-box');
    capBox.appendChild(creerEl('span', 'qc-cap-icon', '🎯'));
    capBox.appendChild(creerEl('div', 'qc-cap-texte', `CAP : ${data.cap || 'Non défini'}`));
    headerBloc.appendChild(capBox);
    principal.appendChild(headerBloc);

    // Exigences
    if (Array.isArray(data.exigences) && data.exigences.length > 0) {
      const section = creerEl('div', 'qc-section');
      const h2 = creerEl('h2', '', '🛡️ Exigences (req)');
      h2.style.color = 'var(--qc-violet)';
      section.appendChild(h2);

      data.exigences.forEach(req => {
        const ligne = creerEl('div', 'qc-ligne-elem');
        ligne.appendChild(creerEl('span', 'qc-tag qc-tag-req', req.id || 'req'));
        const titre = document.createElement('strong');
        titre.textContent = ` ${req.titre || ''}. `;
        ligne.appendChild(titre);
        if (req.raison) ligne.appendChild(document.createTextNode(req.raison + ' '));
        if (req.regle) {
          const regle = document.createElement('em');
          regle.textContent = `[Règle : ${req.regle}]`;
          ligne.appendChild(regle);
        }
        section.appendChild(ligne);
      });
      principal.appendChild(section);
    }

    // Bugs
    if (Array.isArray(data.bugs) && data.bugs.length > 0) {
      const section = creerEl('div', 'qc-section');
      const h2 = creerEl('h2', '', '🐛 Bugs & Régressions (bug)');
      h2.style.color = 'var(--qc-rouge)';
      section.appendChild(h2);

      data.bugs.forEach(bug => {
        const ligne = creerEl('div', 'qc-ligne-elem');
        const statut = bug.statut || 'ouvert';
        const tagClass = statut === 'resolu' ? 'qc-tag-bug-resolu' :
                         statut === 'en_cours' ? 'qc-tag-bug-cours' : 'qc-tag-bug-ouvert';
        ligne.appendChild(creerEl('span', `qc-tag ${tagClass}`, bug.id || 'bug'));

        const titre = document.createElement('strong');
        titre.textContent = ` ${bug.titre || ''} `;
        ligne.appendChild(titre);

        const pillClass = statut === 'resolu' ? 'qc-status-resolu' :
                          statut === 'en_cours' ? 'qc-status-cours' : 'qc-status-ouvert';
        const pillLabel = statut === 'resolu' ? 'Résolu' :
                          statut === 'en_cours' ? 'En cours' : 'Ouvert';
        ligne.appendChild(creerEl('span', `qc-status-pill ${pillClass}`, pillLabel));

        if (bug.diagnostic || bug.fix) {
          const p = creerEl('p');
          p.style.fontSize = '12px';
          p.style.color = 'var(--qc-texte-atténué)';
          p.style.marginTop = '4px';
          if (bug.diagnostic) p.textContent += `Cause : ${bug.diagnostic}. `;
          if (bug.fix) p.textContent += `Fix : ${bug.fix}`;
          ligne.appendChild(p);
        }
        section.appendChild(ligne);
      });
      principal.appendChild(section);
    }

    // Architecture
    if (Array.isArray(data.architecture) && data.architecture.length > 0) {
      const section = creerEl('div', 'qc-section');
      const h2 = creerEl('h2', '', "🔵 Décisions d'architecture (arch)");
      h2.style.color = 'var(--qc-accent)';
      section.appendChild(h2);

      data.architecture.forEach(arch => {
        const ligne = creerEl('div', 'qc-ligne-elem');
        ligne.appendChild(creerEl('span', 'qc-tag qc-tag-arch', arch.id || 'arch'));
        const titre = document.createElement('strong');
        titre.textContent = ` ${arch.titre || ''}. `;
        ligne.appendChild(titre);
        if (arch.raison) ligne.appendChild(document.createTextNode(arch.raison));
        section.appendChild(ligne);
      });
      principal.appendChild(section);
    }

    // Tooltip
    const tooltipEl = creerEl('div');
    tooltipEl.id = 'qc-tooltip';
    conteneurGlobal.appendChild(tooltipEl);
    conteneurGlobal.appendChild(principal);
    host.appendChild(conteneurGlobal);

    // Événements barre
    btnRepli.addEventListener('click', () => {
      const repliee = barre.classList.toggle('repliee');
      btnRepli.textContent = repliee ? '▶' : '◀';
    });

    listeBarre.addEventListener('mouseover', event => {
      if (!barre.classList.contains('repliee')) return;
      const tag = event.target.closest('.qc-tag');
      if (tag && tag.hasAttribute('data-tooltip')) {
        const rect = tag.getBoundingClientRect();
        const conteneurRect = conteneurGlobal.getBoundingClientRect();
        tooltipEl.textContent = tag.getAttribute('data-tooltip');
        tooltipEl.style.left = `${rect.right - conteneurRect.left + 8}px`;
        tooltipEl.style.top = `${rect.top - conteneurRect.top + 2}px`;
        tooltipEl.style.display = 'block';
      }
    });
    listeBarre.addEventListener('mouseout', event => {
      if (event.target.closest('.qc-tag')) {
        tooltipEl.style.display = 'none';
      }
    });
  }

  /* ===========================================================
     API PUBLIQUE
     =========================================================== */
  window.QCoding = {
    render: function (data) {
      renderQCoding(null, data);
    },
    open: function () {
      if (hostElement) hostElement.style.display = 'block';
    },
    close: function () {
      if (hostElement) hostElement.style.display = 'none';
    },
    toggle: function () {
      if (!hostElement) return;
      hostElement.style.display =
        hostElement.style.display === 'none' ? 'block' : 'none';
    },
    isReady: true
  };

  // Compatibilité ancienne API
  window.renderQCoding = renderQCoding;

  /* ===========================================================
     AUTO-DÉMARRAGE + ÉVÉNEMENT
     =========================================================== */
  function autoDemarrer() {
    if (window.QCODING_DATA) {
      renderQCoding('#qc-app-host');
    }
    // Signale que Q-Coding est prêt
    document.dispatchEvent(new CustomEvent('qcoding:ready'));
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', autoDemarrer, { once: true });
  } else {
    autoDemarrer();
  }
})();
