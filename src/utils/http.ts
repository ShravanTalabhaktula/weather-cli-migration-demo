import * as https from "https";
import {clearTimeout} from "node:timers";

async function httpGet(
    url: string,
    headers: Record<string, string> = {},
    timeoutMs = 10_000
): Promise<string> {
    const ctrl = new AbortController();
    const id = setTimeout(() => ctrl.abort(), timeoutMs);
    const res = await fetch(url, {headers, signal: ctrl.signal});
    clearTimeout(id);
    if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
    return await res.text();
}

export async function getJson<T>(
    url: string,
    headers: Record<string, string> = {},
    timeoutMs = 10_000
): Promise<T> {
    const text = await httpGet(url, headers, timeoutMs);
    return JSON.parse(text) as T;
}
