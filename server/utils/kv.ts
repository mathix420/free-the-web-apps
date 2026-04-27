/// <reference types="@cloudflare/workers-types" />
import type { H3Event } from "h3";

export function useKV(event: H3Event): KVNamespace {
  const kv = event.context.cloudflare?.env?.KV as KVNamespace | undefined;
  if (!kv) {
    throw createError({
      statusCode: 500,
      statusMessage: "KV binding 'KV' is not available in this environment.",
    });
  }
  return kv;
}
