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
Créer une base de données dans phpMyAdmin et créer une table.  
Ajouter les colonnes `Nom`, `prenom`, `email` et créer un user test. 

### 3. Connexion à la base de données
  - Installation du la config
```bash
npm install @nestjs/config dotenv
```
  - Installation de l'ORM de NestJs : TypeORM
```bash
npm install --save @nestjs/typeorm typeorm mysql2
```

  - Créer et modifier de votre fichier `.env.local`
```typescript
DB_TYPE=mysql
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=user
DB_PASSWORD=password
DB_DATABASE=dbName
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
        entities: [],
      }),
    }),
  ],
})
```

### 4. Lancer le serveur
```bash
npm run start:dev
```

---

## CRUD sur une Entité 🧑🏼‍💼

### 1. Génération d'un CRUD pour mon entité
```bash
nest g resource
```  

### 2. Modification du fichier `app.module.ts`
  - Ajouter votre entité dans la propriété `entities`

### 3. Modification du fichier `entity.entity.ts`
```ts
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("entities")
export class Entity {
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    name: string;
}
```

  > [!WARNING]
  > Si l'une de vos colonnes est une date : 
  > ```
  > @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  >  deadline: Date;
  > ```  

### 4. Modification du ficher `entities.module.ts`
Ajouter cette ligne dans votre @Module
```ts
  imports: [TypeOrmModule.forFeature([Entité])]
```

### 5. Modification des méthodes dans le fichier `entities.service.ts`
Le fichier `entities.controller.ts` contient toutes nos routes pour notre API REST  
Le fichier `entities.service.ts` contient nos méthodes utilisés dans le fichier `entities.controller.ts`...  
... mais ces méthodes ne sont pas fonctionnelles.  
  
  - Tout d'abors il faut ajouter notre repository dans un constructor à l'intérieur de notre classe
```typescript
  constructor(
  @InjectRepository(User) private userRepository: Repository<User>,
) {}
```

  - Ensuite on va utiliser ce repo et ses méthodes dans notre fichier  
  Exemple pour créer un user :  
```typescript
    return this.userRepository.save(createUserDto);
``` 
  > [!WARNING]
  > Pour notre méthode findOne nous devons ajouter l'id de cette façon :  
  > `this.userRepository.findOne({where: {id}})`  

  > [!NOTE]
  > Vous pouvez tester vos requêtes **POST** et **PATCH** avec **postman**

### 6. Modification de nos fichiers `dto` pour les méthodes `create` `update`
  - Ajouter les propriétés de votre table et leurs types

  - Installation du bundle [class-validator](https://github.com/typestack/class-validator)  
```bash
npm install class-validator --save
```

  - On ajoute le ValidationPipe dans le `main.ts` pour le réutiliser dans tous les fichiers
```typescript
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();

```

  - Ajout des contraintes sur nos champs
```typescript
import { IsNotEmpty } from 'class-validator';  

export class CreateUserDto {
@IsNotEmpty({ message: 'Le prénom ne peut pas être vide.' })
firstName: string;
}
```

---

## Conclusion 📌
TODO
