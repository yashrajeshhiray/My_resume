import { motion } from 'framer-motion';

export function SectionHeading({ eyebrow, title, id }: { eyebrow: string; title: string; id?: string }) {
  return (
    <motion.div
      id={id}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.5 }}
      className="mb-10 scroll-mt-24"
    >
      <p className="text-xs font-medium uppercase tracking-[0.2em] text-accent">{eyebrow}</p>
      <h2 className="mt-2 text-3xl md:text-4xl font-medium">{title}</h2>
      <div className="mt-4 h-px w-16 bg-gradient-to-r from-accent to-transparent" />
    </motion.div>
  );
}
