import { Injectable } from '@nestjs/common';
import * as data from '../data.json';
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
    const categoriesNames = new Set(data.map((element) => element.category));
    const categoriesArray = Array.from(categoriesNames); // ['smartphone', 'PC']
    const categories = categoriesArray.map((category) => ({ name: category })); // [{name: 'smartphone'}, {name: 'PC'}]

    await this.categoriesRepository
      .createQueryBuilder()
      .insert()
      .into(Categories)
      .values(categories)
      .orIgnore()
      .execute();

    return 'Categories Added';
  }

  async getCategories() {
    return await this.categoriesRepository.find();
  }
}
