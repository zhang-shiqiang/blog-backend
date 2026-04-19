import { User } from '../users/user.entity';
import { Category } from '../categories/category.entity';
export declare class Post {
    id: number;
    slug: string;
    title: string;
    excerpt: string;
    content: string;
    status: 'draft' | 'published';
    tags: string[];
    category: Category;
    author: User;
    createdAt: Date;
    updatedAt: Date;
}
