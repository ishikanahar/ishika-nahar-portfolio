import { projects } from '@/content/projects'
import { ProjectCard } from '@/components/project-card'

/** Dense one-screen projects grid — motion lives inside the cards. */
export function WorkGrid() {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
      {projects.map((project, i) => (
        <ProjectCard key={project.slug} project={project} index={i} compact />
      ))}
    </div>
  )
}
