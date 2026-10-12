import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

function scssFiles(directory: string): string[] {
  return readdirSync(directory).flatMap((name) => {
    const path = join(directory, name);
    if (statSync(path).isDirectory()) return scssFiles(path);
    return name.endsWith(".scss") ? [path] : [];
  });
}

describe("backdrop-filter in the design system", () => {
  it("is never written with the -webkit- prefix, which the production minifier keeps instead of the standard property", () => {
    const offenders = [
      ...scssFiles(join(process.cwd(), "projects")),
      ...scssFiles(join(process.cwd(), "src")),
    ].filter((path) =>
      readFileSync(path, "utf8").includes("-webkit-backdrop-filter"),
    );
    expect(offenders).toEqual([]);
  });
});
