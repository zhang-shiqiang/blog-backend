import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly repo: Repository<User>,
  ) {}

  async findByEmail(email: string): Promise<User | null> {
    return this.repo.findOne({ where: { email }, select: ['id', 'username', 'email', 'password', 'role', 'isActive'] });
  }

  async findById(id: number): Promise<User> {
    const user = await this.repo.findOne({ where: { id } });
    if (!user) throw new NotFoundException('用户不存在');
    return user;
  }

  async findAll(): Promise<User[]> {
    return this.repo.find({ order: { createdAt: 'DESC' } });
  }

  async create(username: string, email: string, password: string, role: 'admin' | 'editor' = 'editor'): Promise<User> {
    const exists = await this.repo.findOne({ where: [{ email }, { username }] });
    if (exists) throw new ConflictException('用户名或邮箱已存在');

    const hashed = await bcrypt.hash(password, 10);
    const user = this.repo.create({ username, email, password: hashed, role });
    return this.repo.save(user);
  }

  async validatePassword(user: User, password: string): Promise<boolean> {
    return bcrypt.compare(password, user.password);
  }
}
