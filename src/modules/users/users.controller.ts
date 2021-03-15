import { Body, Controller } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { User } from './interfaces/user.interface';
import { CryptoHelper } from '../../helpers/crypto.helper';
import { MessagePattern, RpcException } from '@nestjs/microservices';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @MessagePattern({ resource: 'users', cmd: 'post' })
  async create(@Body() createUserDto: CreateUserDto) {
    const [existingPhone, existingEmail] = await Promise.all([
      this.usersService.findOne({ phoneNumber: createUserDto.phoneNumber }),
      this.usersService.findOne({ email: createUserDto.email }),
    ]);

    if (existingPhone) {
      throw new RpcException('Phone Number In Use');
    }

    if (existingEmail) {
      throw new RpcException('Email in use');
    }

    const hashedPassword = CryptoHelper.hashPassword(createUserDto.password);
    createUserDto.passwordHash = hashedPassword.hash;
    createUserDto.passwordSalt = hashedPassword.salt;
    return this.usersService.create(createUserDto);
  }

  @MessagePattern({ resource: 'users', cmd: 'getAll' })
  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @MessagePattern({ resource: 'users', cmd: 'getOne' })
  async findOne(data: any): Promise<User> {
    return this.usersService.findOne({ ...data });
  }

  @MessagePattern({ resource: 'users', cmd: 'update' })
  async update(data): Promise<User> {
    const user = await this.usersService.findOne({ _id: data._id });
    if (!user) {
      throw new RpcException('Not Found');
    }

    await this.usersService.update(data.id, { ...data });
    return this.usersService.findOne({ _id: data._id });
  }

  @MessagePattern({ resource: 'users', cmd: 'delete' })
  async delete(data): Promise<string> {
    const user = await this.usersService.findOne({ _id: data._id });
    if (!user) {
      throw new RpcException('Not Found');
    }
    await this.usersService.delete(data._id);
    return 'success';
  }
}
