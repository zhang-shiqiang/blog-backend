import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsArray, IsOptional } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({ description: '分类 slug（唯一标识）' })
  @IsString()
  @IsNotEmpty()
  slug: string;

  @ApiProperty({ description: '分类名称' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: '分类描述' })
  @IsString()
  @IsNotEmpty()
  desc: string;

  @ApiProperty({ description: '颜色（hex）' })
  @IsString()
  @IsNotEmpty()
  color: string;

  @ApiPropertyOptional({ description: '技术栈列表', type: [String] })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  techStack?: string[];
}
