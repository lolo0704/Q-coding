/**
 * Moteur Q-Coding v1.5 (Harnais Cognitif de Développement — 100% Encapsulé)
 *
 * Principes :
 * - Vanilla JS 100% autonome, zéro dépendance externe.
 * - Zéro fuite DOM / CSS : Tous les éléments (y compris le tooltip flottant) restent confinés sous `#qc-conteneur-global`.
 * - Intégration plug-and-play dans n'importe quel conteneur (div, onglet, modal, split-view).
 * - Barre latérale gauche (290px -> 58px) : Pistes & Refactorings en Attente [ad].
 * - Zone principale droite : Cap technique, Exigences [req], Bugs & Régressions [bug], Architecture [arch].
 */

(function () {
  'use strict';

  /* ===========================================================
     STYLES CSS STRICTEMENT SCOPÉS (AUCUNE POLLUTION DU SITE HÔTE)
     =========================================================== */
  const styles = `
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

    /* 1. BARRE LATÉRALE [ad] */
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
      font-size: 11.5px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: var(--qc-texte-atténué);
      white-space: nowrap;
    }

    .qc-compteur {
      background: rgba(251, 191, 36, 0.15);
      color: var(--qc-orange);
      font-size: 11px;
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
      font-size: 11px;
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

    /* ÉLÉMENTS CARTE LATÉRALE [ad] */
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
      padding: 7px 9px;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 7px;
      user-select: none;
      min-height: 36px;
    }

    .qc-tag {
      font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
      font-size: 10px;
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
      font-size: 11.5px;
      font-weight: 500;
      color: var(--qc-texte);
      line-height: 1.35;
    }

    .qc-item-corps {
      display: none;
      padding: 0 9px 8px;
      font-size: 11px;
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

    /* MASQUAGE STRICT EN MODE REPLIÉ (58px) */
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
      font-size: 9.5px;
    }

    /* 2. ZONE PRINCIPALE (CAP, REQ, BUGS, ARCH) */
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
      font-size: 18px;
      font-weight: 800;
      color: #ffffff;
      margin-bottom: 4px;
      letter-spacing: -0.01em;
    }

    .qc-header-bloc p {
      font-size: 12.5px;
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
      font-size: 16px;
      flex-shrink: 0;
    }

    .qc-cap-texte {
      font-size: 12.5px;
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
      font-size: 11.5px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      margin-bottom: 10px;
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .qc-ligne-elem {
      font-size: 12px;
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
      font-size: 10px;
      font-weight: 700;
      padding: 2px 6px;
      border-radius: 4px;
      margin-left: 6px;
      text-transform: uppercase;
      display: inline-block;
    }

    .qc-status-resolu { background: rgba(74, 222, 128, 0.15); color: var(--qc-vert); }
    .qc-status-cours { background: rgba(251, 191, 36, 0.15); color: var(--qc-orange); }
    .qc-status-ouvert { background: rgba(248, 113, 113, 0.15); color: var(--qc-rouge); }

    /* TOOLTIP FLOTTANT STRICTEMENT CONFINÉ DANS LE CONTENEUR */
    #qc-conteneur-global #qc-tooltip {
      position: absolute;
      z-index: 1000;
      background: #1c212d;
      border: 1px solid var(--qc-accent);
      color: #ffffff;
      padding: 6px 10px;
      border-radius: 6px;
      font-size: 11px;
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
     FONCTION DE RENDU UNIVERSELLE & 100% ENCAPSULÉE
     =========================================================== */
  function renderQCoding(cible, customData) {
    injecterCSS();

    const data = customData || window.QCODING_DATA || {
      projet: { titre: "Projet de Code", description: "Session de développement" },
      cap: "Sprint initial",
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

    host.replaceChildren();

    const conteneurGlobal = creerEl('div', '');
    conteneurGlobal.id = 'qc-conteneur-global';

    // 1. BARRE LATÉRALE (UNIQUEMENT aTraiter [ad])
    const barre = creerEl('aside', '');
    barre.id = 'qc-barre-laterale';

    const enteteBarre = creerEl('div', 'qc-barre-entete');
    const enteteGauche = creerEl('div', 'qc-barre-entete-gauche');
    enteteGauche.appendChild(creerEl('span', 'qc-barre-titre', 'En Attente'));
    const nbrAd = Array.isArray(data.aTraiter) ? data.aTraiter.length : 0;
    enteteGauche.appendChild(creerEl('span', 'qc-compteur', String(nbrAd)));
    enteteBarre.appendChild(enteteGauche);

    const btnRepli = creerEl('button', 'qc-bouton-repli', '◀');
    btnRepli.id = 'qc-btn-repli';
    btnRepli.title = 'Réduire / Agrandir';
    enteteBarre.appendChild(btnRepli);
    barre.appendChild(enteteBarre);

    const listeBarre = creerEl('div', 'qc-barre-liste');

    if (Array.isArray(data.aTraiter) && data.aTraiter.length > 0) {
      data.aTraiter.forEach(ad => {
        const card = creerEl('div', 'qc-item-card');
        const entete = creerEl('div', 'qc-item-entete');
        const tag = creerEl('span', 'qc-tag qc-tag-ad', ad.id || 'ad');
        tag.setAttribute('data-tooltip', `[${ad.id}] ${ad.titre || ''}`);
        entete.appendChild(tag);
        entete.appendChild(creerEl('span', 'qc-item-titre', ad.titre || ''));
        entete.onclick = () => card.classList.toggle('ouvert');
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

    // 2. ZONE PRINCIPALE (CAP, REQ, BUGS, ARCH)
    const principal = creerEl('main', '');
    principal.id = 'qc-principal';

    // Header Projet
    const headerBloc = creerEl('div', 'qc-header-bloc');
    headerBloc.appendChild(creerEl('h1', '', (data.projet && data.projet.titre) || 'Session Q-Coding'));
    headerBloc.appendChild(creerEl('p', '', (data.projet && data.projet.description) || 'Suivi cognitif de développement'));

    // Cap Technique
    const capBox = creerEl('div', 'qc-cap-box');
    capBox.appendChild(creerEl('span', 'qc-cap-icon', '🎯'));
    capBox.appendChild(creerEl('div', 'qc-cap-texte', `CAP TECHNIQUE : ${data.cap || 'Non défini'}`));
    headerBloc.appendChild(capBox);
    principal.appendChild(headerBloc);

    // Section 1 : Exigences Intangibles [req]
    if (Array.isArray(data.exigences) && data.exigences.length > 0) {
      const secReq = creerEl('div', 'qc-section');
      const h2 = creerEl('h2', '', '🛡️ Exigences Intangibles (req)');
      h2.style.color = 'var(--qc-violet)';
      secReq.appendChild(h2);

      data.exigences.forEach(req => {
        const ligne = creerEl('div', 'qc-ligne-elem');
        const tag = creerEl('span', 'qc-tag qc-tag-req', req.id || 'req');
        ligne.appendChild(tag);
        const titreFort = document.createElement('strong');
        titreFort.textContent = ` ${req.titre || ''}. `;
        ligne.appendChild(titreFort);
        if (req.raison) ligne.appendChild(document.createTextNode(req.raison + ' '));
        if (req.regle) {
          const em = document.createElement('em');
          em.textContent = `[Règle : ${req.regle}]`;
          ligne.appendChild(em);
        }
        secReq.appendChild(ligne);
      });
      principal.appendChild(secReq);
    }

    // Section 2 : Bugs & Régressions [bug]
    if (Array.isArray(data.bugs) && data.bugs.length > 0) {
      const secBugs = creerEl('div', 'qc-section');
      const h2 = creerEl('h2', '', '🐛 Bugs & Régressions (bug)');
      h2.style.color = 'var(--qc-rouge)';
      secBugs.appendChild(h2);

      data.bugs.forEach(bug => {
        const ligne = creerEl('div', 'qc-ligne-elem');
        const statut = bug.statut || 'ouvert';
        const tagClass = statut === 'resolu' ? 'qc-tag-bug-resolu' : (statut === 'en_cours' ? 'qc-tag-bug-cours' : 'qc-tag-bug-ouvert');
        const tag = creerEl('span', `qc-tag ${tagClass}`, bug.id || 'bug');
        ligne.appendChild(tag);

        const titreFort = document.createElement('strong');
        titreFort.textContent = ` ${bug.titre || ''} `;
        ligne.appendChild(titreFort);

        const pillClass = statut === 'resolu' ? 'qc-status-resolu' : (statut === 'en_cours' ? 'qc-status-cours' : 'qc-status-ouvert');
        const pillLabel = statut === 'resolu' ? 'Résolu' : (statut === 'en_cours' ? 'En cours' : 'Ouvert');
        ligne.appendChild(creerEl('span', `qc-status-pill ${pillClass}`, pillLabel));

        if (bug.diagnostic || bug.fix) {
          const p = creerEl('p', '', '');
          p.style.fontSize = '11px';
          p.style.color = 'var(--qc-texte-atténué)';
          p.style.marginTop = '4px';
          if (bug.diagnostic) p.textContent += `Cause : ${bug.diagnostic}. `;
          if (bug.fix) p.textContent += `Fix : ${bug.fix}`;
          ligne.appendChild(p);
        }
        secBugs.appendChild(ligne);
      });
      principal.appendChild(secBugs);
    }

    // Section 3 : Architecture Actée [arch]
    if (Array.isArray(data.architecture) && data.architecture.length > 0) {
      const secArch = creerEl('div', 'qc-section');
      const h2 = creerEl('h2', '', '🔵 Décisions d\'Architecture (arch)');
      h2.style.color = 'var(--qc-accent)';
      secArch.appendChild(h2);

      data.architecture.forEach(arch => {
        const ligne = creerEl('div', 'qc-ligne-elem');
        const tag = creerEl('span', 'qc-tag qc-tag-arch', arch.id || 'arch');
        ligne.appendChild(tag);
        const titreFort = document.createElement('strong');
        titreFort.textContent = ` ${arch.titre || ''}. `;
        ligne.appendChild(titreFort);
        if (arch.raison) ligne.appendChild(document.createTextNode(arch.raison));
        secArch.appendChild(ligne);
      });
      principal.appendChild(secArch);
    }

    // 3. TOOLTIP FLOTTANT INTERNE (CONFINÉ DANS LE CONTENEUR GLOBAL)
    const tooltipEl = creerEl('div', '');
    tooltipEl.id = 'qc-tooltip';
    conteneurGlobal.appendChild(tooltipEl);

    // Injection dans le DOM hôte
    conteneurGlobal.appendChild(principal);
    host.appendChild(conteneurGlobal);

    // Événements de repli
    btnRepli.onclick = () => {
      const repliee = barre.classList.toggle('repliee');
      btnRepli.textContent = repliee ? '▶' : '◀';
    };

    // Survol pour tooltip en mode replié (coordonnées relatives au conteneur)
    listeBarre.addEventListener('mouseover', e => {
      if (!barre.classList.contains('repliee')) return;
      const tag = e.target.closest('.qc-tag');
      if (tag && tag.hasAttribute('data-tooltip')) {
        const rect = tag.getBoundingClientRect();
        const conteneurRect = conteneurGlobal.getBoundingClientRect();
        tooltipEl.textContent = tag.getAttribute('data-tooltip');
        tooltipEl.style.left = (rect.right - conteneurRect.left + 8) + 'px';
        tooltipEl.style.top = (rect.top - conteneurRect.top + 2) + 'px';
        tooltipEl.style.display = 'block';
      }
    });

    listeBarre.addEventListener('mouseout', e => {
      if (e.target.closest('.qc-tag')) {
        tooltipEl.style.display = 'none';
      }
    });
  }

  // Export global universel
  window.renderQCoding = renderQCoding;

  // Auto-démarrage si le host existe déjà au chargement
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      if (document.getElementById('qc-app-host') && window.QCODING_DATA) {
        renderQCoding('#qc-app-host');
      }
    }, { once: true });
  } else {
    if (document.getElementById('qc-app-host') && window.QCODING_DATA) {
      renderQCoding('#qc-app-host');
    }
  }
})();
