import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/user.entity';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './auth/jwt/jwt.constants';
import { RolesModule } from './roles/roles.module';

@Module({
  imports: [ TypeOrmModule.forRoot({
    type: 'mysql',
    host: '167.250.5.55',
    port: 3306,
    username: 'aulasvir_ricardo',
    password: 'Deltaco_21',
    database: 'aulasvir_ies-data',
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    synchronize: true,
  }),
  JwtModule.register({
    secret: jwtConstants.secret,
    signOptions: { expiresIn: '60d' },
  }),
  UsersModule,
  AuthModule,
  RolesModule 
],
  
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
