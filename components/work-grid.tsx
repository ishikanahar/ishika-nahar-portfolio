import { projects } from '@/content/projects'
import { ProjectCard } from '@/components/project-card'

/**
 * /work — single Vedant-style grid so every project is visible in one scan.
 */
export function WorkGrid() {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {projects.map((project) => (
        <ProjectCard key={project.slug} project={project} />
      ))}
    </div>
  )
}
