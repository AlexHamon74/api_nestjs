import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {

  // Injection du repository du user
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  // Méthode pour créer un user
  create(createUserDto: CreateUserDto) {
    return this.userRepository.save(createUserDto);
  }

  // Méthode pour récupérer tous les users
  async findAll() {
    const users = await this.userRepository.find();
    if(users.length === 0) {
      throw new NotFoundException();
    }
    return users;
  }

  // Méthode pour récupérer un user/id
  async findOne(id: number) {
    const user = await this.userRepository.findOne({where: {id}});
    console.log(user);
    if(user === null) {
      throw new NotFoundException();
    }
    return user;
  }

  // Méthode pour modifier un user/id
  update(id: number, updateUserDto: UpdateUserDto) {
    return this.userRepository.update(id, updateUserDto);
  }

  // Méthode pour supprimer un user/id
  remove(id: number) {
    return this.userRepository.delete(id);
  }
}
