import React from 'react';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';
import { TrendingUp, Database, Satellite, Activity } from 'lucide-react';
import { useApp } from '../contexts/AppContext';

const bloomTrendsData = [
  { month: 'Jan', modis: 2.3, landsat: 2.1, viirs: 2.5, observations: 45 },
  { month: 'Feb', modis: 3.5, landsat: 3.2, viirs: 3.8, observations: 78 },
  { month: 'Mar', modis: 6.2, landsat: 5.9, viirs: 6.5, observations: 156 },
  { month: 'Apr', modis: 8.9, landsat: 8.5, viirs: 9.2, observations: 234 },
  { month: 'May', modis: 8.2, landsat: 7.8, viirs: 8.6, observations: 198 },
  { month: 'Jun', modis: 6.8, landsat: 6.5, viirs: 7.1, observations: 167 },
  { month: 'Jul', modis: 6.2, landsat: 5.9, viirs: 6.5, observations: 145 },
  { month: 'Aug', modis: 5.8, landsat: 5.5, viirs: 6.1, observations: 134 },
  { month: 'Sep', modis: 5.2, landsat: 4.9, viirs: 5.5, observations: 123 },
  { month: 'Oct', modis: 4.8, landsat: 4.5, viirs: 5.1, observations: 112 },
  { month: 'Nov', modis: 3.8, landsat: 3.5, viirs: 4.1, observations: 89 },
  { month: 'Dec', modis: 2.8, landsat: 2.5, viirs: 3.1, observations: 67 },
];

const regionData = [
  { name: 'Bangladesh', blooms: 1245, accuracy: 92 },
  { name: 'India', blooms: 3456, accuracy: 88 },
  { name: 'California', blooms: 2134, accuracy: 95 },
  { name: 'Brazil', blooms: 1876, accuracy: 87 },
  { name: 'Australia', blooms: 1567, accuracy: 90 },
  { name: 'Europe', blooms: 2345, accuracy: 91 },
];

const climateCorrelation = [
  { factor: 'Temperature', correlation: 0.85 },
  { factor: 'Precipitation', correlation: 0.78 },
  { factor: 'Humidity', correlation: 0.72 },
  { factor: 'Soil Moisture', correlation: 0.81 },
  { factor: 'NDVI', correlation: 0.93 },
  { factor: 'Solar Radiation', correlation: 0.68 },
];

