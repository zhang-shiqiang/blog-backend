import { Repository } from 'typeorm';
import { User } from './user.entity';
export declare class UsersService {
    private readonly repo;
    constructor(repo: Repository<User>);
    findByEmail(email: string): Promise<User | null>;
    findById(id: number): Promise<User>;
    findAll(): Promise<User[]>;
    create(username: string, email: string, password: string, role?: 'admin' | 'editor'): Promise<User>;
    validatePassword(user: User, password: string): Promise<boolean>;
}
