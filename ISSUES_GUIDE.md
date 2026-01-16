# 🎯 Guide des Issues GitHub

## Pourquoi créer des issues ?

Dans un workflow GitFlow professionnel avec GitHub :
- ✅ **Traçabilité** : Chaque fonctionnalité est documentée
- ✅ **Organisation** : Liste des tâches à faire
- ✅ **Lien feature → issue** : Les branches référencent les issues
- ✅ **Lien PR → issue** : Les Pull Requests ferment automatiquement les issues
- ✅ **Historique complet** : Pourquoi chaque feature a été créée

---

## 📋 Issues à créer pour ce projet

Voici les **7 issues** correspondant aux 7 features développées :

### Issue #1: Structure de données produits
```
Titre: Créer la structure de données pour les produits

Description:
Créer une interface TypeScript Product et ajouter des données mock pour l'application.

**Tâches:**
- [ ] Créer l'interface Product (id, name, price, category, description, image, stock)
- [ ] Ajouter 10 produits mock avec toutes les propriétés
- [ ] Créer 6 catégories (Homme, Femme, Enfant, Accessoires, Chaussures, Tous)
- [ ] Exporter les données pour réutilisation

**Labels:** enhancement, data

**Branche:** feature/data-structure
```

### Issue #2: Composants réutilisables
```
Titre: Créer les composants Header, Footer et ProductCard

Description:
Développer les composants réutilisables de l'application avec CSS Modules.

**Tâches:**
- [ ] Créer le composant Header (navigation, logo TOLUS)
- [ ] Créer le composant Footer (sections, liens, copyright)
- [ ] Créer le composant ProductCard (affichage produit)
- [ ] Ajouter les styles CSS Modules pour chaque composant
- [ ] Rendre les composants responsive

**Labels:** enhancement, ui

**Branche:** feature/components
```

### Issue #3: Pages de l'application
```
Titre: Créer les 3 pages de l'application e-commerce

Description:
Développer les pages Accueil, Catalogue et Détail produit.

**Tâches:**
- [ ] Page d'accueil (hero, NEW COLLECTION, WEAR TO WEDDING, catégories)
- [ ] Page catalogue (liste produits, filtres, recherche, tri)
- [ ] Page détail produit (informations, stock, produits similaires)
- [ ] Layout global avec Header et Footer
- [ ] Styles globaux responsive

**Labels:** enhancement, pages

**Branche:** feature/pages
```

### Issue #4: Tests automatisés
```
Titre: Ajouter les tests unitaires et d'intégration

Description:
Mettre en place Jest et React Testing Library avec tests complets.

**Tâches:**
- [ ] Configuration Jest (unitaires + intégration)
- [ ] Tests unitaires des composants (Header, Footer, ProductCard)
- [ ] Tests de validation des données produits
- [ ] Tests d'intégration (navigation, affichage produits)
- [ ] Vérifier coverage des composants critiques

**Labels:** enhancement, testing

**Branche:** feature/tests
```

### Issue #5: Pipelines CI/CD
```
Titre: Mettre en place les workflows GitHub Actions

Description:
Créer les pipelines CI et CD avec GitHub Actions selon les exigences.

**Tâches:**
- [ ] Workflow CI (checkout, setup, install, lint, tests, build)
- [ ] Workflow CD (déploiement avec Ansible - Stratégie 2)
- [ ] Workflow Release (création automatique de release branches)
- [ ] Déclencheurs corrects (PR vers develop/main, push sur main)
- [ ] Configuration des étapes dans l'ordre requis

**Labels:** enhancement, ci-cd

**Branche:** feature/ci-cd
```

### Issue #6: Infrastructure as Code avec Ansible
```
Titre: Créer les playbooks Ansible pour le déploiement

Description:
Développer les playbooks Ansible pour automatiser le déploiement.

**Tâches:**
- [ ] Inventaire production (configuration serveur)
- [ ] Playbook deploy.yml (18 tasks: setup, Node.js, Nginx, PM2, etc.)
- [ ] Playbook rollback.yml (annulation déploiement)
- [ ] Configuration Ansible (ansible.cfg)
- [ ] Handlers pour optimisation

**Labels:** enhancement, infrastructure

**Branche:** feature/ansible
```

