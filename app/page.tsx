'use client';

import { useState, useCallback } from 'react';
import BootSequence from '@/components/BootSequence';
import Navigation from '@/components/Navigation';
import CommandCenter from '@/components/CommandCenter';
import AISystemsLab from '@/components/AISystemsLab';
import SystemTopology from '@/components/SystemTopology';
import InfrastructureControl from '@/components/InfrastructureControl';
import Experience from '@/components/Experience';
import AboutIdentity from '@/components/AboutIdentity';
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
            <SystemTopology />
            <InfrastructureControl />
            <Experience />
            <AboutIdentity />
            <ContactTerminal />
          </main>
          <Footer />
        </div>
      )}
    </>
  );
}
