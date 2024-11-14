# Développement d'une Api REST en Nestjs 💻
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Nestjs](https://img.shields.io/badge/nestjs-E0234E?style=for-the-badge&logo=nestjs&logoColor=white)
![Postman](https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=Postman&logoColor=white)

--- 

## Introduction 🎬
TODO

---

## Configuration du projet ⚙️

### 1. Installer les dépendances du projet
```bash
npm install
```

### 2. Création d'une Base de données 
Créer une base de données dans phpMyAdmin et créer une table users.  
Ajouter les colonnes `Nom`, `prénom`, `email` et créer un user test. 

### 3. Connexion à la base de données
TODO


### 4. Lancer le serveur
```bash
npm run start:dev
```

---

## CRUD sur des users 🧑🏼‍💼

### 1. Installtion de l'ORM de NestJs : TypeORM
```bash
npm install --save @nestjs/typeorm typeorm mysql2
```

### 2. Génération d'un CRUD pour mon entité User
```bash
nest g resource users
```  
Le fichier `users.controller.js` contient toutes nos routes pour notre API REST  
Le fichier `users.service.ts` contient nos méthodes utilisés dans le fichier `users.controller.js`...  
... mais ces méthodes ne sont pas fonctionnelles.

### 3. Modification de nos méthodes dans le `users.controller.js`
  - Tout d'abors il faut ajouter notre repository dans un constructor  
```
  constructor(
  @InjectRepository(User) private userRepository: Repository<User>,
) {}
```
  - Ensuite on va utiliser ce repo et ses méthodes dans notre fichier  
  Exemple pour créer un user :  
```bash
    return this.userRepository.save(createUserDto);
``` 
  > [!WARNING]
  > Pour notre méthode findOne nous devons ajouter l'id de cette façon :  
  > `this.userRepository.findOne({where: {id}})`  

  > [!NOTE]
  > Vous pouvez tester vos requêtes **POST** et **PATCH** avec **postman**

### 4. Modification de nos fichier `dto` pour les méthodes `create` `update`
  - Ajouter les propriétés de votre table et leurs types

  - Installation du bundle [class-validator](https://github.com/typestack/class-validator)  
```bash
npm install class-validator --save
```

  - Ajout des contraintes sur nos champs
```bash
import { IsNotEmpty, IsEmail } from 'class-validator';  

export class CreateUserDto {
@IsNotEmpty({ message: 'Le prénom ne peut pas être vide.' })
firstName: string;
}
```

---

## Conclusion 📌
TODO



