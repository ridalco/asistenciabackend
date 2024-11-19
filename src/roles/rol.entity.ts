import { Column, Entity, ManyToMany, PrimaryColumn } from "typeorm";
import { User } from '../users/user.entity';

@Entity ({name: 'roles'})
export class Rol {
    @PrimaryColumn()
    id: string;

    @Column()
    name: string;
    
    @Column({unique: true})
    image: string;

    @Column()
    route: string;

    @Column( { type:'datetime', default: () => 'CURRENT_TIMESTAMP'})
    created_at: Date;

    @Column( { type:'datetime', default: () => 'CURRENT_TIMESTAMP'})
    update_at: Date;

    @ManyToMany(() => User, (user) => user.roles)
    users: User[];
}