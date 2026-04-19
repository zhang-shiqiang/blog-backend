import { Post } from '../posts/post.entity';
export declare class Category {
    slug: string;
    name: string;
    desc: string;
    color: string;
    techStack: string[];
    posts: Post[];
}
