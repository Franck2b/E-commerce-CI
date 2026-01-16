# 🎤 PRÉSENTATION FINALE - Projet CI/CD E-commerce

## 📋 Introduction (2 min)

### Bonjour !
"Bonjour à tous, je vais vous présenter mon projet CI/CD pour une application e-commerce Next.js."

### Le projet
"J'ai développé une application e-commerce moderne avec Next.js qui vend des produits TOLUS, avec un système complet d'intégration et de déploiement continu."

**Technologies utilisées :**
- Frontend : Next.js 14, React, TypeScript
- Infrastructure : Google Cloud Platform (VM)
- CI/CD : GitHub Actions
- Déploiement : Ansible
- Production : PM2 + Nginx

---

## 🌳 PARTIE 1 : Démo GitFlow (5 min)

### 1.1 Présentation de GitFlow

"GitFlow est une stratégie de gestion de branches qui structure le développement."

**Les branches principales :**
```
main (production)           → Code en production
develop (développement)     → Code en cours de développement
feature/* (fonctionnalités) → Nouvelles fonctionnalités
release/* (releases)        → Préparation des releases
hotfix/* (correctifs)       → Corrections urgentes en production
```

### 1.2 Démo en direct

**Montrer sur GitHub :**
```bash
# 1. Créer une branche feature
git checkout -b feature/add-contact-page
# Faire une modification
git add .
git commit -m "feat: ajout page contact"
git push origin feature/add-contact-page

# 2. Créer une Pull Request
"Je vais sur GitHub et je crée une PR de feature/add-contact-page vers develop"

# 3. Montrer le merge et la CI qui se déclenche
"Quand je merge, la CI se lance automatiquement pour tester le code"

# 4. Créer un tag pour release
git tag v1.2.0
git push origin v1.2.0
"Le tag déclenche le déploiement en production"
```

**Points clés à mentionner :**
- ✅ Chaque feature est isolée
- ✅ Les PR permettent la revue de code
- ✅ Les tests s'exécutent automatiquement
- ✅ Les tags déclenchent les déploiements

---

## 🔄 PARTIE 2 : Démo Pipelines CI/CD (5 min)

### 2.1 Pipeline CI (Intégration Continue)

"La CI s'exécute à chaque push et PR. Voici ce qu'elle fait :"

**Ouvrir `.github/workflows/ci.yml` et expliquer :**

```yaml
# 1. Checkout du code
- Récupération du code source

# 2. Setup Node.js
- Installation de Node.js 20 avec cache npm

# 3. Installation des dépendances
- npm ci (install clean des dépendances)

# 4. Linting
- Vérification de la qualité du code avec ESLint

# 5. Tests unitaires
- Tests des composants React (Header, Footer, ProductCard)
- Tests des données produits

# 6. Tests d'intégration
- Tests de navigation entre les pages
- Tests du catalogue produits
```

**Montrer les résultats sur GitHub Actions :**
"Voici un exemple de CI qui a réussi. On voit que tous les tests sont passés en X secondes."

### 2.2 Pipeline CD (Déploiement Continu)

"Le CD se déclenche uniquement sur la branche main, les releases et hotfix."

**Ouvrir `.github/workflows/cd.yml` et expliquer :**

```yaml
# Déclencheurs
on:
  push:
    branches: [main, 'release/**', 'hotfix/**']
    tags: ['v*.*.*']

# Étapes du déploiement
1. Build de l'application Next.js
2. Setup Python et Ansible
3. Configuration SSH vers le serveur
4. Exécution du playbook Ansible
5. Vérification du déploiement
```

**Points clés :**
- ✅ Déploiement automatique sur push vers main
- ✅ Les tags de version déclenchent aussi le CD
- ✅ Utilisation d'Ansible pour orchestrer le déploiement
- ✅ Secrets GitHub pour sécuriser les accès SSH

---

## 📜 PARTIE 3 : Lecture et explication du Playbook Ansible (5 min)

### 3.1 Introduction à Ansible

