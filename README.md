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
2. Le dashboard se met à jour automatiquement au fil de la conversation.

# Pour en savoir plus sur les objectifs de Q-Coding

## Une mémoire qui accompagne le projet

Q-Coding est conçu pour éviter que le contexte d’un projet ne se perde dans le flux d’une conversation avec une IA.

Au fil d’une séance de vibe-coding, l’IA peut prendre des décisions, identifier des contraintes, rencontrer des bugs ou remettre certaines améliorations à plus tard. Ces informations sont utiles pour comprendre le projet, mais elles peuvent progressivement disparaître du contexte de travail.

Q-Coding les extrait de la conversation et les organise dans une mémoire structurée.

Cette mémoire ne sert pas à remplacer le code ni à décider à la place du développeur. Elle permet de conserver les éléments qui expliquent comment et pourquoi le projet a évolué.

---

## Le contexte reste avec le code

En mode embarqué, la mémoire Q-Coding fait partie du projet lui-même.

Le fichier contient à la fois le code de l’application et les données structurées qui décrivent son contexte : exigences, bugs, décisions d’architecture et pistes différées.

La mémoire du projet peut ainsi accompagner le code au fil de son évolution, plutôt que de rester uniquement dans l’historique d’une conversation.

Une reprise du développement peut alors s’appuyer sur le contexte présent dans le projet, même lorsque la conversation d’origine n’est plus disponible.

---

## Aucune maintenance supplémentaire

Q-Coding est conçu pour fonctionner sans demander au développeur de tenir manuellement un registre du projet.

C’est l’IA qui observe la conversation et met à jour la mémoire structurée au fil des échanges.

Le développeur peut ainsi continuer à travailler normalement avec son IA, sans avoir à maintenir en parallèle une documentation spécifique pour Q-Coding.

---

## Ce que Q-Coding ne cherche pas à remplacer

Q-Coding ne remplace pas un système de gestion de versions, un outil de suivi de projet ou la documentation complète d’une application.

Son rôle est plus ciblé : préserver dans le projet le contexte qui risque de se perdre au fil des échanges avec l’IA.

Il constitue une mémoire structurée des éléments qui influencent l’évolution du code, tandis que le développeur reste responsable des décisions et de leur mise en œuvre.
