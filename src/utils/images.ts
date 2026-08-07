import type { ImageMetadata } from 'astro';

const allImages = import.meta.glob<{ default: ImageMetadata }>(
  '/src/assets/**/*.{jpeg,jpg,png,gif,webp,JPG,PNG}',
);

export function resolveAssetPath(path?: string | null) {
  if (!path) return null;
  const filename = path.split('/').pop();
  const matchedKey = Object.keys(allImages).find((key) => key.endsWith(`/${filename}`));
  return matchedKey ?? null;
}

export async function loadAssetImage(path?: string | null): Promise<ImageMetadata | null> {
  const key = resolveAssetPath(path);
  if (!key) return null;
  const module = await allImages[key]();
  return module.default;
}
