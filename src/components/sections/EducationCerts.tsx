import { resumeContent } from '../../content/resume-content';
import { SectionHeading } from '../ui/SectionHeading';
import { Card } from '../ui/Card';

export function EducationCerts() {
  const { education, certifications } = resumeContent;

  return (
    <section id="education" className="mx-auto max-w-4xl px-6 py-20">
      <SectionHeading eyebrow="Education & Certifications" title="Foundations" />
      <div className="grid gap-5 md:grid-cols-2">
        <div className="space-y-4">
          {education.map((entry) => (
            <Card key={entry.id}>
              <p className="font-display text-base text-text-primary">{entry.degree}</p>
              <p className="mt-1 text-sm text-text-secondary">
                {entry.institution} · {entry.dateRange.start}–{entry.dateRange.end}
              </p>
              {entry.cgpa && <p className="mt-1 text-sm text-text-muted">CGPA: {entry.cgpa}</p>}
              {entry.honors?.map((honor) => (
                <p key={honor} className="mt-1 text-xs text-accent">
                  {honor}
                </p>
              ))}
            </Card>
          ))}
        </div>
        <div className="space-y-4">
          {certifications.map((cert) => (
            <Card key={cert.id}>
              <p className="font-display text-base text-text-primary">{cert.name}</p>
              <p className="mt-1 text-sm text-text-secondary">{cert.issuer}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
