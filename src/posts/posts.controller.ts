import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';

@ApiTags('文章')
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  @ApiOperation({ summary: '获取文章列表' })
  @ApiQuery({ name: 'category', required: false })
  @ApiQuery({ name: 'status', required: false })
  findAll(@Query('category') category?: string, @Query('status') status?: string) {
    return this.postsService.findAll(category, status);
  }

  @Get(':id')
  @ApiOperation({ summary: '获取文章详情' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.postsService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: '创建文章' })
  create(@Body() dto: CreatePostDto) {
    return this.postsService.create(dto);
  }

  @Patch(':id')
  @ApiOperation({ summary: '更新文章' })
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: Partial<CreatePostDto>) {
    return this.postsService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: '删除文章' })
  remove(@Param('id', ParseIntPipe) id: number) {
    this.postsService.remove(id);
    return { message: '删除成功' };
  }
}
