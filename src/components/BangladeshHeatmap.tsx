import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useApp } from '../contexts/AppContext';

interface DistrictData {
  name: string;
  namebn: string;
  bloomIntensity: number;
  observations: number;
  coordinates: [number, number];
  predictions: number;
}

const bangladeshDistricts: DistrictData[] = [
  { name: 'Dhaka', namebn: 'ঢাকা', bloomIntensity: 8.2, observations: 145, coordinates: [23.8103, 90.4125], predictions: 12 },
  { name: 'Chittagong', namebn: 'চট্টগ্রাম', bloomIntensity: 7.8, observations: 98, coordinates: [22.3569, 91.7832], predictions: 8 },
  { name: 'Sylhet', namebn: 'সিলেট', bloomIntensity: 9.1, observations: 76, coordinates: [24.8949, 91.8687], predictions: 15 },
  { name: 'Rajshahi', namebn: 'রাজশাহী', bloomIntensity: 6.5, observations: 54, coordinates: [24.3745, 88.6042], predictions: 6 },
  { name: 'Khulna', namebn: 'খুলনা', bloomIntensity: 7.2, observations: 67, coordinates: [22.8456, 89.5403], predictions: 9 },
  { name: 'Barisal', namebn: 'বরিশাল', bloomIntensity: 8.5, observations: 43, coordinates: [22.7010, 90.3535], predictions: 7 },
  { name: 'Rangpur', namebn: 'রংপুর', bloomIntensity: 5.8, observations: 38, coordinates: [25.7439, 89.2752], predictions: 5 },
  { name: 'Mymensingh', namebn: 'ময়মনসিংহ', bloomIntensity: 8.9, observations: 62, coordinates: [24.7471, 90.4203], predictions: 11 },
  { name: 'Comilla', namebn: 'কুমিল্লা', bloomIntensity: 7.6, observations: 51, coordinates: [23.4607, 91.1809], predictions: 8 },
  { name: 'Cox\'s Bazar', namebn: 'কক্সবাজার', bloomIntensity: 8.7, observations: 89, coordinates: [21.4272, 92.0058], predictions: 13 },
];

