import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import * as data from '../data/data.json';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Categories } from './entities/category.entity';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Categories)
    private readonly categoriesRepository: Repository<Categories>,
  ) {}

  async addCategories(): Promise<string> {
    try {
      const categoriesNames = new Set(data.map((element) => element.category));
      const categoriesArray = Array.from(categoriesNames);
      const categories = categoriesArray.map((category) => ({
        name: category,
      }));

      await this.categoriesRepository
        .createQueryBuilder()
        .insert()
        .into(Categories)
        .values(categories)
        .orIgnore()
        .execute();

      return 'Categories Added';
    } catch {
      throw new InternalServerErrorException('Error while loading categories');
    }
  }

  async getCategories() {
    const categories = await this.categoriesRepository.find();

    if (!categories.length) {
      throw new NotFoundException('No available categories');
    }

    return categories;
  }
}
