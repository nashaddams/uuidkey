import { assertEquals } from "@std/assert";
import { validate as validateV7 } from "@std/uuid/unstable-v7";
import denoJson from "../deno.json" with { type: "json" };
import { validate, VERSION } from "../mod.ts";

const runCommand = (
  command: string,
  args?: string[],
): { code: number; stdout: string; stderr: string } => {
  const { code, stdout, stderr } = new Deno.Command(command, {
    args,
    stdout: "piped",
    stderr: "piped",
  }).outputSync();

  return {
    code,
    stdout: new TextDecoder().decode(stdout),
    stderr: new TextDecoder().decode(stderr),
  };
};

Deno.test("should provide consistent versions", () => {
  assertEquals(denoJson.version, VERSION);
});

Deno.test("should run encode via CLI", () => {
  const { code, stdout, stderr } = runCommand("deno", [
    "run",
    "mod.ts",
    "encode",
    "01945655-0794-7259-800b-614c6ea29659",
  ]);
  assertEquals(code, 0);
  assertEquals(stderr, "");
  assertEquals(stdout.replace("\n", ""), "06A5CN8-0YA74P8-G05P2K0-DTH9CP8");
});

Deno.test("should run decode via CLI", () => {
  const { code, stdout, stderr } = runCommand("deno", [
    "run",
    "mod.ts",
    "decode",
    "06A5CN8-0YA74P8-G05P2K0-DTH9CP8",
  ]);
  assertEquals(code, 0);
  assertEquals(stderr, "");
  assertEquals(
    stdout.replace("\n", ""),
    "01945655-0794-7259-800b-614c6ea29659",
  );
});

Deno.test("should run validate via CLI (valid)", () => {
  const { code, stdout, stderr } = runCommand("deno", [
    "run",
    "mod.ts",
    "validate",
    "06A5CN8-0YA74P8-G05P2K0-DTH9CP8",
  ]);
  assertEquals(code, 0);
  assertEquals(stderr, "");
  assertEquals(stdout.replace("\n", ""), "YES");
});

Deno.test("should run validate via CLI (invalid)", () => {
  const { code, stdout, stderr } = runCommand("deno", [
    "run",
    "mod.ts",
    "validate",
    "invalid-uuidkey",
  ]);
  assertEquals(code, 0);
  assertEquals(stderr, "");
  assertEquals(stdout.replace("\n", ""), "NO");
});

Deno.test("should run generate via CLI", () => {
  const { code, stdout, stderr } = runCommand("deno", [
    "run",
    "mod.ts",
    "generate",
  ]);
  assertEquals(code, 0);
  assertEquals(stderr, "");

  const [key, uuid] = stdout
    .split("\n")
    .filter((s) => s)
    .flatMap((l) => l.split("\t")[0]);

  assertEquals(validate(key), true);
  assertEquals(validateV7(uuid), true);
});
