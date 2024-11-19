import { IsString, IsEmail, IsNotEmpty,  MinLength } from "class-validator";

export class RegisterAuthDto {
    @IsNotEmpty() // no este vacio
    @IsString() //pide que es un estring
    name: string;

    @IsNotEmpty() // no este vacio
    @IsString() //pide que es un estring
    lastname: string;
    
    @IsNotEmpty() // no este vacio
    dni: string;

    @IsNotEmpty() // no este vacio
    @IsString() //pide que es un estring
    materia: string;

    @IsNotEmpty() // no este vacio
    @IsString() //pide que es un estring
    @IsEmail({}, {message: 'El email no es válido'})
    email: string;
   
    @IsNotEmpty() // no este vacio
    @IsString() //pide que es un estring
     phone: string;
    
     @IsNotEmpty() // no este vacio
     @IsString() //pide que es un estring
     @MinLength(6,{message: 'La contraseña debe tener minimo de 6 caracteres'})
      password: string;

      rolesIds: string[];
    
}