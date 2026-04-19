"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoriesService = void 0;
const common_1 = require("@nestjs/common");
let categories = [
    { slug: 'frontend', name: '前端开发', color: '#4285F4', techStack: ['React', 'Next.js', 'TypeScript', 'Tailwind'], desc: '不只是写页面。从组件设计、状态管理到性能调优，记录真正在生产环境里跑过的前端方案。' },
    { slug: 'backend', name: '后端开发', color: '#34A853', techStack: ['Python', 'FastAPI', 'Java', 'Node.js'], desc: '服务怎么拆、接口怎么设计、异常怎么处理——这里只写能直接落地的后端工程经验。' },
    { slug: 'devops', name: 'DevOps', color: '#EA4335', techStack: ['Docker', 'GitHub Actions', 'Kubernetes'], desc: '从本地跑通到线上稳定，CI/CD 流水线、容器编排、自动化部署的第一手踩坑记录。' },
    { slug: 'ai-agent', name: 'AI 开发', color: '#9334E6', techStack: ['LangChain', 'Claude API', 'RAG', 'MCP'], desc: 'Agent 不只是调 API。工具调用、RAG 检索、工作流编排，记录真实项目里的落地细节。' },
];
let CategoriesService = class CategoriesService {
    findAll() {
        return categories;
    }
    findOne(slug) {
        const cat = categories.find((c) => c.slug === slug);
        if (!cat)
            throw new common_1.NotFoundException(`分类 "${slug}" 不存在`);
        return cat;
    }
    create(dto) {
        if (categories.find((c) => c.slug === dto.slug)) {
            throw new common_1.ConflictException(`分类 "${dto.slug}" 已存在`);
        }
        const cat = {
            slug: dto.slug,
            name: dto.name,
            desc: dto.desc,
            color: dto.color,
            techStack: dto.techStack ?? [],
        };
        categories.push(cat);
        return cat;
    }
    update(slug, dto) {
        const cat = this.findOne(slug);
        Object.assign(cat, dto);
        return cat;
    }
    remove(slug) {
        const idx = categories.findIndex((c) => c.slug === slug);
        if (idx === -1)
            throw new common_1.NotFoundException(`分类 "${slug}" 不存在`);
        categories.splice(idx, 1);
    }
};
exports.CategoriesService = CategoriesService;
exports.CategoriesService = CategoriesService = __decorate([
    (0, common_1.Injectable)()
], CategoriesService);
//# sourceMappingURL=categories.service.js.map