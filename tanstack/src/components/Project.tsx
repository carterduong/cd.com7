import type { Project as ProjectData, ProjectMedia } from '#/lib/queries'

function MediaItem({ item }: { item: ProjectMedia }) {
  if (item._type === 'image') {
    return (
      <li>
        image: {item.url ?? 'no url'}
        {item.alt ? ` (${item.alt})` : null}
      </li>
    )
  }

  return <li>video: {item.playbackId ?? 'no playback id'}</li>
}

export function Project({ title, year, media }: ProjectData) {
  return (
    <article>
      <h2>{title}</h2>
      <p>{year}</p>
      {media && media.length > 0 ? (
        <ul>
          {media.map((item) => (
            <MediaItem key={item._key} item={item} />
          ))}
        </ul>
      ) : null}
    </article>
  )
}
