import { CreateCategoryDto } from './dto/create-category.dto';
export interface Category {
    slug: string;
    name: string;
    desc: string;
    color: string;
    techStack: string[];
}
export declare class CategoriesService {
    findAll(): Category[];
    findOne(slug: string): Category;
    create(dto: CreateCategoryDto): Category;
    update(slug: string, dto: Partial<Omit<CreateCategoryDto, 'slug'>>): Category;
    remove(slug: string): void;
}
