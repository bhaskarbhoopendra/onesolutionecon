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
  UnauthorizedException,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Req, Res } from '@nestjs/common/decorators';
import { Response, Request } from 'express';

@Controller('admin')
export class AdminController {
  constructor(
    private jwtService: JwtService,
    private readonly adminService: AdminService,
  ) {}

  @Post('register')
  async create(@Body() createAdminDto: CreateAdminDto) {
    try {
      const hashedPassword: string = await bcrypt?.hash(
        createAdminDto.password,
        10,
      );
      const user = await this.adminService.create({
        ...createAdminDto,
        password: hashedPassword,
      });
      const { password, ...result } = user;
      return result;
    } catch (error) {
      throw new HttpException(
        ' user with email already exists',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Post('login')
  async login(
    @Body() createAdminDto: CreateAdminDto,
    @Res({ passthrough: true }) response: Response,
  ) {
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
      const jwtToken = await this.jwtService.signAsync({ id: foundUser.id });
      response.cookie('jwt', jwtToken);
      const { password, ...result } = foundUser;
      return result;
    } catch (error) {
      console.log({ error });
      throw new HttpException(
        ' user with email not found',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get('user')
  async adminUser(@Req() request: Request) {
    try {
      const userCookie = request.cookies['jwt'];
      const data = await this.jwtService.verify(userCookie);
      if (!data) {
        throw new UnauthorizedException();
      }
      const foundAdmin = await this.adminService.findOne(data?.id);
      const { password, ...result } = foundAdmin;
      return result;
    } catch (error) {
      throw new UnauthorizedException();
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
