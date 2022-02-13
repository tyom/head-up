interface QueryObject {
  [k: string]: string;
}

export function buildUrl(url: string, query: QueryObject): string {
  return [url, new URLSearchParams(query)].filter(Boolean).join('?');
}
