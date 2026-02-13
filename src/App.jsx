import React, { useState, useEffect } from 'react';
import { Search, Layers, Globe, ArrowRight, Activity, Info, CheckCircle2, AlertCircle, TrendingUp, Target, Shield, Clock, Zap, RefreshCw, Users, Award, Percent, Lightbulb, Menu, X, Crown, Sparkles } from 'lucide-react';

const scrollToSection = (id) => {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' });
    window.scrollBy(0, -80);
  }
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [quickAccessOpen, setQuickAccessOpen] = useState(false);
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('theme');
      if (stored) return stored === 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  const toggleDarkMode = () => {
    const newMode = !isDark;
    setIsDark(newMode);
    console.log('Toggle dark mode:', newMode);

    // Force synchronous update of the class
    if (newMode) {
      document.documentElement.classList.add('dark');
      console.log('Added dark class, classes:', document.documentElement.className);
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      console.log('Removed dark class, classes:', document.documentElement.className);
      localStorage.setItem('theme', 'light');
    }
  };

  useEffect(() => {
    console.log('useEffect running, isDark:', isDark);
    if (isDark) {
      document.documentElement.classList.add('dark');
      console.log('useEffect added dark class');
    } else {
      document.documentElement.classList.remove('dark');
      console.log('useEffect removed dark class');
    }
    console.log('HTML element classes:', document.documentElement.className);
  }, [isDark]); // Add isDark as dependency

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 py-3 sm:py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="bg-cream/98 dark:bg-charcoal/98 backdrop-blur-md rounded-2xl md:rounded-full shadow-burgundy border border-burgundy-200/20 dark:border-gold-500/20 transition-colors duration-300">
          <div className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-3.5">
            <a href="/" className="flex items-center gap-2 sm:gap-3 group cursor-pointer">
              <div className="bg-burgundy-800 dark:bg-gold-600 p-2 sm:p-2.5 rounded-xl group-hover:scale-105 transition-all duration-300">
                <Crown className="text-gold-400 dark:text-burgundy-900 w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <span className="text-lg sm:text-xl font-display font-bold tracking-tight text-burgundy-900 dark:text-gold-400">
                CheckAdSense
              </span>
            </a>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-burgundy-100 dark:hover:bg-burgundy-900 transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-5 h-5 text-burgundy-900 dark:text-gold-400" /> : <Menu className="w-5 h-5 text-burgundy-900 dark:text-gold-400" />}
            </button>

            <div className="hidden md:flex items-center gap-1">
              <div className="relative">
                <button
                  onClick={() => setQuickAccessOpen(!quickAccessOpen)}
                  className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-burgundy-700 dark:text-gold-300 hover:text-burgundy-900 dark:hover:text-gold-100 hover:bg-burgundy-50 dark:hover:bg-burgundy-900 rounded-lg transition-colors"
                >
                  Quick Access
                  <svg className={`w-4 h-4 transition-transform ${quickAccessOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {quickAccessOpen && (
                  <div className="absolute top-full left-0 mt-2 w-48 bg-cream dark:bg-charcoal rounded-xl shadow-burgundy-lg border border-burgundy-200/20 dark:border-gold-500/20 py-2 animate-in fade-in slide-in-from-top-2 duration-200">
                    <button onClick={() => { scrollToSection('analyzer-section'); setQuickAccessOpen(false); }} className="w-full text-left px-4 py-2 text-sm text-burgundy-700 dark:text-gold-300 hover:bg-burgundy-50 dark:hover:bg-burgundy-900 hover:text-burgundy-900 dark:hover:text-gold-100 transition-colors">
                      Analyzer
                    </button>
                    <button onClick={() => { scrollToSection('about-section'); setQuickAccessOpen(false); }} className="w-full text-left px-4 py-2 text-sm text-burgundy-700 dark:text-gold-300 hover:bg-burgundy-50 dark:hover:bg-burgundy-900 hover:text-burgundy-900 dark:hover:text-gold-100 transition-colors">
                      About
                    </button>
                    <button onClick={() => { scrollToSection('features-section'); setQuickAccessOpen(false); }} className="w-full text-left px-4 py-2 text-sm text-burgundy-700 dark:text-gold-300 hover:bg-burgundy-50 dark:hover:bg-burgundy-900 hover:text-burgundy-900 dark:hover:text-gold-100 transition-colors">
                      Features
                    </button>
                  </div>
                )}
              </div>

              <div className="relative">
                <button className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-burgundy-700 dark:text-gold-300 hover:text-burgundy-900 dark:hover:text-gold-100 hover:bg-burgundy-50 dark:hover:bg-burgundy-900 rounded-lg transition-colors">
                  Legal
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>

              <button
                onClick={toggleDarkMode}
                className="relative p-2 text-burgundy-700 dark:text-gold-400 hover:bg-burgundy-50 dark:hover:bg-burgundy-900 rounded-lg transition-colors ml-2 group"
                aria-label="Toggle dark mode"
              >
                <div className="relative w-5 h-5">
                  <svg
                    className={`absolute inset-0 w-5 h-5 transition-all duration-300 ${isDark ? 'opacity-0 rotate-90 scale-0' : 'opacity-100 rotate-0 scale-100'}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                  <svg
                    className={`absolute inset-0 w-5 h-5 transition-all duration-300 ${isDark ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-0'}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                </div>
              </button>
            </div>
          </div>

          {isOpen && (
            <div className="md:hidden border-t border-burgundy-200/30 dark:border-gold-500/30 mt-2 animate-in slide-in-from-top-2 duration-200">
              <div className="flex flex-col gap-0.5 py-2 px-2">
                <button
                  onClick={() => { scrollToSection('analyzer-section'); setIsOpen(false); }}
                  className="text-left px-4 py-3 text-base font-medium text-burgundy-700 dark:text-gold-300 hover:bg-burgundy-50 dark:hover:bg-burgundy-900 hover:text-burgundy-900 dark:hover:text-gold-100 rounded-xl transition-colors"
                >
                  Analyzer
                </button>
                <button
                  onClick={() => { scrollToSection('about-section'); setIsOpen(false); }}
                  className="text-left px-4 py-3 text-base font-medium text-burgundy-700 dark:text-gold-300 hover:bg-burgundy-50 dark:hover:bg-burgundy-900 hover:text-burgundy-900 dark:hover:text-gold-100 rounded-xl transition-colors"
                >
                  About
                </button>
                <button
                  onClick={() => { scrollToSection('features-section'); setIsOpen(false); }}
                  className="text-left px-4 py-3 text-base font-medium text-burgundy-700 dark:text-gold-300 hover:bg-burgundy-50 dark:hover:bg-burgundy-900 hover:text-burgundy-900 dark:hover:text-gold-100 rounded-xl transition-colors"
                >
                  Features
                </button>
                <div className="border-t border-burgundy-200/30 dark:border-gold-500/30 my-1.5 mx-2"></div>
                <button
                  className="text-left px-4 py-3 text-base font-medium text-burgundy-700 dark:text-gold-300 hover:bg-burgundy-50 dark:hover:bg-burgundy-900 hover:text-burgundy-900 dark:hover:text-gold-100 rounded-xl transition-colors"
                >
                  Legal
                </button>
                <button
                  onClick={toggleDarkMode}
                  className="text-left px-4 py-3 text-base font-medium text-burgundy-700 dark:text-gold-300 hover:bg-burgundy-50 dark:hover:bg-burgundy-900 hover:text-burgundy-900 dark:hover:text-gold-100 rounded-xl transition-colors flex items-center gap-2.5"
                >
                  <span className="text-lg">{isDark ? '☀️' : '🌙'}</span>
                  <span>{isDark ? 'Light Mode' : 'Dark Mode'}</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

const AboutSection = () => (
  <section id="about-section" className="max-w-6xl mx-auto mb-16 px-4">
    <div className="text-center mb-8 sm:mb-12">
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold text-burgundy-900 dark:text-gold-400 mb-3 sm:mb-4">About CheckAdSense</h2>
      <p className="text-sm sm:text-base lg:text-lg text-burgundy-700 dark:text-gold-200 max-w-xl mx-auto">Learn how we help you check your website's AdSense approval chances</p>
    </div>

    <div className="grid sm:grid-cols-2 gap-6 sm:gap-8 mb-10 sm:mb-12">
      <div className="bg-cream dark:bg-charcoal rounded-xl sm:rounded-3xl shadow-burgundy border-2 border-gold-500/20 p-5 sm:p-8 premium-card">
        <div className="flex items-center gap-3 mb-4 sm:mb-6">
          <div className="bg-gold-gradient p-2 sm:p-3 rounded-lg sm:rounded-xl shadow-gold">
            <Percent className="w-5 h-5 sm:w-6 sm:h-6 text-burgundy-900" />
          </div>
          <h3 className="text-xl sm:text-2xl font-display font-bold text-burgundy-900 dark:text-gold-400">Check Approval Chance</h3>
        </div>
        <p className="text-sm sm:text-base text-burgundy-700 dark:text-gold-200 mb-4">
          At CheckAdSense, we help you understand your website's chances of getting approved for Google AdSense. Our analysis shows you:
        </p>
        <ul className="space-y-2 text-sm sm:text-base text-burgundy-700 dark:text-gold-200">
          <li className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600 mt-0.5 flex-shrink-0" />
            <span>Your current approval percentage score</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600 mt-0.5 flex-shrink-0" />
            <span>What Google looks for in your website</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600 mt-0.5 flex-shrink-0" />
            <span>Issues that might get you rejected</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600 mt-0.5 flex-shrink-0" />
            <span>Steps to improve your approval chances</span>
          </li>
        </ul>
      </div>

      <div className="bg-cream dark:bg-charcoal rounded-xl sm:rounded-3xl shadow-burgundy border-2 border-gold-500/20 p-5 sm:p-8 premium-card">
        <div className="flex items-center gap-3 mb-4 sm:mb-6">
          <div className="bg-gold-gradient p-2 sm:p-3 rounded-lg sm:rounded-xl shadow-gold">
            <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-burgundy-900" />
          </div>
          <h3 className="text-xl sm:text-2xl font-display font-bold text-burgundy-900 dark:text-gold-400">Why Use CheckAdSense</h3>
        </div>
        <p className="text-sm sm:text-base text-burgundy-700 dark:text-gold-200 mb-4">
          Get approved faster by knowing exactly what Google wants before you apply:
        </p>
        <ul className="space-y-2 text-sm sm:text-base text-burgundy-700 dark:text-gold-200">
          <li className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600 mt-0.5 flex-shrink-0" />
            <span><strong className="text-burgundy-900 dark:text-gold-400">10-Point Check:</strong> 300+ eligibility criteria</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600 mt-0.5 flex-shrink-0" />
            <span><strong className="text-burgundy-900 dark:text-gold-400">AI Analysis:</strong> Gemini & ChatGPT insights</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600 mt-0.5 flex-shrink-0" />
            <span><strong className="text-burgundy-900 dark:text-gold-400">4-Week Plan:</strong> Step-by-step guide</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600 mt-0.5 flex-shrink-0" />
            <span><strong className="text-burgundy-900 dark:text-gold-400">100% Free:</strong> No payment required</span>
          </li>
        </ul>
      </div>
    </div>


    <div className="bg-burgundy-gradient rounded-xl sm:rounded-3xl p-6 sm:p-8 text-ivory text-center shadow-burgundy-lg border-2 border-gold-500/30">
      <div className="flex items-center justify-center gap-2 sm:gap-3 mb-3 sm:mb-4">
        <Crown className="w-6 h-6 sm:w-8 sm:h-8 text-gold-400" />
        <h3 className="text-lg sm:text-xl lg:text-2xl font-display font-bold">Check Your Approval Chances</h3>
      </div>
      <p className="text-sm sm:text-base text-gold-100 mb-4 sm:mb-6 max-w-xl mx-auto">
        Find out if your website is ready for AdSense before you apply. Get your approval score and improvement tips today!
      </p>
      <button
        onClick={() => scrollToSection('analyzer-section')}
        className="bg-gold-gradient text-burgundy-900 px-6 sm:px-8 py-2.5 sm:py-3 rounded-full font-bold hover:shadow-gold-lg transition-all text-sm sm:text-base"
      >
        Check My Score
      </button>
    </div>
  </section>
);

const FeatureBadge = ({ icon: Icon, text, color }) => (
  <div className={`flex items-center gap-2 px-4 py-2 rounded-full border-2 border-gold-500/30 bg-cream/80 backdrop-blur-sm shadow-sm`}>
    <Icon className={`w-4 h-4 ${color}`} />
    <span className="text-xs font-bold text-burgundy-900 uppercase tracking-wider">{text}</span>
  </div>
);

const ScoreCard = ({ score }) => {
  const getScoreColor = (score) => {
    if (score >= 80) return { bg: 'bg-emerald-100 text-emerald-700', label: 'High Chance!', ring: 'ring-emerald-400', border: 'border-emerald-400' };
    if (score >= 60) return { bg: 'bg-amber-100 text-amber-700', label: 'Good Chance', ring: 'ring-amber-400', border: 'border-amber-400' };
    if (score >= 40) return { bg: 'bg-orange-100 text-orange-700', label: 'Needs Work', ring: 'ring-orange-400', border: 'border-orange-400' };
    return { bg: 'bg-red-100 text-red-700', label: 'Low Chance', ring: 'ring-red-400', border: 'border-red-400' };
  };
  const colors = getScoreColor(score);
  return (
    <div className="bg-cream dark:bg-charcoal rounded-2xl sm:rounded-3xl shadow-burgundy-lg border-2 border-gold-500/30 p-6 sm:p-8 text-center relative overflow-hidden">
      <div className={`absolute inset-0 rounded-2xl sm:rounded-3xl opacity-10 ${colors.ring} ring-4`}></div>
      <div className="relative">
        <div className={`inline-flex items-center justify-center w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:w-48 rounded-full ${colors.bg} border-4 sm:border-6 ${colors.border} mb-3 sm:mb-4 shadow-lg`}>
          <div className="text-center">
            <span className="text-4xl sm:text-5xl lg:text-7xl font-display font-black text-charcoal">{score}%</span>
          </div>
        </div>
        <p className={`text-lg sm:text-2xl font-bold ${colors.bg.replace('100', '600')} px-4 sm:px-6 py-1.5 sm:py-2 rounded-full inline-block`}>{colors.label}</p>
      </div>
    </div>
  );
};

const CategoryCard = ({ title, score, maxScore, icon: Icon, color }) => {
  const percentage = Math.round((score / maxScore) * 100);
  return (
    <div className="bg-cream dark:bg-charcoal rounded-xl sm:rounded-2xl shadow-burgundy border-2 border-gold-500/20 p-3 sm:p-5 premium-card">
      <div className="flex items-center justify-between mb-2 sm:mb-4">
        <div className={`p-2 sm:p-3 rounded-lg sm:rounded-xl ${color} bg-opacity-20 border border-gold-500/20`}>
          <Icon className={`w-4 h-4 sm:w-5 sm:h-5 ${color.replace('bg-', 'text-')}`} />
        </div>
        <span className="text-xs sm:text-sm font-bold text-burgundy-600 dark:text-gold-400">{score}/{maxScore}</span>
      </div>
      <h4 className="font-bold text-burgundy-900 dark:text-gold-400 mb-1 sm:mb-3 text-xs sm:text-base">{title}</h4>
      <div className="w-full bg-burgundy-100 dark:bg-burgundy-900 rounded-full h-1.5 sm:h-2">
        <div className={`h-1.5 sm:h-2 rounded-full ${color.replace('bg-', 'bg-')}`} style={{ width: `${percentage}%` }} />
      </div>
      <p className="text-xs text-burgundy-600 dark:text-gold-300 mt-1 sm:mt-2 hidden sm:block">{percentage}%</p>
    </div>
  );
};

const RecommendationCard = ({ priority, action, impact }) => {
  const priorityColors = {
    HIGH: { bg: 'bg-red-50 border-red-300', badge: 'bg-red-100 text-red-700', icon: '🔴' },
    MEDIUM: { bg: 'bg-amber-50 border-amber-300', badge: 'bg-amber-100 text-amber-700', icon: '🟡' },
    INFO: { bg: 'bg-emerald-50 border-emerald-300', badge: 'bg-emerald-100 text-emerald-700', icon: '🟢' }
  };
  const colors = priorityColors[priority] || priorityColors.INFO;
  return (
    <div className={`rounded-xl sm:rounded-2xl border-2 p-3 sm:p-5 ${colors.bg} ${colors.badge.replace('100', '500').replace('text-', 'border-')}`}>
      <div className="flex items-center justify-between mb-2 sm:mb-3">
        <div className="flex items-center gap-1 sm:gap-2">
          <span className="text-base sm:text-xl">{colors.icon}</span>
          <span className={`text-xs font-bold px-2 sm:px-3 py-1 rounded-full ${colors.badge}`}>{priority}</span>
        </div>
        <span className={`text-xs font-bold px-2 sm:px-3 py-1 rounded-full ${colors.badge}`}>{impact}</span>
      </div>
      <p className="font-medium text-charcoal text-xs sm:text-base">{action}</p>
    </div>
  );
};

const ProgressBar = ({ week, tasks, isActive }) => (
  <div className={`rounded-xl sm:rounded-2xl p-3 sm:p-4 ${isActive ? 'bg-gold-50 border-2 border-gold-400' : 'bg-cream dark:bg-charcoal border-2 border-burgundy-100 dark:border-gold-500/20'}`}>
    <div className="flex items-center gap-1.5 sm:gap-2 mb-2 sm:mb-3">
      <Clock className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${isActive ? 'text-gold-600' : 'text-burgundy-400 dark:text-gold-400'}`} />
      <span className={`font-bold text-xs sm:text-sm ${isActive ? 'text-gold-700' : 'text-burgundy-600 dark:text-gold-300'}`}>{week}</span>
    </div>
    <ul className="space-y-1 sm:space-y-2">
      {tasks.map((task, i) => (
        <li key={i} className="text-xs sm:text-sm text-burgundy-700 dark:text-gold-200 flex items-start gap-1.5 sm:gap-2">
          <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
          {task}
        </li>
      ))}
    </ul>
  </div>
);

