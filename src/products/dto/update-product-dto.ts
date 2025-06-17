import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateProductDto } from './create-product-dto';

export class UpdateProductDto extends PartialType(CreateProductDto) {
  @ApiProperty({
    example: 'Iphone 17 pro max',
    description: 'Nombre del producto',
  })
  name?: string;

  @ApiProperty({
    example: 'The fastest mobile above the world',
    description: 'Descripción del producto',
  })
  description?: string;

  @ApiProperty({
    example: 1850.0,
    description: 'Precio del producto',
  })
  price?: number;

  @ApiProperty({
    example: 7,
    description: 'Stock disponible',
  })
  stock?: number;

  @ApiProperty({
    example: 'No image',
    description: 'URL de la imagen del producto',
  })
  imgUrl?: string;

  @ApiProperty({
    example:
      'ATTENTION! Replace this value with a valid (new generated) category',
    description: 'UUID de la categoría a la que pertenece el producto',
  })
  categoryId?: string;
}
