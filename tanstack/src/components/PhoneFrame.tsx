import type { ReactNode, ComponentProps } from 'react'

/** iPhone bezel asset: 1920×3862, transparent screen hole */
const PHONE = {
  aspectRatio: '1920 / 3862',
  screen: {
    top: '2.2304%',
    right: '5.6292%',
    bottom: '2.2304%',
    left: '5.6292%',
    radius: '8.35% / 3.86%',
  },
  // Inset so the shadow sits under the opaque bezel, not transparent corners
  shadow: {
    top: '1.6%',
    right: '3.4%',
    bottom: '1.6%',
    left: '3.4%',
  },
} as const

function phoneStyle(): ComponentProps<'div'>['style'] {
  return {
    aspectRatio: PHONE.aspectRatio,
    maxWidth: '70vw',
    maxHeight: '70vh',
    width: 'min(70vw, calc(70vh * 1920 / 3862))',
    height: 'auto',
  }
}

export function PhoneFrame({ children }: { children: ReactNode }) {
  return (
    <div className="relative" style={phoneStyle()}>
      <div
        aria-hidden
        className="absolute -z-10"
        style={{
          top: PHONE.shadow.top,
          right: PHONE.shadow.right,
          bottom: PHONE.shadow.bottom,
          left: PHONE.shadow.left,
          borderRadius: PHONE.screen.radius,
          boxShadow:
            '0 18px 40px rgb(0 0 0 / 0.28), 0 4px 12px rgb(0 0 0 / 0.16)',
        }}
      />
      <div
        className="absolute bg-black"
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
      <img
        src="/iphone.png"
        alt=""
        className="pointer-events-none relative z-10 block h-auto w-full select-none"
        draggable={false}
      />
    </div>
  )
}
