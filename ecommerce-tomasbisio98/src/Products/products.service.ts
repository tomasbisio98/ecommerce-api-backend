import { Injectable } from '@nestjs/common';
import { Product, ProductsRepository } from './products.repository';

@Injectable()
export class ProductsService {
  constructor(private readonly productsRepository: ProductsRepository) {}
  getProducts(page: number, limit: number) {
    let products = this.productsRepository.getProducts();
    const start = (page - 1) * limit;
    const end = start + limit;

    products = products.slice(start, end);

    return products;
  }

  getProductById(id: number) {
    return this.productsRepository.getProductById(id);
  }

  addProduct(product: Omit<Product, 'id'>) {
    return this.productsRepository.addProduct(product);
  }

  updateProduct(id: number, product: Omit<Product, 'id'>) {
    return this.productsRepository.updateProduct(id, product);
  }

  deleteProduct(id: number) {
    return this.productsRepository.deleteProduct(id);
  }
}
