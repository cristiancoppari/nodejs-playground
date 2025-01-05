import { buildMakePerson } from "../../src/js-foundation/05-factory";
import { getAge, getUUID } from "../../src/plugins";

describe("Test in 05-factory.ts", () => {
  test("buildMakePerson should return a function", () => {
    const makePerson = buildMakePerson({
      getAge,
      getUUID,
    });

    expect(makePerson).toBeInstanceOf(Function);
  });

  test("makePerson should return a person", () => {
    const makePerson = buildMakePerson({
      getAge,
      getUUID,
    });

    const person = makePerson({ name: "John", birthdate: "1985-10-21" });

    expect(person).toEqual({
      id: expect.any(String),
      name: "John",
      birthdate: "1985-10-21",
      age: expect.any(Number),
    });
  });
});
