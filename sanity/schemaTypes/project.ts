import {ProjectsIcon} from '@sanity/icons/Projects'
import {defineArrayMember, defineField, defineType} from 'sanity'

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
          ],
        }),
        defineArrayMember({
          type: 'mux.video',
          title: 'Video',
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
