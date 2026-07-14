import { defineQuery } from 'groq'
import type { PortableTextBlock } from '@portabletext/types'

export const PROJECTS_QUERY = defineQuery(`
  *[_type == "project" && !(_id in path("drafts.**"))] | order(year desc) {
    _id,
    title,
    credits,
    year,
    media[] {
      _key,
      _type,
      frame,
      caption,
      ...select(
        _type == "image" => {
          alt,
          "url": asset->url
        },
        _type == "mux.video" => {
          "playbackId": asset->playbackId,
          "aspectRatio": asset->data.aspect_ratio
        },
        _type == "videoWithCaption" => {
          "playbackId": video.asset->playbackId,
          "aspectRatio": video.asset->data.aspect_ratio
        }
      )
    }
  }
`)

export const LAST_UPDATED_QUERY = defineQuery(`
  *[!(_id in path("drafts.**"))] | order(_updatedAt desc)[0]._updatedAt
`)

export type MediaFrame = string | null

type MediaBase = {
  _key: string
  frame?: MediaFrame
  caption?: PortableTextBlock[] | null
}

export type ProjectMedia =
  | (MediaBase & {
      _type: 'image'
      alt?: string | null
      url?: string | null
    })
  | (MediaBase & {
      _type: 'mux.video'
      playbackId?: string | null
      aspectRatio?: string | null
    })
  | (MediaBase & {
      _type: 'videoWithCaption'
      playbackId?: string | null
      aspectRatio?: string | null
    })

export type Project = {
  _id: string
  title: string
  credits?: string | null
  year: number
  media?: ProjectMedia[] | null
}
