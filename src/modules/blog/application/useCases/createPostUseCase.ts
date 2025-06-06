import { PostRepository } from "@blog/domain/repositories/PostRepository";
import { CreatePostDto } from "@blog/application/dtos/CreatePostDto";
import { Post } from "@blog/domain/entities/Post";
import { randomUUID } from "crypto";

export class CreatePostUseCase {
  constructor(private readonly postRepository: PostRepository) {}

  async execute(newPost: CreatePostDto): Promise<void> {
    const post = new Post(
      randomUUID(),
      newPost.title,
      newPost.content,
      new Date()
    );
    await this.postRepository.save(post);
  }
}
