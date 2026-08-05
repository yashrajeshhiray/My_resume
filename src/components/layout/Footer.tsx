import { resumeContent } from '../../content/resume-content';

export function Footer() {
  const { person } = resumeContent;
  return (
    <footer id="contact" className="border-t border-surface-line/60 px-6 py-12">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-4 text-center">
        <p className="font-display text-xl text-text-primary">Let's talk</p>
        <p className="max-w-md text-sm text-text-secondary">
          Reach out directly, or use the search above to check how {person.name.split(' ')[0]}'s
          background lines up with what you're hiring for.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          {person.links.map((link) => (
            <a
              key={link.url}
              href={link.url}
              target={link.url.startsWith('http') ? '_blank' : undefined}
              rel={link.url.startsWith('http') ? 'noreferrer' : undefined}
              className="rounded-full border border-surface-line px-4 py-2 text-sm text-text-secondary transition-colors hover:border-accent/50 hover:text-accent"
            >
              {link.label}
            </a>
          ))}
          <a
            href={`${import.meta.env.BASE_URL}resume-yash-hiray.pdf`}
            download
            className="rounded-full border border-accent/50 bg-accent-soft px-4 py-2 text-sm font-medium text-accent transition-colors hover:bg-accent hover:text-surface"
          >
            Download Resume
          </a>
        </div>
        <p className="mt-6 text-xs text-text-muted">
          &copy; {new Date().getFullYear()} {person.name}
        </p>
      </div>
    </footer>
  );
}
