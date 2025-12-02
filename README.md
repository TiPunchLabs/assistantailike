# assistantailike

simulation d'assistant ai 

## Infrastructure

Ce projet utilise Terraform pour gérer le dépôt GitHub.

### Prérequis

- [Terraform](https://www.terraform.io/) >= 1.0
- Un token GitHub avec les permissions nécessaires

- [direnv](https://direnv.net/) pour la gestion des variables d'environnement
- [pass](https://www.passwordstore.org/) pour le stockage sécurisé du token


### Configuration


1. Initialiser Terraform :
   ```bash
   cd terraform
   terraform init
   ```


### Déploiement

```bash
cd terraform
terraform plan
terraform apply
```

## Licence

MIT
