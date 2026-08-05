import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { resumeContent } from '../../content/resume-content';
import { SectionHeading } from '../ui/SectionHeading';
import { Badge } from '../ui/Badge';

function RoleAccordion({ entry, defaultOpen }: { entry: (typeof resumeContent.experience)[number]; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(!!defaultOpen);
  const end = entry.dateRange.end === 'present' ? 'Present' : entry.dateRange.end;

  return (
    <div className="rounded-2xl border border-surface-line/60 bg-surface-raised/40">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
      >
        <div>
          <p className="font-display text-lg text-text-primary">{entry.role}</p>
          <p className="text-sm text-text-secondary">
            {entry.company} · {entry.location} · {entry.dateRange.start} – {end}
          </p>
        </div>
        <motion.span
          animate={{ rotate: open ? 45 : 0 }}
          className="text-2xl leading-none text-accent"
          aria-hidden
        >
          +
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <ul className="space-y-4 px-6 pb-6">
              {entry.bullets.map((bullet) => (
                <li key={bullet.id} className="border-t border-surface-line/60 pt-4 first:border-t-0 first:pt-0">
                  <p className="text-sm font-medium text-text-primary">{bullet.title}</p>
                  <p className="mt-1 text-sm leading-relaxed text-text-secondary">{bullet.text}</p>
                  {bullet.tags.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {bullet.tags.map((tag) => (
                        <Badge key={tag}>{tag}</Badge>
                      ))}
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function ExperienceTimeline() {
  return (
    <section id="experience" className="mx-auto max-w-4xl px-6 py-20">
      <SectionHeading eyebrow="Experience" title="Where the impact happened" />
      <div className="space-y-4">
        {resumeContent.experience.map((entry, i) => (
          <RoleAccordion key={entry.id} entry={entry} defaultOpen={i === 0} />
        ))}
      </div>
    </section>
  );
}
