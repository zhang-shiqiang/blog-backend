import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';

@ApiTags('分类')
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  @ApiOperation({ summary: '获取所有分类' })
  findAll() {
    return this.categoriesService.findAll();
  }

  @Get(':slug')
  @ApiOperation({ summary: '获取分类详情' })
  findOne(@Param('slug') slug: string) {
    return this.categoriesService.findOne(slug);
  }

  @Post()
  @ApiOperation({ summary: '创建分类' })
  create(@Body() dto: CreateCategoryDto) {
    return this.categoriesService.create(dto);
  }

  @Patch(':slug')
  @ApiOperation({ summary: '更新分类' })
  update(@Param('slug') slug: string, @Body() dto: Partial<CreateCategoryDto>) {
    return this.categoriesService.update(slug, dto);
  }

  @Delete(':slug')
  @HttpCode(200)
  @ApiOperation({ summary: '删除分类' })
  remove(@Param('slug') slug: string) {
    this.categoriesService.remove(slug);
    return { message: '删除成功' };
  }
}
