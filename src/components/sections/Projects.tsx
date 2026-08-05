import { resumeContent } from '../../content/resume-content';
import { SectionHeading } from '../ui/SectionHeading';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';

export function Projects() {
  return (
    <section id="projects" className="mx-auto max-w-5xl px-6 py-20">
      <SectionHeading eyebrow="Projects" title="Things worth asking about" />
      <div className="grid gap-5 md:grid-cols-2">
        {resumeContent.projects.map((project) => {
          const highlightMetric = project.summaryChunk.metrics?.[0] ?? project.detailChunks.flatMap((c) => c.metrics ?? [])[0];
          return (
            <Card key={project.id} className="flex flex-col">
              <div className="flex items-start justify-between gap-3">
                <h3 className="font-display text-lg text-text-primary">{project.name}</h3>
                {highlightMetric && (
                  <span className="whitespace-nowrap rounded-full bg-accent-soft px-3 py-1 text-xs font-medium text-accent">
                    {highlightMetric.raw}
                  </span>
                )}
              </div>
              {project.context && <p className="mt-1 text-xs uppercase tracking-wide text-text-muted">{project.context}</p>}
              <p className="mt-3 text-sm leading-relaxed text-text-secondary">{project.summaryChunk.text}</p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {project.tags.map((tag) => (
                  <Badge key={tag}>{tag}</Badge>
                ))}
              </div>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
