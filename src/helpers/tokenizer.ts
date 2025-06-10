/* eslint-disable no-continue */
interface Token {
  type: "string" | "brace";
  value: string;
}

const WHITESPACE = /\s/;
const LETTERS = /[a-z_]/i;

export default function tokenizer(input: string): Token[] {
  let current = 0;
  const tokens: Token[] = [];

  while (current < input.length) {
    let char = input[current];

    if (char === "{") {
      tokens.push({
        type: "brace",
        value: "{",
      });
      current += 1;
      continue;
    }

    if (char === "}") {
      tokens.push({
        type: "brace",
        value: "}",
      });
      current += 1;
      continue;
    }

    if (WHITESPACE.test(char)) {
      current += 1;
      continue;
    }

    if (LETTERS.test(char)) {
      let value = "";

      while (char !== "" && LETTERS.test(char)) {
        value += char;
        current += 1;
        char = input[current];
      }

      tokens.push({ type: "string", value });
      continue;
    }

    throw new TypeError(`Unsupported character: ${char}`);
  }

  return tokens;
}
