import { Server } from "../src/presentation/server";
import { envs } from "../src/config/env";

jest.mock("../src/presentation/server");

describe("should call server with arguments and start", () => {
  it("should work", async () => {
    await import("../src/app");

    expect(Server).toHaveBeenCalledTimes(1);
    expect(Server).toHaveBeenCalledWith({
      port: envs.PORT,
      publicPath: envs.PUBLIC_PATH,
      routes: expect.any(Function),
    });
    expect(Server.prototype.start).toHaveBeenCalledTimes(1);
  });
});
