import {ProjectsIcon} from '@sanity/icons/Projects'
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
