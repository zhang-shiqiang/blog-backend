import { Post } from '../posts/post.entity';
export type UserRole = 'admin' | 'editor';
export declare class User {
    id: number;
    username: string;
    email: string;
    password: string;
    role: UserRole;
    isActive: boolean;
    posts: Post[];
    createdAt: Date;
    updatedAt: Date;
}
