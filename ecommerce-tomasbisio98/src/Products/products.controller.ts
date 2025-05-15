import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from './products.repository';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  getProducts(@Query('page') page?: number, @Query('limit') limit?: number) {
    const pageNum = Number(page) || 1;
    const limitNum = Number(limit) || 5;
    return this.productsService.getProducts(pageNum, limitNum);
  }

  @Get(':id')
  getProductById(@Param('id') id: string) {
    return this.productsService.getProductById(+id);
  }

  @Post()
  addProduct(@Body() product: Omit<Product, 'id'>) {
    return this.productsService.addProduct(product);
  }

  @Put(':id')
  updateProduct(@Param('id') id: string, @Body() product: Omit<Product, 'id'>) {
    return this.productsService.updateProduct(+id, product);
  }

  @Delete(':id')
  deleteProduct(@Param('id') id: string) {
    return this.productsService.deleteProduct(+id);
  }
}
