# Q-Coding

**Harnais cognitif de développement** pour sessions de *vibe coding* avec IA (ChatGPT Canvas, Claude Artifacts, Gemini, Cursor…).

Q-Coding transforme ton IA en copilote technique qui **observe** la conversation et maintient une mémoire structurée du projet (`window.QCODING_DATA`), sans jamais diriger ni imposer.

## Fonctionnalités

- Capture automatique des signaux : `[req]`, `[bug]`, `[arch]`, `[ad]`
- Dashboard visuel (Vanilla JS, zéro dépendance)
- Deux modes : **embarqué** (dans ton HTML) ou **standalone**
- IDs stables pour référencer facilement les éléments
- CSS strictement scopé (aucune pollution)

## Démarrage rapide

1. Copie le contenu de [`prompt.txt`](prompt.txt) dans ton IA.
2. Réponds aux 3 questions d’amorce.
3. Le dashboard se met à jour automatiquement.

### Mode embarqué (recommandé pour HTML autonome)

```html
<!-- QCODING:START -->
<script>
  window.QCODING_DATA = { /* ... */ };
</script>
<script src="https://cdn.jsdelivr.net/gh/lolo0704/Q-coding/qcoding.js"></script>
<!-- QCODING:END -->
