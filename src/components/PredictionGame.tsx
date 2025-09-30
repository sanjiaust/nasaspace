import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Medal, Star, Target, Award } from 'lucide-react';
import { useApp } from '../contexts/AppContext';

interface LeaderboardEntry {
  rank: number;
  name: string;
  score: number;
  predictions: number;
  accuracy: number;
}

const mockLeaderboard: LeaderboardEntry[] = [
  { rank: 1, name: 'Sarah Chen', score: 2850, predictions: 45, accuracy: 95 },
  { rank: 2, name: 'রহিম আহমেদ', score: 2720, predictions: 42, accuracy: 93 },
  { rank: 3, name: 'Carlos Silva', score: 2640, predictions: 38, accuracy: 91 },
  { rank: 4, name: 'Priya Sharma', score: 2580, predictions: 41, accuracy: 90 },
  { rank: 5, name: 'মিতা রহমান', score: 2510, predictions: 39, accuracy: 89 },
  { rank: 6, name: 'John Smith', score: 2450, predictions: 37, accuracy: 88 },
  { rank: 7, name: 'Li Wei', score: 2390, predictions: 36, accuracy: 87 },
  { rank: 8, name: 'আরিফ খান', score: 2340, predictions: 35, accuracy: 86 },
];

const badges = [
  { name: 'Bloom Hunter', icon: '🌸', description: 'Made 10 predictions', earned: true },
  { name: 'Eagle Eye', icon: '👁️', description: '90% accuracy rate', earned: true },
  { name: 'Global Explorer', icon: '🌍', description: 'Predictions on 5 continents', earned: true },
  { name: 'Climate Expert', icon: '🌡️', description: 'Predict using climate data', earned: false },
  { name: 'Season Master', icon: '🍂', description: 'Predict all 4 seasons', earned: false },
  { name: 'Legend', icon: '🏆', description: 'Top 10 global ranking', earned: false },
];

