import { getUserById } from "../../src/js-foundation/03-callbacks";

describe("Test in 03-callbacks.ts", () => {
  test("getUserById should return an error if the user is not found", (done) => {
    const id = 10;

    getUserById(id, (err, user) => {
      expect(err).toBe(`User not found with id ${id}`);
      expect(user).toBeUndefined();
      done();
    });
  });

  test("getUserById should return a user if the user is found", (done) => {
    const id = 1;

    getUserById(id, (err, user) => {
      expect(err).toBeUndefined();
      expect(user).toEqual({ id: 1, name: "John Doe" });
      done();
    });
  });
});
