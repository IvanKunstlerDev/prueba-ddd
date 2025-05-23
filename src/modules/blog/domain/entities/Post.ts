import { UUID } from "crypto";

export class Post {
  constructor(
    public readonly id: UUID,
    public readonly title: string,
    public readonly content: string,
    public readonly pubDate: Date
  ) {
    this.validate();
  }

  private validate() {
    if (this.title.length < 5) {
      throw new Error("El titulo debe tener al menos 5 caracteres.");
    }
    if (this.content.length < 10) {
      throw new Error("El contenido debe tener al menos 10 caracteres.");
    }
    if (this.content.length > 255) {
      throw new Error("El contenido debe tener menos de 255 caracteres.");
    }
  }
}
