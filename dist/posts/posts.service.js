"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostsService = void 0;
const common_1 = require("@nestjs/common");
let posts = [
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
let PostsService = class PostsService {
    findAll(category, status) {
        return posts.filter((p) => {
            if (category && p.category !== category)
                return false;
            if (status && p.status !== status)
                return false;
            return true;
        });
    }
    findOne(id) {
        const post = posts.find((p) => p.id === id);
        if (!post)
            throw new common_1.NotFoundException(`文章 #${id} 不存在`);
        return post;
    }
    create(dto) {
        const post = {
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
    update(id, dto) {
        const post = this.findOne(id);
        Object.assign(post, dto, { updatedAt: new Date() });
        return post;
    }
    remove(id) {
        const idx = posts.findIndex((p) => p.id === id);
        if (idx === -1)
            throw new common_1.NotFoundException(`文章 #${id} 不存在`);
        posts.splice(idx, 1);
    }
};
exports.PostsService = PostsService;
exports.PostsService = PostsService = __decorate([
    (0, common_1.Injectable)()
], PostsService);
//# sourceMappingURL=posts.service.js.map