const App = () => {
  const [url, setUrl] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);

  const normalizeUrl = (input) => {
    let normalized = input.trim().toLowerCase();
    if (!normalized.startsWith('http://') && !normalized.startsWith('https://')) {
      if (normalized.startsWith('www.')) {
        normalized = 'https://' + normalized;
      } else {
        normalized = 'https://www.' + normalized;
      }
    }
    return normalized;
  };

  const handleAnalyze = async () => {
    if (!url.trim()) { setError('Please enter a website URL'); return; }
    let normalizedUrl = normalizeUrl(url);
    const simpleDomain = url.trim().toLowerCase().replace(/^https?:\/\//, '').replace(/^www\./, '');
    if (simpleDomain.length < 3 || !simpleDomain.includes('.')) {
      setError('Please enter a valid website URL (e.g., example.com)');
      return;
    }
    try { new URL(normalizedUrl); } catch (e) { setError('Invalid URL format'); return; }
    setIsAnalyzing(true);
    setResults(null);
    setError(null);
    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: normalizedUrl })
      });
      const data = await response.json();
      if (data.success) {
        setResults(data.data);
        localStorage.setItem('adsense_analysis_results', JSON.stringify(data.data));
        localStorage.setItem('adsense_analysis_url', url);
        setTimeout(() => { const el = document.getElementById('results-section'); if (el) el.scrollIntoView({ behavior: 'smooth' }); }, 100);
      } else {
        throw new Error(data.error || 'Analysis failed');
      }
    } catch (error) {
      setError(error.message || 'Network error');
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen bg-ivory dark:bg-charcoal text-charcoal dark:text-ivory selection:bg-gold-400 selection:text-charcoal font-sans transition-colors duration-300">
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-burgundy-200/30 dark:bg-burgundy-900/20 rounded-full blur-[120px]" />
        <div className="absolute top-[20%] -right-[5%] w-[30%] h-[30%] bg-gold-200/40 dark:bg-gold-900/20 rounded-full blur-[100px]" />
        <div className="absolute bottom-[10%] left-[30%] w-[25%] h-[25%] bg-emerald-200/20 dark:bg-emerald-900/10 rounded-full blur-[100px]" />
      </div>
      <div className="relative z-10">
        <Navbar />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 py-28 md:py-32">
          <div className="text-center space-y-4 sm:space-y-6 max-w-3xl mx-auto mb-12 sm:mb-16">
            {/* Trust Badge */}
            <div className="flex justify-center mb-6 sm:mb-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 dark:bg-emerald-900/30 border border-emerald-200 dark:border-emerald-700">
                <Shield className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span className="text-sm font-semibold text-emerald-700 dark:text-emerald-300">Trusted by 10,000+ Publishers</span>
              </div>
            </div>
            <h1 className="text-3xl sm:text-5xl md:text-7xl font-display font-extrabold tracking-tight text-burgundy-900 dark:text-gold-400 leading-[1.1]">
              Premium <span className="text-gold-gradient">AdSense Approval Checker</span> Online
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-burgundy-700 dark:text-gold-200 max-w-xl mx-auto leading-relaxed px-4">
              Check your AdSense eligibility now! Get your AdSense approval percentage score, ban checker status, and tips to get approved. 100% free AdSense approval checker online.
            </p>
          </div>

          <div id="analyzer-section" className="max-w-xl mx-auto mb-16 px-4 sm:px-0">
            <div className="bg-cream dark:bg-charcoal rounded-2xl sm:rounded-[32px] shadow-burgundy-lg border-2 border-gold-500/30 overflow-hidden p-4 sm:p-2">
              <div className="px-4 sm:px-6 pb-6 sm:pb-8 pt-4">
                <div className="space-y-3 sm:space-y-4">
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-3 sm:left-5 flex items-center pointer-events-none">
                      <Globe className="w-4 h-4 sm:w-5 sm:h-5 text-burgundy-400 dark:text-gold-500 group-focus-within:text-gold-600 transition-colors" />
                    </div>
                    <input
                      type="text"
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleAnalyze()}
                      placeholder="example.com or www.example.com"
                      className="w-full bg-ivory dark:bg-burgundy-950 border-2 border-burgundy-200 dark:border-gold-600/30 focus:border-gold-500 focus:bg-cream dark:focus:bg-burgundy-900 rounded-xl sm:rounded-2xl py-3 sm:py-4 pl-10 sm:pl-14 pr-24 sm:pr-32 outline-none transition-all text-sm sm:text-base text-burgundy-900 dark:text-gold-200 placeholder:text-burgundy-400 dark:placeholder:text-gold-600 font-medium"
                    />
                    <button onClick={handleAnalyze} disabled={isAnalyzing}
                      className="absolute right-1.5 sm:right-3 top-1.5 sm:top-2 bottom-1.5 sm:bottom-2 bg-gold-gradient hover:shadow-gold-lg text-burgundy-900 px-4 sm:px-6 rounded-lg sm:rounded-xl font-bold transition-all active:scale-95 disabled:opacity-70 flex items-center gap-1.5 sm:gap-2 text-sm sm:text-base"
                    >
                      {isAnalyzing ? <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-burgundy-900/30 border-t-burgundy-900 rounded-full animate-spin" /> : <>Check <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" /></>}
                    </button>
                  </div>
                  {error && (
                    <div className="bg-red-50 dark:bg-red-900/30 border-2 border-red-300 dark:border-red-700 rounded-xl p-3 sm:p-4 flex items-start gap-2 sm:gap-3">
                      <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 text-red-600 dark:text-red-400 mt-0.5 flex-shrink-0" />
                      <div><p className="font-semibold text-red-900 dark:text-red-200 text-sm sm:text-base">Analysis Error</p><p className="text-xs sm:text-sm text-red-700 dark:text-red-300">{error}</p></div>
                    </div>
                  )}
                  {results && (
                    <button
                      onClick={() => {
                        setResults(null);
                        setError(null);
                        setUrl('');
                        localStorage.removeItem('adsense_analysis_results');
                        localStorage.removeItem('adsense_analysis_url');
                        scrollToSection('analyzer-section');
                      }}
                      className="w-full text-sm bg-gold-50 dark:bg-gold-900/30 text-gold-700 dark:text-gold-300 hover:bg-gold-100 dark:hover:bg-gold-900/50 py-2 px-4 rounded-xl flex items-center justify-center gap-2 transition-colors font-medium border border-gold-300 dark:border-gold-700"
                    >
                      <RefreshCw className="w-4 h-4" />Check Another Site
                    </button>
                  )}
                  <p className="text-xs text-center text-burgundy-500 dark:text-gold-400 flex items-center justify-center gap-1.5">
                    <Info className="w-3.5 h-3.5" />Check your AdSense approval chances in seconds
                  </p>
                </div>
              </div>
            </div>
          </div>

          <AboutSection />

          <div id="features-section" className="max-w-6xl mx-auto mb-16 px-4">
            <div className="text-center mb-8 sm:mb-12">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold text-burgundy-900 dark:text-gold-400 mb-3 sm:mb-4">Check Your Approval Chances</h2>
              <p className="text-sm sm:text-base lg:text-lg text-burgundy-700 dark:text-gold-200 max-w-xl mx-auto">Our analysis tool checks if your website meets all requirements for Google AdSense approval.</p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {[
                { icon: Percent, title: "Approval Score", desc: "Get your exact percentage chance of getting approved for AdSense.", color: "bg-gold-600" },
                { icon: Layers, title: "10-Point Check", desc: "We check 300+ criteria including content, policies, and technical setup.", color: "bg-teal-600" },
                { icon: Shield, title: "Policy Check", desc: "Verify your Privacy Policy, Terms of Service, and Cookie Policy.", color: "bg-forest-600" },
                { icon: Search, title: "SEO Analysis", desc: "Check meta tags, schema markup, and site structure requirements.", color: "bg-amber-600" },
                { icon: Globe, title: "Content Check", desc: "Analyze your content depth, quality, and uniqueness.", color: "bg-terracotta-600" },
                { icon: Target, title: "Actionable Tips", desc: "Get specific recommendations to improve your approval chances.", color: "bg-slate-700" },
                { icon: Clock, title: "4-Week Plan", desc: "Follow our step-by-step roadmap to get AdSense ready.", color: "bg-burgundy-700" },
                { icon: AlertCircle, title: "Reject Prevention", desc: "Find and fix issues that might get your application rejected.", color: "bg-emerald-700" },
                { icon: Sparkles, title: "AI Insights", desc: "Gemini and ChatGPT analysis for smart recommendations.", color: "bg-teal-700" },
              ].map((feature, i) => (
                <div key={i} className="bg-cream dark:bg-charcoal rounded-xl sm:rounded-2xl shadow-burgundy border-2 border-gold-500/20 p-4 sm:p-6 premium-card">
                  <div className={`${feature.color} w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl flex items-center justify-center mb-3 sm:mb-4 shadow-md`}>
                    <feature.icon className="w-5 h-5 sm:w-6 sm:h-6 text-ivory" />
                  </div>
                  <h3 className="text-base sm:text-xl font-bold text-burgundy-900 dark:text-gold-400 mb-2">{feature.title}</h3>
                  <p className="text-sm text-burgundy-700 dark:text-gold-200">{feature.desc}</p>
                </div>
              ))}
            </div>
            <div className="mt-8 sm:mt-12 bg-burgundy-gradient rounded-xl sm:rounded-3xl p-6 sm:p-8 text-ivory text-center shadow-burgundy-lg border-2 border-gold-500/30">
              <h3 className="text-lg sm:text-2xl font-display font-bold mb-2">Ready to Check Your Score?</h3>
              <p className="text-sm sm:text-base text-gold-100 mb-4 sm:mb-6 max-w-xl mx-auto">Enter your URL above and find out your chances of getting approved for AdSense.</p>
              <button
                onClick={() => scrollToSection('analyzer-section')}
                className="bg-gold-gradient text-burgundy-900 px-6 sm:px-8 py-2.5 sm:py-3 rounded-full font-bold hover:shadow-gold-lg transition-all text-sm sm:text-base"
              >
                Check My Score
              </button>
            </div>
          </div>

          {results && (
            <div id="results-section" className="animate-in fade-in slide-in-from-bottom-8 duration-700">
              <div className="grid sm:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
                <ScoreCard score={results.overallScore} />
                <div className="bg-cream dark:bg-charcoal rounded-xl sm:rounded-3xl shadow-burgundy-lg border-2 border-gold-500/30 p-4 sm:p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <Target className="w-5 h-5 sm:w-6 sm:h-6 text-burgundy-700 dark:text-gold-400" />
                    <h3 className="text-lg sm:text-xl font-display font-bold text-burgundy-900 dark:text-gold-400">Critical Issues</h3>
                  </div>
                  {results.criticalIssues && results.criticalIssues.length > 0 ? (
                    <ul className="space-y-2 sm:space-y-3">
                      {results.criticalIssues.map((issue, i) => (
                        <li key={i} className="flex items-start gap-2 text-red-600 dark:text-red-400 text-xs sm:text-sm">
                          <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 mt-0.5 flex-shrink-0" />
                          {issue}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
                      <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5" />
                      <span className="font-medium text-xs sm:text-sm">No critical issues found!</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 sm:gap-4 mb-6 sm:mb-8">
                <CategoryCard title="Content Depth" score={results.contentDepth?.score || 0} maxScore={50} icon={Layers} color="bg-burgundy-600" />
                <CategoryCard title="Required Pages" score={results.requiredPages?.score || 0} maxScore={30} icon={Shield} color="bg-gold-600" />
                <CategoryCard title="Policy" score={results.policyCompliance?.score || 0} maxScore={30} icon={CheckCircle2} color="bg-emerald-600" />
                <CategoryCard title="Technical SEO" score={results.technicalSEO?.score || 0} maxScore={40} icon={Search} color="bg-burgundy-700" />
                <CategoryCard title="Quality" score={results.contentQuality?.score || 0} maxScore={30} icon={Layers} color="bg-gold-700" />
                <CategoryCard title="Mobile" score={results.mobileOptimization?.score || 0} maxScore={25} icon={Activity} color="bg-emerald-700" />
                <CategoryCard title="Performance" score={results.performanceMetrics?.score || 0} maxScore={25} icon={Activity} color="bg-burgundy-800" />
                <CategoryCard title="Security" score={results.securityScore?.score || 0} maxScore={20} icon={Shield} color="bg-gold-600" />
                <CategoryCard title="UX Design" score={results.uxDesign?.score || 0} maxScore={25} icon={Target} color="bg-emerald-600" />
                <CategoryCard title="Readiness" score={results.monetizationReadiness?.score || 0} maxScore={25} icon={Percent} color="bg-burgundy-700" />
              </div>

              <div className="mb-6 sm:mb-8">
                <h3 className="text-xl sm:text-2xl font-display font-bold text-burgundy-900 dark:text-gold-400 mb-4 sm:mb-6 flex items-center gap-2 sm:gap-3">
                  <Target className="w-5 h-5 sm:w-6 sm:h-6 text-gold-600" />
                  Priority Recommendations
                </h3>
                <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
                  {results.recommendations?.map((rec, i) => (
                    <RecommendationCard key={i} {...rec} />
                  ))}
                </div>
              </div>

              <div className="mb-6 sm:mb-8">
                <h3 className="text-xl sm:text-2xl font-display font-bold text-burgundy-900 dark:text-gold-400 mb-4 sm:mb-6 flex items-center gap-2 sm:gap-3">
                  <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-gold-600" />
                  4-Week Improvement Plan
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                  {results.improvements?.map((phase, i) => (
                    <ProgressBar key={i} week={phase.phase} tasks={phase.tasks} isActive={i === 0} />
                  ))}
                </div>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mt-12 sm:mt-16 px-4">
            {[
              { title: "Approval Score", desc: "Get your exact percentage chance", icon: Percent, color: "bg-gold-600" },
              { title: "Policy Check", desc: "Full AdSense policy check", icon: Shield, color: "bg-burgundy-700" },
              { title: "Actionable Tips", desc: "Specific recommendations", icon: Target, color: "bg-emerald-600" },
            ].map((stat, i) => (
              <div key={i} className="bg-cream/50 dark:bg-charcoal/50 border-2 border-gold-500/20 p-6 rounded-2xl flex items-start gap-4 premium-card">
                <div className={`${stat.color} p-3 rounded-xl shadow-md`}>
                  <stat.icon className="w-5 h-5 text-ivory" />
                </div>
                <div>
                  <h3 className="font-bold text-burgundy-900 dark:text-gold-400">{stat.title}</h3>
                  <p className="text-sm text-burgundy-700 dark:text-gold-200">{stat.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>

      <footer className="mt-20 relative overflow-hidden bg-burgundy-gradient border-t-2 border-gold-500/30 shadow-burgundy-lg">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-12">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="bg-gold-gradient p-2.5 rounded-xl shadow-gold">
                <Crown className="w-5 h-5 text-burgundy-900" />
              </div>
              <div>
                <span className="text-xl font-display font-bold text-ivory">Check<span className="text-gold-400">AdSense</span></span>
                <p className="text-xs text-gold-100">Premium AdSense Approval Checker - Check Your Eligibility</p>
              </div>
            </div>
            <div className="flex items-center gap-8">
              <button onClick={() => scrollToSection('about-section')} className="text-sm text-gold-100 hover:text-gold-400 transition-colors">About</button>
              <button onClick={() => scrollToSection('features-section')} className="text-sm text-gold-100 hover:text-gold-400 transition-colors">Features</button>
              <span className="text-sm text-gold-200">© 2026 CheckAdSense</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
