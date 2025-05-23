import { Post } from "../entities/Post";

export interface PostRepository {
  save(post: Post): Promise<void>;
  findAll(): Promise<Post[]>;
  findById(id: string): Promise<Post | null>;
}
