import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
export declare class PostsController {
    private readonly postsService;
    constructor(postsService: PostsService);
    findAll(category?: string, status?: string): import("./posts.service").Post[];
    findOne(id: number): import("./posts.service").Post;
    create(dto: CreatePostDto): import("./posts.service").Post;
    update(id: number, dto: Partial<CreatePostDto>): import("./posts.service").Post;
    remove(id: number): {
        message: string;
    };
}
