export interface CreateTableOptions {
  base: number;
  limit?: number;
}

export interface CreateTableUseCase {
  execute: (options: CreateTableOptions) => string;
}

export class CreateTable implements CreateTableUseCase {
  /**
   * DI - Dependency Injection
   */
  constructor() {}

  execute({ base, limit = 10 }: CreateTableOptions) {
    let outputMessage = "";

    for (let i = 1; i <= limit; i++) {
      outputMessage += `${base} x ${i} = ${Number(base) * i}\n`;
    }

    return outputMessage;
  }
}
