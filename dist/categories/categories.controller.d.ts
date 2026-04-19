import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
export declare class CategoriesController {
    private readonly categoriesService;
    constructor(categoriesService: CategoriesService);
    findAll(): import("./categories.service").Category[];
    findOne(slug: string): import("./categories.service").Category;
    create(dto: CreateCategoryDto): import("./categories.service").Category;
    update(slug: string, dto: Partial<CreateCategoryDto>): import("./categories.service").Category;
    remove(slug: string): {
        message: string;
    };
}
