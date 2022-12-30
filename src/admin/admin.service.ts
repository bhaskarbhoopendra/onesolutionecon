import { Injectable } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Admin } from './entities/admin.entity';

export interface AdminInterface {
  email: string;
  password: string;
}

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Admin)
    private adminRepository: Repository<AdminInterface>,
  ) {}

  async create(createAdminDto: CreateAdminDto) {
    console.log({ createAdminDto });
    return await this.adminRepository.save(createAdminDto);
  }

  async findAll() {
    return await this.adminRepository.find({});
  }

  findOne(id: number) {
    return `This action returns a #${id} admin`;
  }

  update(id: number, updateAdminDto: UpdateAdminDto) {
    return `This action updates a #${id} admin`;
  }

  remove(id: number) {
    return `This action removes a #${id} admin`;
  }
}
