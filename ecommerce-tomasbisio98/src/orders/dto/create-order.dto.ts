import {
  IsUUID,
  IsArray,
  ArrayMinSize,
  ValidateNested,
  IsNotEmpty,
} from 'class-validator';
import { Type } from 'class-transformer';

class PartialProductDto {
  @IsUUID('4', { message: 'Each product must have a valid UUID v4 as id' })
  id: string;
}

export class CreateOrderDto {
  @IsNotEmpty()
  @IsUUID('4', { message: 'userId must be a valid UUID v4' })
  userId: string;

  @IsArray({ message: 'products must be an array' })
  @ArrayMinSize(1, { message: 'At least one product is required' })
  @ValidateNested({ each: true })
  @Type(() => PartialProductDto)
  products: PartialProductDto[];
}