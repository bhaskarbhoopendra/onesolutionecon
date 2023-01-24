import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateColorDto } from './dto/create-color.dto';
import { UpdateColorDto } from './dto/update-color.dto';
import { Color } from './entities/color.entity';

@Injectable()
export class ColorsService {
  constructor(
    @InjectRepository(Color) private colorRepository: Repository<Color>,
  ) {}
  async create(createColorDto: CreateColorDto) {
    return await this.colorRepository.save(createColorDto);
  }

  async findAll() {
    return await this.colorRepository.find();
  }

  async findOne(id: number) {
    return await this.colorRepository.findOne({ where: { id } });
  }

  async update(id: number, updateColorDto: UpdateColorDto) {
    return await this.colorRepository.update(id, updateColorDto);
  }

  async remove(id: number) {
    return await this.colorRepository.delete(id);
  }
}
