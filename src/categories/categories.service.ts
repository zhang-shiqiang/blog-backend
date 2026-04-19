import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';

export interface Category {
  slug: string;
  name: string;
  desc: string;
  color: string;
  techStack: string[];
}

let categories: Category[] = [
  { slug: 'frontend', name: '前端开发', color: '#4285F4', techStack: ['React', 'Next.js', 'TypeScript', 'Tailwind'], desc: '不只是写页面。从组件设计、状态管理到性能调优，记录真正在生产环境里跑过的前端方案。' },
  { slug: 'backend', name: '后端开发', color: '#34A853', techStack: ['Python', 'FastAPI', 'Java', 'Node.js'], desc: '服务怎么拆、接口怎么设计、异常怎么处理——这里只写能直接落地的后端工程经验。' },
  { slug: 'devops', name: 'DevOps', color: '#EA4335', techStack: ['Docker', 'GitHub Actions', 'Kubernetes'], desc: '从本地跑通到线上稳定，CI/CD 流水线、容器编排、自动化部署的第一手踩坑记录。' },
  { slug: 'ai-agent', name: 'AI 开发', color: '#9334E6', techStack: ['LangChain', 'Claude API', 'RAG', 'MCP'], desc: 'Agent 不只是调 API。工具调用、RAG 检索、工作流编排，记录真实项目里的落地细节。' },
];

@Injectable()
export class CategoriesService {
  findAll(): Category[] {
    return categories;
  }

  findOne(slug: string): Category {
    const cat = categories.find((c) => c.slug === slug);
    if (!cat) throw new NotFoundException(`分类 "${slug}" 不存在`);
    return cat;
  }

  create(dto: CreateCategoryDto): Category {
    if (categories.find((c) => c.slug === dto.slug)) {
      throw new ConflictException(`分类 "${dto.slug}" 已存在`);
    }
    const cat: Category = {
      slug: dto.slug,
      name: dto.name,
      desc: dto.desc,
      color: dto.color,
      techStack: dto.techStack ?? [],
    };
    categories.push(cat);
    return cat;
  }

  update(slug: string, dto: Partial<Omit<CreateCategoryDto, 'slug'>>): Category {
    const cat = this.findOne(slug);
    Object.assign(cat, dto);
    return cat;
  }

  remove(slug: string): void {
    const idx = categories.findIndex((c) => c.slug === slug);
    if (idx === -1) throw new NotFoundException(`分类 "${slug}" 不存在`);
    categories.splice(idx, 1);
  }
}
