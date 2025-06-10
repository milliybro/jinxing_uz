import tokenizer from "../tokenizer";

const actualResult = [
  {
    type: "string",
    value: "text",
  },
  {
    type: "brace",
    value: "{",
  },
  {
    type: "string",
    value: "var",
  },
  {
    type: "brace",
    value: "}",
  },
  {
    type: "string",
    value: "text",
  },
];

test("correctly tokenizes the given string", () => {
  const result = tokenizer("text1 {var} text2");
  expect(result).toEqual(actualResult);
});
