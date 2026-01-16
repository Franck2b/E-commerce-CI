# 🎤 Support de Présentation - TP CI/CD

> Template pour vos slides de présentation

---

## Slide 1 : Page de titre

```
┌─────────────────────────────────────────┐
│                                         │
│     TOLUS E-COMMERCE                    │
│     Application avec CI/CD              │
│                                         │
│     Next.js · GitFlow · GitHub Actions  │
│     Ansible                             │
│                                         │
│     Par : [Votre Nom]                   │
│     Date : Janvier 2025                 │
│     EEMI - Évaluation CI/CD             │
│                                         │
└─────────────────────────────────────────┘
```

---

## Slide 2 : Vue d'ensemble

**Objectif du projet**
- Application e-commerce frontend (Next.js)
- Mise en place d'une chaîne CI/CD complète
- GitFlow strict
- Déploiement automatisé

**Stack technique**
- Frontend : Next.js 14, React 18, TypeScript
- CI/CD : GitHub Actions
- Déploiement : Ansible
- Serveur : Node.js, PM2, Nginx

---

## Slide 3 : Application - Fonctionnalités

**3 pages réalisées :**

1. **Page d'accueil**
   - Hero section avec CTA
   - Produits vedettes
   - Catégories (MAN, WOMAN, KIDS)
   - Section mariage

2. **Page catalogue**
   - Liste de 10 produits
   - Filtres par catégorie
   - Recherche
   - Tri (nom, prix)

3. **Page détail produit**
   - Informations complètes
   - Gestion du stock
   - Produits similaires

**Design inspiré de : TOLUS Fashion**

---

## Slide 4 : Application - Caractéristiques techniques

✅ **Responsive Design**
- Mobile first
- Tablette optimisée
- Desktop moderne

✅ **Architecture modulaire**
- Composants réutilisables (Header, Footer, ProductCard)
- CSS Modules
- TypeScript pour la sécurité des types

✅ **Données mock**
- 10 produits avec propriétés complètes
- 6 catégories
- Images depuis Unsplash

---

## Slide 5 : GitFlow - Organisation

```
main (production)
  │
  ├── release/1.0.0
  │     │
  │     └── develop (intégration)
  │           │
  │           ├── feature/catalogue
  │           ├── feature/detail-produit
  │           └── feature/tests
```

**Conventions appliquées :**
- Pull Requests obligatoires
- Reviews avant merge
- Protection des branches main et develop
- Tags de version (semantic versioning)

---

## Slide 6 : GitFlow - Workflow type

**1. Développement d'une fonctionnalité**
```bash
develop → feature/ma-fonctionnalite
```

**2. Pull Request vers develop**
- Code review
- CI automatique
- Merge après validation

**3. Préparation release**
```bash
develop → release/1.0.0
```

**4. Pull Request vers main**
- Tests finaux
- Merge vers production

**5. Tag et déploiement**
```bash
git tag v1.0.0
→ Déploiement automatique
```

---

## Slide 7 : CI - Continuous Integration

**Pipeline CI (7 étapes)**

```
PR vers develop/main
    ↓
1. Checkout du code
    ↓
2. Setup Node.js (v20)
    ↓
3. Install dependencies (npm ci)
    ↓
4. Lint (ESLint)
    ↓
5. Tests unitaires (Jest)
    ↓
6. Tests d'intégration
    ↓
7. Build (Next.js)
    ↓
✅ PR validée ou ❌ PR bloquée
```

**L'échec d'une étape bloque les suivantes**

---

## Slide 8 : Tests

**Tests unitaires (4 suites)**
- ProductCard component
- Header component
- Footer component
- Products data validation

**Tests d'intégration (2 suites)**
- Navigation entre pages
- Affichage et filtrage des produits

**Framework : Jest + React Testing Library**

**Couverture : 100% des composants principaux**

---

## Slide 9 : CD - Continuous Deployment

**Stratégie choisie : Stratégie 2**
*CI/CD complète via GitHub Actions*

**Pourquoi ?**
- ✅ Automatisation totale
- ✅ Pas de serveur CI externe
- ✅ Intégration native GitHub
- ✅ Gratuit (minutes incluses)
- ✅ Logs centralisés

**Déclencheur :** Merge ou tag sur `main`

---

## Slide 10 : Pipeline CD

