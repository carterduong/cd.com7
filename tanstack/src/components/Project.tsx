import useEmblaCarousel from 'embla-carousel-react'
import { useEffect, useState } from 'react'
import type { Project as ProjectData } from '#/lib/queries'
import { MediaItem } from '#/components/MediaItem'
import { PortableTextRenderer } from '#/components/PortableTextRenderer'

export function Project({ title, credits, year, media }: ProjectData) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    align: 'center',
    containScroll: false,
  })
  const firstImageIndex = media?.findIndex((item) => item._type === 'image')
  const [displayedIndex, setDisplayedIndex] = useState(0)
  const [captionVisible, setCaptionVisible] = useState(
    firstImageIndex === 0 || Boolean(media?.[0]?.caption?.length),
  )

  const activateSlide = (index: number) => {
    if (!emblaApi) return
    if (emblaApi.selectedScrollSnap() === index) return
    emblaApi.scrollTo(index)
  }

  useEffect(() => {
    if (!emblaApi) return

    let fadeTimer: ReturnType<typeof setTimeout> | undefined

    const hasCaption = (index: number) =>
      index === firstImageIndex || Boolean(media?.[index]?.caption?.length)

    const initializeCaption = () => {
      const index = emblaApi.selectedScrollSnap()
      setDisplayedIndex(index)
      setCaptionVisible(hasCaption(index))
    }

    const updateCaption = () => {
      const nextIndex = emblaApi.selectedScrollSnap()
      setCaptionVisible(false)
      clearTimeout(fadeTimer)
      fadeTimer = setTimeout(() => {
        setDisplayedIndex(nextIndex)
        setCaptionVisible(hasCaption(nextIndex))
      }, 200)
    }

    initializeCaption()
    emblaApi.on('select', updateCaption)
    emblaApi.on('reInit', initializeCaption)

    return () => {
      clearTimeout(fadeTimer)
      emblaApi.off('select', updateCaption)
      emblaApi.off('reInit', initializeCaption)
    }
  }, [emblaApi, firstImageIndex, media])

  const displayedItem = media?.[displayedIndex]

  return (
    <div>
      {media && media.length > 0 ? (
        <div ref={emblaRef} className={emblaApi ? 'visible' : 'invisible'}>
          <div className="flex gap-[60px]">
            {media.map((item, index) => (
              <div
                key={item._key}
                className="flex h-[70vh] min-w-0 flex-[0_0_auto] cursor-pointer items-center justify-center"
                onClick={() => activateSlide(index)}
              >
                <MediaItem item={item} />
              </div>
            ))}
          </div>
        </div>
      ) : null}
      <div className="flex min-h-24 justify-center pt-24 max-w-[45vw] m-auto text-center">
        <div
          className={`transition-opacity duration-200 ${
            captionVisible ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {displayedIndex === firstImageIndex ? (
            <>
              <h2>{title}</h2>
              {credits && <p>{credits}</p>}
              <p>{year}</p>
            </>
          ) : displayedItem?.caption?.length ? (
            <PortableTextRenderer value={displayedItem.caption} />
          ) : null}
        </div>
      </div>
    </div>
  )
}
