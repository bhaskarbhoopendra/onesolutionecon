import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import * as bcrypt from 'bcrypt';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post('/register')
  async create(@Body() createAdminDto: CreateAdminDto) {
    try {
      const hashedPassword: string = await bcrypt?.hash(
        createAdminDto.password,
        10,
      );
      return await this.adminService.create({
        ...createAdminDto,
        password: hashedPassword,
      });
    } catch (error) {
      throw new HttpException(
        ' user with email already exists',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Post('/login')
  async login(@Body() createAdminDto: CreateAdminDto) {
    try {
      const foundUser = await this.adminService.getByEmail(
        createAdminDto.email,
      );
      const isPasswordMatching = await bcrypt.compare(
        createAdminDto.password,
        foundUser.password,
      );
      if (!isPasswordMatching) {
        throw new HttpException(
          'wrong credential Provided',
          HttpStatus.BAD_REQUEST,
        );
      }
    } catch (error) {
      console.log({ error });
      throw new HttpException(
        ' user with email not found',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get()
  async findAll() {
    return await this.adminService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.adminService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAdminDto: UpdateAdminDto) {
    return this.adminService.update(+id, updateAdminDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.adminService.remove(+id);
  }
}
