# 🛍️ TOLUS E-commerce - Projet CI/CD

> Application e-commerce moderne avec Next.js, déployée automatiquement sur Google Cloud Platform via GitHub Actions et Ansible.

[![CI](https://github.com/Franck2b/E-commerce-CI/actions/workflows/ci.yml/badge.svg)](https://github.com/Franck2b/E-commerce-CI/actions/workflows/ci.yml)
[![CD](https://github.com/Franck2b/E-commerce-CI/actions/workflows/cd.yml/badge.svg)](https://github.com/Franck2b/E-commerce-CI/actions/workflows/cd.yml)

---

## 📋 Table des matières

- [Vue d'ensemble](#-vue-densemble)
- [Structure du projet](#-structure-du-projet)
- [Technologies utilisées](#-technologies-utilisées)
- [GitFlow](#-gitflow-appliqué)
- [Pipelines CI/CD](#-pipelines-cicd)
- [Stratégies de déploiement](#-stratégies-de-déploiement)
- [Installation locale](#-installation-locale)
- [Tests](#-tests)
- [Inspiration UI](#-inspiration-ui)
- [Auteur](#-auteur)

---

## 🎯 Vue d'ensemble

TOLUS E-commerce est une plateforme de vente en ligne développée avec **Next.js 14** et **TypeScript**. Le projet met en œuvre une **chaîne complète CI/CD** avec GitHub Actions et Ansible pour automatiser les tests, le build et le déploiement sur Google Cloud Platform.

### Fonctionnalités principales

- 🛒 **Catalogue produits** avec filtres et recherche
- 📱 **Design responsive** et moderne
- 🔍 **SEO optimisé** avec Next.js SSR
- ⚡ **Performance** optimale avec cache et optimisation d'images
- 🧪 **Tests automatisés** (unitaires + intégration)
- 🚀 **Déploiement automatique** sur push vers main

---

## 📁 Structure du projet

```
E-commerce-CI/
├── .github/
│   └── workflows/
│       ├── ci.yml              # Pipeline d'intégration continue
│       └── cd.yml              # Pipeline de déploiement continu
├── ansible/
│   ├── inventory/
│   │   └── production.yml      # Configuration serveur production
│   └── playbooks/
│       ├── deploy.yml          # Playbook de déploiement
│       └── rollback.yml        # Playbook de rollback
├── src/
│   ├── app/
│   │   ├── catalogue/          # Page catalogue produits
│   │   ├── produit/[id]/       # Page détail produit
│   │   ├── layout.tsx          # Layout global
│   │   └── page.tsx            # Page d'accueil
│   ├── components/
│   │   ├── Header.tsx          # En-tête de navigation
│   │   ├── Footer.tsx          # Pied de page
│   │   └── ProductCard.tsx     # Carte produit
│   └── data/
│       └── products.ts         # Données produits
├── __tests__/                  # Tests unitaires et d'intégration
├── jest.config.js              # Configuration Jest
├── next.config.js              # Configuration Next.js
├── tsconfig.json               # Configuration TypeScript
├── package.json                # Dépendances npm
├── PRESENTATION_FINALE.md      # Guide de présentation
└── README.md                   # Ce fichier
```

### Architecture applicative

```
┌─────────────────────────────────────────────┐
│           Utilisateur (Browser)              │
└──────────────────┬──────────────────────────┘
                   │
                   ↓
┌─────────────────────────────────────────────┐
│    Nginx (Reverse Proxy - Port 80)          │
│    - Compression gzip                        │
│    - Headers de sécurité                     │
│    - Redirection vers l'app                  │
└──────────────────┬──────────────────────────┘
                   │
                   ↓
┌─────────────────────────────────────────────┐
│    PM2 (Process Manager)                     │
│    - Gestion du processus Node.js            │
│    - Restart automatique                     │
│    - Logs centralisés                        │
└──────────────────┬──────────────────────────┘
                   │
                   ↓
┌─────────────────────────────────────────────┐
│    Next.js App (Port 3000)                   │
│    - Server Side Rendering (SSR)             │
│    - API Routes                              │
│    - Optimisation automatique                │
└─────────────────────────────────────────────┘
```

---

## 🛠️ Technologies utilisées

### Frontend
- **Next.js 14** - Framework React avec SSR
- **React 18** - Bibliothèque UI
- **TypeScript** - Typage statique
- **CSS Modules** - Styles scopés

### Infrastructure & DevOps
- **Google Cloud Platform (GCP)** - Hébergement VM
- **GitHub Actions** - CI/CD
- **Ansible** - Automatisation du déploiement
- **Nginx** - Reverse proxy
- **PM2** - Process manager Node.js

### Tests & Qualité
- **Jest** - Tests unitaires
- **React Testing Library** - Tests composants
- **ESLint** - Linting du code
- **TypeScript** - Vérification de types

---

## 🌳 GitFlow appliqué

### Stratégie de branches

Ce projet suit la méthodologie **GitFlow** pour une gestion structurée du code source :

```
main (production)
  ↑
  └── release/* (préparation des releases)
        ↑
        └── develop (développement)
              ↑
              ├── feature/* (nouvelles fonctionnalités)
              ├── bugfix/* (corrections de bugs)
              └── hotfix/* (corrections urgentes)
```

### Branches principales

#### `main`
- **Branche de production**
- Contient uniquement le code déployé en production
- Protégée : merge uniquement via Pull Request
- Chaque commit = une version en production
- Tags de version : `v1.0.0`, `v1.1.0`, etc.

#### `develop`
- **Branche de développement**
- Base pour les nouvelles features
- Contient les dernières fonctionnalités validées
- Intégration continue active

### Branches de support

#### `feature/*`
- **Nouvelles fonctionnalités**
- Créées depuis : `develop`
- Mergées dans : `develop`
- Convention de nommage : `feature/numero-description`
- Exemple : `feature/42-add-contact-page`

#### `release/*`
- **Préparation des releases**
- Créées depuis : `develop`
- Mergées dans : `main` ET `develop`
- Convention : `release/v1.2.0`
- Permet corrections mineures et préparation changelog

#### `hotfix/*`
- **Corrections urgentes en production**
- Créées depuis : `main`
- Mergées dans : `main` ET `develop`
- Convention : `hotfix/critical-bug-fix`

### Workflow type

```bash
# 1. Créer une issue sur GitHub
# Issue #42 : "Ajouter page de contact"

# 2. Créer une branche feature depuis develop
git checkout develop
git pull origin develop
git checkout -b feature/42-add-contact-page

# 3. Développer la fonctionnalité
# ... code ...
git add .
git commit -m "feat: ajout page contact #42"
git push -u origin feature/42-add-contact-page

# 4. Créer une Pull Request
# Base : develop
# Compare : feature/42-add-contact-page
# Description : "Closes #42"

# 5. Review + CI passe
# ✅ Linting
# ✅ Tests unitaires
# ✅ Tests d'intégration

# 6. Merge dans develop
# L'issue #42 se ferme automatiquement

# 7. Release (quand plusieurs features sont prêtes)
git checkout develop
git pull origin develop
git checkout -b release/v1.2.0
# Préparer la release (changelog, version bump)
git push origin release/v1.2.0

# 8. Merge release dans main
# PR : release/v1.2.0 → main
# Tag : v1.2.0
# Déploiement automatique en production via CD

# 9. Merge release dans develop
# Pour synchroniser develop avec main
```

### Conventions de commit

Nous suivons les **Conventional Commits** :

```
feat: ajout d'une nouvelle fonctionnalité
fix: correction d'un bug
docs: modification de documentation
style: changements de formatage
refactor: refactoring du code
test: ajout ou modification de tests
chore: tâches de maintenance
perf: amélioration des performances
```

**Exemples :**
```bash
feat: ajout filtre par catégorie dans le catalogue #23
fix: correction affichage prix sur mobile #45
docs: mise à jour guide installation
test: ajout tests composant ProductCard
```

---

## 🔄 Pipelines CI/CD

### Pipeline CI (Intégration Continue)

**Fichier :** `.github/workflows/ci.yml`

**Déclencheurs :**
- Push sur toutes les branches
- Pull Request vers `develop` ou `main`

**Étapes :**

```yaml
1. Checkout du code
   └─> Récupération du code source

2. Setup Node.js 20
   └─> Installation Node avec cache npm

3. Installation des dépendances
   └─> npm ci (installation propre)

4. Linting du code
   └─> ESLint pour vérifier la qualité

5. Vérification TypeScript
   └─> Compilation TypeScript

6. Tests unitaires
   └─> Jest : composants et fonctions
   ├─> Header.test.tsx
   ├─> Footer.test.tsx
   ├─> ProductCard.test.tsx
   └─> products.test.ts

7. Tests d'intégration
   └─> Tests de navigation et fonctionnels
   ├─> navigation.test.tsx
   └─> products.test.tsx

8. Build de production
   └─> next build (vérification que le build passe)
```

**Temps d'exécution moyen :** ~2-3 minutes

**Statut requis :** ✅ Tous les tests doivent passer avant merge

### Pipeline CD (Déploiement Continu)

**Fichier :** `.github/workflows/cd.yml`

**Déclencheurs :**
- Push sur `main`
- Push sur `release/**`
- Push sur `hotfix/**`
- Tags `v*.*.*`

**Étapes :**

```yaml
1. Checkout du code
   └─> Récupération du code source

2. Setup Node.js 20
   └─> Installation avec cache npm

3. Installation des dépendances
   └─> npm ci

4. Build de l'application
   └─> npm run build
   └─> Génération du bundle optimisé

5. Setup Python
   └─> Python 3.11 pour Ansible

6. Installation d'Ansible
   └─> pip install ansible

7. Configuration SSH
   └─> Ajout de la clé SSH privée
   └─> Configuration known_hosts

8. Déploiement avec Ansible
   └─> Exécution du playbook deploy.yml
   └─> Variables passées depuis GitHub Secrets
   ├─> SERVER_HOST (IP du serveur)
   ├─> SERVER_USER (utilisateur SSH)
   └─> SSH_PRIVATE_KEY (clé privée)

9. Vérification du déploiement
   └─> Health check de l'application
```

**Temps d'exécution moyen :** ~5-6 minutes

**Environnement :** Production (GCP)

### Secrets GitHub utilisés

| Secret | Description | Exemple |
|--------|-------------|---------|
| `SERVER_HOST` | IP externe de la VM GCP | `34.123.45.67` |
| `SERVER_USER` | Utilisateur SSH | `runner` |
| `SSH_PRIVATE_KEY` | Clé privée SSH complète | `-----BEGIN OPENSSH...` |

---

## 🚀 Stratégies de déploiement

### Architecture de déploiement

```
GitHub (Code Source)
    ↓ (push sur main)
GitHub Actions (CI/CD)
    ↓ (exécute Ansible)
Google Cloud Platform VM
    ├─> Nginx (port 80)
    ├─> PM2 (process manager)
    └─> Next.js App (port 3000)
```

### Playbook Ansible - deploy.yml

**Processus de déploiement automatisé :**

#### 1. Préparation de l'environnement
```yaml
- Update apt cache
- Install système packages (git, curl, nginx)
- Install Node.js 20 via NodeSource
```

#### 2. Déploiement du code
```yaml
- Remove old deployment directory
- Create fresh deployment directory
- Clone repository from GitHub
- Checkout main branch
```

#### 3. Build de l'application
```yaml
- Install ALL npm dependencies (y compris dev)
- Build Next.js application (npm run build)
- Remove dev dependencies (npm prune --omit=dev)
```

#### 4. Configuration PM2
```yaml
- Install PM2 globally
- Create PM2 ecosystem config
  - App name: tolus-ecommerce
  - Port: 3000
  - Instances: 1
  - Mode: fork
- Stop old PM2 process (if exists)
- Start new PM2 process
- Save PM2 configuration
- Setup PM2 startup script
```

#### 5. Configuration Nginx
```yaml
- Configure Nginx reverse proxy
  - Listen on port 80
  - Proxy to localhost:3000
  - WebSocket support
  - Headers optimization
- Enable Nginx site
- Remove default site
- Test Nginx configuration
- Restart Nginx
```

#### 6. Vérifications
```yaml
- Wait for application to start (port 3000)
- Health check HTTP (status 200 expected)
- Display success message
```

### Rollback

**Fichier :** `ansible/playbooks/rollback.yml`

En cas de problème, un playbook de rollback permet de revenir à la version précédente :

```bash
cd ansible
ansible-playbook -i inventory/production.yml playbooks/rollback.yml \
  --extra-vars "rollback_version=v1.0.0" \
  --extra-vars "ansible_user=$SERVER_USER" \
  --extra-vars "ansible_host=$SERVER_HOST"
```

### Zero Downtime Deployment

**Stratégie actuelle :**
- PM2 gère le restart de l'application
- Temps d'arrêt minimal (~2-3 secondes)

**Améliorations futures possibles :**
- Blue/Green deployment
- Rolling updates avec plusieurs instances
- Health checks avant bascule

### Monitoring et Logs

**Logs accessibles via :**
```bash
# Logs PM2
pm2 logs tolus-ecommerce

# Logs Nginx
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log

# Logs système
sudo journalctl -u nginx
```

**Métriques PM2 :**
```bash
pm2 monit           # Monitoring en temps réel
pm2 status          # État des processus
pm2 describe tolus-ecommerce  # Détails de l'app
```

---

## 💻 Installation locale

### Prérequis

- **Node.js** 20+ et npm
- **Git**

### Étapes d'installation

```bash
# 1. Cloner le repository
git clone https://github.com/Franck2b/E-commerce-CI.git
cd E-commerce-CI

# 2. Installer les dépendances
npm install

# 3. Lancer en mode développement
npm run dev

# 4. Ouvrir dans le navigateur
# http://localhost:3000
```

### Scripts disponibles

```bash
npm run dev          # Démarrage serveur de développement
npm run build        # Build de production
npm start            # Démarrage serveur de production
npm run lint         # Linting ESLint
npm test             # Tests unitaires
npm run test:watch   # Tests en mode watch
npm run test:int     # Tests d'intégration
```

---

## 🧪 Tests

### Tests unitaires

**Framework :** Jest + React Testing Library

**Couverture :**
- Composants React (Header, Footer, ProductCard)
- Fonctions utilitaires
- Données produits

```bash
npm test
```

**Exemple de test :**
```typescript
// Header.test.tsx
describe('Header', () => {
  it('affiche le logo TOLUS', () => {
    render(<Header />);
    expect(screen.getByText('TOLUS')).toBeInTheDocument();
  });

  it('contient les liens de navigation', () => {
    render(<Header />);
    expect(screen.getByText('Accueil')).toBeInTheDocument();
    expect(screen.getByText('Catalogue')).toBeInTheDocument();
  });
});
```

### Tests d'intégration

**Configuration :** `jest.integration.config.js`

**Scénarios testés :**
- Navigation entre les pages
- Affichage du catalogue produits
- Filtrage et recherche

```bash
npm run test:int
```

### Qualité du code

**ESLint :** Vérification des règles de codage
```bash
npm run lint
```

**TypeScript :** Vérification des types
```bash
npx tsc --noEmit
```

---

## 🎨 Inspiration UI

Le design de cette application s'inspire de designs modernes d'e-commerce :

**Inspiration principale :** [Ecommerce Website Fashion - Dribbble](https://dribbble.com/shots/22938024-Ecommerce-Website-Fashion)

### Principes de design appliqués

- ✨ **Minimaliste et épuré** - Focus sur les produits
- 📱 **Mobile-first** - Responsive sur tous les écrans
- 🎨 **Palette de couleurs cohérente** - Noir, blanc, accents colorés
- ⚡ **Performance optimale** - Images optimisées, lazy loading
- ♿ **Accessible** - Respect des standards WCAG
- 🔍 **SEO friendly** - Balises meta, SSR, sitemap

### Composants principaux

- **Header** - Navigation claire et accessible
- **ProductCard** - Carte produit avec image, titre, prix
- **Footer** - Informations et liens utiles
- **Layout responsive** - Grid CSS adaptatif

---

## 📈 Métriques du projet

### Statistiques

- **Lignes de code :** ~2000 lignes
- **Composants React :** 3 composants principaux
- **Tests :** 15+ tests automatisés
- **Couverture de tests :** ~80%
- **Temps de build :** ~30 secondes
- **Temps de déploiement :** ~3 minutes

### Performance

- **Lighthouse Score :**
  - Performance : 90+
  - Accessibility : 95+
  - Best Practices : 90+
  - SEO : 100

---

## 🔐 Sécurité

### Bonnes pratiques appliquées

- ✅ Secrets externalisés (GitHub Secrets)
- ✅ Clés SSH avec permissions restrictives (600)
- ✅ HTTPS ready (configuration Nginx)
- ✅ Headers de sécurité Nginx
- ✅ Dépendances à jour (npm audit)
- ✅ Pas de secrets dans le code
- ✅ Variables d'environnement pour configuration

---

## 📚 Documentation supplémentaire

- **[PRESENTATION_FINALE.md](./PRESENTATION_FINALE.md)** - Guide complet de présentation du projet
- **Playbooks Ansible** - Documentation dans `ansible/playbooks/`
- **Workflows GitHub Actions** - Documentation dans `.github/workflows/`

---

## 🎓 Contexte académique

**Projet réalisé dans le cadre du cours CI/CD - EEMI**

### Objectifs pédagogiques atteints

- ✅ Mise en place d'une stratégie GitFlow complète
- ✅ Configuration de pipelines CI/CD avec GitHub Actions
- ✅ Automatisation du déploiement avec Ansible
- ✅ Tests automatisés (unitaires et d'intégration)
- ✅ Déploiement sur infrastructure cloud (GCP)
- ✅ Documentation technique complète

### Compétences acquises

- **DevOps** : CI/CD, Infrastructure as Code
- **Cloud** : Google Cloud Platform
- **Automatisation** : Ansible, GitHub Actions
- **Tests** : Jest, React Testing Library
- **Git** : GitFlow, branches, PR, tags
- **Frontend** : Next.js, React, TypeScript

---

## 👨‍💻 Auteur

**Franck**
- GitHub : [@Franck2b](https://github.com/Franck2b)
- Projet : [E-commerce-CI](https://github.com/Franck2b/E-commerce-CI)

---

## 📄 Licence

Ce projet est un projet académique réalisé dans le cadre de la formation EEMI.

---

## 🙏 Remerciements

- **EEMI** pour l'enseignement de qualité
- **Next.js** pour le framework
- **GitHub** pour les outils CI/CD
- **Google Cloud Platform** pour l'hébergement
- **Dribbble** pour l'inspiration design

---

**Dernière mise à jour :** Janvier 2026

**Version :** 1.0.0

**Status :** ✅ En production
