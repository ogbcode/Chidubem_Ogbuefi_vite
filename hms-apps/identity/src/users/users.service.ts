import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
//import { CreateUserDto } from './dto/create-user.dto';
//import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto, PaginationDto, UpdateUserDto, Users } from '@common/hms-lib';
import { randomUUID } from 'crypto';
import { Observable, Subject } from 'rxjs';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()

export class UsersService{
  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>){}
  
  create(createUserDto: CreateUserDto): User {
    const user:User = { //these should be from entity
      ...createUserDto,
      id: randomUUID(),
      primaryEmailAddress: createUserDto.primaryEmailAddress,
      firstName: createUserDto.firstName,
      lastName: createUserDto.lastName,
      backupEmailAddress: '',
      phone: {},
      isPrimaryEmailAddressVerified: false,
      isBackupEmailAddressVerified: false,
      passwordHash: randomUUID()
    }
    this.userRepository.save(user);
    return user;
  }

  findAll() {
    return this.userRepository.find();
  }
  findOne(id: string): Promise<User> {
    const user = this.userRepository.findOne({
      where: {
        id: id,
      },
    });


    if (!user) {
      throw new NotFoundException(`User Not found`);
    }

    return user ;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<any> {
    const user = this.userRepository.findOne({ where: { id } });

    if (!user) {
      throw new Error('User not found');
    }
    return this.userRepository.update(id, updateUserDto).then(() => {
      return { message: 'User updated successfully' };
    });
  }


  async remove(id: string): Promise<any> {
    const user = this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new Error('User not found');
    }
    return this.userRepository.delete(id).then(() => {
      return { message: 'User deleted successfully' };
    });
  }

  queryUsers(paginationDtoStream: Observable<PaginationDto>): Observable<Users> {
    const subject = new Subject<Users>();

    const onNext = async (paginationDto: PaginationDto) => {
      const { page, skip } = paginationDto;
      const start = page * skip;

      try {
        const users = await this.userRepository.find({
          skip: start,
          take: skip,
        });

        subject.next({
          users,
        });
      } catch (error) {
        subject.error(error);
      }
    };

    const onComplete = () => subject.complete();

    paginationDtoStream.subscribe({
      next: onNext,
      complete: onComplete,
    });

    return subject.asObservable();
  }

  async findOneUserByPrimaryEmailAddress(primaryEmailAddress: string): Promise<User | undefined> {
    const user = await this.userRepository.findOne({
      where: {
        primaryEmailAddress,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }
}


