import { IsEmail, IsNotEmpty, MinLength, MaxLength } from 'class-validator';

export class LoginDto {
  /**
   * Correo electrónico único del usuario.
   * @example juan@gmail.com
   */
  @IsNotEmpty()
  @IsEmail()
  email: string;

  /**
   * Contraseña del usuario.
   * @example Password123!
   */
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(15)
  password: string;
}