export const BangladeshHeatmap: React.FC = () => {
  const { t, language } = useApp();
  const [selectedDistrict, setSelectedDistrict] = useState<DistrictData | null>(null);
  const [viewMode, setViewMode] = useState<'intensity' | 'observations'>('intensity');

  const maxIntensity = Math.max(...bangladeshDistricts.map(d => d.bloomIntensity));
  const maxObservations = Math.max(...bangladeshDistricts.map(d => d.observations));

  const getColor = (district: DistrictData) => {
    const value = viewMode === 'intensity' ? district.bloomIntensity : district.observations;
    const max = viewMode === 'intensity' ? maxIntensity : maxObservations;
    const ratio = value / max;

    if (ratio > 0.8) return '#22c55e';
    if (ratio > 0.6) return '#84cc16';
    if (ratio > 0.4) return '#eab308';
    if (ratio > 0.2) return '#f97316';
    return '#ef4444';
  };

  return (
    <div className="w-full bg-gradient-to-br from-emerald-950 via-teal-900 to-cyan-950 rounded-2xl p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-4xl font-bold text-white mb-2">{t.bangladesh.title}</h2>
            <p className="text-emerald-200">{t.bangladesh.description}</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setViewMode('intensity')}
              className={`px-6 py-2 rounded-lg transition-all ${
                viewMode === 'intensity'
                  ? 'bg-emerald-500 text-white'
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              {language === 'bn' ? 'তীব্রতা' : 'Intensity'}
            </button>
            <button
              onClick={() => setViewMode('observations')}
              className={`px-6 py-2 rounded-lg transition-all ${
                viewMode === 'observations'
                  ? 'bg-emerald-500 text-white'
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              {language === 'bn' ? 'পর্যবেক্ষণ' : 'Observations'}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="relative bg-slate-800/50 rounded-xl p-8 h-[500px]">
            <svg viewBox="0 0 400 500" className="w-full h-full">
              <defs>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              <path
                d="M 200,50 L 350,150 L 380,350 L 280,480 L 120,480 L 20,350 L 50,150 Z"
                fill="url(#mapGradient)"
                stroke="#1e293b"
                strokeWidth="2"
              />
              <defs>
                <linearGradient id="mapGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#0f766e" />
                  <stop offset="100%" stopColor="#134e4a" />
                </linearGradient>
              </defs>

              {bangladeshDistricts.map((district, index) => {
                const x = ((district.coordinates[1] - 88) / 4) * 300 + 50;
                const y = ((26 - district.coordinates[0]) / 5) * 400 + 50;
                const color = getColor(district);

                return (
                  <motion.g
                    key={district.name}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => setSelectedDistrict(district)}
                    className="cursor-pointer"
                  >
                    <circle
                      cx={x}
                      cy={y}
                      r={selectedDistrict?.name === district.name ? 20 : 15}
                      fill={color}
                      filter="url(#glow)"
                      opacity={0.9}
                      className="transition-all duration-300"
                    />
                    <circle
                      cx={x}
                      cy={y}
                      r={selectedDistrict?.name === district.name ? 25 : 18}
                      fill="none"
                      stroke={color}
                      strokeWidth="2"
                      opacity={0.5}
                      className="transition-all duration-300"
                    >
                      <animate
                        attributeName="r"
                        from={selectedDistrict?.name === district.name ? 25 : 18}
                        to={selectedDistrict?.name === district.name ? 35 : 28}
                        dur="2s"
                        repeatCount="indefinite"
                      />
                      <animate
                        attributeName="opacity"
                        from="0.5"
                        to="0"
                        dur="2s"
                        repeatCount="indefinite"
                      />
                    </circle>
                  </motion.g>
                );
              })}
            </svg>
          </div>

          <div className="space-y-4">
            {selectedDistrict ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gradient-to-br from-emerald-500/20 to-teal-500/20 rounded-xl p-6 border border-emerald-500/30"
              >
                <h3 className="text-2xl font-bold text-white mb-4">
                  {language === 'bn' ? selectedDistrict.namebn : selectedDistrict.name}
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-emerald-200">{language === 'bn' ? 'ফুলের তীব্রতা' : 'Bloom Intensity'}</span>
                    <span className="text-white font-bold">{selectedDistrict.bloomIntensity}/10</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-emerald-200">{language === 'bn' ? 'পর্যবেক্ষণ' : 'Observations'}</span>
                    <span className="text-white font-bold">{selectedDistrict.observations}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-emerald-200">{language === 'bn' ? 'পূর্বাভাস' : 'Predictions'}</span>
                    <span className="text-white font-bold">{selectedDistrict.predictions}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-emerald-200">{language === 'bn' ? 'স্থানাঙ্ক' : 'Coordinates'}</span>
                    <span className="text-white font-mono text-sm">
                      {selectedDistrict.coordinates[0].toFixed(4)}°N, {selectedDistrict.coordinates[1].toFixed(4)}°E
                    </span>
                  </div>
                </div>
              </motion.div>
            ) : (
              <div className="bg-white/5 rounded-xl p-6 border border-white/10 text-center text-white/60">
                {language === 'bn' ? 'একটি জেলা নির্বাচন করুন' : 'Select a district to view details'}
              </div>
            )}

            <div className="bg-white/5 rounded-xl p-6 border border-white/10">
              <h4 className="text-lg font-semibold text-white mb-4">
                {language === 'bn' ? 'শীর্ষ জেলা' : 'Top Districts'}
              </h4>
              <div className="space-y-2">
                {[...bangladeshDistricts]
                  .sort((a, b) => b.bloomIntensity - a.bloomIntensity)
                  .slice(0, 5)
                  .map((district, index) => (
                    <div
                      key={district.name}
                      className="flex items-center justify-between p-2 bg-white/5 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
                      onClick={() => setSelectedDistrict(district)}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-emerald-400 font-bold w-6">#{index + 1}</span>
                        <span className="text-white">{language === 'bn' ? district.namebn : district.name}</span>
                      </div>
                      <span className="text-emerald-300 font-semibold">{district.bloomIntensity}</span>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};