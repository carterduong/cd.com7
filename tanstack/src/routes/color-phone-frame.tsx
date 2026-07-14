import { useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { ColorPhoneFrame } from '#/components/ColorPhoneFrame'

export const Route = createFileRoute('/color-phone-frame')({
  component: ColorPhoneFramePreview,
})

const layerOptions = [
  ['media', 'Media'],
  ['bezel', 'Bezel'],
  ['frame', 'Grayscale frame'],
  ['tint', 'Color tint'],
] as const

function ColorPhoneFramePreview() {
  const [color, setColor] = useState('#e11d48')
  const [layers, setLayers] = useState({
    media: true,
    bezel: true,
    frame: true,
    tint: true,
  })

  return (
    <main className="grid min-h-screen place-items-center gap-6 bg-neutral-100 p-8">
      <ColorPhoneFrame
        color={color}
        showMedia={layers.media}
        showBezel={layers.bezel}
        showFrame={layers.frame}
        showTint={layers.tint}
      >
        <div className="flex h-full flex-col justify-between bg-linear-to-b from-amber-300 via-orange-500 to-fuchsia-700 p-[12%] text-white">
          <div className="flex items-center justify-between text-[clamp(0.5rem,1vw,0.75rem)]">
            <span>9:41</span>
            <span>ColorPhoneFrame</span>
          </div>
          <div className="text-center">
            <p className="text-[clamp(0.65rem,1.3vw,1rem)] uppercase tracking-widest opacity-80">
              Frame color
            </p>
            <p className="mt-2 text-[clamp(1rem,2.5vw,2rem)] font-bold">
              {color}
            </p>
          </div>
          <p className="text-center text-[clamp(0.5rem,1vw,0.75rem)] opacity-80">
            /color-phone-frame
          </p>
        </div>
      </ColorPhoneFrame>

      <div className="flex flex-wrap items-center justify-center gap-4 rounded-2xl bg-white px-5 py-3 shadow-sm">
        <label className="flex items-center gap-2">
          Frame color
          <input
            type="color"
            value={color}
            onChange={(event) => setColor(event.target.value)}
            className="h-8 w-12 cursor-pointer border-0 bg-transparent"
          />
        </label>

        {layerOptions.map(([layer, label]) => (
          <label className="flex items-center gap-2" key={layer}>
            <input
              type="checkbox"
              checked={layers[layer]}
              onChange={(event) =>
                setLayers((current) => ({
                  ...current,
                  [layer]: event.target.checked,
                }))
              }
            />
            {label}
          </label>
        ))}
      </div>
    </main>
  )
}
