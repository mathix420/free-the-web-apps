import type { HTMLElement } from "node-html-parser";
import { parse } from "node-html-parser";

export default (url: string) => $fetch<HTMLElement>(url, { parseResponse: parse });
