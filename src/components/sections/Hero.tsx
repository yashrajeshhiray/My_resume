import { motion } from 'framer-motion';
import { resumeContent } from '../../content/resume-content';

export function Hero({ onOpenSearch }: { onOpenSearch: () => void }) {
  const { person } = resumeContent;

  return (
    <section id="top" className="relative overflow-hidden px-6 pb-24 pt-20 md:pt-28">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[520px] bg-[radial-gradient(60%_50%_at_50%_0%,var(--color-accent-soft),transparent)]"
      />
      <div className="mx-auto max-w-3xl text-center">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-sm font-medium uppercase tracking-[0.25em] text-accent"
        >
          {person.title}
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-4 text-4xl font-medium leading-tight text-text-primary md:text-6xl"
        >
          {person.name}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mx-auto mt-5 max-w-xl text-base text-text-secondary md:text-lg"
        >
          {person.tagline}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-4"
        >
          <button
            type="button"
            onClick={onOpenSearch}
            className="rounded-full bg-accent px-6 py-3 text-sm font-medium text-surface transition-transform hover:scale-[1.03]"
          >
            Ask if he's a fit for your role
          </button>
          <a
            href="#projects"
            className="rounded-full border border-surface-line px-6 py-3 text-sm font-medium text-text-secondary transition-colors hover:border-accent/50 hover:text-text-primary"
          >
            View projects
          </a>
        </motion.div>
      </div>
    </section>
  );
}