### Issue #7: Documentation exhaustive
```
Titre: Créer la documentation complète du projet

Description:
Rédiger tous les fichiers de documentation pour le projet.

**Tâches:**
- [ ] README.md (400+ lignes avec tout le détail)
- [ ] SETUP_GITHUB.md (guide configuration GitHub)
- [ ] GUIDE_ETUDIANT.md (guide pour l'évaluation)
- [ ] QUICK_START.md (démarrage rapide)
- [ ] PRESENTATION.md (template de slides)
- [ ] STRUCTURE.md (architecture du projet)
- [ ] CHANGELOG.md et CONTRIBUTING.md
- [ ] GIT_HISTORY.md (historique GitFlow)

**Labels:** documentation

**Branche:** feature/documentation
```

---

## 🚀 Comment créer les issues sur GitHub

### Option 1: Créer manuellement (recommandé pour la démo)

1. **Aller sur votre repository GitHub**
2. Cliquer sur l'onglet **"Issues"**
3. Cliquer sur **"New issue"**
4. Copier-coller le contenu ci-dessus
5. Ajouter les labels correspondants
6. Cliquer sur **"Submit new issue"**

**Répéter pour chaque issue** (7 au total)

### Option 2: Utiliser l'API GitHub (automatique)

Créer un script pour créer toutes les issues d'un coup :

```bash
#!/bin/bash

# Remplacez ces valeurs
GITHUB_TOKEN="your_github_token"
REPO_OWNER="votre-username"
REPO_NAME="E-commerce-CI"

# Issue 1
curl -X POST \
  -H "Authorization: token $GITHUB_TOKEN" \
  -H "Accept: application/vnd.github.v3+json" \
  https://api.github.com/repos/$REPO_OWNER/$REPO_NAME/issues \
  -d '{
    "title": "Créer la structure de données pour les produits",
    "body": "Créer une interface TypeScript Product et ajouter des données mock...",
    "labels": ["enhancement", "data"]
  }'

# ... répéter pour les autres issues
```

---

## 🔗 Lier les issues aux branches et PR

### 1. Dans le nom de branche (optionnel)
```bash
git checkout -b feature/1-data-structure
# Le "1" fait référence à l'issue #1
```

### 2. Dans les commits
```bash
git commit -m "feat: ajout des données produits

Closes #1
- Interface Product créée
- 10 produits mock ajoutés"
```

Le mot-clé `Closes #1` fermera automatiquement l'issue #1 quand le commit sera mergé dans main.

### 3. Dans les Pull Requests
Quand vous créez une PR sur GitHub, dans la description :
```markdown
## Description
Cette PR ajoute la structure de données produits.

## Issue liée
Closes #1

## Changements
- ✅ Interface Product
- ✅ 10 produits mock
- ✅ 6 catégories
```

---

## 📊 Exemple de workflow complet avec issues

```
1. Créer l'issue #1 sur GitHub
   ↓
2. Créer la branche localement
   git checkout -b feature/data-structure
   ↓
3. Développer la fonctionnalité
   ↓
4. Commits référençant l'issue
   git commit -m "feat: add Product interface (#1)"
   ↓
5. Pousser la branche
   git push origin feature/data-structure
   ↓
6. Créer une Pull Request vers develop
   - Titre: "feat: Structure de données produits"
   - Description: "Closes #1"
   ↓
7. CI s'exécute automatiquement
   ↓
8. Review et merge
   ↓
9. Issue #1 se ferme automatiquement ✅
```

---

## 🎨 Labels recommandés à créer

Sur GitHub : `Issues` → `Labels` → `New label`

| Label | Couleur | Description |
|-------|---------|-------------|
| `enhancement` | `#0E8A16` | Nouvelle fonctionnalité |
| `bug` | `#D73A4A` | Correction de bug |
| `documentation` | `#0075CA` | Documentation |
| `testing` | `#FBCA04` | Tests |
| `ci-cd` | `#5319E7` | CI/CD |
| `infrastructure` | `#D4C5F9` | Infrastructure / DevOps |
| `ui` | `#FEF2C0` | Interface utilisateur |
| `data` | `#BFD4F2` | Données et structure |

---

## ✅ Template de PR complète

Quand vous créez une Pull Request, utilisez ce template :

```markdown
## 🎯 Description
Brève description de ce que fait cette PR.

## 📋 Issue liée
Closes #X

## ✨ Changements
- ✅ Changement 1
- ✅ Changement 2
- ✅ Changement 3

## 🧪 Tests
- [ ] Tests unitaires passent
- [ ] Tests d'intégration passent
- [ ] Lint passe
- [ ] Build réussit

## 📸 Screenshots (si UI)
![Screenshot](url)

## 📝 Checklist
- [ ] Code testé localement
- [ ] Documentation mise à jour
- [ ] Commits suivent la convention
- [ ] Pas de conflits
```

---

## 🎓 Pour la présentation

Montrez :

