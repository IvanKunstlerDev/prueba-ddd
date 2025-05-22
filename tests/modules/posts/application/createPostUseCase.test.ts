import { CreatePostUseCase } from "@posts/application/useCases/createPostUseCase";
import { InMemoryPostRepository } from "@posts/infrastructure/repositories/InMemoryPostRepository";
import { describe, it, expect } from "vitest";

describe("CreatePostUseCase", async () => {
  const postRepository = new InMemoryPostRepository();
  const createPostUseCase = new CreatePostUseCase(postRepository);

  it("should create a post", async () => {
    const post = { title: "Test Post", content: "This is a test post" };

    await createPostUseCase.execute({
      title: "Test Post",
      content: "This is a test post",
    });

    const findedPosts = await postRepository.findAll();
    expect(findedPosts).toHaveLength(1);
    expect(findedPosts[0].title).toBe(post.title);
    expect(findedPosts[0].content).toBe(post.content);
    expect(findedPosts[0].pubDate.getTime()).toBeLessThan(Date.now());
    expect(findedPosts[0].id).toHaveLength(36);
    expect(findedPosts[0].id).toMatch(
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/
    );
  });

  it("should throw an error if the post title is too short", async () => {
    const result = createPostUseCase.execute({
      title: "T",
      content: "This is a test post",
    });

    expect(result).rejects.toThrow();
  });

  it("should throw an error if the post content is too short", async () => {
    const result = createPostUseCase.execute({
      title: "Test Post",
      content: "T",
    });

    expect(result).rejects.toThrow();
  });

  it("should throw an error if the post content is too long", async () => {
    const result = createPostUseCase.execute({
      title: "Test Post",
      content: "This is a test post. " + " ".repeat(1000),
    });

    expect(result).rejects.toThrow();
  });
});
