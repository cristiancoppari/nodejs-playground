import { argv } from "./args.plugins";

const runCommand = async (args: string[]) => {
  process.argv = [...process.argv, ...args];

  const { argv } = await import("./args.plugins");

  return argv;
};

describe("args plugins", () => {
  const originalArgv = process.argv;

  beforeEach(() => {
    process.argv = originalArgv;
    jest.resetModules();
  });

  it("should return the arguments", async () => {
    const argv = await runCommand(["--b", "5"]);

    expect(argv).toEqual(
      expect.objectContaining({
        b: 5,
        l: 10,
        s: false,
        d: "outputs/",
        n: "multiplication-table",
      })
    );
  });

  it("should return the arguments with custom values", async () => {
    const argv = await runCommand([
      "-b",
      "5",
      "-l",
      "20",
      "-s",
      "-n",
      "custom-name",
      "-d",
      "custom/outputs/",
    ]);

    expect(argv).toEqual(
      expect.objectContaining({
        b: 5,
        l: 20,
        s: true,
        d: "custom/outputs/",
        n: "custom-name",
      })
    );
  });
});
