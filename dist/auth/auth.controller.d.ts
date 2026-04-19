import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from './dto/auth.dto';
import { User } from '../users/user.entity';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(dto: RegisterDto): Promise<{
        accessToken: string;
        user: {
            id: number;
            username: string;
            email: string;
            role: import("../users/user.entity").UserRole;
        };
    }>;
    login(dto: LoginDto): Promise<{
        accessToken: string;
        user: {
            id: number;
            username: string;
            email: string;
            role: import("../users/user.entity").UserRole;
        };
    }>;
    me(user: User): User;
}
