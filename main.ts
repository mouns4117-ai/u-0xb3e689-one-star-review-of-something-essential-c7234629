// One-Star Review of Something Essential — entry program.
// Writes one deadpan one-star review (a single line, 1-160 characters)
// to /output/entry.txt, or to the directory given as argv[2].
//
// The review: sleep, filed as a complaint in earnest. The grievance is the
// daily one everyone knows — eight hours paid, still tired — and the sting
// lands in the last few words, where sleep turns from a service into a
// creditor you can never pay off. No winking, no exclamation marks.
import { mkdirSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const REVIEW =
  "One star. Sleep charges eight hours a night and I still wake up owing it more.";

function emptyDir(dir: string): void {
  mkdirSync(dir, { recursive: true });
  for (const name of readdirSync(dir)) {
    rmSync(join(dir, name), { recursive: true, force: true });
  }
}

const outDir = process.argv[2] ?? "/output";
const chars = [...REVIEW];
if (chars.length < 1 || chars.length > 160) {
  throw new Error(
    `review is ${chars.length} characters, outside the 1-160 gate`,
  );
}
if (REVIEW.includes("\n") || REVIEW.trim() !== REVIEW) {
  throw new Error("review must be a single line with no surrounding whitespace");
}
emptyDir(outDir);
writeFileSync(join(outDir, "entry.txt"), REVIEW, "utf8");
console.log(`wrote ${chars.length} character(s) to ${join(outDir, "entry.txt")}`);
