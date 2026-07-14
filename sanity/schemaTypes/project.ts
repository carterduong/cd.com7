import {PlayIcon} from '@sanity/icons/Play'
import {ProjectsIcon} from '@sanity/icons/Projects'

function toPlainText(blocks?: Array<{_type: string; children?: Array<{text: string}>}>) {
  return (
    blocks
      ?.filter((b) => b._type === 'block')
      .map((b) => b.children?.map((c) => c.text).join(''))
      .join(' ') || ''
  )
}
import {defineArrayMember, defineField, defineType} from 'sanity'

const frameField = defineField({
  name: 'frame',
  title: 'Frame',
  type: 'string',
  options: {
    list: ['phone'],
    layout: 'dropdown',
  },
})

export const project = defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  icon: ProjectsIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'credits',
      title: 'Credits',
      type: 'string',
    }),
    defineField({
      name: 'year',
      title: 'Year',
      type: 'number',
      validation: (rule) => rule.required().integer().min(1900).max(2100),
    }),
    defineField({
      name: 'media',
      title: 'Media',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'image',
          options: {hotspot: true},
          fields: [
            defineField({
              name: 'alt',
              title: 'Alt text',
              type: 'string',
            }),
            defineField({
              name: 'caption',
              title: 'Caption',
              type: 'portableText',
            }),
            frameField,
          ],
          preview: {
            select: {
              caption: 'caption',
              media: 'asset',
            },
            prepare({caption, media}) {
              return {
                title: toPlainText(caption) || 'Image',
                media,
              }
            },
          },
        }),
        defineArrayMember({
          name: 'videoWithCaption',
          title: 'Video',
          type: 'object',
          fields: [
            defineField({
              name: 'video',
              title: 'Video',
              type: 'mux.video',
            }),
            defineField({
              name: 'caption',
              title: 'Caption',
              type: 'portableText',
            }),
            frameField,
          ],
          preview: {
            select: {
              caption: 'caption',
            },
            prepare({caption}) {
              return {
                title: toPlainText(caption) || 'Video',
                media: PlayIcon,
              }
            },
          },
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      year: 'year',
      media: 'media.0',
    },
    prepare({title, year, media}) {
      return {
        title,
        subtitle: year ? String(year) : undefined,
        media: media?._type === 'image' ? media : undefined,
      }
    },
  },
})
