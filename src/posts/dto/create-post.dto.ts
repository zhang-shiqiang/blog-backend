import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsArray, IsOptional, IsIn } from 'class-validator';

export class CreatePostDto {
  @ApiProperty({ description: '文章标题' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ description: '文章摘要' })
  @IsString()
  @IsNotEmpty()
  excerpt: string;

  @ApiProperty({ description: '文章正文（Markdown）' })
  @IsString()
  @IsNotEmpty()
  content: string;

  @ApiProperty({ description: '分类 slug', enum: ['frontend', 'backend', 'devops', 'ai-agent'] })
  @IsIn(['frontend', 'backend', 'devops', 'ai-agent'])
  category: string;

  @ApiPropertyOptional({ description: '标签列表', type: [String] })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  tags?: string[];

  @ApiPropertyOptional({ description: '状态', enum: ['draft', 'published'] })
  @IsIn(['draft', 'published'])
  @IsOptional()
  status?: 'draft' | 'published';
}
