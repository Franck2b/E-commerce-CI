# Changelog

Toutes les modifications notables de ce projet seront documentées dans ce fichier.

Le format est basé sur [Keep a Changelog](https://keepachangelog.com/fr/1.0.0/),
et ce projet adhère à [Semantic Versioning](https://semver.org/lang/fr/).

## [1.0.0] - 2025-01-16

### Ajouté
- Application Next.js e-commerce complète avec 3 pages
  - Page d'accueil (hero, produits, catégories)
  - Page catalogue (filtres, recherche, tri)
  - Page détail produit (informations, stock, similaires)
- Design responsive inspiré de TOLUS
- GitFlow strict avec branches main/develop/feature/release
- Pipeline CI avec GitHub Actions (7 étapes)
- Pipeline CD avec GitHub Actions + Ansible (Stratégie 2)
- Tests unitaires et d'intégration (Jest + RTL)
- Playbooks Ansible pour déploiement automatisé
- Configuration PM2 (process manager) et Nginx (reverse proxy)
- Documentation exhaustive (8 fichiers MD)
- 10 produits mock avec données complètes
- Composants réutilisables (Header, Footer, ProductCard)
