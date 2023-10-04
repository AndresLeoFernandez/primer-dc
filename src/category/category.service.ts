import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOneOptions } from 'typeorm';

@Injectable()
export class CategoryService {
 
  constructor(
    @InjectRepository(Category) private readonly categoryRepository: Repository<Category>)
    {}
  
  async create(createCategoryDto: CreateCategoryDto) {
    const criteria : FindOneOptions = { where:{ name: createCategoryDto.name }}
    const categoryExist = await this.categoryRepository.findOne(criteria);
    if (categoryExist)
      throw new BadRequestException('Category already exist');
    const newCategory = new Category(createCategoryDto.name);
    const category = await this.categoryRepository.save(newCategory);
    return category;
  }

  async findAll(): Promise<Category[]> {
    return await this.categoryRepository.find()
  }

  async findOne(id: number):Promise<Category> {
    const criteria : FindOneOptions = { where:{ categoryId:id }}
    const foundCategory = await this.categoryRepository.findOne(criteria);
    if (!foundCategory) {
      throw new NotFoundException('Category not found');
    }
    return foundCategory;
  }

  async findOneByName(name: string): Promise<Category> {
    const criteria : FindOneOptions = { where:{ name }}
    const foundCategory = await this.categoryRepository.findOne(criteria);
    if (!foundCategory)
    throw new NotFoundException('Category not found.');
    return foundCategory;
  }

  /* sin documentar */
  async update(id: number, updateCategoryDto: UpdateCategoryDto): Promise<Category> {
    const category = await this.findOne(id);    
    const newCategory = Object.assign(category, updateCategoryDto);
    return await this.categoryRepository.save(newCategory);       
  }
  
  /* sin documentar */
  async remove(categoryId: number): Promise<any> {
    return await this.categoryRepository.delete(categoryId);
  }
}
