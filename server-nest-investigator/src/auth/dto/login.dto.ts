import { IsEmail, IsNotEmpty } from 'class-validator';

export class LoginDto {
  @IsEmail({}, {message: 'некоректный email'})
  @IsNotEmpty({message: 'поле не должно быть пустым' })
  email: string;

  @IsNotEmpty({message: 'поле не должно быть пустым' })
  password: string;
}