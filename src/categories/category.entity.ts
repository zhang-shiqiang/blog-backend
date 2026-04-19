import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { Post } from '../posts/post.entity';

@Entity('categories')
export class Category {
  @PrimaryColumn()
  slug: string;

  @Column()
  name: string;

  @Column({ type: 'text' })
  desc: string;

  @Column()
  color: string;

  @Column({ type: 'simple-json', nullable: true })
  techStack: string[];

  @OneToMany(() => Post, (post) => post.category)
  posts: Post[];
}
