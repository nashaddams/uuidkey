import { Command } from "@cliffy/command";
import denoJson from "./deno.json" with { type: "json" };
import { decode, encode, generate, validate } from "./src/uuidkey.ts";

if (import.meta.main) {
  await new Command()
    .name("uuidkey")
    .description("Encode UUIDs to readable keys.")
    .version(denoJson.version)
    .command("encode", "Encode UUID to UUID key.")
    .arguments("<uuid:string>")
    .action((_, uuid) => console.info(encode(uuid)))
    .command("decode", "Decode UUID key to UUID.")
    .arguments("<uuidkey:string>")
    .action((_, uuidkey) => console.info(decode(uuidkey)))
    .command("validate", "Validate UUID key.")
    .arguments("<uuidkey:string>")
    .action((_, uuidkey) => console.info(validate(uuidkey) ? "YES" : "NO"))
    .command("generate", "Generate UUID key and UUID pair.")
    .option("--v4", "Use UUIDv4 (default v7).")
    .action(({ v4 }) => {
      const { key, uuid } = generate(v4 ? "v4" : "v7");
      console.info(`${key}\t\tKey`);
      console.info(`${uuid}\tUUID${v4 ? "v4" : "v7"}`);
    })
    .parse();
}

export { decode, encode, generate, validate };
