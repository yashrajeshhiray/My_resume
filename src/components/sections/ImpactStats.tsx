import { resumeContent } from '../../content/resume-content';
import { SectionHeading } from '../ui/SectionHeading';
import { StatTile } from '../ui/StatTile';
import type { Metric } from '../../content/types';

const GROUPS: { name: string; rawValues: string[] }[] = [
  { name: 'Scale', rawValues: ['100K+', '25M+', '12+', '20+', '65,854'] },
  { name: 'Efficiency', rawValues: ['5x', '80%+', '9,000+'] },
  { name: 'Quality', rawValues: ['4x+', '99.95'] },
  { name: 'Community', rawValues: ['110+', '30+', '45+'] },
];

function groupMetrics(metrics: Metric[]) {
  return GROUPS.map((group) => ({
    name: group.name,
    metrics: group.rawValues.map((raw) => metrics.find((m) => m.raw === raw)).filter((m): m is Metric => !!m),
  })).filter((g) => g.metrics.length > 0);
}

export function ImpactStats() {
  const groups = groupMetrics(resumeContent.metrics);

  return (
    <section id="impact" className="mx-auto max-w-5xl px-6 py-20">
      <SectionHeading eyebrow="Impact" title="Measurable outcomes, not just responsibilities" />
      <div className="space-y-10">
        {groups.map((group) => (
          <div key={group.name}>
            <h3 className="mb-4 text-sm font-medium uppercase tracking-wide text-text-muted">{group.name}</h3>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
              {group.metrics.map((metric) => (
                <StatTile key={metric.label} metric={metric} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
