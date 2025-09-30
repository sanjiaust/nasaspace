import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Flower2, Cloud, Sun, Droplets } from 'lucide-react';
import { useApp } from '../contexts/AppContext';

interface MonthData {
  month: string;
  monthbn: string;
  bloomPercentage: number;
  temperature: number;
  rainfall: number;
  species: string[];
}

const monthsData: MonthData[] = [
  { month: 'January', monthbn: 'জানুয়ারি', bloomPercentage: 25, temperature: 18, rainfall: 15, species: ['Marigold', 'Chrysanthemum'] },
  { month: 'February', monthbn: 'ফেব্রুয়ারি', bloomPercentage: 45, temperature: 22, rainfall: 20, species: ['Rose', 'Dahlia'] },
  { month: 'March', monthbn: 'মার্চ', bloomPercentage: 75, temperature: 26, rainfall: 35, species: ['Palash', 'Mango Blossom'] },
  { month: 'April', monthbn: 'এপ্রিল', bloomPercentage: 90, temperature: 30, rainfall: 80, species: ['Krishnachura', 'Bokul'] },
  { month: 'May', monthbn: 'মে', bloomPercentage: 85, temperature: 32, rainfall: 150, species: ['Lotus', 'Water Lily'] },
  { month: 'June', monthbn: 'জুন', bloomPercentage: 70, temperature: 31, rainfall: 280, species: ['Radhachura', 'Kamini'] },
  { month: 'July', monthbn: 'জুলাই', bloomPercentage: 65, temperature: 30, rainfall: 350, species: ['Jasmine', 'Beli'] },
  { month: 'August', monthbn: 'আগস্ট', bloomPercentage: 60, temperature: 30, rainfall: 320, species: ['Ketaki', 'Jui'] },
  { month: 'September', monthbn: 'সেপ্টেম্বর', bloomPercentage: 55, temperature: 29, rainfall: 250, species: ['Shiuli', 'Tuberose'] },
  { month: 'October', monthbn: 'অক্টোবর', bloomPercentage: 50, temperature: 27, rainfall: 120, species: ['Cosmos', 'Sunflower'] },
  { month: 'November', monthbn: 'নভেম্বর', bloomPercentage: 40, temperature: 23, rainfall: 45, species: ['Dahlia', 'Calendula'] },
  { month: 'December', monthbn: 'ডিসেম্বর', bloomPercentage: 30, temperature: 19, rainfall: 20, species: ['Petunia', 'Pansy'] },
];

export const BloomTimeline: React.FC = () => {
  const { t, language } = useApp();
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [isAnimating, setIsAnimating] = useState(false);

  const playAnimation = () => {
    setIsAnimating(true);
    let month = 0;
    const interval = setInterval(() => {
      setSelectedMonth(month);
      month++;
      if (month >= 12) {
        clearInterval(interval);
        setIsAnimating(false);
      }
    }, 800);
  };

  const currentData = monthsData[selectedMonth];

  return (
    <div className="w-full bg-gradient-to-br from-violet-950 via-purple-900 to-fuchsia-950 rounded-2xl p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-4xl font-bold text-white mb-2">{t.timeline.title}</h2>
            <p className="text-purple-200">{t.timeline.description}</p>
          </div>
          <button
            onClick={playAnimation}
            disabled={isAnimating}
            className="px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-lg font-semibold hover:from-pink-600 hover:to-purple-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isAnimating ? (language === 'bn' ? 'চলছে...' : 'Playing...') : (language === 'bn' ? 'অ্যানিমেশন চালান' : 'Play Animation')}
          </button>
        </div>

        <div className="mb-12">
          <div className="flex items-center gap-2 mb-4">
            {monthsData.map((month, index) => (
              <div
                key={index}
                className="flex-1 relative"
                onClick={() => !isAnimating && setSelectedMonth(index)}
              >
                <motion.div
                  className={`h-3 rounded-full cursor-pointer transition-all ${
                    index === selectedMonth ? 'bg-gradient-to-r from-pink-500 to-purple-500' : 'bg-white/20'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  animate={{
                    height: index === selectedMonth ? 16 : 12,
                  }}
                />
                <motion.div
                  className="absolute -top-12 left-1/2 transform -translate-x-1/2 whitespace-nowrap"
                  animate={{
                    opacity: index === selectedMonth ? 1 : 0.5,
                    scale: index === selectedMonth ? 1.1 : 0.9,
                  }}
                >
                  <span className="text-white text-sm font-medium">
                    {language === 'bn' ? month.monthbn : month.month}
                  </span>
                </motion.div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <motion.div
            key={`bloom-${selectedMonth}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-2 bg-gradient-to-br from-white/10 to-white/5 rounded-xl p-8 border border-white/20"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="p-4 bg-pink-500/20 rounded-full">
                <Flower2 className="w-8 h-8 text-pink-400" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">
                  {language === 'bn' ? currentData.monthbn : currentData.month}
                </h3>
                <p className="text-purple-200">
                  {language === 'bn' ? 'ফুল ফোটার কার্যকলাপ' : 'Blooming Activity'}
                </p>
              </div>
            </div>

            <div className="relative h-64 mb-8">
              <div className="absolute inset-0 flex items-end justify-center">
                <motion.div
                  className="w-full bg-gradient-to-t from-pink-500 via-purple-500 to-transparent rounded-t-2xl"
                  initial={{ height: 0 }}
                  animate={{ height: `${currentData.bloomPercentage}%` }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                />
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3 }}
                  className="text-6xl font-bold text-white drop-shadow-lg"
                >
                  {currentData.bloomPercentage}%
                </motion.div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="bg-white/5 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Sun className="w-5 h-5 text-yellow-400" />
                  <span className="text-white/70 text-sm">
                    {language === 'bn' ? 'তাপমাত্রা' : 'Temperature'}
                  </span>
                </div>
                <p className="text-2xl font-bold text-white">{currentData.temperature}°C</p>
              </div>

              <div className="bg-white/5 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Droplets className="w-5 h-5 text-blue-400" />
                  <span className="text-white/70 text-sm">
                    {language === 'bn' ? 'বৃষ্টিপাত' : 'Rainfall'}
                  </span>
                </div>
                <p className="text-2xl font-bold text-white">{currentData.rainfall}mm</p>
              </div>

              <div className="bg-white/5 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Cloud className="w-5 h-5 text-gray-400" />
                  <span className="text-white/70 text-sm">
                    {language === 'bn' ? 'প্রজাতি' : 'Species'}
                  </span>
                </div>
                <p className="text-2xl font-bold text-white">{currentData.species.length}</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            key={`species-${selectedMonth}`}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-gradient-to-br from-white/10 to-white/5 rounded-xl p-6 border border-white/20"
          >
            <h4 className="text-xl font-bold text-white mb-4">
              {language === 'bn' ? 'সক্রিয় প্রজাতি' : 'Active Species'}
            </h4>
            <div className="space-y-3">
              {currentData.species.map((species, index) => (
                <motion.div
                  key={species}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-3 p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
                >
                  <div className="w-2 h-2 bg-pink-400 rounded-full" />
                  <span className="text-white">{species}</span>
                </motion.div>
              ))}
            </div>

            <div className="mt-6 p-4 bg-purple-500/20 rounded-lg">
              <p className="text-purple-200 text-sm">
                {language === 'bn'
                  ? 'এই মাসে সর্বোচ্চ ফুল ফোটা কার্যকলাপের জন্য সেরা সময়।'
                  : 'Optimal time for peak blooming activity this month.'}
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};