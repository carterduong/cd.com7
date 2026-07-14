import type { ComponentProps, ReactNode } from 'react'

const PHONE = {
  aspectRatio: '1920 / 3857',
  screen: {
    // Derived from the connected fully-transparent region in the 1920×3857
    // bezel PNG, ignoring the opaque dynamic island: x=110–1809,
    // y=88–3768. Dividing each inset by the matching image dimension gives
    // 110 / 1920 = 5.7292% and 88 / 3857 = 2.2816%.
    top: '2.1816%',
    right: '5.6292%',
    // Slightly overlaps the bottom bezel to hide subpixel rounding seams.
    bottom: '2.1816%',
    left: '5.6292%',
    // Approximation of the transparent region's rounded-corner curvature.
    radius: '9% / 4.5%',
  },
} as const

const frameStyle: ComponentProps<'div'>['style'] = {
  aspectRatio: PHONE.aspectRatio,
  maxWidth: '70vw',
  maxHeight: '70vh',
  width: 'min(70vw, calc(70vh * 1920 / 3857))',
  height: 'auto',
  isolation: 'isolate',
}

const layerClassName =
  'pointer-events-none absolute inset-0 block h-full w-full select-none'

export interface ColorPhoneFrameProps {
  children: ReactNode
  color: string
  showMedia?: boolean
  showBezel?: boolean
  showFrame?: boolean
  showTint?: boolean
}

export function ColorPhoneFrame({
  children,
  color = '#000000',
  showMedia = true,
  showBezel = true,
  showFrame = true,
  showTint = false,
}: ColorPhoneFrameProps) {
  return (
    <div className="relative" style={frameStyle}>
      {showMedia ? (
        <div
          className="absolute overflow-hidden bg-black"
          style={{
            top: PHONE.screen.top,
            right: PHONE.screen.right,
            bottom: PHONE.screen.bottom,
            left: PHONE.screen.left,
            borderRadius: PHONE.screen.radius,
          }}
        >
          {children}
        </div>
      ) : null}

      {showBezel ? (
        <img
          src="/phone_frame_bezel.png"
          alt=""
          aria-hidden
          className={layerClassName}
          draggable={false}
        />
      ) : null}

      {showFrame ? (
        <img
          src="/phone_frame.png"
          alt=""
          aria-hidden
          className={layerClassName}
          draggable={false}
        />
      ) : null}

      {showTint ? (
        <div
          aria-hidden
          className={layerClassName}
          style={{
            backgroundColor: color,
            mixBlendMode: 'color',
            maskImage: 'url("/phone_frame.png")',
            maskPosition: 'center',
            maskRepeat: 'no-repeat',
            maskSize: '100% 100%',
            WebkitMaskImage: 'url("/phone_frame.png")',
            WebkitMaskPosition: 'center',
            WebkitMaskRepeat: 'no-repeat',
            WebkitMaskSize: '100% 100%',
          }}
        />
      ) : null}
    </div>
  )
}
