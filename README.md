# Q-Coding

**Harnais cognitif de développement** pour sessions de *vibe coding* avec IA  
(ChatGPT Canvas, Claude Artifacts, Gemini, Cursor…)

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

Q-Coding transforme ton IA en **copilote technique** qui observe la conversation et maintient une mémoire structurée du projet (`window.QCODING_DATA`), sans jamais diriger ni imposer.

---

## Philosophie

Q-Coding **observe**, il ne dirige pas.  
Il capture ce qui a été dit (exigences, bugs, décisions d’architecture, pistes différées) et le structure dans un dashboard clair.  
Le développeur reste entièrement responsable de ses choix.

---

## Fonctionnalités

- Capture automatique des signaux de conversation :
  - `[req]` → Exigences / contraintes
  - `[bug]` → Bugs (ouvert / en cours / résolu)
  - `[arch]` → Décisions d’architecture
  - `[ad]` → Pistes et refactorings différés
- Dashboard visuel moderne (Vanilla JS, zéro dépendance)
- Deux modes d’intégration :
  - **Embarqué** : tout dans un seul fichier HTML
  - **Standalone** : dashboard séparé
- IDs stables pour référencer facilement les éléments (`req1`, `bug2`…)
- CSS strictement scopé (aucune pollution de la page hôte)

---

## Démarrage rapide

1. Copie le contenu de [`prompt.txt`](prompt.txt) dans ton IA.
2. Réponds aux questions d’amorce.
3. Le dashboard se met à jour automatiquement au fil de la conversation.

### Mode embarqué (recommandé pour HTML autonome)

```html
<!-- QCODING:START -->
<script>
  window.QCODING_DATA = {
    projet: {
      titre: "Mon projet",
      description: "Description courte"
    },
    cap: "Action en cours…",
    exigences: [],
    bugs: [],
    architecture: [],
    aTraiter: []
  };
</script>
<script src="https://cdn.jsdelivr.net/gh/lolo0704/Q-coding/qcoding.js"></script>
<!-- QCODING:END -->
