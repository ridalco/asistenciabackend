import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';
import { In, Repository } from 'typeorm';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import { compare} from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Rol } from 'src/roles/rol.entity';


@Injectable()
export class AuthService {

    constructor(
        @InjectRepository(User) private usersRepository: Repository<User>,
        @InjectRepository(Rol) private rolesRepository: Repository<Rol>,

        private jwtService: JwtService
    ) {}
    
   async register(user: RegisterAuthDto){
        // 409 CONFLICT
        const emailExist= await this.usersRepository.findOneBy({email: user.email})

        if (emailExist) {
            throw new HttpException('El email ya esta registrado', HttpStatus.CONFLICT);
        }

        const phoneExist = await this.usersRepository.findOneBy({phone: user.phone});
        if (phoneExist) {
            throw new HttpException('El telefono ya esta registrado', HttpStatus.CONFLICT);
        }

        const newUser = this.usersRepository.create(user);
        
        let rolesIds= [];
        
        if (user.rolesIds !== undefined && user.rolesIds !== null) {
             rolesIds = user.rolesIds;
        }
        else {
            rolesIds.push('STUDENT')
        }

        
        const roles = await this.rolesRepository.findBy({id: In(rolesIds)});
        
        newUser.roles= roles;

         
        const userSave = await this.usersRepository.save(newUser);
        const rolesString = userSave.roles.map(rol => rol.id);

        const payload = {
             id: userSave.id, 
             name: userSave.name,
             roles: rolesString
            };
        const token = this.jwtService.sign(payload);
        const data = {
           user: userSave,
           token: 'Bearer' + token
    }
    delete data.user.password
    }
    
    async login(loginData: LoginAuthDto) {
        const {email, password} =loginData;
        const userFound= await this.usersRepository.findOne({
            where: {email: email},
            relations: ['roles']
        })
        if (!userFound){
            throw new HttpException('El email no existe', HttpStatus.NOT_FOUND);
        }

    const isPasswordValid = await compare(password, userFound.password);
    if (!isPasswordValid) {
        throw new HttpException('La contraseña es incrrecta', HttpStatus.FORBIDDEN);
    }
    
    // traer roles del usuario
    const rolesIds = userFound.roles.map(rol => rol.id); //['CLIENT','STUDENT','ADMIN']

    const payload = { 
        id: userFound.id, 
        name: userFound.name, 
        roles: rolesIds};
    const token = this.jwtService.sign(payload);
    const data = {
        user: userFound,
        token: 'Bearer ' + token
    }
    delete data.user.password
    
    return data;
    }
}
