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
Ajouter les colonnes `Nom`, `prenom`, `email` et créer un user test. 

### 3. Connexion à la base de données
  - Installation
```bash
npm install @nestjs/config dotenv
```

  - Créer et modifier de votre fichier `.env.local`
```bash
DB_TYPE=mysql
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=user
DB_PASSWORD=password
DB_DATABASE=dbName
DB_SYNCHRONIZE=true
```

  - Modifier votre ficher `app.module.ts`
```typescript
@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env.local',
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: configService.get<'mysql'>('DB_TYPE'),
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_DATABASE'),
        entities: [User],
        synchronize: configService.get<boolean>('DB_SYNCHRONIZE'),
      }),
    }),

    UsersModule,
  ],
})
```

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
Le fichier `users.controller.ts` contient toutes nos routes pour notre API REST  
Le fichier `users.service.ts` contient nos méthodes utilisés dans le fichier `users.controller.ts`...  
... mais ces méthodes ne sont pas fonctionnelles.

### 3. Modification de nos méthodes dans le `users.controller.ts`
  - Tout d'abors il faut ajouter notre repository dans un constructor  
```bash
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