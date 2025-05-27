import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { Products } from './entities/product.entity';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/role.decorator';
import { Role } from 'src/common/roles.enum';
import { ApiBearerAuth, ApiQuery } from '@nestjs/swagger';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get('seeder')
  create() {
    return this.productsService.create();
  }

  @Get()
  @ApiQuery({
    name: 'page',
    required: false,
    type: Number,
    example: 1,
    description: 'Número de página (default: 1)',
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: Number,
    example: 5,
    description: 'Cantidad de productos por página (default: 5)',
  })
  getProducts(@Query('page') page?: number, @Query('limit') limit?: number) {
    const pageNum = Number(page) || 1;
    const limitNum = Number(limit) || 5;
    return this.productsService.getProducts(pageNum, limitNum);
  }

  @Get(':id')
  getProductById(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.productsService.getProductById(id);
  }

  @ApiBearerAuth()
  @Put(':id')
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
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
