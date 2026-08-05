import { resumeContent } from '../../content/resume-content';
import { SectionHeading } from '../ui/SectionHeading';
import { Card } from '../ui/Card';

export function Leadership() {
  return (
    <section id="leadership" className="mx-auto max-w-4xl px-6 py-20">
      <SectionHeading eyebrow="Leadership & Community" title="Beyond the day job" />
      <div className="space-y-4">
        {resumeContent.leadership.map((entry) => (
          <Card key={entry.id}>
            <p className="font-display text-base text-text-primary">{entry.chunk.title}</p>
            <p className="mt-1 text-xs uppercase tracking-wide text-text-muted">{entry.org}</p>
            <p className="mt-3 text-sm leading-relaxed text-text-secondary">{entry.chunk.text}</p>
          </Card>
        ))}
      </div>
    </section>
  );
}
