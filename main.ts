// Funniest One-Line Out-of-Office Reply — entry program.
// Writes one out-of-office reply (1-160 chars) to /output/entry.txt.
import { mkdirSync, writeFileSync } from "node:fs";

const reply = {
  text: "I am away until Monday. Your email has been read, understood, and filed under 'things I will pretend I never saw'.",
  limit: 160,
  check(): void {
    const n = [...this.text].length;
    if (n < 1 || n > this.limit) {
      throw new Error(`reply is ${n} chars, outside the 1-${this.limit} gate`);
    }
    if (this.text.includes("\n")) {
      throw new Error("entry must be a single line");
    }
    if (this.text.trim() !== this.text) {
      throw new Error("entry must not start or end with whitespace");
    }
  },
  save(): void {
    this.check();
    mkdirSync("/output", { recursive: true });
    writeFileSync("/output/entry.txt", this.text, "utf8");
    console.log(`wrote ${[...this.text].length} chars to /output/entry.txt`);
  },
};

reply.save();
