import {
  IsNotEmpty,
  IsString,
  IsNumber,
  MinLength,
  MaxLength,
} from 'class-validator';

export class UpdateUserDto {
  /**
   * Nombre del usuario.
   * @example Juan
   */
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(80)
  name: string;

  /**
   * Dirección del usuario.
   * @example Santamarina
   */
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(80)
  address: string;

  /**
   * Número de teléfono del usuario (solo números).
   * @example 3519876543
   */
  @IsNotEmpty()
  @IsNumber()
  phone: number;

  /**
   * País de residencia del usuario.
   * @example Argentina
   */
  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  @MaxLength(20)
  country: string;

  /**
   * Ciudad de residencia del usuario.
   * @example Córdoba
   */
  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  @MaxLength(20)
  city: string;
}
