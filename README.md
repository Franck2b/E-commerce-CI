# TOLUS E-commerce - Projet CI/CD

> Application e-commerce Next.js avec chaîne CI/CD complète (GitHub Actions + Ansible)

[![CI Status](https://github.com/votre-username/E-commerce-CI/workflows/CI/badge.svg)](https://github.com/votre-username/E-commerce-CI/actions)
[![CD Status](https://github.com/votre-username/E-commerce-CI/workflows/CD/badge.svg)](https://github.com/votre-username/E-commerce-CI/actions)

---

## 📋 Table des matières

- [À propos](#à-propos)
- [Inspiration UI](#inspiration-ui)
- [Structure du projet](#structure-du-projet)
- [GitFlow](#gitflow)
- [CI/CD Pipeline](#cicd-pipeline)
- [Stratégie de déploiement](#stratégie-de-déploiement)
- [Installation locale](#installation-locale)
- [Configuration GitHub](#configuration-github)
- [Technologies utilisées](#technologies-utilisées)

---

## 🎯 À propos

Ce projet est une application e-commerce frontend développée avec **Next.js 14** (App Router), mettant en place une chaîne **CI/CD complète** orchestrée avec **GitHub Actions** et **Ansible**.

### Fonctionnalités

- ✅ **Page d'accueil** avec hero section, produits vedettes, catégories
- ✅ **Catalogue produits** avec filtres, recherche et tri
- ✅ **Page détail produit** avec informations complètes
- ✅ **Design responsive** (mobile, tablette, desktop)
- ✅ **Composants réutilisables**
- ✅ **Tests unitaires et d'intégration** (Jest + React Testing Library)
- ✅ **CI/CD automatisé** (GitHub Actions)
- ✅ **Déploiement automatisé** (Ansible)

---

## 🎨 Inspiration UI

**Design inspiré de : [TOLUS E-commerce](https://www.tolusfashion.com/)**

La maquette s'inspire du site TOLUS, une marque de mode contemporaine avec un design minimaliste et élégant. Le design met l'accent sur :

- Typographie épurée et espacements généreux
- Palette de couleurs neutres (noir, blanc, beige)
- Images de qualité professionnelle
- Navigation intuitive
- Mise en page moderne et aérée

---

## 📁 Structure du projet

```
E-commerce-CI/
├── .github/
│   └── workflows/
│       ├── ci.yml              # Pipeline CI
│       ├── cd.yml              # Pipeline CD
│       └── release.yml         # Création de releases
├── ansible/
│   ├── inventory/
│   │   └── production.yml      # Inventaire serveurs
│   ├── playbooks/
│   │   ├── deploy.yml          # Playbook de déploiement
│   │   └── rollback.yml        # Playbook de rollback
│   └── ansible.cfg             # Configuration Ansible
├── src/
│   ├── app/
│   │   ├── page.tsx            # Page d'accueil
│   │   ├── catalogue/          # Page catalogue
│   │   ├── produit/[id]/       # Page détail produit
│   │   └── __tests__/          # Tests d'intégration
│   ├── components/
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── ProductCard.tsx
│   │   └── __tests__/          # Tests unitaires
│   └── data/
│       ├── products.ts         # Données mock
│       └── __tests__/
├── package.json
├── tsconfig.json
├── jest.config.js
├── jest.integration.config.js
└── README.md
```

---

## 🌿 GitFlow

Ce projet suit strictement le modèle **GitFlow**.

### Branches principales

- **`main`** : Production (code stable et déployé)
- **`develop`** : Intégration (développement en cours)

### Branches de support

- **`feature/*`** : Développement de nouvelles fonctionnalités
- **`release/*`** : Préparation des releases
- **`hotfix/*`** : Corrections urgentes en production

### Workflow type

```bash
# 1. Créer une feature depuis develop
git checkout develop
git pull origin develop
git checkout -b feature/nom-feature

# 2. Développer et commiter
git add .
git commit -m "feat: description de la fonctionnalité"

# 3. Pousser et créer une Pull Request vers develop
git push origin feature/nom-feature
# Créer PR sur GitHub : feature/nom-feature → develop

# 4. Après validation et merge, créer une release
git checkout develop
git pull origin develop
git checkout -b release/1.0.0

# 5. PR vers main
# Créer PR sur GitHub : release/1.0.0 → main

# 6. Tagger la version sur main
git checkout main
git pull origin main
git tag -a v1.0.0 -m "Release version 1.0.0"
git push origin v1.0.0
```

### Convention de commits

- `feat:` Nouvelle fonctionnalité
- `fix:` Correction de bug
- `docs:` Documentation
- `style:` Formatage, style
- `refactor:` Refactoring
- `test:` Ajout/modification de tests
- `chore:` Tâches diverses

---

## 🚀 CI/CD Pipeline

### CI - Continuous Integration

**Déclencheurs :**
- Pull Request vers `develop` ou `main`
- Push sur `develop`

**Étapes (`.github/workflows/ci.yml`) :**

1. ✅ **Checkout** du code
2. ✅ **Setup Node.js** (v20)
3. ✅ **Installation** des dépendances (`npm ci`)
4. ✅ **Lint** (ESLint)
5. ✅ **Tests unitaires** (Jest)
6. ✅ **Tests d'intégration** (Jest)
7. ✅ **Build** Next.js

L'échec d'une étape bloque les suivantes.

### CD - Continuous Deployment

**Déclencheurs :**
- Push/merge sur `main`
- Tag de version (`v*.*.*`)

**Étapes (`.github/workflows/cd.yml`) :**

1. ✅ Checkout + Setup Node.js
2. ✅ Installation des dépendances
3. ✅ Build de l'application
4. ✅ Setup Python + Installation Ansible
5. ✅ Configuration SSH
6. ✅ **Exécution du playbook Ansible**
7. ✅ Notification de succès

---

## 📦 Stratégie de déploiement

### Stratégie choisie : **CI/CD complète via GitHub Actions (Stratégie 2)**

Cette approche automatise complètement le processus :

1. **CI** s'exécute sur chaque PR
2. Après merge sur `main`, **CD** se déclenche automatiquement
3. Ansible est **exécuté depuis GitHub Actions**
4. Déploiement sur serveur de production

### Architecture de déploiement

```
┌─────────────────┐
│  GitHub Actions │
│                 │
│  1. CI Pipeline │
│  2. Build       │
│  3. Run Ansible │
└────────┬────────┘
         │
         ├─ SSH ──────────────┐
         │                    ▼
         │           ┌──────────────┐
         │           │   Serveur    │
         │           │  Production  │
         │           ├──────────────┤
         │           │  - Node.js   │
         └───────────│  - PM2       │
                     │  - Nginx     │
                     │  - Next.js   │
                     └──────────────┘
```

### Playbook Ansible (`ansible/playbooks/deploy.yml`)

Le playbook effectue :

1. ✅ **Préparation environnement** (packages système)
2. ✅ **Installation Node.js** (v20)
3. ✅ **Création utilisateur** et dossiers
4. ✅ **Déploiement du code** (synchronisation)
5. ✅ **Installation dépendances** (`npm ci`)
6. ✅ **Build application** (`npm run build`)
7. ✅ **Configuration PM2** (process manager)
8. ✅ **Configuration Nginx** (reverse proxy)
9. ✅ **Vérification santé** application

---

## 💻 Installation locale

### Prérequis

- Node.js 20+
- npm ou yarn

### Étapes

```bash
# 1. Cloner le repository
git clone https://github.com/votre-username/E-commerce-CI.git
cd E-commerce-CI

# 2. Installer les dépendances
npm install

# 3. Lancer en développement
npm run dev

# 4. Ouvrir http://localhost:3000
```

### Scripts disponibles

```bash
npm run dev          # Développement
npm run build        # Build production
npm start            # Démarrer en production
npm run lint         # Linter
npm test             # Tests unitaires
npm run test:watch   # Tests en watch mode
npm run test:integration  # Tests d'intégration
```

---

## ⚙️ Configuration GitHub

### 1. Créer le repository sur GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/votre-username/E-commerce-CI.git
git push -u origin main
```

### 2. Créer la branche `develop`

```bash
git checkout -b develop
git push -u origin develop
```

### 3. Configurer les **GitHub Secrets**

Allez dans : `Settings` > `Secrets and variables` > `Actions`

Ajoutez les secrets suivants :

| Secret | Description | Exemple |
|--------|-------------|---------|
| `SSH_PRIVATE_KEY` | Clé SSH privée pour se connecter au serveur | `-----BEGIN RSA PRIVATE KEY-----...` |
| `SERVER_HOST` | IP ou domaine du serveur | `123.45.67.89` ou `server.example.com` |
| `SERVER_USER` | Utilisateur SSH | `ubuntu` ou `deploy` |

**Générer une clé SSH :**

```bash
ssh-keygen -t rsa -b 4096 -C "deploy@github-actions"
# Copier la clé privée dans SSH_PRIVATE_KEY
cat ~/.ssh/id_rsa

# Copier la clé publique sur le serveur
ssh-copy-id user@server-ip
```

### 4. Configurer les **Environments** (optionnel)

`Settings` > `Environments` > `New environment`

- Nom : `production`
- Protection rules : Require reviewers (optionnel)

### 5. Configurer les **Branch Protection Rules**

`Settings` > `Branches` > `Add rule`

**Pour `main` :**
- ✅ Require pull request reviews before merging
- ✅ Require status checks to pass before merging
  - Cocher : `CI Pipeline`
- ✅ Require conversation resolution before merging

**Pour `develop` :**
- ✅ Require pull request reviews before merging (optionnel)
- ✅ Require status checks to pass before merging

### 6. Tester la CI

```bash
# Créer une feature branch
git checkout -b feature/test-ci
git push origin feature/test-ci

# Créer une Pull Request vers develop sur GitHub
# Vérifier que le workflow CI s'exécute
```

### 7. Créer une release et déployer

```bash
# Depuis develop
git checkout -b release/1.0.0
git push origin release/1.0.0

# Créer PR : release/1.0.0 → main
# Merger la PR

# Tagger la version
git checkout main
git pull origin main
git tag -a v1.0.0 -m "Release 1.0.0"
git push origin v1.0.0

# Le workflow CD se déclenche automatiquement !
```

---

## 🛠 Technologies utilisées

### Frontend
- **Next.js 14** (App Router)
- **React 18**
- **TypeScript**
- **CSS Modules**

### Testing
- **Jest**
- **React Testing Library**

### CI/CD
- **GitHub Actions**
- **Ansible**

### Déploiement
- **Node.js 20**
- **PM2** (Process Manager)
- **Nginx** (Reverse Proxy)

---

## 📊 Barème d'évaluation

| Critère | Points |
|---------|--------|
| GitFlow | 4 pts |
| CI GitHub Actions | 6 pts |
| Tests unitaires et d'intégration | 3 pts |
| CD Stratégie 2 (GitHub Actions + Ansible) | 3 pts |
| Présentation et justification | 1 pt |
| Bonus (sécurité, optimisations) | 1 pt |
| **Total** | **18 pts** |

---

## 📝 Justifications techniques

### Pourquoi GitFlow ?

- ✅ Structure claire et conventionnelle
- ✅ Séparation développement / production
- ✅ Gestion des releases structurée
- ✅ Hotfixes sans perturber le développement

### Pourquoi la Stratégie 2 (CI/CD via GitHub Actions) ?

- ✅ **Automatisation complète** : un seul push déclenche tout
- ✅ **Simplicité** : pas besoin de serveur Jenkins ou autre
- ✅ **Intégration native** : secrets, environments, artifacts
- ✅ **Traçabilité** : logs centralisés dans GitHub Actions
- ✅ **Coût** : gratuit pour projets publics, minutes incluses pour privés

### Organisation Ansible

- **Inventaire séparé** : facilite multi-environnement (staging, prod)
- **Playbooks modulaires** : deploy, rollback séparés
- **Idempotence** : rejouer le playbook = même résultat
- **Handlers** : optimisation (nginx reload seulement si changement)

---

## 🎓 Présentation finale

### Points à couvrir

1. **Démonstration GitFlow**
   - Montrer les branches sur GitHub
   - Expliquer une Pull Request type
   - Montrer un tag de version

2. **Démonstration CI**
   - Déclencher un workflow CI
   - Expliquer chaque étape
   - Montrer les logs

3. **Démonstration CD**
   - Merger sur main
   - Observer le déploiement
   - Vérifier l'application déployée

4. **Lecture du playbook Ansible**
   - Expliquer la structure
   - Détailler les tasks principales
   - Justifier les choix (PM2, Nginx)

5. **Retour critique**
   - Points forts du projet
   - Difficultés rencontrées
   - Améliorations possibles

---

## 🚧 Améliorations possibles (Bonus)

- 🔒 **HTTPS** avec Let's Encrypt (Certbot)
- 🔐 **Variables d'environnement** sécurisées
- 📊 **Monitoring** (Prometheus, Grafana)
- 🧪 **Tests E2E** (Playwright, Cypress)
- 🐳 **Dockerisation** de l'application
- ☁️ **Déploiement cloud** (AWS, Azure, DigitalOcean)
- 📈 **Métriques de performance** (Lighthouse CI)
- 🔄 **Blue-Green deployment**

---

## 📄 Licence

Ce projet est réalisé dans le cadre d'une évaluation académique - EEMI 2025

---

## 👤 Auteur

**Votre Nom**
- GitHub: [@votre-username](https://github.com/votre-username)
- Email: votre.email@example.com

---

## 🙏 Remerciements

- Design inspiré de [TOLUS](https://www.tolusfashion.com/)
- Images : [Unsplash](https://unsplash.com/)
- Stack technique : Next.js, GitHub Actions, Ansible

---

**Note** : N'oubliez pas de remplacer `votre-username`, `SERVER_HOST`, et autres valeurs par vos informations réelles !
