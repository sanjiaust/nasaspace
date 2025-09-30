import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, Menu, X, User, LogOut, Languages } from 'lucide-react';
import { useApp } from '../contexts/AppContext';

interface NavigationProps {
  onNavigate: (section: string) => void;
}

export const Navigation: React.FC<NavigationProps> = ({ onNavigate }) => {
  const { t, language, setLanguage, user, signOut } = useApp();
  const [isOpen, setIsOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const menuItems = [
    { id: 'globe', label: t.nav.globe },
    { id: 'bangladesh', label: t.nav.bangladesh },
    { id: 'timeline', label: t.nav.timeline },
    { id: 'game', label: t.nav.game },
    { id: 'data', label: t.nav.data },
    { id: 'contribute', label: t.nav.contribute },
  ];

  const handleLanguageToggle = () => {
    setLanguage(language === 'en' ? 'bn' : 'en');
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 left-0 right-0 z-50 bg-slate-950/80 backdrop-blur-xl border-b border-white/10"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => onNavigate('hero')}>
              <div className="p-2 bg-gradient-to-r from-pink-500 to-teal-500 rounded-lg">
                <Globe className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-pink-400 to-teal-400 bg-clip-text text-transparent">
                {t.appName}
              </span>
            </div>

            <div className="hidden md:flex items-center gap-6">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className="text-white/80 hover:text-white transition-colors"
                >
                  {item.label}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={handleLanguageToggle}
                className="p-2 text-white/80 hover:text-white transition-colors"
                title={language === 'en' ? 'Switch to Bangla' : 'Switch to English'}
              >
                <Languages className="w-5 h-5" />
              </button>

              {user ? (
                <div className="relative">
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
                  >
                    <User className="w-5 h-5 text-white" />
                    <span className="text-white hidden sm:inline">{user.display_name}</span>
                  </button>

                  <AnimatePresence>
                    {showUserMenu && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute right-0 mt-2 w-48 bg-slate-900 rounded-lg border border-white/10 shadow-xl"
                      >
                        <div className="p-4 border-b border-white/10">
                          <p className="text-white font-semibold">{user.display_name}</p>
                          <p className="text-white/60 text-sm">{user.total_points} {language === 'bn' ? 'পয়েন্ট' : 'points'}</p>
                        </div>
                        <button
                          onClick={() => {
                            signOut();
                            setShowUserMenu(false);
                          }}
                          className="w-full flex items-center gap-2 px-4 py-3 text-white/80 hover:bg-white/10 transition-colors"
                        >
                          <LogOut className="w-4 h-4" />
                          {language === 'bn' ? 'লগআউট' : 'Sign Out'}
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <button className="px-4 py-2 bg-gradient-to-r from-pink-500 to-teal-500 text-white rounded-lg font-semibold hover:shadow-lg transition-all">
                  {language === 'bn' ? 'সাইন ইন' : 'Sign In'}
                </button>
              )}

              <button
                onClick={() => setIsOpen(!isOpen)}
                className="md:hidden p-2 text-white"
              >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-slate-900 border-t border-white/10"
            >
              <div className="px-4 py-4 space-y-2">
                {menuItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      onNavigate(item.id);
                      setIsOpen(false);
                    }}
                    className="block w-full text-left px-4 py-3 text-white/80 hover:bg-white/10 rounded-lg transition-colors"
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      <div className="h-20" />
    </>
  );
};