import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
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
    try {
      const categoriesNames = new Set(data.map((element) => element.category));
      const categoriesArray = Array.from(categoriesNames); // ['smartphone', 'PC']
      const categories = categoriesArray.map((category) => ({
        name: category,
      })); // [{name: 'smartphone'}, {name: 'PC'}]

      await this.categoriesRepository
        .createQueryBuilder()
        .insert()
        .into(Categories)
        .values(categories)
        .orIgnore()
        .execute();

      return 'Categories Added';
    } catch (error) {
      // ✅ Error 1: si falla la inserción
      throw new InternalServerErrorException('Error al cargar las categorías');
    }
  }

  async getCategories() {
    const categories = await this.categoriesRepository.find();

    // ✅ Error 2: si no hay categorías en la base
    if (!categories.length) {
      throw new NotFoundException('No hay categorías disponibles');
    }

    return categories;
  }
}