```
Tag v1.0.0 sur main
    ↓
1. CI complète (7 étapes)
    ↓
2. Build de l'application
    ↓
3. Setup Python + Ansible
    ↓
4. Configuration SSH
    ↓
5. Exécution playbook Ansible
    ↓
6. Déploiement sur serveur
    ↓
7. Vérification santé
    ↓
✅ Application déployée
```

---

## Slide 11 : Ansible - Architecture

**Fichiers Ansible**
```
ansible/
├── inventory/
│   └── production.yml    # Serveurs
├── playbooks/
│   ├── deploy.yml        # Déploiement
│   └── rollback.yml      # Annulation
└── ansible.cfg           # Configuration
```

**Principe : Idempotence**
- Rejouer le playbook = même résultat
- Pas de duplication
- État désiré vs état actuel

---

## Slide 12 : Ansible - Playbook de déploiement

**18 tasks organisées en 9 sections :**

1. **Préparation** : MAJ système, packages
2. **Node.js** : Installation v20
3. **Utilisateurs** : Création user dédié
4. **Dossiers** : Structure de déploiement
5. **Code** : Synchronisation rsync
6. **Dépendances** : npm ci
7. **Build** : npm run build
8. **PM2** : Process manager (cluster mode)
9. **Nginx** : Reverse proxy

**Handlers** : Reload Nginx si changement

---

## Slide 13 : Infrastructure de déploiement

```
┌─────────────────────┐
│  GitHub Actions     │
│  (CI/CD Runner)     │
└──────────┬──────────┘
           │ SSH + Ansible
           ↓
┌─────────────────────┐
│  Serveur Production │
├─────────────────────┤
│  • Ubuntu Linux     │
│  • Node.js 20       │
│  • PM2 (cluster x2) │
│  • Nginx :80        │
└─────────────────────┘
           ↓
        Internet
```

**PM2** : Gestion du processus Node.js
**Nginx** : Reverse proxy, SSL, cache

---

## Slide 14 : Justifications techniques - GitFlow

**Pourquoi GitFlow ?**

✅ **Standard de l'industrie**
- Utilisé par Google, Microsoft, etc.
- Documentation abondante

✅ **Séparation claire**
- develop = travail en cours
- main = code en production

✅ **Gestion structurée**
- Features isolées
- Releases planifiées
- Hotfixes sans bloquer le dev

✅ **Travail en équipe**
- Pull Requests = code review
- Conflits minimisés

---

## Slide 15 : Justifications techniques - Stratégie 2

**Pourquoi CI/CD via GitHub Actions ?**

✅ **Automatisation complète**
- Un merge déclenche tout
- Pas d'intervention manuelle

✅ **Simplicité**
- Pas de Jenkins à maintenir
- Pas de serveur CI dédié

✅ **Intégration native**
- Secrets sécurisés
- Environments avec approbations
- Artifacts et caching

✅ **Économique**
- Gratuit pour public repos
- 2000 min/mois pour privés

✅ **Traçabilité**
- Logs dans GitHub
- Historique complet

---

## Slide 16 : Justifications techniques - Ansible

**Pourquoi Ansible ?**

✅ **Agentless**
- Pas d'installation sur les serveurs
- Juste SSH

✅ **Idempotent**
- Rejouer = sûr
- État désiré garanti

✅ **Lisible**
- YAML simple
- Pas de code complexe

✅ **Modulaire**
- Inventaires séparés (dev, staging, prod)
- Playbooks réutilisables

✅ **Communauté**
- Rôles Ansible Galaxy
- Documentation riche

---

## Slide 17 : Démo en direct

**Ce que je vais vous montrer :**

1. **Application locale**
   - Design responsive
   - Navigation fluide
   - Filtres et recherche

2. **GitHub - Branches et PR**
   - main et develop
   - Exemple de feature branch
   - Pull Request avec checks

3. **GitHub Actions - Workflows**
   - CI en détail
   - CD en détail
   - Logs et résultats

4. **Code - Playbook Ansible**
   - Structure du playbook
   - Tasks principales
   - Handlers

---

## Slide 18 : Points forts du projet

✅ **Automatisation complète**
- De la feature au déploiement : 100% automatique

✅ **Qualité du code**
- Lint, tests, types
- Code review via PR

