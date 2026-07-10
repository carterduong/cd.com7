import { queryOptions, useSuspenseQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { Project } from '#/components/Project'
import { PROJECTS_QUERY, type Project as ProjectData } from '#/lib/queries'
import { sanityClient } from '#/lib/sanity'

const projectsQueryOptions = queryOptions({
  queryKey: ['projects'],
  queryFn: () => sanityClient.fetch<ProjectData[]>(PROJECTS_QUERY),
})

export const Route = createFileRoute('/')({
  loader: ({ context }) =>
    context.queryClient.ensureQueryData(projectsQueryOptions),
  component: Home,
})

const Intro = () => {
  return (
    <div className="text-center">
      <div>Carter Duong</div>
      <div>
        <a href="mailto:mail@carterduong.com">mail@carterduong.com</a>
      </div>
      <div>software and design in the SF Bay Area and Los Angeles</div>
      <div>last updated September 22, 2025</div>
    </div>
  )
}

function Home() {
  const { data: projects } = useSuspenseQuery(projectsQueryOptions)

  return (
    <div>
      <Intro />
      <br />
      {projects.map((project) => (
        <Project key={project._id} {...project} />
      ))}
    </div>
  )
}
