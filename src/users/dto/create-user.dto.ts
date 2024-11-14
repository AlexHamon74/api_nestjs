import { IsNotEmpty, IsEmail } from 'class-validator';

export class CreateUserDto {
    @IsNotEmpty({ message: 'Le prénom ne peut pas être vide.' })
    firstName: string;

    @IsNotEmpty({ message: 'Le nom ne peut pas être vide.' })
    lastName: string;

    @IsEmail({}, {message: "L'email n'est pas valide"})
    email: string;
}

