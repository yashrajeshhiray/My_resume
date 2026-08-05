import { useState } from 'react';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { Hero } from './components/sections/Hero';
import { About } from './components/sections/About';
import { ExperienceTimeline } from './components/sections/ExperienceTimeline';
import { Projects } from './components/sections/Projects';
import { ImpactStats } from './components/sections/ImpactStats';
import { Leadership } from './components/sections/Leadership';
import { EducationCerts } from './components/sections/EducationCerts';
import { SearchWidget } from './components/search/SearchWidget';

function App() {
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <div className="min-h-screen bg-surface text-text-secondary">
      <Header onOpenSearch={() => setSearchOpen(true)} />
      <main>
        <Hero onOpenSearch={() => setSearchOpen(true)} />
        <About />
        <ExperienceTimeline />
        <Projects />
        <ImpactStats />
        <Leadership />
        <EducationCerts />
      </main>
      <Footer />

      <button
        type="button"
        onClick={() => setSearchOpen(true)}
        className="fixed bottom-6 right-6 z-30 flex h-14 w-14 items-center justify-center rounded-full bg-accent text-surface shadow-lg transition-transform hover:scale-105 md:hidden"
        aria-label="Ask about Yash"
      >
        ?
      </button>

      <SearchWidget open={searchOpen} onOpenChange={setSearchOpen} />
    </div>
  );
}

export default App;
