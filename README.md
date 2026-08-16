# Q-Coding

**Harnais cognitif de développement** pour sessions de *vibe coding* avec IA  
(ChatGPT Canvas, Claude Artifacts, Gemini, Grok

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

Ne laissez pas votre IA oublier pourquoi votre code fait ce qu’il fait.

Q-Coding garde la trace de vos choix structurants à l’intérieur du projet en observant la conversation et en maintenant une mémoire structurée du projet (dans `window.QCODING_DATA`).

---

## Philosophie

Q-Coding **observe** et mémorise les échanges avec l'IA afin de consolider le projet.  
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
2. Le dashboard se met à jour automatiquement au fil de la conversation.

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
