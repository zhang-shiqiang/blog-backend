import { Injectable, NotFoundException } from '@nestjs/common';
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

// 临时内存存储，接入数据库后替换
let posts: Post[] = [
  {
    id: 1, slug: 'nextjs-app-router-ssg',
    title: 'Next.js App Router + SSG 实战落地',
    excerpt: '从页面分层到 SEO 配置，完整走一遍可上线方案。',
    content: '# Next.js App Router + SSG\n\n...',
    category: 'frontend', tags: ['nextjs', 'ssg', 'seo'],
    status: 'published', date: '2026-04-10',
    createdAt: new Date(), updatedAt: new Date(),
  },
  {
    id: 2, slug: 'fastapi-service-design',
    title: 'FastAPI 服务分层设计模板',
    excerpt: '依赖注入、异常模型、接口规范一次讲清。',
    content: '# FastAPI 服务分层设计\n\n...',
    category: 'backend', tags: ['python', 'fastapi'],
    status: 'published', date: '2026-04-06',
    createdAt: new Date(), updatedAt: new Date(),
  },
];
let nextId = 3;

@Injectable()
export class PostsService {
  findAll(category?: string, status?: string): Post[] {
    return posts.filter((p) => {
      if (category && p.category !== category) return false;
      if (status && p.status !== status) return false;
      return true;
    });
  }

  findOne(id: number): Post {
    const post = posts.find((p) => p.id === id);
    if (!post) throw new NotFoundException(`文章 #${id} 不存在`);
    return post;
  }

  create(dto: CreatePostDto): Post {
    const post: Post = {
      id: nextId++,
      slug: dto.title.toLowerCase().replace(/\s+/g, '-'),
      title: dto.title,
      excerpt: dto.excerpt,
      content: dto.content,
      category: dto.category,
      tags: dto.tags ?? [],
      status: dto.status ?? 'draft',
      date: new Date().toISOString().split('T')[0],
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    posts.push(post);
    return post;
  }

  update(id: number, dto: Partial<CreatePostDto>): Post {
    const post = this.findOne(id);
    Object.assign(post, dto, { updatedAt: new Date() });
    return post;
  }

  remove(id: number): void {
    const idx = posts.findIndex((p) => p.id === id);
    if (idx === -1) throw new NotFoundException(`文章 #${id} 不存在`);
    posts.splice(idx, 1);
  }
}
