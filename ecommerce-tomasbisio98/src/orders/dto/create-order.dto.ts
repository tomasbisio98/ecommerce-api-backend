import {
  IsUUID,
  IsArray,
  ArrayMinSize,
  ValidateNested,
  IsNotEmpty,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

class PartialProductDto {
  @ApiProperty({
    description:
      'ID único del producto (UUID v4). Se obtiene al consultar la lista de productos (GET /products).',
    example: 'id-del-producto-obtenido-en-la-API',
  })
  @IsUUID('4', { message: 'Each product must have a valid UUID v4 as id' })
  id: string;
}

export class CreateOrderDto {
  @ApiProperty({
    description:
      'ID único del usuario que realiza la orden (UUID v4). Este usuario debe existir en la base de datos.',
    example: 'id-del-usuario-obtenido-en-la-API',
  })
  @IsNotEmpty()
  @IsUUID('4', { message: 'userId must be a valid UUID v4' })
  userId: string;

  @ApiProperty({
    type: [PartialProductDto],
    description:
      'Lista de productos incluidos en la orden. Cada producto debe tener un `id` válido.',
    example: [{ id: 'id-del-producto-obtenido-en-la-API' }],
  })
  @IsArray({ message: 'products must be an array' })
  @ArrayMinSize(1, { message: 'At least one product is required' })
  @ValidateNested({ each: true })
  @Type(() => PartialProductDto)
  products: PartialProductDto[];
}
