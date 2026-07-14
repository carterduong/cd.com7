import { createFileRoute } from '@tanstack/react-router'
import { PhoneFrame } from '#/components/PhoneFrame'

export const Route = createFileRoute('/phone-frame')({
  component: PhoneFramePreview,
})

function PhoneFramePreview() {
  return (
    <main className="grid min-h-screen place-items-center bg-neutral-100 p-8">
      <PhoneFrame>
        <div className="flex h-full flex-col justify-between bg-gray-800 p-[12%] text-white">
          <div className="flex items-center justify-between text-[clamp(0.5rem,1vw,0.75rem)]">
            <span>9:41</span>
            <span>PhoneFrame</span>
          </div>
          <div className="text-center">
            <p className="text-[clamp(0.65rem,1.3vw,1rem)] uppercase tracking-widest opacity-80">
              Component preview
            </p>
            <h1 className="mt-2 text-[clamp(1.5rem,4vw,3rem)] font-bold">
              Hello
            </h1>
          </div>
          <p className="text-center text-[clamp(0.5rem,1vw,0.75rem)] opacity-80">
            /phone-frame
          </p>
        </div>
      </PhoneFrame>
    </main>
  )
}
