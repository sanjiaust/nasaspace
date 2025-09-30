import React, { useRef, useState, useEffect } from 'react';
import { AppProvider } from './contexts/AppContext';
import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { Globe3D } from './components/Globe3D';
import { BangladeshHeatmap } from './components/BangladeshHeatmap';
import { BloomTimeline } from './components/BloomTimeline';
import { FlowerPollinator3D } from './components/FlowerPollinator3D';
import { DataDashboard } from './components/DataDashboard';
import { PredictionGame } from './components/PredictionGame';
import { CitizenSciencePortal } from './components/CitizenSciencePortal';
import { supabase, BloomObservation } from './lib/supabase';

const mockBloomData: BloomObservation[] = [
  { id: '1', location: { lat: 23.8103, lng: 90.4125 }, country: 'Bangladesh', district: 'Dhaka', species_name: 'Krishnachura', observation_date: '2025-04-15', bloom_intensity: 9, photo_url: '', source: 'citizen', metadata: {}, created_at: '2025-04-15' },
  { id: '2', location: { lat: 37.7749, lng: -122.4194 }, country: 'USA', district: 'California', species_name: 'California Poppy', observation_date: '2025-03-20', bloom_intensity: 8, photo_url: '', source: 'nasa_satellite', metadata: {}, created_at: '2025-03-20' },
  { id: '3', location: { lat: 22.3569, lng: 91.7832 }, country: 'Bangladesh', district: 'Chittagong', species_name: 'Palash', observation_date: '2025-03-10', bloom_intensity: 8, photo_url: '', source: 'globe_observer', metadata: {}, created_at: '2025-03-10' },
  { id: '4', location: { lat: 28.6139, lng: 77.2090 }, country: 'India', district: 'Delhi', species_name: 'Lotus', observation_date: '2025-05-01', bloom_intensity: 7, photo_url: '', source: 'citizen', metadata: {}, created_at: '2025-05-01' },
  { id: '5', location: { lat: -23.5505, lng: -46.6333 }, country: 'Brazil', district: 'São Paulo', species_name: 'Orchid', observation_date: '2025-02-28', bloom_intensity: 9, photo_url: '', source: 'citizen', metadata: {}, created_at: '2025-02-28' },
  { id: '6', location: { lat: 51.5074, lng: -0.1278 }, country: 'UK', district: 'London', species_name: 'Daffodil', observation_date: '2025-03-15', bloom_intensity: 6, photo_url: '', source: 'citizen', metadata: {}, created_at: '2025-03-15' },
  { id: '7', location: { lat: 35.6762, lng: 139.6503 }, country: 'Japan', district: 'Tokyo', species_name: 'Cherry Blossom', observation_date: '2025-03-25', bloom_intensity: 10, photo_url: '', source: 'nasa_satellite', metadata: {}, created_at: '2025-03-25' },
  { id: '8', location: { lat: -33.8688, lng: 151.2093 }, country: 'Australia', district: 'Sydney', species_name: 'Waratah', observation_date: '2025-04-05', bloom_intensity: 8, photo_url: '', source: 'citizen', metadata: {}, created_at: '2025-04-05' },
  { id: '9', location: { lat: 24.8949, lng: 91.8687 }, country: 'Bangladesh', district: 'Sylhet', species_name: 'Jasmine', observation_date: '2025-06-10', bloom_intensity: 9, photo_url: '', source: 'globe_observer', metadata: {}, created_at: '2025-06-10' },
  { id: '10', location: { lat: 22.7010, lng: 90.3535 }, country: 'Bangladesh', district: 'Barisal', species_name: 'Water Lily', observation_date: '2025-05-20', bloom_intensity: 8, photo_url: '', source: 'citizen', metadata: {}, created_at: '2025-05-20' },
];

function AppContent() {
  const heroRef = useRef<HTMLDivElement>(null);
  const globeRef = useRef<HTMLDivElement>(null);
  const bangladeshRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const pollinatorRef = useRef<HTMLDivElement>(null);
  const dataRef = useRef<HTMLDivElement>(null);
  const gameRef = useRef<HTMLDivElement>(null);
  const contributeRef = useRef<HTMLDivElement>(null);

  const [bloomData, setBloomData] = useState<BloomObservation[]>(mockBloomData);

  useEffect(() => {
    const fetchBloomData = async () => {
      const { data, error } = await supabase
        .from('bloom_observations')
        .select('*')
        .limit(100);

      if (data && data.length > 0) {
        const formatted = data.map((d: any) => ({
          ...d,
          location: { lat: 0, lng: 0 },
        }));
        setBloomData(formatted);
      }
    };

    fetchBloomData();
  }, []);

  const handleNavigate = (section: string) => {
    const refs: Record<string, React.RefObject<HTMLDivElement>> = {
      hero: heroRef,
      globe: globeRef,
      bangladesh: bangladeshRef,
      timeline: timelineRef,
      pollinator: pollinatorRef,
      data: dataRef,
      game: gameRef,
      contribute: contributeRef,
    };

    refs[section]?.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-950">
      <Navigation onNavigate={handleNavigate} />

      <div ref={heroRef}>
        <Hero />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24 py-24">
        <div ref={globeRef}>
          <Globe3D observations={bloomData} />
        </div>

        <div ref={bangladeshRef}>
          <BangladeshHeatmap />
        </div>

        <div ref={timelineRef}>
          <BloomTimeline />
        </div>

        <div ref={pollinatorRef}>
          <FlowerPollinator3D />
        </div>

        <div ref={dataRef}>
          <DataDashboard />
        </div>

        <div ref={gameRef}>
          <PredictionGame />
        </div>

        <div ref={contributeRef}>
          <CitizenSciencePortal />
        </div>
      </div>

      <footer className="bg-slate-900 border-t border-white/10 mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold text-white mb-4">BloomX</h3>
              <p className="text-white/60 text-sm">
                Visualizing global plant blooming events using NASA Earth observation data and citizen science.
              </p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Data Sources</h4>
              <ul className="space-y-2 text-white/60 text-sm">
                <li>NASA MODIS</li>
                <li>Landsat 8/9</li>
                <li>VIIRS</li>
                <li>Sentinel-2</li>
                <li>GLOBE Observer</li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-white/60 text-sm">
                <li>NASA Earthdata</li>
                <li>GLOBE Program</li>
                <li>Bangladesh Agriculture</li>
                <li>Climate Data</li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-white/10 text-center text-white/40 text-sm">
            <p>&copy; 2025 BloomX. Built for NASA Space Apps Challenge.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;