import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
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

    if (products.length === 0) {
      throw new NotFoundException(
        'No hay productos cargados en la base de datos',
      ); // ✅ Error 1: NotFoundException si el seeder no fue ejecutado
    }

    const start = (page - 1) * limit;
    const end = start + limit;

    return products.slice(start, end);
  }

  async getProductById(id: string): Promise<Products> {
    const product = await this.productsRepository.findOne({ where: { id } });

    if (!product) {
      throw new NotFoundException('Producto no encontrado'); // ✅ Error 1: NotFoundException
    }

    return product;
  }

  async create(): Promise<string> {
    try {
      const categories = await this.categoriesRepository.find();

      // ✅ Si no hay categorías cargadas, lanza error
      if (!categories.length) {
        throw new BadRequestException(
          'No hay categorías cargadas. Primero ejecuta /categories/seeder',
        );
      }

      const products = data.map((element) => {
        const category = categories.find(
          (cat) => cat.name === element.category,
        );

        if (!category) {
          throw new BadRequestException(
            `Categoría no válida para el producto: ${element.name}`,
          );
        }

        const newProduct = new Products();
        newProduct.name = element.name;
        newProduct.description = element.description;
        newProduct.price = element.price;
        newProduct.stock = element.stock;
        newProduct.category = category;
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
    } catch (error) {
      throw new InternalServerErrorException(
        'Error al cargar productos. No hay categorías cargadas. Primero ejecuta /categories/seeder. ',
      );
    }
  }

  async addProduct(productData: Omit<Products, 'id'>): Promise<Products> {
    try {
      const existing = await this.productsRepository.findOne({
        where: { name: productData.name },
      });

      if (existing) {
        throw new ConflictException('Ya existe un producto con ese nombre'); // ✅ Error 3: ConflictException
      }

      const product = this.productsRepository.create(productData);
      return this.productsRepository.save(product);
    } catch (error) {
      throw new InternalServerErrorException('Error al crear producto'); // ✅ Error 5: InternalServerErrorException
    }
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
