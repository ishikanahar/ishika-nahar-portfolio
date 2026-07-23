import { personalProjects, additionalProjects } from '@/content/projects'
import { ProjectCard } from '@/components/project-card'
import { WorkFeaturedInteractive } from '@/components/work-featured-interactive'
import {
  MomentumIdeaCard,
  StyleAdaptiveIdeaCard,
} from '@/components/featured-work'

export function WorkGrid() {
  return (
    <div className="space-y-14">
      <WorkFeaturedInteractive />

      <div>
        <h2 className="font-display text-xl font-semibold tracking-tight">
          Projects
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          End-to-end analyses with results you can inspect.
        </p>
        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          {personalProjects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </div>

      <div>
        <h2 className="font-display text-xl font-semibold tracking-tight">
          Ideas worth exploring
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Live UI previews — open a demo or the full case study.
        </p>
        <div className="mt-6 grid gap-5 lg:grid-cols-2">
          <MomentumIdeaCard />
          <StyleAdaptiveIdeaCard />
        </div>
      </div>

      {additionalProjects.length > 0 && (
        <div>
          <h2 className="font-display text-xl font-semibold tracking-tight">
            Additional work
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Analytics, campaigns, and other team collaborations.
          </p>
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {additionalProjects.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
