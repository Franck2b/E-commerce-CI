# ⚡ Quick Start - Démarrage Rapide

Guide ultra-rapide pour tester et déployer le projet.

---

## 🚀 En 5 minutes : Tester en local

```bash
# 1. Aller dans le dossier
cd /home/franck/EEMI/CI-CD/E-commerce-CI

# 2. Installer
npm install

# 3. Lancer
npm run dev

# 4. Ouvrir http://localhost:3000
```

**C'est tout !** L'application fonctionne. ✅

---

## 🧪 Vérifier que tout fonctionne

```bash
# Tests
npm run lint              # ✅ Doit passer
npm test                  # ✅ Doit passer  
npm run test:integration  # ✅ Doit passer

# Build
npm run build             # ✅ Doit passer
npm start                 # Démarre en mode production
```

---

## 📤 En 10 minutes : Pousser sur GitHub

```bash
# 1. Initialiser Git
git init
git add .
git commit -m "Initial commit: E-commerce CI/CD"

# 2. Créer le repo sur GitHub (via l'interface web)
# https://github.com/new
# Nom: E-commerce-CI

# 3. Connecter et pousser
git remote add origin https://github.com/VOTRE-USERNAME/E-commerce-CI.git
git branch -M main
git push -u origin main

# 4. Créer develop
git checkout -b develop
git push -u origin develop
```

**Votre code est sur GitHub !** ✅

---

## 🔐 Configuration minimale GitHub

### Secrets (obligatoires pour le CD)

`Settings` → `Secrets and variables` → `Actions` → `New repository secret`

**3 secrets à créer :**

| Nom | Valeur |
|-----|--------|
| `SSH_PRIVATE_KEY` | Votre clé SSH privée |
| `SERVER_HOST` | IP de votre serveur |
| `SERVER_USER` | `ubuntu` ou `deploy` |

**Si vous n'avez pas de serveur :**
- Mettez des valeurs factices
- Le CD échouera mais la CI fonctionnera
- C'est OK pour la présentation !

### Protection des branches (recommandé)

`Settings` → `Branches` → `Add rule`

**Pour `main` :**
- Branch name: `main`
- ✅ Require pull request reviews
- ✅ Require status checks (sélectionnez CI)

---

## 🌿 Workflow GitFlow complet

```bash
# 1. Feature
git checkout develop
git checkout -b feature/test
# ... faire des modifs ...
git add .
git commit -m "feat: test"
git push origin feature/test
# → Créer PR sur GitHub vers develop
# → CI s'exécute ✅
# → Merger la PR

# 2. Release
git checkout develop
git pull
git checkout -b release/1.0.0
git push origin release/1.0.0
# → Créer PR sur GitHub vers main
# → CI s'exécute ✅
# → Merger la PR

# 3. Tag
git checkout main
git pull
git tag -a v1.0.0 -m "Release 1.0.0"
git push origin v1.0.0
# → CD s'exécute automatiquement ✅
```

---

## 📋 Checklist avant présentation

### Code ✅
- [ ] `npm run dev` fonctionne
- [ ] `npm run lint` passe
- [ ] `npm test` passe
- [ ] `npm run build` passe

### GitHub ✅
- [ ] Repository créé
- [ ] Branches main + develop
- [ ] Au moins 1 PR mergée
- [ ] Au moins 1 tag (v1.0.0)
- [ ] Secrets configurés
- [ ] 1 workflow CI réussi visible

### Documentation ✅
- [ ] README personnalisé (votre nom, username GitHub)
- [ ] TOLUS mentionné comme inspiration

---

## 🎯 Commandes utiles pour la démo

### Voir les branches
```bash
git branch -a
```

### Voir les tags
```bash
git tag
```

### Voir l'historique
```bash
git log --oneline --graph --all
```

### Créer une feature rapidement
```bash
git checkout develop
git checkout -b feature/demo
echo "# Demo" >> DEMO.md
git add DEMO.md
git commit -m "feat: demo pour présentation"
git push origin feature/demo
```

---

## 🎤 Structure de présentation suggérée

### 1. Introduction (2 min)
- "J'ai développé une application e-commerce avec CI/CD complète"
- Montrer le site en local

### 2. GitFlow (5 min)
- Montrer les branches sur GitHub
- Expliquer le workflow
- Montrer une PR

### 3. CI/CD (8 min)
- Montrer l'onglet Actions
- Détailler les étapes CI
- Expliquer le CD

### 4. Ansible (5 min)
- Ouvrir `ansible/playbooks/deploy.yml`
- Expliquer les principales tasks

### 5. Justifications (5 min)
- Pourquoi GitFlow
- Pourquoi Stratégie 2
- Choix techniques

### 6. Retour critique (2 min)
- Points forts
- Difficultés
- Améliorations possibles

### 7. Questions (5 min)

**Total : ~30 min max**

---

## 💡 Tips de dernière minute

### Si la démo plante
- Ayez des screenshots prêts
- Montrez les logs dans Actions
- Expliquez ce qui devrait se passer

### Si on vous demande de modifier le code
- Montrez comment créer une feature branch
- Faites un petit changement
- Poussez et montrez la CI qui démarre

### Si on vous demande d'expliquer Ansible
- Ouvrez le playbook
- Expliquez task par task
- Mentionnez l'idempotence

---

## 🎓 Questions fréquentes (FAQ)

**Q: Et si je n'ai pas de serveur ?**
R: Pas grave ! Configurez des secrets factices. La CI fonctionnera, le CD échouera mais vous pouvez expliquer pourquoi.

**Q: Est-ce que je dois vraiment déployer ?**
R: Non, montrer que vous comprenez le processus suffit. Les workflows visibles dans Actions prouvent votre maîtrise.

**Q: Combien de temps pour tout préparer ?**
R: 
- Tester en local : 5 min
- Pousser sur GitHub : 10 min
- Configurer secrets : 5 min
- Tester GitFlow : 20 min
- **Total : ~40 min**

**Q: Que faire si les tests échouent ?**
R: Vérifiez avec `npm test`. Si ça marche en local mais pas dans CI, vérifiez la version de Node.js dans le workflow.

**Q: Puis-je modifier le design ?**
R: Oui ! Mais ce n'est pas nécessaire. Le design actuel est professionnel et respecte les exigences.

---

## 🚀 Vous êtes prêt !

- ✅ Application complète
- ✅ Tests qui passent
- ✅ CI/CD configurée
- ✅ Documentation exhaustive

**Allez-y avec confiance !** 💪
