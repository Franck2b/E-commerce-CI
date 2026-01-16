# 🔧 Dépannage connexion SSH - GitHub Actions vers VM GCP

## ❌ Erreur actuelle
```
ssh: connect to host *** port 22: Connection timed out
Error: Process completed with exit code 255
```

## ✅ Checklist de vérification

### 1. Vérifier que la VM est démarrée
1. Allez sur https://console.cloud.google.com/compute/instances
2. Vérifiez que votre VM affiche **"Running"** (icône verte)
3. Si elle est arrêtée, cliquez sur **START**

### 2. Récupérer l'IP externe de la VM
1. Sur la page des instances GCP
2. Notez l'**IP externe** (colonne "External IP")
3. Exemple : `34.123.45.67`
4. ⚠️ **NE PAS utiliser l'IP interne !**

### 3. Vérifier les secrets GitHub

Allez sur : `https://github.com/VOTRE_USERNAME/E-commerce-CI/settings/secrets/actions`

Vérifiez ces 3 secrets :

| Secret | Valeur attendue | Exemple |
|--------|----------------|---------|
| `SERVER_HOST` | IP externe de la VM | `34.123.45.67` |
| `SERVER_USER` | Utilisateur SSH de la VM | `runner` ou votre username |
| `SSH_PRIVATE_KEY` | Clé privée SSH complète | `-----BEGIN OPENSSH PRIVATE KEY-----` ... |

### 4. Tester la connexion depuis votre machine locale

```bash
# Remplacez par vos valeurs
ssh -i ~/.ssh/votre_cle_privee UTILISATEUR@IP_EXTERNE

# Exemple :
ssh -i ~/.ssh/gcp_key runner@34.123.45.67
```

Si ça fonctionne en local mais pas sur GitHub Actions :
- ✅ Vos identifiants sont bons
- ❌ Il manque peut-être une configuration réseau/pare-feu

### 5. Vérifier les règles de pare-feu GCP

```bash
# Lister les règles de pare-feu
gcloud compute firewall-rules list

# Vous devez voir une règle autorisant TCP:22 depuis 0.0.0.0/0
```

Règle attendue :
```
NAME                     NETWORK  DIRECTION  PRIORITY  ALLOW   DENY  DISABLED
allow-ssh-github-actions default  INGRESS    1000      tcp:22        False
```

### 6. Vérifier que la clé SSH est bien installée sur la VM

Connectez-vous à votre VM et vérifiez :

```bash
# Sur la VM
cat ~/.ssh/authorized_keys

# Vous devez voir votre clé publique
```

## 🔄 Commandes pour régénérer la paire de clés

Si vous devez recréer la paire de clés SSH :

```bash
# Sur votre machine locale
ssh-keygen -t rsa -b 4096 -C "github-actions" -f ~/.ssh/gcp_github_key

# Copier la clé publique sur la VM GCP
ssh-copy-id -i ~/.ssh/gcp_github_key.pub UTILISATEUR@IP_VM

# OU via la console GCP :
# 1. Compute Engine > Metadata > SSH Keys > ADD SSH KEY
# 2. Coller le contenu de ~/.ssh/gcp_github_key.pub

# Copier la clé privée dans les secrets GitHub
cat ~/.ssh/gcp_github_key
# Copier TOUT le contenu (y compris BEGIN et END)
```

## 📊 Ordre de priorité de debug

1. **VM démarrée** ? → Vérifier console GCP
2. **IP correcte** ? → Vérifier `SERVER_HOST` dans secrets GitHub
3. **Connexion locale OK** ? → Tester `ssh user@ip` depuis votre PC
4. **Pare-feu ouvert** ? → Vérifier règles firewall GCP
5. **Clé SSH installée** ? → Vérifier `authorized_keys` sur VM

## 🆘 Besoin d'aide supplémentaire

Le workflow CD amélioré inclut maintenant un **diagnostic réseau** qui affichera :
- Résolution DNS
- Test ping
- Test port SSH
- Logs SSH verbeux

Regardez les logs de l'étape "Network Diagnostic" pour plus d'infos !
