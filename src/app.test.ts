import { ServerApp } from "./presentation/server-app";

describe("Test App.ts", () => {
  it("should call ServerApp.run with values", async () => {
    const serverRunMock = jest.fn();
    ServerApp.run = serverRunMock;
    process.argv = [
      "node",
      "app.ts",
      "-b",
      "10",
      "-l",
      "10",
      "-s",
      "-n",
      "test-file",
      "-d",
      "test-destination",
    ];

    await require("./app");

    expect(serverRunMock).toHaveBeenCalledWith({
      base: 10,
      limit: 10,
      show: true,
      destination: "test-destination",
      name: "test-file",
    });
  });
});
