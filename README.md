# Portfolio & back-office

Portfolio React/Vite administrable avec Convex. La vitrine publique est disponible sur `/` et l’espace privé sur `/admin`.

## Fonctionnalités

- Authentification administrateur par email et mot de passe avec Convex Auth.
- Création, modification, publication, archivage et suppression des projets.
- Upload et remplacement des visuels dans Convex Storage.
- Gestion centralisée des technologies, upload de leurs logos et protection contre la suppression d’une technologie utilisée.
- Recherche, filtres, ordre d’affichage et mise en avant des projets.
- Synchronisation temps réel de la vitrine publique.
- Import en un clic des projets historiques codés dans la version initiale.
- Données locales de secours tant que Convex n’est pas configuré ou que la base est vide.

## Mise en service de Convex

Installez les dépendances puis connectez le dépôt à un projet Convex :

```bash
npm install
npx convex dev
```

La commande crée le déploiement de développement et ajoute `VITE_CONVEX_URL` dans `.env.local`.

Initialisez ensuite Convex Auth et ses clés :

```bash
npx @convex-dev/auth
```

Déclarez l’unique adresse autorisée à ouvrir le back-office :

```bash
npx convex env set ADMIN_EMAIL vous@exemple.com
```

Lancez l’application dans un autre terminal :

```bash
npm run dev
```

Ouvrez `http://localhost:5173/admin`, choisissez « Première connexion ? Initialiser le compte », puis utilisez exactement l’adresse définie dans `ADMIN_EMAIL`. Les inscriptions avec une autre adresse sont rejetées côté serveur.

## Première migration

Après connexion, si la base est vide, cliquez sur « Importer les projets actuels ». Les technologies, projets et images existants sont copiés vers Convex. Dès que la base contient des projets publiés, la vitrine utilise automatiquement les données Convex.

## Production

Déployez d’abord les fonctions Convex :

```bash
npm run convex:deploy
```

Configurez `ADMIN_EMAIL` sur le déploiement de production si la CLI le demande, puis ajoutez la valeur de `VITE_CONVEX_URL` aux variables d’environnement de l’hébergeur Vite. Le fichier `vercel.json` assure déjà le fallback SPA nécessaire à `/admin`.

## Commandes

```bash
npm run dev             # interface Vite
npm run dev:backend     # synchronisation des fonctions Convex
npm run build           # build de production
npm run lint            # analyse ESLint
npm run convex:deploy   # déploiement Convex
```

Documentation de référence : [Convex](https://docs.convex.dev/home), [Convex Auth](https://docs.convex.dev/auth/convex-auth) et [upload de fichiers](https://docs.convex.dev/file-storage/upload-files).
