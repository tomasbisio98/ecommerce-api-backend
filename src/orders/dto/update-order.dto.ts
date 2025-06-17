import { IsUUID, IsArray, ArrayMinSize, IsOptional } from 'class-validator';

export class UpdateOrderDto {
  @IsOptional()
  @IsUUID('4', { message: 'userId must be a valid UUID v4' })
  userId?: string;

  @IsOptional()
  @IsArray({ message: 'productIds must be an array' })
  @ArrayMinSize(1, { message: 'You must provide at least one productId' })
  @IsUUID('4', {
    each: true,
    message: 'Each productId must be a valid UUID v4',
  })
  productIds?: string[];
}
