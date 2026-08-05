import { resumeContent } from '../../content/resume-content';
import { SectionHeading } from '../ui/SectionHeading';
import { Badge } from '../ui/Badge';

export function About() {
  const { person, skills } = resumeContent;

  return (
    <section id="about" className="mx-auto max-w-4xl px-6 py-20">
      <SectionHeading eyebrow="About" title="Applied AI & Forward-Deployed Engineering" />
      <p className="text-lg leading-relaxed text-text-secondary">{person.summary.text}</p>

      <div className="mt-10 space-y-6">
        {skills.map((group) => (
          <div key={group.category}>
            <h3 className="text-sm font-medium uppercase tracking-wide text-text-muted">
              {group.category}
            </h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {group.items.map((item) => (
                <Badge key={item}>{item}</Badge>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
