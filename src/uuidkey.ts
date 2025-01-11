import { decodeHex, encodeHex } from "@std/encoding";
import {
  decodeBase32Crockford,
  encodeBase32Crockford,
} from "@std/encoding/unstable-base32crockford";
import { validate as validateV4 } from "@std/uuid";
import {
  generate as generateV7,
  validate as validateV7,
} from "@std/uuid/unstable-v7";

/**
 * Validate UUID key.
 *
 * @param {string} key UUID key
 * @returns {boolean} `true` for valid, `false` for invalid UUID key
 */
export const validate = (key: string): boolean => {
  return key.length === 31 &&
    /[0-9A-Z]{7}-[0-9A-Z]{7}-[0-9A-Z]{7}-[0-9A-Z]{7}/.test(key);
};

/**
 * Encode UUID to UUID key.
 *
 * @param {string} uuid UUIDv7 or UUIDv4
 * @returns {string} UUID key
 */
export const encode = (uuid: string): string => {
  if (!validateV7(uuid) && !validateV4(uuid)) {
    throw new Error(
      `Only UUIDv7 and UUIDv4 are supported, e.g. 019452ea-79c3-77b3-b9a7-dba584f57d0b - Received: ${uuid}`,
    );
  }

  const [p1, p2, p3, p4, p5] = uuid.split("-");
  return [
    encodeBase32Crockford(decodeHex(p1)),
    encodeBase32Crockford(decodeHex(`${p2}${p3}`)),
    encodeBase32Crockford(decodeHex(`${p4}${p5.substring(0, 4)}`)),
    encodeBase32Crockford(decodeHex(`${p5.substring(4)}`)),
  ].join("-").replaceAll("=", "");
};

/**
 * Decode UUID key to UUID.
 *
 * @param {string} key UUID key
 * @returns {string} UUID
 */
export const decode = (key: string): string => {
  if (!validate(key)) {
    throw new Error(
      `Only UUID keys are supported, e.g. 06A55TG-F71QFCR-Q6KXQ98-GKTQT2R - Received: ${key}`,
    );
  }

  const [p1, p2, p3, p4] = key.split("-").map((id) =>
    encodeHex(decodeBase32Crockford(`${id}=`))
  );
  return [
    p1,
    p2.substring(0, 4),
    p2.substring(4),
    p3.substring(0, 4),
    `${p3.substring(4)}${p4}`,
  ].join("-");
};

/**
 * Generate UUID key and UUID pair.
 *
 * @param {"v7"|"v4"} version UUID version (default: `v7`)
 * @returns {{key: string, uuid: string}} UUID key and UUID
 */
export const generate = (
  version: "v7" | "v4" = "v7",
): { key: string; uuid: string } => {
  const uuid = version === "v7" ? generateV7() : crypto.randomUUID();
  return { key: encode(uuid), uuid };
};
