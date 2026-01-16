# 🚀 Guide de configuration GitHub

Ce guide vous accompagne pas à pas pour mettre en place le projet sur GitHub avec GitFlow et CI/CD.

## Étape 1 : Initialiser Git et créer le repository

### 1.1 Initialiser Git localement

```bash
cd /home/franck/EEMI/CI-CD/E-commerce-CI

# Initialiser git
git init

# Créer .gitignore si ce n'est pas déjà fait
git add .
git commit -m "Initial commit: Application Next.js avec CI/CD"
```

### 1.2 Créer le repository sur GitHub

1. Allez sur [GitHub](https://github.com/)
2. Cliquez sur `+` (en haut à droite) → `New repository`
3. Remplissez :
   - **Repository name** : `E-commerce-CI` (ou autre nom)
   - **Description** : "Application e-commerce Next.js avec CI/CD (GitHub Actions + Ansible)"
   - **Visibility** : Public ou Private
   - ⚠️ **NE PAS** cocher "Add README" (vous en avez déjà un)
4. Cliquez sur `Create repository`

### 1.3 Connecter le repository local à GitHub

```bash
# Remplacez VOTRE-USERNAME par votre nom d'utilisateur GitHub
git remote add origin https://github.com/VOTRE-USERNAME/E-commerce-CI.git

# Renommer la branche en main
git branch -M main

# Pousser vers GitHub
git push -u origin main
```

---

## Étape 2 : Créer la branche `develop`

```bash
# Créer et pousser la branche develop
git checkout -b develop
git push -u origin develop
```

---

## Étape 3 : Configurer les Secrets GitHub

Les secrets sont nécessaires pour le déploiement automatisé.

### 3.1 Générer une clé SSH (si vous n'en avez pas)

```bash
# Sur votre machine locale
ssh-keygen -t rsa -b 4096 -C "deploy@github-actions" -f ~/.ssh/deploy_key

# Afficher la clé privée (à copier dans GitHub Secrets)
cat ~/.ssh/deploy_key

# Afficher la clé publique (à ajouter sur le serveur)
cat ~/.ssh/deploy_key.pub
```

### 3.2 Ajouter la clé publique sur le serveur

```bash
# Se connecter au serveur
ssh votre-user@votre-serveur-ip

# Ajouter la clé publique
mkdir -p ~/.ssh
echo "COLLEZ_ICI_LA_CLE_PUBLIQUE" >> ~/.ssh/authorized_keys
chmod 700 ~/.ssh
chmod 600 ~/.ssh/authorized_keys
```

### 3.3 Ajouter les Secrets dans GitHub

1. Allez sur votre repository GitHub
2. Cliquez sur `Settings` (onglet en haut)
3. Dans la barre latérale : `Secrets and variables` → `Actions`
4. Cliquez sur `New repository secret`

**Ajoutez ces 3 secrets :**

| Nom du secret | Valeur | Description |
|---------------|--------|-------------|
| `SSH_PRIVATE_KEY` | Contenu de `~/.ssh/deploy_key` | Clé SSH privée complète |
| `SERVER_HOST` | `123.45.67.89` ou `server.example.com` | IP ou domaine du serveur |
| `SERVER_USER` | `ubuntu` ou `deploy` | Utilisateur SSH du serveur |

**Exemple pour SSH_PRIVATE_KEY :**
```
-----BEGIN OPENSSH PRIVATE KEY-----
b3BlbnNzaC1rZXktdjEAAAAABG5vbmUAAAAEbm9uZQAAAAAAAAABAAA...
...toute la clé...
-----END OPENSSH PRIVATE KEY-----
```

---

## Étape 4 : Configurer un Environment "production" (optionnel mais recommandé)

1. Dans le repository : `Settings` → `Environments`
2. Cliquez sur `New environment`
3. Nom : `production`
4. (Optionnel) Cochez `Required reviewers` pour approuver les déploiements
5. Cliquez sur `Configure environment`

---

## Étape 5 : Protéger les branches

### 5.1 Protéger `main`

1. `Settings` → `Branches` → `Add branch protection rule`
2. Branch name pattern : `main`
3. Cochez :
   - ✅ `Require a pull request before merging`
   - ✅ `Require status checks to pass before merging`
     - Dans le champ de recherche, tapez `CI` et sélectionnez le check
   - ✅ `Require conversation resolution before merging`
   - ✅ `Do not allow bypassing the above settings`
4. Cliquez sur `Create`

### 5.2 Protéger `develop` (optionnel)

Répétez pour `develop` avec les mêmes paramètres.

---

## Étape 6 : Tester la CI

### 6.1 Créer une feature branch

```bash
# Depuis develop
git checkout develop
git checkout -b feature/test-ci

# Faire un petit changement (ex: modifier README.md)
echo "Test CI" >> README.md

# Commiter et pousser
git add README.md
git commit -m "feat: test CI pipeline"
git push origin feature/test-ci
```

### 6.2 Créer une Pull Request

1. Allez sur GitHub
2. Vous verrez un bandeau jaune `Compare & pull request`
3. Cliquez dessus
4. Base : `develop` ← Compare : `feature/test-ci`
5. Titre : "Test CI pipeline"
6. Cliquez sur `Create pull request`

### 6.3 Vérifier que la CI s'exécute

1. Dans la PR, vous verrez `Checks` en cours
2. Cliquez sur `Details` pour voir les logs
3. Attendez que tous les checks soient verts ✅

### 6.4 Merger la PR

1. Si tout est vert, cliquez sur `Merge pull request`
2. Confirmez le merge
3. Supprimez la branche feature (optionnel)

---

## Étape 7 : Créer une Release et déployer

### 7.1 Créer une release branch

```bash
# Depuis develop
git checkout develop
git pull origin develop

# Créer la release branch
git checkout -b release/1.0.0

# Mettre à jour CHANGELOG.md si nécessaire
# Mettre à jour package.json version

git add .
git commit -m "chore: bump version to 1.0.0"
git push origin release/1.0.0
```

### 7.2 Créer une PR vers `main`

1. Sur GitHub : `Pull requests` → `New pull request`
2. Base : `main` ← Compare : `release/1.0.0`
3. Titre : "Release v1.0.0"
4. Description : Liste des changements
5. `Create pull request`
6. **Vérifier que la CI passe**
7. Merger la PR

### 7.3 Créer un tag

```bash
# Récupérer main à jour
git checkout main
git pull origin main

# Créer le tag
git tag -a v1.0.0 -m "Release version 1.0.0"

# Pousser le tag
git push origin v1.0.0
```

### 7.4 Vérifier le déploiement

1. Allez dans `Actions` sur GitHub
2. Vous verrez le workflow `CD - Continuous Deployment` en cours
3. Cliquez dessus pour voir les logs
4. Attendez que le déploiement soit terminé ✅

---

## Étape 8 : Vérifier l'application déployée

```bash
# Tester l'application sur le serveur
curl http://VOTRE-SERVEUR-IP

# Ou ouvrir dans le navigateur
http://VOTRE-SERVEUR-IP
```

---

## Workflow GitFlow récapitulatif

```
┌─────────────────────────────────────────────────────────┐
│                      GITFLOW                            │
└─────────────────────────────────────────────────────────┘

     develop                    main
        │                        │
        │                        │
    ┌───┴───┐                    │
    │feature│                    │
    └───┬───┘                    │
        │                        │
    ┌───▼───┐                    │
    │  PR   │                    │
    │  CI   │                    │
    └───┬───┘                    │
        │                        │
    ┌───▼───────┐                │
    │  merge    │                │
    │  develop  │                │
    └───┬───────┘                │
        │                        │
    ┌───┴────────┐               │
    │  release   │               │
    │  branch    │               │
    └───┬────────┘               │
        │                        │
    ┌───▼────┐               ┌───┴───┐
    │   PR   │──────────────►│ main  │
    │   CI   │               └───┬───┘
    └────────┘                   │
                             ┌───▼───┐
                             │  TAG  │
                             │ v1.0.0│
                             └───┬───┘
                                 │
                             ┌───▼───┐
                             │  CD   │
                             │ DEPLOY│
                             └───────┘
```

---

## Commandes utiles

### Lister les branches

```bash
git branch -a              # Toutes les branches
git branch -r              # Branches distantes
```

### Synchroniser avec GitHub

```bash
git fetch origin           # Récupérer les changements
git pull origin develop    # Mettre à jour develop
git pull origin main       # Mettre à jour main
```

### Supprimer une branche

```bash
git branch -d feature/ma-feature     # Localement
git push origin --delete feature/ma-feature  # Sur GitHub
```

### Voir les tags

```bash
git tag                    # Lister les tags
git show v1.0.0           # Voir un tag spécifique
```

---

## Dépannage

### La CI échoue

1. Vérifiez les logs dans `Actions`
2. Vérifiez que tous les tests passent localement :
   ```bash
   npm run lint
   npm test
   npm run test:integration
   npm run build
   ```

### Le déploiement échoue

1. Vérifiez que les secrets sont bien configurés
2. Vérifiez que la clé SSH fonctionne :
   ```bash
   ssh -i ~/.ssh/deploy_key user@server-ip
   ```
3. Vérifiez les logs Ansible dans les `Actions`

### Erreur "Permission denied"

- Vérifiez que la clé publique est bien sur le serveur
- Vérifiez les permissions : `chmod 600 ~/.ssh/authorized_keys`

---

## 🎉 C'est terminé !

Votre projet est maintenant configuré avec :
- ✅ GitFlow
- ✅ CI automatique sur chaque PR
- ✅ CD automatique sur chaque merge vers main
- ✅ Tests automatisés
- ✅ Déploiement automatisé avec Ansible

**Bon courage pour votre évaluation !** 🚀
