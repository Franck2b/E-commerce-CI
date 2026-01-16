# ⚠️ VÉRIFICATIONS AVANT DE POUSSER

## 🚨 LE PROBLÈME N'EST PAS DANS LE CODE !

Le "Connection timed out" signifie que GitHub Actions **ne peut pas atteindre votre VM**.

## ✅ CHECKLIST OBLIGATOIRE (à faire MAINTENANT)

### 1. Vérifier que la VM est allumée ⚡

```bash
# Allez sur https://console.cloud.google.com/compute/instances
# Vérifiez que votre VM est VERTE (Running)
```

### 2. Noter l'IP EXTERNE de la VM 📝

```
Sur la console GCP, dans la colonne "External IP" :
Exemple : 34.123.45.67

⚠️ NE PAS utiliser l'IP interne (10.x.x.x) !
```

### 3. Vérifier les secrets GitHub 🔐

Allez sur : https://github.com/Franck2b/E-commerce-CI/settings/secrets/actions

| Secret | Valeur EXACTE |
|--------|---------------|
| `SERVER_HOST` | **L'IP EXTERNE** de votre VM (ex: 34.123.45.67) |
| `SERVER_USER` | Votre utilisateur SSH (ex: runner, ubuntu, franck, etc.) |
| `SSH_PRIVATE_KEY` | La clé privée COMPLÈTE (avec -----BEGIN et -----END) |

### 4. Tester depuis votre PC 💻

```bash
# Remplacez par VOS valeurs
ssh VOTRE_USER@VOTRE_IP_EXTERNE

# Si ça ne marche pas en local, ça ne marchera JAMAIS sur GitHub Actions !
```

### 5. Vérifier le pare-feu GCP 🔥

```bash
gcloud compute firewall-rules list | grep ssh

# Vous DEVEZ voir une règle autorisant TCP:22 depuis 0.0.0.0/0
```

Si manquant :
```bash
gcloud compute firewall-rules create allow-ssh-all \
    --allow tcp:22 \
    --source-ranges 0.0.0.0/0
```

## 🎯 ORDRE D'ACTIONS

1. ✅ Vérifier VM allumée
2. ✅ Noter IP externe
3. ✅ Mettre à jour `SERVER_HOST` dans secrets GitHub
4. ✅ Tester SSH depuis votre PC
5. ✅ Vérifier pare-feu GCP
6. 🚀 **ENSUITE SEULEMENT** → git push

## 💡 CONSEIL

Le code est maintenant MINIMAL et STABLE. Si ça ne marche toujours pas :
- Ce n'est PAS un problème de code
- C'est un problème de configuration réseau/secrets

Vérifiez dans l'ordre ci-dessus !
