Application Design
Aperçu
L'application web permettra aux utilisateurs d'uploader des fichiers PDF, d'ajouter des champs interactifs (texte, checkbox, etc.) sur les pages du PDF, d'enregistrer les positions de ces champs, de saisir des données dans ces champs, et de récupérer les données saisies dans un format JSON structuré.
Exigences Fonctionnelles

Upload PDF : Les utilisateurs peuvent uploader des fichiers PDF.
Parcourir les Pages PDF : Les utilisateurs peuvent visualiser et naviguer à travers les pages du PDF.
Ajouter des Champs Interactifs : Les utilisateurs peuvent ajouter des champs (texte, checkbox, etc.) sur chaque page et les positionner précisément.
Enregistrer les Positions des Champs : Les positions et types des champs sont enregistrés pour chaque page.
Saisir des Données : Les utilisateurs peuvent parcourir le PDF et remplir les champs ajoutés.
Exporter les Données : Les données saisies sont récupérées dans un format JSON structuré.

Stack Technique
Backend

Langage : Node.js avec Express.js
Manipulation des PDF : PDF-lib pour ajouter des champs de formulaire aux PDF
Base de Données : MongoDB pour stocker les positions des champs et les données
Stockage des Fichiers : Système de fichiers local ou AWS S3 pour les PDF uploadés

Frontend

Framework : React.js
Visualisation des PDF : pdf.js pour afficher les pages PDF
Interaction avec les Champs : Éléments HTML superposés sur les pages PDF pour ajouter et positionner les champs

Communication

API : API RESTful pour la communication entre le frontend et le backend

Architecture

Upload du PDF : Le PDF est uploadé sur le serveur et stocké.
Rendu du PDF : Le frontend utilise pdf.js pour afficher les pages PDF.
Ajout des Champs : Les utilisateurs placent des éléments HTML au-dessus du rendu PDF. Les positions sont calculées par rapport à la page.
Sauvegarde des Champs : Les types et positions des champs sont envoyés au backend et stockés dans MongoDB.
Saisie des Données : Les utilisateurs visualisent le PDF avec les champs superposés et saisissent des données.
Sauvegarde des Données : Les données saisies sont envoyées au backend et stockées dans MongoDB.
Export des Données : Les données peuvent être récupérées depuis le backend au format JSON.

Sécurité

Authentification : Implémenter une authentification utilisateur si nécessaire.
Validation des Données : Valider toutes les entrées pour éviter les attaques par injection.

Perspectives Futures

Types de Champs : Ajouter d'autres types de champs (boutons radio, listes déroulantes, etc.).
Édition Avancée : Permettre des modifications plus poussées des PDF.
Collaboration : Permettre à plusieurs utilisateurs de travailler sur le même PDF.

