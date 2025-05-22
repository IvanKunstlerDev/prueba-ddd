import { Post } from "@posts/domain/entities/Post";
import { PostRepository } from "@posts/domain/repositories/PostRepository";

export class InMemoryPostRepository implements PostRepository {
  private posts: Post[] = [];

  save(post: Post): Promise<void> {
    this.posts.push(post);
    return Promise.resolve();
  }

  findAll(): Promise<Post[]> {
    return Promise.resolve(this.posts);
  }

  findById(id: string): Promise<Post | null> {
    throw new Error("Method not implemented.");
  }
}
