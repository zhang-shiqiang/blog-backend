import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { LoginDto, RegisterDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async register(dto: RegisterDto) {
    const user = await this.usersService.create(dto.username, dto.email, dto.password);
    const token = this.signToken(user.id, user.email, user.role);
    return { user: { id: user.id, username: user.username, email: user.email, role: user.role }, ...token };
  }

  async login(dto: LoginDto) {
    const user = await this.usersService.findByEmail(dto.email);
    if (!user || !user.isActive) throw new UnauthorizedException('账号不存在或已禁用');

    const valid = await this.usersService.validatePassword(user, dto.password);
    if (!valid) throw new UnauthorizedException('密码错误');

    const token = this.signToken(user.id, user.email, user.role);
    return { user: { id: user.id, username: user.username, email: user.email, role: user.role }, ...token };
  }

  private signToken(userId: number, email: string, role: string) {
    const payload = { sub: userId, email, role };
    return { accessToken: this.jwtService.sign(payload) };
  }
}
