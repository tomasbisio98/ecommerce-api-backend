import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { Products } from './entities/product.entity';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get('seeder')
  create() {
    return this.productsService.create();
  }

  @Get()
  getProducts(@Query('page') page?: number, @Query('limit') limit?: number) {
    const pageNum = Number(page) || 1;
    const limitNum = Number(limit) || 5;
    return this.productsService.getProducts(pageNum, limitNum);
  }

  @Get(':id')
  getProductById(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.productsService.getProductById(id);
  }

  @Post()
  addProduct(@Body() product: Omit<Products, 'id'>) {
    return this.productsService.addProduct(product);
  }

  @Put(':id')
  @UseGuards(AuthGuard)
  updateProduct(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() product: Partial<Products>,
  ) {
    return this.productsService.updateProduct(id, product);
  }

  @Delete(':id')
  deleteProduct(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.productsService.deleteProduct(id);
  }
}
