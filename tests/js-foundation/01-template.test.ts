import { emailTemplate } from "../../src/js-foundation/01-template";

describe("Test in 01-template.ts", () => {
  test("Email template should contain a greeting", () => {
    expect(emailTemplate).toContain("Hi, ");
  });

  test("Email template should contain a {{name}} and {{orderId}}", () => {
    // expect(emailTemplate).toContain("{{name}}");
    // expect(emailTemplate).toContain("{{orderId}}");

    expect(emailTemplate).toMatch(/{{name}}/);
    expect(emailTemplate).toMatch(/{{orderId}}/);
  });
});
