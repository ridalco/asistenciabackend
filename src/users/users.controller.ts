import { Body, Controller, Post, Get, Param, Put, ParseIntPipe, UseGuards, UploadedFile, UseInterceptors, ParseFilePipe, MaxFileSizeValidator, FileTypeValidator } from '@nestjs/common';
import { CreateUserDto } from './create-user.dto';
import { UsersService } from './users.service';
import { UpdateUserDto } from 'src/auth/dto/update-user.dto';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtRolesGuard } from 'src/auth/jwt/jwt-roles.guard';
import { HasRoles } from 'src/auth/jwt/has-roles';
import { JwtRole } from 'src/auth/jwt/jwt-role';

@Controller('users')
export class UsersController {
    constructor(private UsersService:UsersService){}
    // GET -> OBTENER
    // POST -> CREAR
    // PUT ' PATCH -> ACTUALIZAR
    //  DELETE ' -> BORRAR
    @HasRoles(JwtRole.ADMIN, JwtRole.STUDENT) // Para conceder permiso solo a usuarios con permiso
    @UseGuards(JwtAuthGuard, JwtRolesGuard)
    @Get() // http://192.168.100.4/users -> GET
    findAll(){
        return this.UsersService.findAll();
    }

    @Post() // http://192.168.100.4/users -> POST
    create(@Body() user: CreateUserDto){
        return this.UsersService.create(user);
    }

    @HasRoles(JwtRole.ADMIN, JwtRole.STUDENT) // Para conceder permiso solo a usuarios con permiso
    @UseGuards(JwtAuthGuard, JwtRolesGuard)
    @Put(':id') // http://192.168.100.4/users/id -> PuT
    update(@Param('id', ParseIntPipe) id: number, @Body() user:UpdateUserDto){
        return this.UsersService.update(id,user)
    }
    
    @HasRoles(JwtRole.ADMIN, JwtRole.STUDENT) // Para conceder permiso solo a usuarios con permiso
    @UseGuards(JwtAuthGuard, JwtRolesGuard)
    @Put('upload/:id')
    @UseInterceptors(FileInterceptor('file'))
    updateWithImage(
        @UploadedFile(
            new ParseFilePipe({
                validators: [
                  new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 25 }),
                  new FileTypeValidator({ fileType: '/(jpg|jpeg|png|gif)' }), 
                ],
              }),
        ) file: Express.Multer.File,
        @Param('id', ParseIntPipe) id: number,
         @Body() user:UpdateUserDto
    ) {
    
    return this.UsersService.updateWithImage(file,id,user);
}
    
}
