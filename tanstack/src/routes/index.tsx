import { queryOptions, useSuspenseQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { Project } from '#/components/Project'
import {
  LAST_UPDATED_QUERY,
  PROJECTS_QUERY,
  type Project as ProjectData,
} from '#/lib/queries'
import { sanityClient } from '#/lib/sanity'
import { ProjectVideo } from '#/components/ProjectVideo'

const projectsQueryOptions = queryOptions({
  queryKey: ['projects'],
  queryFn: () => sanityClient.fetch<ProjectData[]>(PROJECTS_QUERY),
})

const lastUpdatedQueryOptions = queryOptions({
  queryKey: ['lastUpdated'],
  queryFn: () => sanityClient.fetch<string | null>(LAST_UPDATED_QUERY),
})

export const Route = createFileRoute('/')({
  loader: async ({ context }) => {
    await Promise.all([
      context.queryClient.ensureQueryData(projectsQueryOptions),
      context.queryClient.ensureQueryData(lastUpdatedQueryOptions),
    ])
  },
  component: Home,
})

function formatLastUpdated(date: string) {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
}

function Intro({ lastUpdated }: { lastUpdated: string | null }) {
  return (
    <div className="text-center">
      <div className="max-w-[70vw] max-h-[70vh] m-auto flex items-center justify-center py-48">
        <ProjectVideo
          playbackId="IqSfjklZBVBWdl1rODa6J6g3qrcl16qcVOclpednDH00"
          framed
          horizontal
        />
      </div>
      <div>Carter Duong</div>
      <div>
        <a href="mailto:mail@carterduong.com">mail@carterduong.com</a>
      </div>
      <div>software and design in the SF Bay Area and Los Angeles</div>
      {lastUpdated ? (
        <div>last updated {formatLastUpdated(lastUpdated)}</div>
      ) : null}
    </div>
  )
}

function Home() {
  const { data: projects } = useSuspenseQuery(projectsQueryOptions)
  const { data: lastUpdated } = useSuspenseQuery(lastUpdatedQueryOptions)

  return (
    <main className="m-auto overflow-y-scroll overflow-x-hidden">
      <section className="py-24">
        <Intro lastUpdated={lastUpdated} />
      </section>
      {projects.map((project) => (
        <section className="py-24" key={project._id}>
          <Project {...project} />
        </section>
      ))}
      {lastUpdated ? (
        <section className="py-24 text-center">
          last updated {formatLastUpdated(lastUpdated)}
        </section>
      ) : null}
    </main>
  )
}
