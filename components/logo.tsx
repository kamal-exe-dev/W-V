import Image from 'next/image'

const ASPECT_RATIO = 2012 / 1060

/**
 * Brand mark. Uses the plain cyan version (no black accent) so it stays
 * visible on both light and dark surfaces — the black-accented variant
 * (`/logo-mark.png`) disappears against the app's dark navy sections.
 */
export function LogoMark({ height = 32, className }: { height?: number; className?: string }) {
  return (
    <Image
      src="/logo.png"
      alt="Web & Visuals"
      width={Math.round(height * ASPECT_RATIO)}
      height={height}
      className={className}
      style={{ height, width: 'auto' }}
      priority
    />
  )
}
