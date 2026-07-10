import {createClient} from '@sanity/client'

export const sanityClient = createClient({
  projectId: 'e3bdiegf',
  dataset: 'production',
  apiVersion: '2026-02-01',
  useCdn: true,
})
