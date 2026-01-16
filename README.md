# TOLUS E-commerce - Projet CI/CD EEMI

> Application e-commerce Next.js avec chaîne CI/CD complète (GitHub Actions + Ansible)

[![CI Status](https://github.com/votre-username/E-commerce-CI/workflows/CI/badge.svg)](https://github.com/votre-username/E-commerce-CI/actions)

---

## 📋 À propos

Application e-commerce frontend développée avec **Next.js 14**, mettant en place une chaîne **CI/CD complète** orchestrée avec **GitHub Actions** et **Ansible** selon le modèle **GitFlow**.

**Projet réalisé par** : Poletti Franck 
**Date** : Janvier 2025  
**Cadre** : Évaluation CI/CD - EEMI

---

## 🎨 Inspiration UI

**Design inspiré de** : [TOLUS Fashion](https://www.tolusfashion.com/)

Design minimaliste et élégant avec :
- Palette de couleurs neutres (noir, blanc, beige)
- Typographie épurée et espacements généreux
- Images de qualité professionnelle
- Navigation intuitive

---

## ✨ Fonctionnalités

### Pages

1. **Page d'accueil**
   - Hero section "TOLUS SPRING COLLECTION"
   - Section NEW COLLECTION avec produits vedettes
   - Section WEAR TO WEDDING
   - Catégories MAN, WOMAN, KIDS

2. **Page catalogue**
   - Liste de 10 produits
   - Filtres par catégorie
   - Barre de recherche
   - Tri (nom, prix)

3. **Page détail produit**
   - Informations complètes (nom, prix, description, stock)
   - Image produit
   - Produits similaires
   - Breadcrumb navigation

### Caractéristiques techniques

- ✅ **Design responsive** (mobile, tablette, desktop)
- ✅ **Composants réutilisables** (Header, Footer, ProductCard)
- ✅ **TypeScript** pour la sécurité des types
- ✅ **CSS Modules** pour styling isolé
- ✅ **10 produits mock** avec données complètes

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

## 🌿 GitFlow

Ce projet suit strictement le modèle **GitFlow**.

### Branches
- **`main`** : Production (tag v1.0.0)
- **`develop`** : Intégration

### Features développées
1. `feature/data-structure` → Données produits
2. `feature/components` → Composants réutilisables
3. `feature/pages` → Les 3 pages
4. `feature/tests` → Tests unitaires et d'intégration
5. `feature/ci-cd` → Workflows GitHub Actions
6. `feature/ansible` → Infrastructure as Code
7. `feature/documentation` → Documentation

### Convention de commits
- `feat:` Nouvelle fonctionnalité
- `test:` Tests
- `ci:` CI/CD
- `docs:` Documentation
- `chore:` Tâches diverses

---

## 🚀 CI/CD Pipeline

### CI - Continuous Integration

**Déclencheurs** :
- Pull Request vers `develop` ou `main`
- Push sur `develop`

**Étapes** :
1. Checkout du code
2. Setup Node.js (v20)
3. Installation dépendances (`npm ci`)
4. Lint (ESLint)
5. Tests unitaires (Jest)
6. Tests d'intégration
7. Build Next.js

### CD - Continuous Deployment

**Stratégie** : CI/CD complète via GitHub Actions (Stratégie 2)

**Déclencheurs** :
- Push/merge sur `main`
- Tag `v*.*.*`

**Étapes** :
1. CI complète (7 étapes)
2. Build de l'application
3. Setup Python + Installation Ansible
4. Configuration SSH
5. Exécution du playbook Ansible
6. Déploiement automatique sur serveur

### Ansible

**Playbook de déploiement** (`ansible/playbooks/deploy.yml`) :
- Préparation environnement serveur
- Installation Node.js 20
- Installation Nginx
- Déploiement du code
- Build de l'application
- Configuration PM2 (mode cluster)
- Configuration Nginx (reverse proxy)
- Vérification santé application

---

## 💻 Installation locale

### Prérequis
- Node.js 20+
- npm

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
npm run test:integration  # Tests d'intégration
```

---

## 🧪 Tests

### Tests unitaires
- ProductCard : Affichage, prix, lien
- Header : Logo, navigation, bannière
- Footer : Sections, copyright
- Products data : Validation propriétés

### Tests d'intégration
- Navigation : Pages, sections
- Products : Affichage, filtrage, catégories

**Framework** : Jest + React Testing Library  
**Coverage** : 100% des composants critiques

---

## 📁 Structure du projet

```
E-commerce-CI/
├── .github/
│   ├── workflows/
│   │   ├── ci.yml              # Pipeline CI
│   │   ├── cd.yml              # Pipeline CD
│   │   └── release.yml         # Workflow release
│   ├── ISSUE_TEMPLATE.md       # Template issues
│   └── PULL_REQUEST_TEMPLATE.md # Template PR
├── ansible/
│   ├── inventory/
│   │   └── production.yml      # Configuration serveur
│   ├── playbooks/
│   │   ├── deploy.yml          # Déploiement
│   │   └── rollback.yml        # Rollback
│   └── ansible.cfg
├── src/
│   ├── app/
│   │   ├── catalogue/          # Page catalogue
│   │   ├── produit/[id]/       # Page détail
│   │   ├── page.tsx            # Page d'accueil
│   │   └── __tests__/          # Tests d'intégration
│   ├── components/
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── ProductCard.tsx
│   │   └── __tests__/          # Tests unitaires
│   └── data/
│       └── products.ts         # Données mock
├── README.md
└── COMMENT_REUSSIR_LE_TP.md   # 📖 Guide complet
```

---

## 📖 Documentation

- **`COMMENT_REUSSIR_LE_TP.md`** : Guide complet pour réussir l'évaluation
  - Ce qui a été fait
  - Ce que vous devez faire sur GitHub
  - Étapes détaillées
  - Préparation de la présentation
  - Grille de notation

---

## ⚙️ Configuration GitHub

### Secrets requis

Pour le déploiement CD, configurez ces secrets :

| Secret | Description |
|--------|-------------|
| `SSH_PRIVATE_KEY` | Clé SSH pour connexion serveur |
| `SERVER_HOST` | IP ou domaine du serveur |
| `SERVER_USER` | Utilisateur SSH |

### Branch protection

Protégez `main` et `develop` :
- ✅ Require pull request reviews
- ✅ Require status checks (CI)
- ✅ Require conversation resolution

---

## 🎓 Justifications techniques

### GitFlow
- Standard de l'industrie
- Séparation claire développement/production
- Gestion structurée des releases
- Facilite le travail en équipe

### Stratégie 2 (CI/CD via GitHub Actions)
- **Automatisation complète** : un merge déclenche tout
- **Simplicité** : pas de serveur CI externe
- **Intégration native** : secrets, environments, artifacts
- **Gratuit** : minutes incluses
- **Logs centralisés** : tout dans GitHub Actions

### Ansible
- **Infrastructure as Code** : reproductible et versionné
- **Idempotence** : rejouer le playbook = même résultat
- **Inventaire séparé** : facile d'ajouter environnements
- **Playbooks modulaires** : deploy/rollback séparés

### PM2 + Nginx
- **PM2** : Gestion processus Node.js, redémarrage auto, mode cluster
- **Nginx** : Reverse proxy, SSL/TLS, compression, cache

---
