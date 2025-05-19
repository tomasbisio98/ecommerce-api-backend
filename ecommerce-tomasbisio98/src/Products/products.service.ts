import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Products } from './entities/product.entity';
import { Repository } from 'typeorm';
import { Categories } from 'src/categories/entities/category.entity';
import * as data from '../data.json';

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

    const start = (page - 1) * limit;
    const end = start + limit;

    return products.slice(start, end);
  }

  async getProductById(id: string): Promise<Products> {
    const product = await this.productsRepository.findOne({ where: { id } });

    if (!product) {
      throw new NotFoundException('Producto no encontrado');
    }

    return product;
  }

  async create(): Promise<string> {
    const categories = await this.categoriesRepository.find();

    const products = data.map((element) => {
      const category = categories.find((cat) => cat.name === element.category);

      const newProduct = new Products();
      newProduct.name = element.name;
      newProduct.description = element.description;
      newProduct.price = element.price;
      newProduct.stock = element.stock;
      newProduct.category = category!;
      // newProduct.imgUrl = element.imgUrl || 'no image';

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
  }

  async addProduct(productData: Omit<Products, 'id'>): Promise<Products> {
    const product = this.productsRepository.create(productData);
    return this.productsRepository.save(product);
  }

  async updateProduct(
    id: string,
    updateData: Partial<Products>,
  ): Promise<Products> {
    const product = await this.getProductById(id);

    const updated = this.productsRepository.merge(product, updateData);
    return this.productsRepository.save(updated);
  }

  async deleteProduct(id: string): Promise<Products> {
    const product = await this.getProductById(id);
    await this.productsRepository.remove(product);
    return product;
  }
}
