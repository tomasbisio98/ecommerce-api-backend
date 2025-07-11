import {
  Injectable,
  NotFoundException,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Products } from './entities/product.entity';
import { Repository } from 'typeorm';
import { Categories } from 'src/categories/entities/category.entity';
import * as data from '../data/data.json';
import { UpdateProductDto } from './dto/update-product-dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Products)
    private readonly productsRepository: Repository<Products>,
    @InjectRepository(Categories)
    private readonly categoriesRepository: Repository<Categories>,
  ) {}

  async getProducts(page: number, limit: number): Promise<Products[]> {
    const products = await this.productsRepository.find();

    if (products.length === 0) {
      throw new NotFoundException('No products at Database');
    }

    const start = (page - 1) * limit;
    const end = start + limit;

    return products.slice(start, end);
  }

  async getProductById(id: string): Promise<Products> {
    const product = await this.productsRepository.findOne({ where: { id } });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    return product;
  }

  async create(): Promise<string> {
    try {
      const categories = await this.categoriesRepository.find();

      if (!categories.length) {
        throw new BadRequestException(
          'No categories to show. First execute /categories/seeder',
        );
      }

      const products = data.map((element) => {
        const category = categories.find(
          (cat) => cat.name === element.category,
        );

        if (!category) {
          throw new BadRequestException(
            `Invalid category for product: ${element.name}`,
          );
        }

        const newProduct = new Products();
        newProduct.name = element.name;
        newProduct.description = element.description;
        newProduct.price = element.price;
        newProduct.stock = element.stock;
        newProduct.category = category!;
        newProduct.imgUrl = element?.imgUrl;

        return newProduct;
      });

      await this.productsRepository
        .createQueryBuilder()
        .insert()
        .into(Products)
        .values(products)
        .orIgnore()
        .execute();

      return 'Products Added';
    } catch {
      throw new InternalServerErrorException(
        'Error while loading products . No existing categories  First execute /categories/seeder. ',
      );
    }
  }

  async updateProduct(
    id: string,
    updateData: UpdateProductDto,
  ): Promise<Products> {
    const product = await this.getProductById(id);

    if (updateData.categoryId) {
      const category = await this.categoriesRepository.findOneBy({
        id: updateData.categoryId,
      });
      if (!category) throw new NotFoundException('Category not found');
      product.category = category;
    }

    const updated = this.productsRepository.merge(product, updateData);
    return this.productsRepository.save(updated);
  }

  async deleteProduct(id: string): Promise<Products> {
    const product = await this.getProductById(id);
    await this.productsRepository.remove(product);
    return product;
  }
}
