import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, MapPin, Calendar, Camera, Send } from 'lucide-react';
import { useApp } from '../contexts/AppContext';

export const CitizenSciencePortal: React.FC = () => {
  const { t, language, user } = useApp();
  const [formData, setFormData] = useState({
    species: '',
    location: '',
    date: '',
    intensity: 5,
    notes: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ species: '', location: '', date: '', intensity: 5, notes: '' });
    }, 3000);
  };

  return (
    <div className="w-full bg-gradient-to-br from-teal-950 via-green-900 to-emerald-950 rounded-2xl p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-2">{t.contribute.title}</h2>
          <p className="text-teal-200">
            {language === 'bn'
              ? 'আপনার পর্যবেক্ষণ শেয়ার করে বিশ্বব্যাপী ব্লুম গবেষণায় অবদান রাখুন'
              : 'Contribute to global bloom research by sharing your observations'}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white/10 rounded-xl p-6 border border-white/20">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="flex items-center gap-2 text-white mb-2">
                    <Camera className="w-4 h-4" />
                    {t.contribute.species}
                  </label>
                  <input
                    type="text"
                    value={formData.species}
                    onChange={(e) => setFormData({ ...formData, species: e.target.value })}
                    placeholder={language === 'bn' ? 'যেমন: কৃষ্ণচূড়া' : 'e.g., Krishnachura'}
                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder:text-white/40 focus:outline-none focus:border-teal-500"
                    required
                  />
                </div>

                <div>
                  <label className="flex items-center gap-2 text-white mb-2">
                    <MapPin className="w-4 h-4" />
                    {t.contribute.location}
                  </label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder={language === 'bn' ? 'যেমন: ঢাকা, বাংলাদেশ' : 'e.g., Dhaka, Bangladesh'}
                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder:text-white/40 focus:outline-none focus:border-teal-500"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="flex items-center gap-2 text-white mb-2">
                    <Calendar className="w-4 h-4" />
                    {t.contribute.date}
                  </label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white focus:outline-none focus:border-teal-500"
                    required
                  />
                </div>

                <div>
                  <label className="flex items-center gap-2 text-white mb-2">
                    {t.contribute.intensity} (1-10)
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={formData.intensity}
                    onChange={(e) => setFormData({ ...formData, intensity: parseInt(e.target.value) })}
                    className="w-full"
                  />
                  <div className="flex justify-between text-white/60 text-sm">
                    <span>1</span>
                    <span className="text-teal-300 font-bold">{formData.intensity}</span>
                    <span>10</span>
                  </div>
                </div>
              </div>

              <div>
                <label className="flex items-center gap-2 text-white mb-2">
                  {language === 'bn' ? 'অতিরিক্ত নোট' : 'Additional Notes'}
                </label>
                <textarea
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder={language === 'bn' ? 'আপনার পর্যবেক্ষণ বর্ণনা করুন...' : 'Describe your observation...'}
                  rows={4}
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder:text-white/40 focus:outline-none focus:border-teal-500 resize-none"
                />
              </div>

              <div>
                <label className="flex items-center gap-2 text-white mb-2">
                  <Upload className="w-4 h-4" />
                  {t.contribute.photo}
                </label>
                <div className="border-2 border-dashed border-white/20 rounded-lg p-8 text-center hover:border-teal-500 transition-colors cursor-pointer">
                  <Upload className="w-12 h-12 text-white/40 mx-auto mb-3" />
                  <p className="text-white/60">
                    {language === 'bn' ? 'ছবি আপলোড করতে ক্লিক করুন' : 'Click to upload photo'}
                  </p>
                  <p className="text-white/40 text-sm mt-1">
                    {language === 'bn' ? 'PNG, JPG সর্বোচ্চ 10MB' : 'PNG, JPG up to 10MB'}
                  </p>
                </div>
              </div>

              <button
                type="submit"
                disabled={submitted}
                className="w-full px-6 py-4 bg-gradient-to-r from-teal-500 to-emerald-500 text-white rounded-lg font-semibold hover:from-teal-600 hover:to-emerald-600 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <Send className="w-5 h-5" />
                {submitted
                  ? language === 'bn'
                    ? 'জমা হয়েছে!'
                    : 'Submitted!'
                  : t.contribute.submit}
              </button>
            </form>

            {submitted && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 p-4 bg-green-500/20 border border-green-500/50 rounded-lg text-center"
              >
                <p className="text-green-300 font-semibold">
                  {language === 'bn'
                    ? '✓ আপনার অবদানের জন্য ধন্যবাদ!'
                    : '✓ Thank you for your contribution!'}
                </p>
                <p className="text-green-200 text-sm mt-1">
                  {language === 'bn' ? '+25 পয়েন্ট অর্জিত' : '+25 points earned'}
                </p>
              </motion.div>
            )}
          </div>

          <div className="space-y-4">
            <div className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-xl p-6 border border-blue-500/30">
              <h3 className="text-xl font-bold text-white mb-4">
                {language === 'bn' ? 'GLOBE Observer সংযোগ' : 'GLOBE Observer Integration'}
              </h3>
              <p className="text-white/80 text-sm mb-4">
                {language === 'bn'
                  ? 'NASA GLOBE Observer অ্যাপের সাথে সংযুক্ত হয়ে আপনার পর্যবেক্ষণ স্বয়ংক্রিয়ভাবে সিঙ্ক করুন।'
                  : 'Connect with NASA GLOBE Observer app to automatically sync your observations.'}
              </p>
              <button className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                {language === 'bn' ? 'সংযুক্ত করুন' : 'Connect'}
              </button>
            </div>

            <div className="bg-white/10 rounded-xl p-6 border border-white/20">
              <h3 className="text-xl font-bold text-white mb-4">
                {language === 'bn' ? 'সম্প্রদায়ের প্রভাব' : 'Community Impact'}
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-white/70">{language === 'bn' ? 'মোট পর্যবেক্ষণ' : 'Total Observations'}</span>
                  <span className="text-white font-bold">12,547</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/70">{language === 'bn' ? 'সক্রিয় অবদানকারী' : 'Active Contributors'}</span>
                  <span className="text-white font-bold">3,892</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/70">{language === 'bn' ? 'দেশ কভার' : 'Countries Covered'}</span>
                  <span className="text-white font-bold">87</span>
                </div>
              </div>
            </div>

            <div className="bg-white/10 rounded-xl p-6 border border-white/20">
              <h3 className="text-xl font-bold text-white mb-3">
                {language === 'bn' ? 'কেন অবদান রাখবেন?' : 'Why Contribute?'}
              </h3>
              <ul className="space-y-2 text-white/80 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-teal-400">•</span>
                  <span>{language === 'bn' ? 'বৈশ্বিক জলবায়ু গবেষণায় সাহায্য করুন' : 'Help global climate research'}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-teal-400">•</span>
                  <span>{language === 'bn' ? 'পয়েন্ট এবং ব্যাজ অর্জন করুন' : 'Earn points and badges'}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-teal-400">•</span>
                  <span>{language === 'bn' ? 'স্থানীয় জীববৈচিত্র্য ট্র্যাক করুন' : 'Track local biodiversity'}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};