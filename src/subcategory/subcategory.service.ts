import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Subcategory } from './entities/subcategory.entity';

@Injectable()
export class SubcategoryService {
  constructor(
    @InjectRepository(Subcategory)
    private subCategoryRepositoy: Repository<Subcategory>,
  ) {}
  async create(createSubcategoryDto: any) {
    return await this.subCategoryRepositoy.save(createSubcategoryDto);
  }

  async findAll() {
    return await this.subCategoryRepositoy.find({
      relations: ['category'],
    });
  }

  async findOne(id: number) {
    return await this.subCategoryRepositoy.findOne({
      where: {
        id,
      },
      relations: ['category'],
    });
  }

  async update(id: number, updateSubcategoryDto: any) {
    return await this.subCategoryRepositoy.update(id, updateSubcategoryDto);
  }

  async remove(id: number) {
    return await this.subCategoryRepositoy.delete(id);
  }
}
