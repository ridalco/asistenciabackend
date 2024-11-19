import { IsNotEmpty, IsString } from "class-validator";

export class UpdateUserDto {
    //@IsNotEmpty()
    //@IsString()
    name?: String;
   
    
    lastname?: String;
    
    
    dni?: String;
   
    
    materia?: String;
   
    

    image?: String;
    notification_token?: String;
}