"Ansible est un outil d'automatisation qui permet de déployer et configurer des serveurs de manière reproductible."

**Structure du projet :**
```
ansible/
├── inventory/
│   └── production.yml    # Serveurs cibles
└── playbooks/
    ├── deploy.yml        # Déploiement
    └── rollback.yml      # Retour arrière
```

### 3.2 Lecture du playbook deploy.yml

**Ouvrir `ansible/playbooks/deploy.yml` et expliquer section par section :**

#### Étape 1 : Préparation du serveur
```yaml
- name: Update apt cache
  # "Je m'assure que les paquets système sont à jour"
  
- name: Install system packages
  # "J'installe git, curl, nginx..."
  
- name: Install Node.js
  # "J'installe Node.js 20 via NodeSource"
```

#### Étape 2 : Déploiement du code
```yaml
- name: Remove old deployment directory
  # "Je supprime l'ancien déploiement pour éviter les conflits"
  
- name: Clone repository
  # "Je clone le code depuis GitHub"
  
- name: Install ALL dependencies
  # "J'installe TOUTES les dépendances pour le build"
```

#### Étape 3 : Build de l'application
```yaml
- name: Build application
  # "Je compile l'application Next.js en mode production"
  
- name: Remove dev dependencies
  # "Après le build, je supprime les dépendances de dev pour économiser de l'espace"
```

#### Étape 4 : Configuration PM2
```yaml
- name: Create PM2 config
  # "Je configure PM2 pour gérer le processus Node.js"
  
- name: Start application
  # "Je démarre l'application avec PM2 en mode cluster"
```

#### Étape 5 : Configuration Nginx
```yaml
- name: Configure Nginx
  # "Je configure Nginx comme reverse proxy"
  # "Nginx écoute sur le port 80 et redirige vers l'app sur le port 3000"
```

#### Étape 6 : Vérifications
```yaml
- name: Wait for application
  # "J'attends que l'application démarre"
  
- name: Check application health
  # "Je vérifie que l'application répond bien"
```

### 3.3 Points importants à souligner

"Les avantages de cette approche :"
- ✅ **Idempotence** : Je peux relancer le playbook plusieurs fois, le résultat sera le même
- ✅ **Reproductible** : Le même processus pour tous les serveurs
- ✅ **Documenté** : Le playbook documente l'infrastructure
- ✅ **Automatisé** : Pas d'intervention manuelle

---

## 💡 PARTIE 4 : Justification des choix techniques (5 min)

### 4.1 Pourquoi GitFlow ?

**Avantages :**
- ✅ **Structure claire** : Chaque type de changement a sa branche
- ✅ **Production stable** : main est toujours déployable
- ✅ **Développement parallèle** : Plusieurs features en même temps
- ✅ **Releases contrôlées** : Branches release pour préparer les versions

**Inconvénients pris en compte :**
- ⚠️ Peut être complexe pour petites équipes
- ⚠️ Nécessite discipline de l'équipe

**Alternatives considérées :**
- GitHub Flow (trop simple pour ce projet)
- Trunk Based Development (nécessite feature flags)

### 4.2 Pourquoi GitHub Actions ?

**Avantages :**
- ✅ **Intégré à GitHub** : Pas de service externe
- ✅ **Configuration YAML** : Infrastructure as Code
- ✅ **Runners gratuits** : 2000 min/mois pour projets publics
- ✅ **Écosystème d'actions** : Réutilisation de composants
- ✅ **Secrets managés** : Stockage sécurisé des credentials

**Alternatives considérées :**
- Jenkins (trop lourd, nécessite serveur dédié)
- GitLab CI (pas utilisé car sur GitHub)
- CircleCI (moins bien intégré)

### 4.3 Pourquoi Ansible ?

**Avantages :**
- ✅ **Agentless** : Pas besoin d'agent sur les serveurs
- ✅ **SSH natif** : Utilise SSH standard
- ✅ **YAML lisible** : Facile à comprendre
- ✅ **Idempotent** : Safe à relancer
- ✅ **Déclaratif** : On décrit l'état final souhaité

