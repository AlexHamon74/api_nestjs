import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsNotEmpty, IsEmail } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {

    @IsNotEmpty({ message: 'Le prénom ne peut pas être vide.' })
    firstName: string;

    @IsNotEmpty({ message: 'Le nom ne peut pas être vide.' })
    lastName: string;

    @IsEmail({}, {message: "L'email n'est pas valide"})
    email: string;
}
