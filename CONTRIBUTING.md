# Guide de contribution

Merci de votre intérêt pour contribuer à ce projet !

## GitFlow

Ce projet utilise **GitFlow**. Veuillez suivre ces conventions :

### Branches

- `main` : Production
- `develop` : Intégration
- `feature/*` : Nouvelles fonctionnalités
- `release/*` : Préparation de releases
- `hotfix/*` : Corrections urgentes

### Workflow

1. **Fork** le projet
2. Créer une branche feature depuis `develop`
   ```bash
   git checkout develop
   git checkout -b feature/ma-fonctionnalite
   ```
3. Commiter vos changements
   ```bash
   git commit -m "feat: description de la fonctionnalité"
   ```
4. Pousser vers votre fork
   ```bash
   git push origin feature/ma-fonctionnalite
   ```
5. Créer une **Pull Request** vers `develop`

## Convention de commits

Utilisez le format [Conventional Commits](https://www.conventionalcommits.org/) :

- `feat:` Nouvelle fonctionnalité
- `fix:` Correction de bug
- `docs:` Documentation
- `style:` Formatage
- `refactor:` Refactoring
- `test:` Tests
- `chore:` Tâches diverses

## Tests

Avant de soumettre une PR :

```bash
npm run lint        # Vérifier le lint
npm test            # Tests unitaires
npm run test:integration  # Tests d'intégration
npm run build       # Vérifier le build
```

## Pull Requests

- Décrivez clairement les changements
- Référencez les issues concernées
- Assurez-vous que tous les tests passent
- Mettez à jour la documentation si nécessaire
