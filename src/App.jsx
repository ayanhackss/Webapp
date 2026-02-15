import React, { useState, useEffect } from 'react';
import { Search, Layers, Globe, ArrowRight, Activity, Info, CheckCircle2, AlertCircle, TrendingUp, Target, Shield, Clock, Zap, RefreshCw, Users, Award, Percent, Lightbulb, Menu, X, Crown, Sparkles, BarChart3, PieChart, TrendingDown, DollarSign, Eye, MousePointer } from 'lucide-react';

const scrollToSection = (id) => {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' });
    window.scrollBy(0, -80);
  }
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50">
      <div className="nav-pill px-4 py-3 flex items-center gap-4">
        <a href="/" className="flex items-center gap-3 group cursor-pointer">
          <div className="bg-gradient-to-br from-amber-500 to-orange-600 p-2 rounded-xl">
            <Crown className="w-5 h-5 text-white" />
          </div>
          <span className="text-lg font-bold text-white">
            CheckAdSense
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

const AboutSection = () => (
  <section id="about-section" className="max-w-6xl mx-auto mb-16 px-4">
    <div className="text-center mb-12">
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
        About <span className="gradient-text">CheckAdSense</span>
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
          At CheckAdSense, we help you understand your website's chances of getting approved for Google AdSense:
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
          <h3 className="text-xl font-bold text-white">Why Use CheckAdSense</h3>
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

const ScoreCard = ({ score }) => {
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

const CategoryCard = ({ title, score, maxScore, icon: Icon, color }) => {
  const percentage = Math.round((score / maxScore) * 100);
  return (
    <div className="glass-card p-5">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-xl ${color} bg-opacity-20`}>
          <Icon className={`w-5 h-5 ${color.replace('bg-', 'text-')}`} />
        </div>
        <span className="text-sm font-bold text-white/60">{score}/{maxScore}</span>
      </div>
      <h4 className="font-bold text-white mb-3">{title}</h4>
      <div className="w-full bg-white/10 rounded-full h-2">
        <div className={`h-2 rounded-full ${color.replace('bg-', 'bg-')}`} style={{ width: `${percentage}%` }} />
      </div>
      <p className="text-xs text-white/50 mt-2">{percentage}%</p>
    </div>
  );
};

const RecommendationCard = ({ priority, action, impact }) => {
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

const ProgressBar = ({ week, tasks, isActive }) => (
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
    <div className="min-h-screen bg-[#0F1115] text-white font-sans">
      {/* Background Effects */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] bg-amber-500/5 rounded-full blur-[150px]" />
        <div className="absolute top-[30%] -right-[10%] w-[40%] h-[40%] bg-orange-500/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[10%] left-[20%] w-[30%] h-[30%] bg-emerald-500/5 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10">
        <Navbar />
        
        <main className="max-w-7xl mx-auto px-4 sm:px-6 py-32">
          {/* Hero Section */}
          <div className="text-center space-y-6 max-w-3xl mx-auto mb-16 font-numans">
            {/* Trust Badge */}
            <div className="flex justify-center mb-8">
              <div className="trust-badge">
                <Shield className="w-4 h-4 text-emerald-400" />
                <span className="text-sm font-medium text-emerald-400">Trusted by 10,000+ Publishers</span>
              </div>
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight text-white leading-tight">
              Premium <span className="gradient-text">AdSense</span> Approval Checker
            </h1>
            <p className="text-lg text-white/60 max-w-xl mx-auto leading-relaxed">
              Check your AdSense eligibility now! Get your AdSense approval percentage score and tips to get approved. 100% free.
            </p>
          </div>

          {/* Search Section */}
          <div id="analyzer-section" className="max-w-xl mx-auto mb-20">
            <div className="glass-card p-6 sm:p-8">
              <div className="relative">
                <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none">
                  <Globe className="w-5 h-5 text-white/40" />
                </div>
                <input
                  type="text"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleAnalyze()}
                  placeholder="Enter your website URL..."
                  className="glass-input !pl-14 pr-36"
                />
                <button onClick={handleAnalyze} disabled={isAnalyzing}
                  className="absolute right-2 top-1/2 -translate-y-1/2 glass-button py-3 px-6 text-sm"
                >
                  {isAnalyzing ? <div className="spinner" /> : <span className="flex items-center gap-2">Check <ArrowRight className="w-4 h-4" /></span>}
                </button>
              </div>
              {error && (
                <div className="mt-4 p-4 bg-red-500/10 border border-red-500/30 rounded-xl flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-red-400 mt-0.5" />
                  <div>
                    <p className="font-semibold text-red-400">Analysis Error</p>
                    <p className="text-sm text-red-300/70">{error}</p>
                  </div>
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
                  className="mt-4 w-full py-3 px-4 glass-card text-center text-white/70 hover:text-white transition-colors flex items-center justify-center gap-2"
                >
                  <RefreshCw className="w-4 h-4" />Check Another Site
                </button>
              )}
            </div>
          </div>

          <AboutSection />

          {/* Features Section */}
          <div id="features-section" className="max-w-6xl mx-auto mb-20 px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Check Your Approval Chances</h2>
              <p className="text-white/60 text-lg max-w-xl mx-auto">Our analysis tool checks if your website meets all requirements for Google AdSense approval.</p>
            </div>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { icon: Percent, title: "Approval Score", desc: "Get your exact percentage chance of getting approved for AdSense.", color: "bg-amber-500" },
                { icon: Layers, title: "10-Point Check", desc: "We check 300+ criteria including content, policies, and technical setup.", color: "bg-teal-500" },
                { icon: Shield, title: "Policy Check", desc: "Verify your Privacy Policy, Terms of Service, and Cookie Policy.", color: "bg-emerald-500" },
                { icon: Search, title: "SEO Analysis", desc: "Check meta tags, schema markup, and site structure requirements.", color: "bg-orange-500" },
                { icon: Globe, title: "Content Check", desc: "Analyze your content depth, quality, and uniqueness.", color: "bg-rose-500" },
                { icon: Target, title: "Actionable Tips", desc: "Get specific recommendations to improve your approval chances.", color: "bg-violet-500" },
                { icon: Clock, title: "4-Week Plan", desc: "Follow our step-by-step roadmap to get AdSense ready.", color: "bg-cyan-500" },
                { icon: AlertCircle, title: "Reject Prevention", desc: "Find and fix issues that might get your application rejected.", color: "bg-red-500" },
                { icon: Sparkles, title: "AI Insights", desc: "Gemini and ChatGPT analysis for smart recommendations.", color: "bg-purple-500" },
              ].map((feature, i) => (
                <div key={i} className="glass-card p-6 group">
                  <div className={`${feature.color} w-12 h-12 rounded-xl flex items-center justify-center mb-4 shadow-lg`}>
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{feature.title}</h3>
                  <p className="text-white/60 text-sm">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Results Section */}
          {results && (
            <div id="results-section" className="animate-fade-in-up">
              <div className="grid sm:grid-cols-2 gap-6 mb-8">
                <ScoreCard score={results.overallScore} />
                <div className="glass-card p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <Target className="w-6 h-6 text-amber-400" />
                    <h3 className="text-xl font-bold text-white">Critical Issues</h3>
                  </div>
                  {results.criticalIssues && results.criticalIssues.length > 0 ? (
                    <ul className="space-y-3">
                      {results.criticalIssues.map((issue, i) => (
                        <li key={i} className="flex items-start gap-2 text-red-300">
                          <AlertCircle className="w-5 h-5 text-red-400 mt-0.5" />
                          {issue}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div className="flex items-center gap-2 text-emerald-400">
                      <CheckCircle2 className="w-5 h-5" />
                      <span className="font-medium">No critical issues found!</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
                <CategoryCard title="Content Depth" score={results.contentDepth?.score || 0} maxScore={50} icon={Layers} color="bg-amber-500" />
                <CategoryCard title="Required Pages" score={results.requiredPages?.score || 0} maxScore={30} icon={Shield} color="bg-emerald-500" />
                <CategoryCard title="Policy" score={results.policyCompliance?.score || 0} maxScore={30} icon={CheckCircle2} color="bg-teal-500" />
                <CategoryCard title="Technical SEO" score={results.technicalSEO?.score || 0} maxScore={40} icon={Search} color="bg-orange-500" />
                <CategoryCard title="Quality" score={results.contentQuality?.score || 0} maxScore={30} icon={Layers} color="bg-rose-500" />
                <CategoryCard title="Mobile" score={results.mobileOptimization?.score || 0} maxScore={25} icon={Activity} color="bg-cyan-500" />
                <CategoryCard title="Performance" score={results.performanceMetrics?.score || 0} maxScore={25} icon={Zap} color="bg-violet-500" />
                <CategoryCard title="Security" score={results.securityScore?.score || 0} maxScore={20} icon={Shield} color="bg-green-500" />
                <CategoryCard title="UX Design" score={results.uxDesign?.score || 0} maxScore={25} icon={Target} color="bg-purple-500" />
                <CategoryCard title="Readiness" score={results.monetizationReadiness?.score || 0} maxScore={25} icon={Percent} color="bg-amber-600" />
              </div>

              <div className="mb-8">
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                  <Target className="w-6 h-6 text-amber-400" />
                  Priority Recommendations
                </h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  {results.recommendations?.map((rec, i) => (
                    <RecommendationCard key={i} {...rec} />
                  ))}
                </div>
              </div>

              <div className="mb-8">
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                  <Clock className="w-6 h-6 text-amber-400" />
                  4-Week Improvement Plan
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {results.improvements?.map((phase, i) => (
                    <ProgressBar key={i} week={phase.phase} tasks={phase.tasks} isActive={i === 0} />
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Stats Section */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-16 px-4">
            {[
              { title: "Approval Score", desc: "Get your exact percentage chance", icon: Percent, color: "bg-amber-500" },
              { title: "Policy Check", desc: "Full AdSense policy check", icon: Shield, color: "bg-emerald-500" },
              { title: "Actionable Tips", desc: "Specific recommendations", icon: Target, color: "bg-teal-500" },
            ].map((stat, i) => (
              <div key={i} className="glass-card p-6 flex items-start gap-4">
                <div className={`${stat.color} p-3 rounded-xl`}>
                  <stat.icon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-white">{stat.title}</h3>
                  <p className="text-sm text-white/60">{stat.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </main>

        {/* Footer */}
        <footer className="mt-20 border-t border-white/10">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-3">
                <div className="bg-gradient-to-br from-amber-500 to-orange-600 p-2.5 rounded-xl">
                  <Crown className="w-5 h-5 text-white" />
                </div>
                <div>
                  <span className="text-xl font-bold text-white">Check<span className="gradient-text">AdSense</span></span>
                  <p className="text-xs text-white/50">Premium AdSense Approval Checker</p>
                </div>
              </div>
              <div className="flex items-center gap-8">
                <button onClick={() => scrollToSection('about-section')} className="text-sm text-white/50 hover:text-white transition-colors">About</button>
                <button onClick={() => scrollToSection('features-section')} className="text-sm text-white/50 hover:text-white transition-colors">Features</button>
                <span className="text-sm text-white/40">© 2026 CheckAdSense</span>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default App;
