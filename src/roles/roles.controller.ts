import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRolDto } from './dto/create-rol.dto';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';
import { JwtRolesGuard } from 'src/auth/jwt/jwt-roles.guard';
import { JwtRole } from 'src/auth/jwt/jwt-role';
import { HasRoles } from 'src/auth/jwt/has-roles';

@Controller('roles')
export class RolesController {

    constructor(private rolesService: RolesService) {}
    
    @HasRoles(JwtRole.ADMIN) // Para conceder permiso solo a usuarios con permiso
    @UseGuards(JwtAuthGuard, JwtRolesGuard)
  @Post()
    create(@Body() rol: CreateRolDto) {
        return this.rolesService.create(rol);
    }
}