import { CreatePostDto } from './dto/create-post.dto';
export interface Post {
    id: number;
    slug: string;
    title: string;
    excerpt: string;
    content: string;
    category: string;
    tags: string[];
    status: 'draft' | 'published';
    date: string;
    createdAt: Date;
    updatedAt: Date;
}
export declare class PostsService {
    findAll(category?: string, status?: string): Post[];
    findOne(id: number): Post;
    create(dto: CreatePostDto): Post;
    update(id: number, dto: Partial<CreatePostDto>): Post;
    remove(id: number): void;
}
