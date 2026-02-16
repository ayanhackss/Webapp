import React, { useState, useEffect } from 'react';
import { Search, Layers, Globe, ArrowRight, Activity, Percent, Shield, Clock, Target, Sparkles, CheckCircle2, AlertCircle, RefreshCw, Crown } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Navbar, AboutSection } from './SharedComponents';
import { Helmet } from 'react-helmet-async';

const Home = () => {
  const [url, setUrl] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state?.scrollTo) {
      const el = document.getElementById(location.state.scrollTo);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        window.scrollBy(0, -80);
      }
    }
  }, [location.state]);

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
    setError(null);
    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: normalizedUrl })
      });
      
      const textData = await response.text();
      let data;
      
      try {
        data = JSON.parse(textData);
      } catch (e) {
        console.error('JSON Parse Error:', e);
        if (textData.includes('504')) {
           throw new Error('Analysis timed out (limit is 10s on free Vercel). Please try a faster site.');
        } else if (textData.includes('500')) {
           throw new Error('Server error. Please check API keys in Vercel settings.');
        }
        throw new Error(`Server returned unexpected data: ${textData.substring(0, 50)}...`);
      }

      if (data.success) {
        navigate('/result', { state: { results: data.data, url: url } });
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
      <Helmet>
        <title>AiForNation - Free AdSense Approval Checker & SEO Tools</title>
        <meta name="description" content="Check your AdSense eligibility with AiForNation. Get AI-powered insights and a step-by-step plan to get approved for Google AdSense." />
      </Helmet>
      
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] bg-amber-500/5 rounded-full blur-[150px]" />
        <div className="absolute top-[30%] -right-[10%] w-[40%] h-[40%] bg-orange-500/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[10%] left-[20%] w-[30%] h-[30%] bg-emerald-500/5 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10">
        <Navbar />
        
        <main className="max-w-7xl mx-auto px-4 sm:px-6 py-32">
          <div className="text-center space-y-6 max-w-3xl mx-auto mb-16 font-numans">
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
              Check your AdSense eligibility now with <strong>AiForNation</strong>! Get your AdSense approval percentage score and tips to get approved. 100% free.
            </p>
          </div>

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
                  className="glass-input !pl-14 pr-48"
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
            </div>
          </div>

          <AboutSection />

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

        <footer className="mt-20 border-t border-white/10">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-3">
                <div className="bg-gradient-to-br from-amber-500 to-orange-600 p-2.5 rounded-xl">
                  <Crown className="w-5 h-5 text-white" />
                </div>
                <div>
                  <span className="text-xl font-bold text-white">AiForNation</span>
                  <p className="text-xs text-white/50">Premium AdSense Approval Checker</p>
                </div>
              </div>
              <div className="flex items-center gap-8">
                <button onClick={() => {}} className="text-sm text-white/50 hover:text-white transition-colors">About</button>
                <button onClick={() => {}} className="text-sm text-white/50 hover:text-white transition-colors">Features</button>
                <span className="text-sm text-white/40">© 2026 AiForNation</span>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Home;