**Alternatives considérées :**
- Docker + Kubernetes (trop complexe pour ce projet)
- Scripts bash (pas assez structurés)
- Terraform (pour infrastructure, pas déploiement)

### 4.4 Architecture de déploiement

**Stack choisie :**
```
Internet
    ↓
Nginx (reverse proxy, port 80)
    ↓
PM2 (process manager, cluster mode)
    ↓
Next.js App (port 3000)
```

**Justification :**
- ✅ **Nginx** : Performant, gère SSL, compression, cache
- ✅ **PM2** : Restart automatique, clustering, logs
- ✅ **Next.js** : SSR pour SEO, performance optimale

---

## 🔍 PARTIE 5 : Retour critique sur le projet (3 min)

### 5.1 Ce qui fonctionne bien

**Points positifs :**
- ✅ **Automatisation complète** : Du code au déploiement en un clic
- ✅ **Qualité assurée** : Tests automatiques sur chaque PR
- ✅ **Déploiement fiable** : Ansible garantit la reproductibilité
- ✅ **GitFlow bien appliqué** : Workflow clair et structuré
- ✅ **Infrastructure as Code** : Tout est versionné et traçable

### 5.2 Difficultés rencontrées

**Challenges techniques :**
1. **SSH et pare-feu GCP** 
   - Problème : Timeout de connexion SSH
   - Solution : Configuration des règles de pare-feu GCP

2. **Permissions Git et Ansible**
   - Problème : "Dubious ownership" avec become_user
   - Solution : Exécution en root et gestion explicite des permissions

3. **Dépendances Next.js**
   - Problème : Build échouait avec --omit=dev
   - Solution : Installer toutes deps → build → prune dev deps

4. **Gestion de PM2**
   - Problème : Conflits entre utilisateurs
   - Solution : PM2 en root avec HOME=/root explicite

### 5.3 Améliorations possibles

**Court terme :**
- 🔄 Ajouter des tests E2E (Playwright ou Cypress)
- 🔄 Implémenter le monitoring (Prometheus + Grafana)
- 🔄 Configurer les alertes (notifications Slack/Discord)
- 🔄 Ajouter SSL/HTTPS avec Let's Encrypt

**Moyen terme :**
- 🔄 Blue/Green deployment pour zero downtime
- 🔄 Rollback automatique si health check échoue
- 🔄 Environnements de staging
- 🔄 Cache CDN pour les assets statiques

**Long terme :**
- 🔄 Migration vers Kubernetes pour scalabilité
- 🔄 Infrastructure multi-région
- 🔄 Auto-scaling basé sur la charge
- 🔄 Observabilité avancée (traces, métriques)

### 5.4 Leçons apprises

**Enseignements techniques :**
- 💡 L'importance des logs détaillés pour le debug
- 💡 Tester en local avant de pousser en CI
- 💡 La documentation est essentielle (README, commentaires)
- 💡 Les secrets doivent TOUJOURS être externalisés

**Enseignements process :**
- 💡 GitFlow nécessite de la discipline
- 💡 Les tests automatisés font gagner du temps
- 💡 Infrastructure as Code = reproductibilité
- 💡 Commencer simple, itérer ensuite

---

## 🎯 CONCLUSION (2 min)

### Récapitulatif

"Pour résumer, j'ai mis en place :"
- ✅ Un workflow GitFlow complet avec branches et PR
- ✅ Une pipeline CI qui teste automatiquement le code
- ✅ Une pipeline CD qui déploie automatiquement sur GCP
- ✅ Un playbook Ansible qui automatise le déploiement
- ✅ Une infrastructure de production robuste (Nginx + PM2)

### Résultats obtenus

**Métriques :**
- ⚡ Build en ~2 minutes
- ⚡ Déploiement en ~3 minutes
- ⚡ Tests exécutés à chaque PR
- ⚡ Déploiement automatique sur main
- ⚡ Zero configuration manuelle