export const PredictionGame: React.FC = () => {
  const { t, language, user } = useApp();
  const [activeTab, setActiveTab] = useState<'predict' | 'leaderboard' | 'badges'>('predict');
  const [selectedRegion, setSelectedRegion] = useState('bangladesh');
  const [selectedSpecies, setSelectedSpecies] = useState('');
  const [predictedDate, setPredictedDate] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmitPrediction = () => {
    if (selectedSpecies && predictedDate) {
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }
  };

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Trophy className="w-6 h-6 text-yellow-400" />;
    if (rank === 2) return <Medal className="w-6 h-6 text-gray-300" />;
    if (rank === 3) return <Medal className="w-6 h-6 text-orange-400" />;
    return <span className="text-white/60 font-bold">{rank}</span>;
  };

  return (
    <div className="w-full bg-gradient-to-br from-amber-950 via-orange-900 to-red-950 rounded-2xl p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-2">{t.game.title}</h2>
          <p className="text-orange-200">{t.game.description}</p>
        </div>

        <div className="flex justify-center gap-2 mb-8">
          <button
            onClick={() => setActiveTab('predict')}
            className={`px-6 py-3 rounded-lg transition-all ${
              activeTab === 'predict'
                ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white'
                : 'bg-white/10 text-white hover:bg-white/20'
            }`}
          >
            <Target className="w-5 h-5 inline mr-2" />
            {t.game.predict}
          </button>
          <button
            onClick={() => setActiveTab('leaderboard')}
            className={`px-6 py-3 rounded-lg transition-all ${
              activeTab === 'leaderboard'
                ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white'
                : 'bg-white/10 text-white hover:bg-white/20'
            }`}
          >
            <Trophy className="w-5 h-5 inline mr-2" />
            {t.game.leaderboard}
          </button>
          <button
            onClick={() => setActiveTab('badges')}
            className={`px-6 py-3 rounded-lg transition-all ${
              activeTab === 'badges'
                ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white'
                : 'bg-white/10 text-white hover:bg-white/20'
            }`}
          >
            <Award className="w-5 h-5 inline mr-2" />
            {language === 'bn' ? 'ব্যাজ' : 'Badges'}
          </button>
        </div>

        <AnimatePresence mode="wait">
          {activeTab === 'predict' && (
            <motion.div
              key="predict"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-6"
            >
              <div className="bg-white/10 rounded-xl p-6 border border-white/20">
                <h3 className="text-2xl font-bold text-white mb-6">
                  {language === 'bn' ? 'নতুন পূর্বাভাস তৈরি করুন' : 'Make a New Prediction'}
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-white mb-2">
                      {language === 'bn' ? 'অঞ্চল' : 'Region'}
                    </label>
                    <select
                      value={selectedRegion}
                      onChange={(e) => setSelectedRegion(e.target.value)}
                      className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white focus:outline-none focus:border-orange-500"
                    >
                      <option value="bangladesh">Bangladesh</option>
                      <option value="india">India</option>
                      <option value="california">California, USA</option>
                      <option value="brazil">Brazil</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-white mb-2">
                      {language === 'bn' ? 'ফুলের প্রজাতি' : 'Flower Species'}
                    </label>
                    <select
                      value={selectedSpecies}
                      onChange={(e) => setSelectedSpecies(e.target.value)}
                      className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white focus:outline-none focus:border-orange-500"
                    >
                      <option value="">{language === 'bn' ? 'নির্বাচন করুন' : 'Select species'}</option>
                      <option value="krishnachura">Krishnachura</option>
                      <option value="palash">Palash</option>
                      <option value="lotus">Lotus</option>
                      <option value="jasmine">Jasmine</option>
                      <option value="rose">Rose</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-white mb-2">
                      {language === 'bn' ? 'পূর্বাভাসিত ফুল ফোটার তারিখ' : 'Predicted Bloom Date'}
                    </label>
                    <input
                      type="date"
                      value={predictedDate}
                      onChange={(e) => setPredictedDate(e.target.value)}
                      className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white focus:outline-none focus:border-orange-500"
                    />
                  </div>
                  <button
                    onClick={handleSubmitPrediction}
                    disabled={!selectedSpecies || !predictedDate}
                    className="w-full px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg font-semibold hover:from-orange-600 hover:to-red-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {language === 'bn' ? 'পূর্বাভাস জমা দিন' : 'Submit Prediction'}
                  </button>
                </div>

                <AnimatePresence>
                  {showSuccess && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="mt-4 p-4 bg-green-500/20 border border-green-500/50 rounded-lg"
                    >
                      <p className="text-green-300 text-center font-semibold">
                        {language === 'bn' ? '✓ পূর্বাভাস সফলভাবে জমা হয়েছে!' : '✓ Prediction submitted successfully!'}
                      </p>
                      <p className="text-green-200 text-center text-sm mt-1">
                        {language === 'bn' ? '+50 পয়েন্ট অর্জিত' : '+50 points earned'}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="space-y-4">
                <div className="bg-gradient-to-br from-yellow-500/20 to-orange-500/20 rounded-xl p-6 border border-yellow-500/30">
                  <div className="flex items-center gap-3 mb-3">
                    <Star className="w-8 h-8 text-yellow-400" />
                    <div>
                      <h4 className="text-xl font-bold text-white">{t.game.yourScore}</h4>
                      <p className="text-yellow-200">
                        {user?.display_name || (language === 'bn' ? 'অতিথি' : 'Guest')}
                      </p>
                    </div>
                  </div>
                  <div className="text-4xl font-bold text-white mb-2">{user?.total_points || 0}</div>
                  <p className="text-yellow-200 text-sm">
                    {language === 'bn' ? 'বৈশ্বিক র‍্যাঙ্ক: #' : 'Global Rank: #'}
                    {user ? 127 : '-'}
                  </p>
                </div>

                <div className="bg-white/10 rounded-xl p-6 border border-white/20">
                  <h4 className="text-lg font-bold text-white mb-4">
                    {language === 'bn' ? 'কীভাবে খেলবেন' : 'How to Play'}
                  </h4>
                  <div className="space-y-3 text-white/80 text-sm">
                    <p>1. {language === 'bn' ? 'একটি অঞ্চল এবং ফুলের প্রজাতি নির্বাচন করুন' : 'Select a region and flower species'}</p>
                    <p>2. {language === 'bn' ? 'ফুল ফোটার তারিখ পূর্বাভাস দিন' : 'Predict when it will bloom'}</p>
                    <p>3. {language === 'bn' ? 'নির্ভুলতার জন্য পয়েন্ট অর্জন করুন' : 'Earn points for accuracy'}</p>
                    <p>4. {language === 'bn' ? 'লিডারবোর্ডে আরোহণ করুন' : 'Climb the leaderboard'}</p>
                  </div>
                </div>

                <div className="bg-white/10 rounded-xl p-6 border border-white/20">
                  <h4 className="text-lg font-bold text-white mb-3">
                    {language === 'bn' ? 'পয়েন্ট সিস্টেম' : 'Point System'}
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between text-white/80">
                      <span>{language === 'bn' ? 'নিখুঁত পূর্বাভাস' : 'Perfect prediction'}</span>
                      <span className="text-green-400 font-bold">+100</span>
                    </div>
                    <div className="flex justify-between text-white/80">
                      <span>{language === 'bn' ? '±3 দিন' : '±3 days'}</span>
                      <span className="text-yellow-400 font-bold">+75</span>
                    </div>
                    <div className="flex justify-between text-white/80">
                      <span>{language === 'bn' ? '±7 দিন' : '±7 days'}</span>
                      <span className="text-orange-400 font-bold">+50</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'leaderboard' && (
            <motion.div
              key="leaderboard"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white/10 rounded-xl p-6 border border-white/20"
            >
              <h3 className="text-2xl font-bold text-white mb-6 text-center">
                {language === 'bn' ? 'গ্লোবাল লিডারবোর্ড' : 'Global Leaderboard'}
              </h3>
              <div className="space-y-2">
                {mockLeaderboard.map((entry, index) => (
                  <motion.div
                    key={entry.rank}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className={`flex items-center gap-4 p-4 rounded-lg transition-all ${
                      entry.rank <= 3
                        ? 'bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/30'
                        : 'bg-white/5 hover:bg-white/10'
                    }`}
                  >
                    <div className="w-10 flex justify-center">{getRankIcon(entry.rank)}</div>
                    <div className="flex-1">
                      <p className="text-white font-semibold">{entry.name}</p>
                      <p className="text-white/60 text-sm">
                        {entry.predictions} {language === 'bn' ? 'পূর্বাভাস' : 'predictions'} • {entry.accuracy}% {language === 'bn' ? 'নির্ভুলতা' : 'accuracy'}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-white">{entry.score}</p>
                      <p className="text-white/60 text-xs">{language === 'bn' ? 'পয়েন্ট' : 'points'}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'badges' && (
            <motion.div
              key="badges"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
            >
              {badges.map((badge, index) => (
                <motion.div
                  key={badge.name}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className={`p-6 rounded-xl border transition-all ${
                    badge.earned
                      ? 'bg-gradient-to-br from-yellow-500/20 to-orange-500/20 border-yellow-500/30'
                      : 'bg-white/5 border-white/10 opacity-50'
                  }`}
                >
                  <div className="text-5xl mb-3 text-center">{badge.icon}</div>
                  <h4 className="text-lg font-bold text-white text-center mb-2">{badge.name}</h4>
                  <p className="text-white/70 text-sm text-center">{badge.description}</p>
                  {badge.earned && (
                    <div className="mt-3 text-center">
                      <span className="px-3 py-1 bg-green-500/20 text-green-300 rounded-full text-xs">
                        {language === 'bn' ? '✓ অর্জিত' : '✓ Earned'}
                      </span>
                    </div>
                  )}
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};