import {
  IsNotEmpty,
  IsEmail,
  IsNumber,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  /**
   * Nombre del usuario.
   * @example Maximiliano
   */
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(80)
  name: string;

  /**
   * Correo electrónico único del usuario.
   * @example juan@gmail.com
   */
  @IsNotEmpty()
  @IsEmail()
  email: string;

  /**
   * Contraseña segura del usuario.
   * Debe tener al menos:
   * - 1 mayúscula
   * - 1 minúscula
   * - 1 número
   * - 1 carácter especial (!@#$%^&*)
   * @example Password123!
   */
  @IsNotEmpty()
  @Matches(/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/, {
    message:
      'Password must contain at least one uppercase letter, one lowercase letter, one number and one special character.',
  })
  @MinLength(8)
  @MaxLength(15)
  password: string;

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
