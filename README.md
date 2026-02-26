# daki-Tech

Ce projet est une application web basée sur Next.js, conçue pour offrir une interface moderne et modulaire. Elle inclut des fonctionnalités de chat, de gestion d'agents, de commandes, d'intégrations et de paramètres, avec une architecture organisée en dossiers pour une meilleure maintenabilité.

## Structure du projet

- **app/** : Contient les pages principales de l'application (chat, dashboard, agents, etc.).
- **components/** : Composants réutilisables de l'interface utilisateur (UI).
- **hooks/** : Hooks personnalisés React.
- **lib/** : Fonctions utilitaires et intégrations API.
- **public/** : Fichiers statiques et images.
- **styles/** : Fichiers CSS globaux.
- **agent-backend/** : Scripts backend pour la gestion des agents et l'intégration de langchain.

## Installation

1. Clonez le dépôt :
   ```bash
   git clone <url-du-repo>
   cd daki-Tech
   ```
2. Installez les dépendances :
   ```bash
   pnpm install
   ```
3. Lancez le serveur de développement :
   ```bash
   pnpm dev
   ```

## Scripts utiles
- `pnpm dev` : Démarre le serveur Next.js en mode développement.
- `pnpm build` : Compile l'application pour la production.
- `pnpm start` : Lance l'application en mode production.

## Technologies principales
- [Next.js](https://nextjs.org/)
- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [pnpm](https://pnpm.io/)

## Contribution
Les contributions sont les bienvenues ! Veuillez ouvrir une issue ou une pull request pour proposer des améliorations.

## Licence
Ce projet est sous licence MIT.