export const DataDashboard: React.FC = () => {
  const { t, language } = useApp();

  return (
    <div className="w-full bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950 rounded-2xl p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h2 className="text-4xl font-bold text-white mb-2">{t.data.title}</h2>
          <p className="text-blue-200">
            {language === 'bn' ? 'রিয়েল-টাইম স্যাটেলাইট ডেটা বিশ্লেষণ' : 'Real-time Satellite Data Analysis'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-xl p-6 border border-blue-500/30"
          >
            <div className="flex items-center justify-between mb-2">
              <Database className="w-8 h-8 text-blue-400" />
              <span className="text-2xl font-bold text-white">12.5K</span>
            </div>
            <p className="text-blue-200 text-sm">
              {language === 'bn' ? 'পর্যবেক্ষণ' : 'Observations'}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-xl p-6 border border-green-500/30"
          >
            <div className="flex items-center justify-between mb-2">
              <Satellite className="w-8 h-8 text-green-400" />
              <span className="text-2xl font-bold text-white">847</span>
            </div>
            <p className="text-green-200 text-sm">
              {language === 'bn' ? 'স্যাটেলাইট ইমেজ' : 'Satellite Images'}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-xl p-6 border border-purple-500/30"
          >
            <div className="flex items-center justify-between mb-2">
              <TrendingUp className="w-8 h-8 text-purple-400" />
              <span className="text-2xl font-bold text-white">91%</span>
            </div>
            <p className="text-purple-200 text-sm">
              {language === 'bn' ? 'পূর্বাভাসের নির্ভুলতা' : 'Prediction Accuracy'}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-xl p-6 border border-orange-500/30"
          >
            <div className="flex items-center justify-between mb-2">
              <Activity className="w-8 h-8 text-orange-400" />
              <span className="text-2xl font-bold text-white">156</span>
            </div>
            <p className="text-orange-200 text-sm">
              {language === 'bn' ? 'সক্রিয় প্রজাতি' : 'Active Species'}
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white/5 rounded-xl p-6 border border-white/10"
          >
            <h3 className="text-xl font-bold text-white mb-4">
              {language === 'bn' ? 'মাসিক ফুল ফোটার প্রবণতা' : 'Monthly Bloom Trends'}
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={bloomTrendsData}>
                <defs>
                  <linearGradient id="colorModis" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorLandsat" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorViirs" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" />
                <XAxis dataKey="month" stroke="#fff" />
                <YAxis stroke="#fff" />
                <Tooltip
                  contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155' }}
                  labelStyle={{ color: '#fff' }}
                />
                <Legend />
                <Area type="monotone" dataKey="modis" stroke="#3b82f6" fillOpacity={1} fill="url(#colorModis)" name="MODIS" />
                <Area type="monotone" dataKey="landsat" stroke="#10b981" fillOpacity={1} fill="url(#colorLandsat)" name="Landsat" />
                <Area type="monotone" dataKey="viirs" stroke="#8b5cf6" fillOpacity={1} fill="url(#colorViirs)" name="VIIRS" />
              </AreaChart>
            </ResponsiveContainer>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white/5 rounded-xl p-6 border border-white/10"
          >
            <h3 className="text-xl font-bold text-white mb-4">
              {language === 'bn' ? 'অঞ্চল অনুযায়ী ব্লুম ডেটা' : 'Regional Bloom Data'}
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={regionData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" />
                <XAxis dataKey="name" stroke="#fff" angle={-45} textAnchor="end" height={80} />
                <YAxis stroke="#fff" />
                <Tooltip
                  contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155' }}
                  labelStyle={{ color: '#fff' }}
                />
                <Legend />
                <Bar dataKey="blooms" fill="#3b82f6" name={language === 'bn' ? 'ফুল' : 'Blooms'} />
                <Bar dataKey="accuracy" fill="#10b981" name={language === 'bn' ? 'নির্ভুলতা %' : 'Accuracy %'} />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/5 rounded-xl p-6 border border-white/10"
          >
            <h3 className="text-xl font-bold text-white mb-4">
              {language === 'bn' ? 'জলবায়ু-ব্লুম সম্পর্ক' : 'Climate-Bloom Correlation'}
            </h3>
            <div className="space-y-3">
              {climateCorrelation.map((item) => (
                <div key={item.factor}>
                  <div className="flex justify-between mb-1">
                    <span className="text-white/80">{item.factor}</span>
                    <span className="text-white font-semibold">{item.correlation.toFixed(2)}</span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-2">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${item.correlation * 100}%` }}
                      transition={{ duration: 1, delay: 0.5 }}
                      className="h-2 rounded-full bg-gradient-to-r from-blue-500 to-green-500"
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/5 rounded-xl p-6 border border-white/10"
          >
            <h3 className="text-xl font-bold text-white mb-4">
              {language === 'bn' ? 'নাসা ডেটাসেট সংযোগ' : 'NASA Dataset Sources'}
            </h3>
            <div className="space-y-3">
              {[
                { name: t.data.modis, status: 'Active', count: '234 images' },
                { name: t.data.landsat, status: 'Active', count: '189 images' },
                { name: t.data.viirs, status: 'Active', count: '156 images' },
                { name: t.data.sentinel, status: 'Active', count: '268 images' },
                { name: 'AVIRIS', status: 'Active', count: '45 images' },
                { name: 'EMIT', status: 'Active', count: '78 images' },
              ].map((dataset) => (
                <div
                  key={dataset.name}
                  className="flex items-center justify-between p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                    <div>
                      <p className="text-white font-medium">{dataset.name}</p>
                      <p className="text-white/60 text-xs">{dataset.count}</p>
                    </div>
                  </div>
                  <span className="px-3 py-1 bg-green-500/20 text-green-300 rounded-full text-xs">
                    {dataset.status}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};