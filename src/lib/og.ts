const fontCache = new Map<string, Promise<ArrayBuffer>>();

export function loadGoogleFont(family: string, weight: number): Promise<ArrayBuffer> {
  const key = `${family}:${weight}`;
  const cached = fontCache.get(key);
  if (cached) return cached;
  const promise = (async () => {
    const css = await fetch(
      `https://fonts.googleapis.com/css2?family=${encodeURIComponent(family)}:wght@${weight}`,
      { headers: { "User-Agent": "Mozilla/5.0 (Windows NT 6.1; rv:2.0) Gecko/20100101 Firefox/2.0" } }
    ).then((response) => response.text());
    const url = /src: url\((.+?)\) format/.exec(css)?.[1];
    if (!url) throw new Error(`Font not found: ${family} ${weight}`);
    return fetch(url).then((response) => response.arrayBuffer());
  })();
  fontCache.set(key, promise);
  return promise;
}

export const OG_MONO = "Geist Mono";
