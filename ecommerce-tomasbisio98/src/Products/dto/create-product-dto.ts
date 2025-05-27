import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsNumber,
  IsUUID,
  MaxLength,
  Min,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty({
    description: 'Nombre único del producto',
    example: 'Iphone 16 Pro Max',
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  name: string;

  @ApiProperty({
    description: 'Descripción detallada del producto',
    example:
      'El mejor smartphone del mundo, con cámaras avanzadas y diseño premium.',
  })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({
    description: 'Precio del producto',
    example: 1299.99,
  })
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  price: number;

  @ApiProperty({
    description: 'Cantidad de stock disponible',
    example: 10,
  })
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  stock: number;

  @ApiProperty({
    description: 'URL de la imagen del producto',
    example: 'https://example.com/iphone16.jpg',
    required: false,
  })
  @IsOptional()
  @IsString()
  imgUrl?: string;

  @ApiProperty({
    description: 'ID de la categoría a la que pertenece el producto',
    example: 'c1fdd73e-bf3a-4d6b-bfcd-91c3a1a09b11',
  })
  @IsNotEmpty()
  @IsUUID('4', { message: 'categoryId must be a valid UUID v4' })
  categoryId: string;
}
