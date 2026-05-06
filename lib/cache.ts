import { unstable_cache } from "next/cache";

export interface CacheOptions {
  tags?: string[];
  revalidate?: number | false;
}

export function cached<T extends unknown[], R>(
  fn: (...args: T) => Promise<R>,
  keyFn: (...args: T) => string | string[],
  options: CacheOptions = {},
) {
  return (...args: T): Promise<R> => {
    const key = keyFn(...args);
    const cacheKey = Array.isArray(key) ? key : [key];

    return unstable_cache(() => fn(...args), cacheKey, {
      tags: options.tags,
      revalidate: options.revalidate ?? 3600, // Default 1 hour
    })();
  };
}
