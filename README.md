# uuidkey

[![JSR](https://jsr.io/badges/@nashaddams/uuidkey)](https://jsr.io/@nashaddams/uuidkey)
[![JSR score](https://jsr.io/badges/@nashaddams/uuidkey/score)](https://jsr.io/@nashaddams/uuidkey)
[![main](https://github.com/nashaddams/uuidkey/actions/workflows/tests.yml/badge.svg)](https://github.com/nashaddams/uuidkey/actions)

Encode UUIDs to readable keys with
[Crockford base32](https://www.crockford.com/base32.html), inspired by
[`agentstation/uuidkey`](https://github.com/agentstation/uuidkey)'s approach for
[making beautiful API keys](https://docs.agentstation.ai/blog/beautiful-api-keys/).

## Usage

```ts
import { decode, encode, generate, validate } from "@nashaddams/uuidkey";

encode("01945655-0794-7259-800b-614c6ea29659"); // -> 06A5CN8-0YA74P8-G05P2K0-DTH9CP8
decode("06A5CN8-0YA74P8-G05P2K0-DTH9CP8"); // -> 01945655-0794-7259-800b-614c6ea29659
validate("06A5CN8-0YA74P8-G05P2K0-DTH9CP8"); // -> true
generate(); // -> { key: "06A5CQ8-SGRQZ7G-KHQWGF0-PM9JZ90", uuid: "0194565d-cc31-7f9e-9c6f-c83cb5132fa4" }
```

See [the docs](https://jsr.io/@nashaddams/uuidkey/doc) for further details.

Alternatively, `uuidkey` can also be run via CLI:

```sh
deno run -R=. jsr:@nashaddams/uuidkey [--help]
```
