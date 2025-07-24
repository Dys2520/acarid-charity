# Mise à jour du système de messages - ACARID Charity

## Résumé des modifications

Ce document détaille les modifications apportées au système de gestion des messages selon les nouvelles spécifications :

1. ✅ **Suppression de la table Messages**
2. ✅ **Traitement différencié selon le type de message**
3. ✅ **Système de validation des bénévoles par email**

## Changements techniques

### 1. Suppression du modèle Message
- Le modèle `Message` a été supprimé de `src/models/index.ts`
- Plus de sauvegarde en base de données pour les messages généraux

### 2. Modification de l'API Messages (`/api/messages`)
**Nouveau comportement :**
- **Si le sujet = "témoignage"** → Enregistrement dans la collection `testimonials`
- **Pour tous les autres sujets** → Envoi d'un email au chargé de communication

### 3. Modification de l'API Volunteers (`/api/volunteers`)
**Nouveau comportement :**
- Sauvegarde du bénévole en base (statut `pending`)
- Envoi automatique d'un email à l'association avec :
  - Détails du candidat
  - Bouton **ACCEPTER** (met le statut à `approved`)
  - Bouton **REFUSER** (met le statut à `rejected`)

### 4. Nouvelle API de décision (`/api/volunteers/decision`)
- Route GET qui traite les liens d'acceptation/refus
- Sécurisée par un système de tokens HMAC
- Interface web simple pour confirmer les actions
- Gestion des cas d'erreur et de double validation

## Configuration requise

### Variables d'environnement à ajouter :

```bash
# Configuration Email
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
FROM_EMAIL=noreply@acarid-charity.org

# Destinataires
COMMUNICATION_EMAIL=communication@acarid-charity.org
VOLUNTEER_EMAIL=benevoles@acarid-charity.org
# Note: Si VOLUNTEER_EMAIL n'est pas défini, COMMUNICATION_EMAIL sera utilisé

# Sécurité
DECISION_SECRET=your-very-secure-random-string-here

# URL de base
BASE_URL=http://localhost:3000  # https://yourdomain.com en production
```

## Fonctionnalités

### Pour les témoignages
- ✅ Soumission directe dans la collection `testimonials`
- ✅ Statut `isApproved: false` par défaut
- ✅ Validation manuelle nécessaire

### Pour les messages généraux
- ✅ Envoi direct par email au chargé de communication
- ✅ Template HTML professionnel
- ✅ Pas de sauvegarde en base

### Pour les demandes de bénévolat
- ✅ Enregistrement en base avec statut `pending`
- ✅ Email automatique à l'association
- ✅ Liens sécurisés d'acceptation/refus
- ✅ Interface web de validation
- ✅ Changement de statut automatique

## Installation et déploiement

1. **Installer les dépendances** (déjà fait) :
   ```bash
   npm install nodemailer @types/nodemailer
   ```

2. **Configurer les variables d'environnement** :
   - Copier `.env.example` vers `.env.local`
   - Remplir les valeurs SMTP et email

3. **Configurer le serveur email** :
   - Gmail : Utiliser un mot de passe d'application
   - Outlook : Configurer SMTP
   - Service externe : Sendgrid, Mailgun, etc.

4. **Tester le système** :
   - Soumettre un témoignage → Vérifier la collection
   - Soumettre un message général → Vérifier l'email reçu
   - Soumettre une candidature bénévole → Vérifier l'email et les liens

## Sécurité

- ✅ Tokens HMAC pour les liens de décision
- ✅ Validation des paramètres d'entrée
- ✅ Gestion d'erreurs complète
- ✅ Protection contre les doubles validations

## Prochaines étapes possibles

1. **Système d'expiration des liens** (actuellement permanent)
2. **Interface d'administration** pour gérer les témoignages
3. **Notifications email aux candidats** lors des décisions
4. **Dashboard de suivi** des demandes de bénévolat
5. **Système de templates** d'emails personnalisables

## Migration

⚠️ **Important** : Avant la mise en production :
1. Sauvegarder la base de données existante
2. Migrer les messages existants si nécessaire
3. Tester le système d'email en environnement de développement
4. Configurer les serveurs de production pour l'envoi d'emails

---

**Date de mise à jour** : 22 juillet 2025  
**Version** : 1.0  
**Statut** : Prêt pour test
