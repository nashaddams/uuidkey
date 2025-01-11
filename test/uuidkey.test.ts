import { assertEquals, assertThrows } from "@std/assert";
import { validate as validateV4 } from "@std/uuid";
import {
  generate as generateV7,
  validate as validateV7,
} from "@std/uuid/unstable-v7";
import { decode, encode, generate, validate } from "../src/uuidkey.ts";

const validUUIDKey = "06A5A3R-EX6Q2NG-K3NAJEG-FM7BCB0";
const invalidUUIDKeys = [
  "06A5A3R-EX6Q2NG-K3NAJEG-FM7BCB00",

  "06A5A3REX6Q2NG-K3NAJEG-FM7BCB0",
  "06A5A3R-EX6Q2NGK3NAJEG-FM7BCB0",
  "06A5A3R-EX6Q2NG-K3NAJEGFM7BCB0",

  "06A5A3-EX6Q2NG-K3NAJEG-FM7BCB0",
  "06A5A3R-EX6Q2N-K3NAJEG-FM7BCB0",
  "06A5A3R-EX6Q2NG-K3NAJE-FM7BCB0",
  "06A5A3R-EX6Q2NG-K3NAJEG-FM7BCB",
  "06A5A3REX6Q2NGK3NAJEGFM7BCB0",

  "$$$$$$$-$$$$$$$-$$$$$$$-$$$$$$$",
  "-------------------------------",
  "0-0-0-0",
  "Z-Z-Z-Z",
  "----",
  "---",
  "--",
  "-",
  "",
];

const validUUIDv7Key = "019455ea-38a3-7861-a5e1-02ae970c286d";
const invalidUUIDv7s = [
  "019455ea-38a3-7861-a5e1-02ae970c286dd",

  "019455ea38a3-7861-a5e1-02ae970c286d",
  "019455ea-38a37861-a5e1-02ae970c286d",
  "019455ea-38a3-7861a5e1-02ae970c286d",
  "019455ea-38a3-7861-a5e102ae970c286d",
  "019455ea38a37861a5e102ae970c286d",

  "019455e-38a3-7861-a5e1-02ae970c286d",
  "019455ea-38a-7861-a5e1-02ae970c286d",
  "019455ea-38a3-786-a5e1-02ae970c286d",
  "019455ea-38a3-7861-a5e-02ae970c286d",
  "019455ea-38a3-7861-a5e1-02ae970c286",

  "$$$$$$$$-$$$$-$$$$-$$$$-$$$$$$$$$$$$",
  "------------------------------------",
  "0-0-0-0-0",
  "Z-Z-Z-Z-Z",
  "-----",
  "----",
  "---",
  "--",
  "-",
  "",
];

const validUUIDv4Key = "a4fdc66c-908c-44d1-b104-613b94fc35b1";
const invalidUUIDv4s = [
  "a4fdc66c-908c-44d1-b104-613b94fc35b11",

  "a4fdc66c908c-44d1-b104-613b94fc35b1",
  "a4fdc66c-908c44d1-b104-613b94fc35b1",
  "a4fdc66c-908c-44d1b104-613b94fc35b1",
  "a4fdc66c-908c-44d1-b104613b94fc35b1",
  "a4fdc66c908c44d1b104613b94fc35b1",

  "a4fdc66-908c-44d1-b104-613b94fc35b1",
  "a4fdc66c-908-44d1-b104-613b94fc35b1",
  "a4fdc66c-908c-44d-b104-613b94fc35b1",
  "a4fdc66c-908c-44d1-b10-613b94fc35b1",
  "a4fdc66c-908c-44d1-b104-613b94fc35b",

  "$$$$$$$$-$$$$-$$$$-$$$$-$$$$$$$$$$$$",
  "------------------------------------",
  "0-0-0-0-0",
  "Z-Z-Z-Z-Z",
  "-----",
  "----",
  "---",
  "--",
  "-",
  "",
];

Deno.test("should validate UUID keys", () => {
  assertEquals(validate("06A5A3R-EX6Q2NG-K3NAJEG-FM7BCB0"), true);
  invalidUUIDKeys.forEach((uuidkey) => {
    assertEquals(validate(uuidkey), false);
  });
});

Deno.test("should encode and decode UUIDv7", () => {
  const uuid = generateV7();
  assertEquals(validateV7(uuid), true);
  assertEquals(decode(encode(uuid)), uuid);
});

Deno.test("should encode and decode UUIDv4", () => {
  const uuid = crypto.randomUUID();
  assertEquals(validateV4(uuid), true);
  assertEquals(decode(encode(uuid)), uuid);
});

Deno.test("should generate UUIDv7 and UUID key pair", () => {
  const { key, uuid } = generate();
  assertEquals(validate(key), true);
  assertEquals(validateV7(uuid), true);
});

Deno.test("should generate UUIDv4 and UUID key pair", () => {
  const { key, uuid } = generate("v4");
  assertEquals(validate(key), true);
  assertEquals(validateV4(uuid), true);
});

Deno.test("should throw when trying to encode invalid v7 UUIDs", () => {
  assertEquals(validateV7(validUUIDv7Key), true);
  invalidUUIDv7s.forEach((uuid) => {
    assertThrows(
      () => encode(uuid),
      Error,
      "Only UUIDv7 and UUIDv4 are supported",
    );
  });
});

Deno.test("should throw when trying to encode invalid v4 UUIDs", () => {
  assertEquals(validateV4(validUUIDv4Key), true);
  invalidUUIDv4s.forEach((uuid) => {
    assertThrows(
      () => encode(uuid),
      Error,
      "Only UUIDv7 and UUIDv4 are supported",
    );
  });
});

Deno.test("should throw when trying to decode invalid UUID keys", () => {
  assertEquals(validate(validUUIDKey), true);
  invalidUUIDKeys.forEach((uuidkey) => {
    assertThrows(
      () => decode(uuidkey),
      Error,
      "Only UUID keys are supported",
    );
  });
});
