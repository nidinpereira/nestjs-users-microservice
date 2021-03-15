import { Inject, Injectable } from '@nestjs/common';
import { USER_MODEL } from '../../constants/providers.constants';
import { Model } from 'mongoose';
import { User } from './interfaces/user.interface';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @Inject(USER_MODEL)
    private userModel: Model<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const createdUser = new this.userModel(createUserDto);
    await createdUser.save();
    return createdUser;
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findOne(query: any): Promise<User> {
    return this.userModel.findOne({ ...query }).exec();
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    return this.userModel.findByIdAndUpdate(id, updateUserDto);
  }

  async delete(id: string): Promise<any> {
    return this.userModel.findByIdAndDelete(id).exec();
  }
}
