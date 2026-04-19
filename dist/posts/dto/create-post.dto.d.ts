export declare class CreatePostDto {
    title: string;
    excerpt: string;
    content: string;
    category: string;
    tags?: string[];
    status?: 'draft' | 'published';
}
