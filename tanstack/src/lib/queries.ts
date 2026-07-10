import {defineQuery} from 'groq'

export const PROJECTS_QUERY = defineQuery(`
  *[_type == "project"] | order(year desc) {
    _id,
    title,
    year,
    media[] {
      _key,
      _type,
      ...select(
        _type == "image" => {
          alt,
          "url": asset->url
        },
        _type == "mux.video" => {
          "playbackId": asset->playbackId
        }
      )
    }
  }
`)

export type ProjectMedia =
  | {
      _key: string
      _type: 'image'
      alt?: string | null
      url?: string | null
    }
  | {
      _key: string
      _type: 'mux.video'
      playbackId?: string | null
    }

export type Project = {
  _id: string
  title: string
  year: number
  media?: ProjectMedia[] | null
}