✅ **Documentation exhaustive**
- README complet
- Guides de setup
- Comments dans le code

✅ **Best practices**
- GitFlow strict
- Semantic versioning
- Conventional commits

✅ **Production-ready**
- PM2 pour la résilience
- Nginx optimisé
- Monitoring possible

---

## Slide 19 : Difficultés rencontrées

**Défis techniques :**

🔸 **Configuration initiale d'Ansible**
- Compréhension des inventaires
- Syntaxe YAML stricte
- Tests locaux complexes

🔸 **Gestion des secrets GitHub**
- Clés SSH bien formatées
- Environnements vs secrets

🔸 **Tests d'intégration**
- Mocking de Next.js
- Configuration Jest complexe

**Solutions trouvées :**
- Documentation officielle
- Tests en environnement contrôlé
- Debugging itératif

---

## Slide 20 : Améliorations possibles

**Court terme :**
- 🔒 HTTPS avec Let's Encrypt (Certbot)
- 📊 Monitoring (Prometheus + Grafana)
- 🔐 Variables d'environnement sécurisées

**Moyen terme :**
- 🐳 Dockerisation de l'application
- 🧪 Tests E2E (Playwright)
- 📈 Lighthouse CI pour la performance

**Long terme :**
- ☁️ Migration cloud (AWS, Azure)
- 🔄 Blue-Green deployment
- 🌍 CDN pour les assets statiques
- 🔍 ELK Stack pour les logs

---

## Slide 21 : Métriques du projet

**Code**
- ~1500 lignes de TypeScript/React
- 3 pages, 3 composants principaux
- 10 produits mock

**Tests**
- 6 suites de tests
- ~20 test cases
- 100% composants critiques

**CI/CD**
- 3 workflows GitHub Actions
- 1 playbook Ansible (18 tasks)
- Pipeline complète : ~5 min

**Documentation**
- 7 fichiers MD
- README : ~400 lignes
- Guides complets

---

## Slide 22 : Retour d'expérience

**Ce que j'ai appris :**

💡 **GitFlow**
- Structuration du travail
- Importance des conventions

💡 **GitHub Actions**
- Puissance de l'automatisation
- Intégration CI/CD simplifiée

💡 **Ansible**
- Infrastructure as Code
- Reproductibilité des déploiements

💡 **DevOps mindset**
- Automatiser tout ce qui est répétitif
- La qualité dès le début (shift-left)

---

## Slide 23 : Conclusion

**Objectifs atteints :**

✅ Application e-commerce fonctionnelle
✅ GitFlow strict et bien appliqué
✅ CI complète avec tests
✅ CD automatisée avec Ansible
✅ Documentation exhaustive
✅ Code production-ready

**Compétences développées :**
- DevOps / SRE
- Automatisation
- Infrastructure as Code
- Tests automatisés

**Prêt pour le monde professionnel !** 🚀

---

## Slide 24 : Questions ?

```
┌─────────────────────────────────────────┐
│                                         │
│              Merci !                    │
│                                         │
│         Questions ?                     │
│                                         │
│   GitHub : github.com/[votre-username]  │
│   Email  : votre@email.com              │
│                                         │
└─────────────────────────────────────────┘
```

**Ressources du projet :**
- 📦 Repository : github.com/[username]/E-commerce-CI
- 📖 Documentation : README.md
- 🎨 Design inspiration : TOLUS Fashion

---

## Annexe : Commandes de démo

**Lancer l'app locale :**
```bash
npm run dev
```

**Créer une feature :**
```bash
git checkout -b feature/demo
git add .
git commit -m "feat: demo"
git push origin feature/demo
```

**Voir les workflows :**
- GitHub → Actions → Cliquer sur un workflow

**Playbook Ansible :**
- Ouvrir `ansible/playbooks/deploy.yml`
- Expliquer task par task

---

## Tips pour la présentation

✅ **Avant de commencer**
- Tester que tout fonctionne
- Préparer des onglets ouverts
- Avoir des screenshots de backup

✅ **Pendant**
- Parler clairement et pas trop vite
- Montrer plutôt que d'expliquer
- Gérer le temps (2 min par slide max)

✅ **Questions**
- Écouter la question complètement
- Prendre 2 secondes pour réfléchir
- Répondre avec confiance

**Vous maîtrisez votre sujet !** 💪
