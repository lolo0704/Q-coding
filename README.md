# Q-Coding

**Ne laissez pas votre IA oublier pourquoi votre code fait ce qu’il fait.**

Lors d'une séance de vibe-coding, Q-Coding garde la trace de vos choix structurants à l’intérieur du projet.  
Il observe la conversation et maintient une mémoire structurée (`window.QCODING_DATA`).

Q-Coding est un harnais de développement *in-context*, activé par un simple prompt.  
Compatible avec **ChatGPT, Claude, Gemini et Grok**.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

---

## Philosophie

Q-Coding **observe** et mémorise les échanges avec l’IA afin de consolider le projet.

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
  - **Embarqué** : tout dans un seul fichier HTML (recommandé)
  - **Standalone** : dashboard séparé
- IDs stables pour référencer facilement les éléments (`req1`, `bug2`…)
- CSS strictement scopé (aucune pollution de la page hôte)

---

## Démarrage rapide

1. Copie le contenu de [`prompt.txt`](prompt.txt) dans ton IA.
2. Le dashboard se met à jour automatiquement au fil de la conversation. QCODING:END -->