### Message de fin

"Ce projet m'a permis de comprendre l'importance du CI/CD dans le développement moderne. L'automatisation permet de :
- Livrer plus vite
- Livrer plus souvent
- Livrer avec plus de confiance
- Se concentrer sur les fonctionnalités plutôt que sur le déploiement"

"Merci pour votre attention, je suis prêt à répondre à vos questions !"

---

## ❓ Questions fréquentes (préparation)

### Q1 : Pourquoi Next.js plutôt que React simple ?
**R :** Next.js apporte le SSR (Server Side Rendering) pour le SEO, le routing intégré, l'optimisation des images, et les API routes. C'est un framework production-ready.

### Q2 : Combien coûte cette infrastructure ?
**R :** Sur GCP avec le free tier :
- VM e2-micro : ~$5-10/mois (inclus dans free tier 1 an)
- GitHub Actions : Gratuit pour repos publics
- Total : Presque gratuit pour un projet étudiant

### Q3 : Comment gérez-vous les secrets ?
**R :** GitHub Secrets pour les credentials (SSH, tokens). Jamais dans le code. Ansible les récupère via extra-vars.

### Q4 : Que se passe-t-il si le déploiement échoue ?
**R :** 
- Ansible s'arrête à la première erreur
- L'ancienne version reste en place
- Les logs GitHub Actions montrent l'erreur exacte
- On peut rollback manuellement avec le playbook rollback.yml

### Q5 : Comment testez-vous l'infrastructure ?
**R :** 
- Tests unitaires pour les composants
- Tests d'intégration pour les pages
- Health check après déploiement
- Vérification manuelle sur l'URL de prod

### Q6 : Pourquoi pas Docker/Kubernetes ?
**R :** Pour ce projet, Docker aurait ajouté de la complexité sans bénéfice réel. Node.js natif + PM2 suffit. Kubernetes est surdimensionné pour une app monolithique.

### Q7 : Comment gérez-vous les variables d'environnement ?
**R :** 
- GitHub Secrets pour les secrets sensibles
- Variables Ansible dans inventory/production.yml
- Variables d'environnement dans PM2 ecosystem.config.js

---

## 📊 Démonstration Live - Checklist

### Avant la présentation :
- [ ] Vérifier que la VM GCP est démarrée
- [ ] Vérifier que l'app fonctionne en prod
- [ ] Préparer des commits de démo
- [ ] Ouvrir GitHub Actions dans un onglet
- [ ] Ouvrir le repo GitHub dans un onglet
- [ ] Avoir le terminal prêt avec le repo cloné

### Pendant la démo :
- [ ] Montrer le site en production
- [ ] Créer une branche feature en direct
- [ ] Faire un commit et push
- [ ] Créer une PR sur GitHub
- [ ] Montrer la CI qui tourne
- [ ] Merger la PR
- [ ] Montrer le CD qui se déclenche
- [ ] Vérifier le déploiement

### URLs à avoir sous la main :
- Repo GitHub : https://github.com/Franck2b/E-commerce-CI
- GitHub Actions : https://github.com/Franck2b/E-commerce-CI/actions
- App en production : http://[IP-VM-GCP]

---

## 💪 Conseils pour la présentation

1. **Respire et parle lentement** - Tu connais ton sujet !
2. **Montre ton écran** - Les démos valent mille mots
3. **Explique avec tes propres mots** - Pas besoin de réciter
4. **Sois prêt aux questions** - C'est normal de ne pas tout savoir
5. **Mentionne les difficultés** - Ça montre ton apprentissage
6. **Sois enthousiaste** - Tu as fait un super projet !

**Timing conseillé : 25-30 minutes total**
- Introduction : 2 min
- GitFlow : 5 min
- Pipelines CI/CD : 5 min
- Ansible : 5 min
- Justifications : 5 min
- Retour critique : 3 min
- Conclusion : 2 min
- Questions : 3-5 min

**Bonne présentation ! 🚀**
