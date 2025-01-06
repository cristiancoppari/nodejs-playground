import { CreateTable } from "./create-table.use-case";

describe("CreateTable", () => {
  it("should create a table with default values", () => {
    const base = 2;
    const limit = 10;
    const createTable = new CreateTable();
    const result = createTable.execute({ base });
    const rows = result.trim().split("\n");

    expect(createTable).toBeInstanceOf(CreateTable);

    for (let i = 1; i <= limit; i++) {
      expect(rows[i - 1]).toContain(`${base} x ${i} = ${base * i}`);
    }

    expect(rows.length).toBe(10);
  });

  it("should create a table with custom values", () => {
    const options = { base: 1, limit: 10 };
    const createTable = new CreateTable();
    const result = createTable.execute(options);
    const rows = result.trim().split("\n");

    for (let i = 1; i <= options.limit; i++) {
      expect(rows[i - 1]).toContain(
        `${options.base} x ${i} = ${options.base * i}`
      );
    }

    expect(rows.length).toBe(options.limit);
  });
});
