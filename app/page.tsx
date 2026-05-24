'use client';

import { useState, useCallback } from 'react';
import BootSequence from '@/components/BootSequence';
import Navigation from '@/components/Navigation';
import CommandCenter from '@/components/CommandCenter';
import AISystemsLab from '@/components/AISystemsLab';
import InfrastructureControl from '@/components/InfrastructureControl';
import EngineeringStories from '@/components/EngineeringStories';
import ArchitectureExplorer from '@/components/ArchitectureExplorer';
import EvolutionTimeline from '@/components/EvolutionTimeline';
import ContactTerminal from '@/components/ContactTerminal';
import Footer from '@/components/Footer';

export default function Home() {
  const [booted, setBooted] = useState(false);

  const handleBootComplete = useCallback(() => {
    setBooted(true);
  }, []);

  return (
    <>
      <BootSequence onComplete={handleBootComplete} />

      {booted && (
        <div className="relative">
          <Navigation />
          <main>
            <CommandCenter />
            <AISystemsLab />
            <InfrastructureControl />
            <EngineeringStories />
            <ArchitectureExplorer />
            <EvolutionTimeline />
            <ContactTerminal />
          </main>
          <Footer />
        </div>
      )}
    </>
  );
}
