'use client'

import { useState } from 'react'
import { projects, allCategories, type ProjectCategory } from '@/content/projects'
import { ProjectCard } from '@/components/project-card'
import { cn } from '@/lib/utils'

type Filter = ProjectCategory | 'All'

export function WorkGrid() {
  const [filter, setFilter] = useState<Filter>('All')

  const filtered =
    filter === 'All'
      ? projects
      : projects.filter((p) => p.categories.includes(filter))

  const filters: Filter[] = ['All', ...allCategories]

  return (
    <div>
      <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filter projects">
        {filters.map((f) => (
          <button
            key={f}
            type="button"
            role="tab"
            aria-selected={filter === f}
            onClick={() => setFilter(f)}
            className={cn(
              'rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors',
              filter === f
                ? 'border-primary bg-primary text-primary-foreground'
                : 'border-border bg-card text-muted-foreground hover:text-foreground',
            )}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="mt-10 text-center text-sm text-muted-foreground">
          No projects in this category yet.
        </p>
      )}
    </div>
  )
}
