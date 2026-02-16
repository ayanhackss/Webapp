import React, { useState } from 'react';
import { Search, Layers, Globe, ArrowRight, Activity, Percent, Shield, Clock, Target, Sparkles, CheckCircle2, AlertCircle, RefreshCw, Crown, Lightbulb, Menu, X, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const scrollToSection = (id) => {
    if (window.location.pathname !== '/') {
      navigate('/', { state: { scrollTo: id } });
      return;
    }
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      window.scrollBy(0, -80);
    }
  };

  return (
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50">
      <div className="nav-pill px-4 py-3 flex items-center gap-4">
        <a href="/" className="flex items-center gap-3 group cursor-pointer">
          <div className="bg-gradient-to-br from-amber-500 to-orange-600 p-2 rounded-xl">
            <Crown className="w-5 h-5 text-white" />
          </div>
          <span className="text-lg font-bold text-white">
            AiForNation
          </span>
        </a>

        <div className="hidden md:flex items-center gap-2">
          <button onClick={() => scrollToSection('analyzer-section')} className="px-4 py-2 text-sm text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-all">
            Analyzer
          </button>
          <button onClick={() => scrollToSection('about-section')} className="px-4 py-2 text-sm text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-all">
            About
          </button>
          <button onClick={() => scrollToSection('features-section')} className="px-4 py-2 text-sm text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-all">
            Features
          </button>
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 rounded-full hover:bg-white/10 transition-colors"
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="w-5 h-5 text-white" /> : <Menu className="w-5 h-5 text-white" />}
        </button>
      </div>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 p-4 glass-card">
          <div className="flex flex-col gap-2">
            <button onClick={() => { scrollToSection('analyzer-section'); setIsOpen(false); }} className="w-full text-left px-4 py-3 text-white/80 hover:bg-white/10 rounded-xl transition-all">
              Analyzer
            </button>
            <button onClick={() => { scrollToSection('about-section'); setIsOpen(false); }} className="w-full text-left px-4 py-3 text-white/80 hover:bg-white/10 rounded-xl transition-all">
              About
            </button>
            <button onClick={() => { scrollToSection('features-section'); setIsOpen(false); }} className="w-full text-left px-4 py-3 text-white/80 hover:bg-white/10 rounded-xl transition-all">
              Features
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export const AboutSection = () => (
  <section id="about-section" className="max-w-6xl mx-auto mb-16 px-4">
    <div className="text-center mb-12">
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
        About <span className="gradient-text">AiForNation</span>
      </h2>
      <p className="text-white/60 text-lg max-w-xl mx-auto">Learn how we help you check your website's AdSense approval chances</p>
    </div>

    <div className="grid sm:grid-cols-2 gap-6">
      <div className="glass-card p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-gradient-to-br from-amber-500 to-orange-600 p-3 rounded-xl">
            <Percent className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-xl font-bold text-white">Check Approval Chance</h3>
        </div>
        <p className="text-white/60 mb-4">
          At AiForNation, we help you understand your website's chances of getting approved for Google AdSense:
        </p>
        <ul className="space-y-3 text-white/70">
          <li className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            <span>Your current approval percentage score</span>
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            <span>What Google looks for in your website</span>
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            <span>Issues that might get you rejected</span>
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            <span>Steps to improve your approval chances</span>
          </li>
        </ul>
      </div>

      <div className="glass-card p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-gradient-to-br from-amber-500 to-orange-600 p-3 rounded-xl">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-xl font-bold text-white">Why Use AiForNation</h3>
        </div>
        <p className="text-white/60 mb-4">
          Get approved faster by knowing exactly what Google wants before you apply:
        </p>
        <ul className="space-y-3 text-white/70">
          <li className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            <span><strong className="text-white">10-Point Check:</strong> 300+ eligibility criteria</span>
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            <span><strong className="text-white">AI Analysis:</strong> Gemini & ChatGPT insights</span>
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            <span><strong className="text-white">4-Week Plan:</strong> Step-by-step guide</span>
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            <span><strong className="text-white">100% Free:</strong> No payment required</span>
          </li>
        </ul>
      </div>
    </div>
  </section>
);

export const ScoreCard = ({ score }) => {
  const getScoreColor = (score) => {
    if (score >= 80) return { bg: 'bg-emerald-500/20', border: 'border-emerald-500/30', text: 'text-emerald-400', label: 'High Chance!' };
    if (score >= 60) return { bg: 'bg-amber-500/20', border: 'border-amber-500/30', text: 'text-amber-400', label: 'Good Chance' };
    if (score >= 40) return { bg: 'bg-orange-500/20', border: 'border-orange-500/30', text: 'text-orange-400', label: 'Needs Work' };
    return { bg: 'bg-red-500/20', border: 'border-red-500/30', text: 'text-red-400', label: 'Low Chance' };
  };
  const colors = getScoreColor(score);
  return (
    <div className="glass-card p-8 text-center relative overflow-hidden">
      <div className={`absolute inset-0 bg-gradient-to-br ${colors.bg} opacity-20`}></div>
      <div className="relative">
        <div className={`inline-flex items-center justify-center w-40 h-40 rounded-full ${colors.bg} border-4 ${colors.border} mb-4`}>
          <div className="text-center">
            <span className="text-5xl font-bold text-white">{score}%</span>
          </div>
        </div>
        <p className={`text-xl font-bold ${colors.text}`}>{colors.label}</p>
      </div>
    </div>
  );
};