1. **L'onglet Issues** avec les 7 issues fermées
2. **Une issue** en détail avec les checkboxes cochées
3. **Une Pull Request** qui référence une issue
4. **Le lien automatique** entre issue → PR → merge
5. **L'historique** montrant les issues fermées

Expliquez :
- Pourquoi créer des issues (traçabilité, organisation)
- Comment lier issues → branches → PR
- Les mots-clés magiques (`Closes`, `Fixes`, `Resolves`)
- Le workflow complet

---

## 💡 Astuce : Créer les issues "rétroactivement"

Même si le code est déjà développé, vous pouvez :

1. **Créer les 7 issues maintenant** sur GitHub
2. **Les fermer manuellement** en expliquant qu'elles ont été complétées
3. **Ajouter des commentaires** dans chaque issue pour montrer le travail fait
4. **Lier aux commits** existants en copiant les SHA

Exemple de commentaire dans une issue fermée :
```markdown
✅ Complété dans les commits suivants :
- a8df6d3 - Configuration initiale
- 1b352e1 - Ajout des données produits
- db94d46 - Merge dans develop

Voir la PR #X (même si créée après coup)
```

---

## 🚀 Script pour créer toutes les issues rapidement

Créer un fichier `create-issues.sh` :

```bash
#!/bin/bash

echo "📋 Création des issues GitHub..."

# Vérifier que gh CLI est installé
if ! command -v gh &> /dev/null; then
    echo "❌ GitHub CLI (gh) n'est pas installé"
    echo "Installer : https://cli.github.com/"
    exit 1
fi

# Issue 1
gh issue create \
  --title "Créer la structure de données pour les produits" \
  --body "**Tâches:**
- [x] Interface Product
- [x] 10 produits mock
- [x] 6 catégories

**Branche:** feature/data-structure
**Status:** ✅ Complété" \
  --label "enhancement,data"

# Issue 2
gh issue create \
  --title "Créer les composants Header, Footer et ProductCard" \
  --body "**Tâches:**
- [x] Header
- [x] Footer  
- [x] ProductCard
- [x] CSS Modules

**Branche:** feature/components
**Status:** ✅ Complété" \
  --label "enhancement,ui"

# Issue 3
gh issue create \
  --title "Créer les 3 pages de l'application e-commerce" \
  --body "**Tâches:**
- [x] Page d'accueil
- [x] Page catalogue
- [x] Page détail produit

**Branche:** feature/pages
**Status:** ✅ Complété" \
  --label "enhancement,pages"

# Issue 4
gh issue create \
  --title "Ajouter les tests unitaires et d'intégration" \
  --body "**Tâches:**
- [x] Configuration Jest
- [x] Tests unitaires
- [x] Tests d'intégration

**Branche:** feature/tests
**Status:** ✅ Complété" \
  --label "enhancement,testing"

# Issue 5
gh issue create \
  --title "Mettre en place les workflows GitHub Actions" \
  --body "**Tâches:**
- [x] Workflow CI
- [x] Workflow CD
- [x] Workflow Release

**Branche:** feature/ci-cd
**Status:** ✅ Complété" \
  --label "enhancement,ci-cd"

# Issue 6
gh issue create \
  --title "Créer les playbooks Ansible pour le déploiement" \
  --body "**Tâches:**
- [x] Playbook deploy.yml
- [x] Playbook rollback.yml
- [x] Inventaire production

**Branche:** feature/ansible
**Status:** ✅ Complété" \
  --label "enhancement,infrastructure"

# Issue 7
gh issue create \
  --title "Créer la documentation complète du projet" \
  --body "**Tâches:**
- [x] README.md
- [x] SETUP_GITHUB.md
- [x] GUIDE_ETUDIANT.md
- [x] Autres docs

**Branche:** feature/documentation
**Status:** ✅ Complété" \
  --label "documentation"

echo "✅ 7 issues créées avec succès!"
echo "Fermez-les manuellement sur GitHub avec 'Close as completed'"
```

**Utilisation :**
```bash
chmod +x create-issues.sh
./create-issues.sh
```

---

## ✅ Checklist finale avec issues

- [ ] 7 issues créées sur GitHub
- [ ] Labels ajoutés aux issues
- [ ] Issues fermées comme "completed"
- [ ] (Optionnel) Commentaires ajoutés aux issues
- [ ] (Optionnel) Issues liées aux commits existants
- [ ] Prêt à démontrer le workflow complet !

---

**🎯 Avec les issues, votre projet sera 100% professionnel et montrera une maîtrise complète de GitHub + GitFlow !**
