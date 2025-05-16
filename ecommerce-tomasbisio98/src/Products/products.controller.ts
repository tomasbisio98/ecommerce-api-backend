import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from './products.repository';
import { AuthGuard } from 'src/auth/guards/auth.guard';

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
  @UseGuards(AuthGuard)
  addProduct(@Body() product: Omit<Product, 'id'>) {
    return this.productsService.addProduct(product);
  }

  @Put(':id')
  @UseGuards(AuthGuard)
  updateProduct(@Param('id') id: string, @Body() product: Omit<Product, 'id'>) {
    return this.productsService.updateProduct(+id, product);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  deleteProduct(@Param('id') id: string) {
    return this.productsService.deleteProduct(+id);
  }
}