export const CategoryCard = ({ title, data, maxScore, icon: Icon, color }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const score = data?.score || 0;
  const percentage = Math.round((score / maxScore) * 100);
  const { details = [], issues = [], tips = [] } = data || {};

  return (
    <div className={`glass-card p-5 transition-all duration-300 ${isExpanded ? 'row-span-2' : ''}`}>
      <div className="flex items-center justify-between mb-4 cursor-pointer" onClick={() => setIsExpanded(!isExpanded)}>
        <div className={`p-3 rounded-xl ${color} bg-opacity-20`}>
          <Icon className={`w-5 h-5 ${color.replace('bg-', 'text-')}`} />
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm font-bold text-white/60">{score}/{maxScore}</span>
          <div className={`transform transition-transform ${isExpanded ? 'rotate-180' : ''}`}>
             <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white/40"><path d="m6 9 6 6 6-6"/></svg>
          </div>
        </div>
      </div>
      
      <div className="cursor-pointer" onClick={() => setIsExpanded(!isExpanded)}>
        <h4 className="font-bold text-white mb-3">{title}</h4>
        <div className="w-full bg-white/10 rounded-full h-2">
          <div className={`h-2 rounded-full ${color.replace('bg-', 'bg-')}`} style={{ width: `${percentage}%` }} />
        </div>
        <p className="text-xs text-white/50 mt-2">{percentage}% Score</p>
      </div>

      {isExpanded && (
        <div className="mt-6 space-y-4 animate-fade-in">
          {details.length > 0 && (
            <div>
              <h5 className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-2 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> Passing
              </h5>
              <ul className="space-y-1">
                {details.map((item, i) => (
                  <li key={i} className="text-xs text-white/70 flex items-start gap-1.5">
                    <span className="w-1 h-1 rounded-full bg-emerald-500 mt-1.5 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {issues.length > 0 && (
            <div>
              <h5 className="text-xs font-bold text-red-400 uppercase tracking-wider mb-2 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" /> Issues
              </h5>
              <ul className="space-y-1">
                {issues.map((item, i) => (
                  <li key={i} className="text-xs text-white/70 flex items-start gap-1.5">
                    <span className="w-1 h-1 rounded-full bg-red-500 mt-1.5 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {tips.length > 0 && (
            <div>
              <h5 className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-2 flex items-center gap-1">
                <Lightbulb className="w-3 h-3" /> Tips
              </h5>
              <ul className="space-y-1">
                {tips.map((item, i) => (
                  <li key={i} className="text-xs text-white/70 flex items-start gap-1.5">
                    <span className="w-1 h-1 rounded-full bg-amber-500 mt-1.5 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export const RecommendationCard = ({ priority, action, impact }) => {
  const priorityColors = {
    HIGH: { bg: 'bg-red-500/10', border: 'border-red-500/30', badge: 'bg-red-500/20 text-red-400' },
    MEDIUM: { bg: 'bg-amber-500/10', border: 'border-amber-500/30', badge: 'bg-amber-500/20 text-amber-400' },
    INFO: { bg: 'bg-emerald-500/10', border: 'border-emerald-500/30', badge: 'bg-emerald-500/20 text-emerald-400' }
  };
  const colors = priorityColors[priority] || priorityColors.INFO;
  return (
    <div className={`glass-card p-5 border-l-4 ${colors.border}`}>
      <div className="flex items-center justify-between mb-3">
        <span className={`text-xs font-bold px-3 py-1 rounded-full ${colors.badge}`}>{priority}</span>
        <span className={`text-xs font-bold px-3 py-1 rounded-full ${colors.badge}`}>{impact}</span>
      </div>
      <p className="text-white/80 font-medium">{action}</p>
    </div>
  );
};

export const ProgressBar = ({ week, tasks, isActive }) => (
  <div className={`glass-card p-4 ${isActive ? 'ring-2 ring-amber-500/30' : ''}`}>
    <div className="flex items-center gap-2 mb-3">
      <Clock className={`w-4 h-4 ${isActive ? 'text-amber-400' : 'text-white/40'}`} />
      <span className={`font-bold text-sm ${isActive ? 'text-amber-400' : 'text-white/60'}`}>{week}</span>
    </div>
    <ul className="space-y-2">
      {tasks.map((task, i) => (
        <li key={i} className="text-sm text-white/60 flex items-start gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
          {task}
        </li>
      ))}
    </ul>
  </div>
);
