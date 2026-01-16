# 🌳 Guide GitFlow avec Issues GitHub

## 🎯 Workflow complet : Issue → Branche → PR → Merge

### 1. Créer une Issue

```
1. Aller sur GitHub → Issues → New Issue
2. Titre : "Ajouter page de contact"
3. Description : Détailler la fonctionnalité
4. Labels : enhancement, feature
5. Assigner à vous-même
6. Create issue → Notez le #42 par exemple
```

### 2. Créer une branche depuis l'issue

#### Option A : Via GitHub (Recommandé)
```
1. Sur la page de l'issue
2. Sidebar droite → Development → Create a branch
3. Nom : feature/42-add-contact-page
4. Source : develop
5. Create branch
```

#### Option B : En local
```bash
git checkout develop
git pull origin develop
git checkout -b feature/42-add-contact-page
git push -u origin feature/42-add-contact-page
```

### 3. Développer la fonctionnalité

```bash
# Faire vos modifications
code src/app/contact/page.tsx

# Commits avec référence à l'issue
git add .
git commit -m "feat: création composant page contact #42"

git add .
git commit -m "feat: ajout formulaire de contact #42"

# Pousser
git push
```

### 4. Créer une Pull Request

```
1. GitHub détecte automatiquement la branche
2. "Compare & pull request"
3. Base : develop
4. Compare : feature/42-add-contact-page
5. Titre : "feat: Ajout page de contact"
6. Description :
   
   Cette PR ajoute une page de contact avec formulaire.
   
   Closes #42
   
7. Create pull request
```

### 5. CI s'exécute automatiquement

```
✅ Linting
✅ Tests unitaires
✅ Tests d'intégration
✅ Build
```

### 6. Review et Merge

```
1. Demander une review (si équipe)
2. Reviewer approuve
3. "Merge pull request"
4. Delete branch (GitHub propose automatiquement)
5. L'issue #42 se ferme automatiquement !
```

## 🔗 Mots-clés pour lier Issues et PRs

### Fermer automatiquement une issue :
```
Closes #42
Fixes #42
Resolves #42
```

### Référencer sans fermer :
```
Related to #42
See #42
Ref #42
```

### Plusieurs issues :
```
Closes #42, closes #43, fixes #44
```

## 📊 Exemple complet pour la démo

### Scénario : Ajouter une page "À propos"

```bash
# 1. Créer l'issue #15 sur GitHub : "Ajouter page À propos"

# 2. Créer la branche depuis l'issue (via GitHub)
# Nom suggéré : feature/15-add-about-page

# 3. Récupérer en local
git fetch origin
git checkout feature/15-add-about-page

# 4. Créer la page
mkdir -p src/app/about
cat > src/app/about/page.tsx << 'EOPAGE'
export default function AboutPage() {
  return (
    <div>
      <h1>À propos de TOLUS</h1>
      <p>Votre boutique de confiance depuis 2024</p>
    </div>
  );
}
EOPAGE

# 5. Commiter avec référence
git add src/app/about/
git commit -m "feat: création page à propos #15

- Ajout du composant AboutPage
- Layout simple avec titre et description"

# 6. Pousser
git push

# 7. Créer la PR sur GitHub
# Titre : "feat: Ajout page À propos"
# Description : 
# """
# Cette PR ajoute une page "À propos" pour présenter l'entreprise.
#
# Closes #15
# """

# 8. Attendre la CI
# ✅ Tous les tests passent

# 9. Merger la PR
# → L'issue #15 se ferme automatiquement
# → La branche est supprimée
# → Le code est dans develop
```

## 🎓 Pour votre présentation

### Montrer en live :

1. **Créer une issue simple**
   - Issue #X : "Ajouter bouton retour haut de page"

2. **Créer la branche depuis l'issue**
   - Montrer le bouton "Create a branch" sur GitHub
   - Expliquer la numérotation automatique

3. **Faire un petit commit**
   ```bash
   git checkout feature/X-add-back-to-top
   # Faire une petite modif
   git commit -m "feat: ajout bouton scroll to top #X"
   git push
   ```

4. **Créer la PR**
   - Montrer "Closes #X" dans la description
   - Montrer que l'issue est liée dans la sidebar

5. **Merger**
   - L'issue se ferme automatiquement
   - Tout est tracé !

### Avantages à mentionner :

✅ **Traçabilité** : Chaque branche liée à une raison (issue)
✅ **Automatisation** : Issues se ferment automatiquement
✅ **Organisation** : Vue claire de ce qui est en cours
✅ **Collaboration** : Facile de voir qui travaille sur quoi
✅ **Documentation** : Historique des décisions dans les issues

## 💡 Bonnes pratiques

### Nommage des branches depuis issues :
```
feature/42-courte-description
bugfix/123-fix-login-error
hotfix/456-security-patch
```

### Messages de commit :
```
feat: ajout fonctionnalité X #42
fix: correction bug Y #123
docs: mise à jour README #78
```

### Description des PR :
```markdown
## Description
Courte description de la PR

## Changes
- Ajout de X
- Modification de Y
- Suppression de Z

## Issue liée
Closes #42

## Screenshots (si UI)
[capture d'écran]
```

## 🚀 Workflow GitFlow complet avec issues

```
1. Issue créée → #42
2. Branche feature/42-xxx créée depuis develop
3. Développement + commits avec "#42"
4. PR créée avec "Closes #42"
5. CI passe ✅
6. Review + approval
7. Merge dans develop
8. Issue #42 fermée automatiquement ✅
9. Plus tard : develop → release → main
10. Tag v1.2.0 créé
11. CD déploie en production 🚀
```

**C'est ce workflow que vous devez montrer en présentation !** 🎯
