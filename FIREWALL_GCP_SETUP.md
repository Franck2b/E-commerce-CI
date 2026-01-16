# 🔥 Configuration du Pare-feu Google Cloud pour GitHub Actions

## 🚨 Problème
GitHub Actions ne peut pas se connecter en SSH à votre VM car le pare-feu GCP bloque les connexions entrantes sur le port 22.

## ✅ Solution

### Option 1 : Via Console Google Cloud (Interface Web)

1. Allez sur https://console.cloud.google.com/
2. Naviguez vers **VPC Network** → **Firewall**
3. Cliquez sur **CREATE FIREWALL RULE**
4. Configurez :
   - **Nom** : `allow-ssh-github-actions`
   - **Description** : `Autoriser SSH depuis GitHub Actions`
   - **Direction** : `Ingress`
   - **Action on match** : `Allow`
   - **Targets** : `All instances in the network` (ou sélectionnez votre VM)
   - **Source filter** : `IPv4 ranges`
   - **Source IPv4 ranges** : `0.0.0.0/0` (toutes les IPs)
   - **Protocols and ports** : Cochez `tcp` et entrez `22`
5. Cliquez sur **CREATE**

### Option 2 : Via gcloud CLI (Ligne de commande)

```bash
# Autoriser SSH depuis toutes les IPs
gcloud compute firewall-rules create allow-ssh-all \
    --allow tcp:22 \
    --source-ranges 0.0.0.0/0 \
    --description "Autoriser SSH depuis GitHub Actions"

# Vérifier que la règle est créée
gcloud compute firewall-rules list
```

### Option 3 : SSH sur un port différent (Alternative)

Si vous ne voulez pas ouvrir le port 22 publiquement :

1. Configurez SSH sur un port différent (ex: 2222) sur votre VM
2. Mettez à jour votre workflow GitHub Actions
3. Créez une règle de pare-feu pour ce port personnalisé

## 🔍 Vérification

Après avoir configuré le pare-feu, testez la connectivité :

```bash
# Depuis votre machine locale
ssh -v VOTRE_USER@VOTRE_VM_IP
```

## 📋 Plages IP de GitHub Actions (Plus sécurisé)

Pour plus de sécurité, vous pouvez restreindre aux plages IP de GitHub :
- Consultez https://api.github.com/meta pour obtenir les plages IP
- Exemple de plages (à vérifier, elles changent) :
  - `192.30.252.0/22`
  - `185.199.108.0/22`
  - `140.82.112.0/20`
  - `143.55.64.0/20`

```bash
gcloud compute firewall-rules create allow-ssh-github \
    --allow tcp:22 \
    --source-ranges 192.30.252.0/22,185.199.108.0/22,140.82.112.0/20,143.55.64.0/20 \
    --description "SSH depuis GitHub Actions uniquement"
```

## ⚠️ Sécurité

**Important** : Ouvrir le port SSH (22) à `0.0.0.0/0` signifie que n'importe quelle IP peut tenter de se connecter. 

Pour sécuriser :
1. ✅ Utilisez l'authentification par clé SSH (déjà fait)
2. ✅ Désactivez l'authentification par mot de passe
3. ✅ Installez fail2ban
4. ✅ Utilisez les plages IP de GitHub si possible

## 🔗 Ressources

- [Documentation GCP Firewall](https://cloud.google.com/firewall/docs/firewalls)
- [GitHub Actions IP Ranges](https://docs.github.com/en/actions/using-github-hosted-runners/about-github-hosted-runners#ip-addresses)
