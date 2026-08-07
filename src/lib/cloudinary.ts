/**
 * Cloudinary helper — builds delivery URLs with sensible defaults.
 *
 * Once real photography is uploaded to Cloudinary, replace <ImagePlaceholder>
 * usages with next-cloudinary's <CldImage> or a plain next/image pointing at
 * cloudinaryUrl("folder/public-id").
 */
const CLOUD = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

export function cloudinaryUrl(
  publicId: string,
  opts: { w?: number; h?: number; q?: string } = {}
): string {
  if (!CLOUD) return "";
  const t = [
    "f_auto",
    `q_${opts.q ?? "auto"}`,
    opts.w ? `w_${opts.w}` : null,
    opts.h ? `h_${opts.h}` : null,
    "c_fill",
  ].filter(Boolean).join(",");
  return `https://res.cloudinary.com/${CLOUD}/image/upload/${t}/${publicId}`;
}

export function isCloudinaryConfigured(): boolean {
  return Boolean(CLOUD);
}
