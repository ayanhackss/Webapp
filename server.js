import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import { createClient } from '@supabase/supabase-js';
import { GoogleGenerativeAI } from '@google/generative-ai';
import OpenAI from 'openai';
import axios from 'axios';
import * as cheerio from 'cheerio';
import NodeCache from 'node-cache';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 100, message: { error: 'Too many requests' } });
const cache = new NodeCache({ stdTTL: 300, checkperiod: 60 });

app.use(cors({
  origin: true,
  credentials: true
}));
app.use(express.json());
app.use(express.static('dist'));

// SPA fallback - serve index.html for all non-API routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.use('/api', limiter);

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = (supabaseUrl && supabaseUrl.startsWith('http')) ? createClient(supabaseUrl, supabaseKey) : null;
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Scoring Engine
class AdvancedScorer {
  constructor(url) {
    this.url = url;
    this.results = {
      contentDepth: { score: 0, max: 50, details: [], issues: [], tips: [] },
      requiredPages: { score: 0, max: 30, details: [], issues: [], tips: [] },
      policyCompliance: { score: 0, max: 30, details: [], issues: [], tips: [] },
      technicalSEO: { score: 0, max: 40, details: [], issues: [], tips: [] },
      contentQuality: { score: 0, max: 30, details: [], issues: [], tips: [] },
      mobileOptimization: { score: 0, max: 25, details: [], issues: [], tips: [] },
      performanceMetrics: { score: 0, max: 25, details: [], issues: [], tips: [] },
      securityScore: { score: 0, max: 20, details: [], issues: [], tips: [] },
      uxDesign: { score: 0, max: 25, details: [], issues: [], tips: [] },
      monetizationReadiness: { score: 0, max: 25, details: [], issues: [], tips: [] },
      overallScore: 0, grade: 'F', percentile: 0,
      recommendations: [], criticalIssues: [], improvements: [],
      geminiInsights: '', chatgptInsights: '',
      url: url, analyzedAt: new Date().toISOString()
    };
  }

  async analyze() {
    const startTime = Date.now();
    const { html, metadata } = await this.fetchWebsite();
    await this.analyzeContentDepth(html, metadata);
    await this.analyzeRequiredPages(html);
    await this.analyzePolicyCompliance(html, metadata);
    await this.analyzeTechnicalSEO(html, metadata);
    await this.analyzeContentQuality(html, metadata);
    await this.analyzeMobileOptimization(html, metadata);
    await this.analyzePerformanceMetrics(html, metadata);
    await this.analyzeSecurity(html, metadata);
    await this.analyzeUXDesign(html, metadata);
    await this.analyzeMonetizationReadiness(html, metadata);
    this.calculateOverallScore();
    this.calculatePercentile();
    this.assignGrade();
    await this.getGeminiInsights();
    await this.getChatGPTInsights();
    this.generateDetailedRecommendations();
    this.generateImprovementRoadmap();
    this.results.analyzeTime = Date.now() - startTime;
    return this.results;
  }

  async fetchWebsite() {
    const response = await axios.get(this.url, {
      timeout: 30000,
      headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' },
      maxRedirects: 5, validateStatus: (status) => status < 400
    });

    const $ = cheerio.load(response.data);
    const textContent = $('body').text();
    const wordCount = textContent.split(/\s+/).filter(w => w.length > 0).length;
    const sentences = textContent.split(/[.!?]+/).filter(s => s.trim().length > 0).length;
    
    const headings = [];
    $('h1, h2, h3, h4, h5, h6').each((i, el) => { headings.push({ level: $(el).prop('tagName') }); });

    const links = { internal: [], external: [], social: [] };
    $('a[href]').each((i, el) => {
      const href = $(el).attr('href');
      if (href && href.startsWith('http')) {
        if (href.includes(new URL(this.url).hostname)) links.internal.push(href);
        else if (/facebook|twitter|instagram|linkedin|youtube/i.test(href)) links.social.push(href);
        else links.external.push(href);
      }
    });

    const htmlContent = response.data;
    const outboundLinks = links.external.filter(l => !/youtube|facebook|twitter|instagram|linkedin/i.test(l));
    
    // Post counting with multi-language support
    const postPatterns = [
      'article', '.post', '.blog-post', '.entry-post', '.post-item',
      '[class*="post-"]', '.blog .post', '.blog article', '.loop .item', '.posts-list .post'
    ];
    
    let totalPosts = 0;
    let postWordCounts = [];
    
    postPatterns.forEach(selector => {
      const posts = $(selector);
      totalPosts += posts.length;
      posts.each((i, el) => {
        const postText = $(el).text();
        const wordCount = this.countWords(postText);
        postWordCounts.push(wordCount);
      });
    });

    const avgWordsPerPost = postWordCounts.length > 0 
      ? Math.round(postWordCounts.reduce((a, b) => a + b, 0) / postWordCounts.length)
      : 0;
    const longestPost = postWordCounts.length > 0 ? Math.max(...postWordCounts) : 0;
    const shortestPost = postWordCounts.length > 0 ? Math.min(...postWordCounts) : 0;

    return {
      html: htmlContent,
      metadata: {
        title: $('title').text()?.trim() || '',
        metaDescription: $('meta[name="description"]').attr('content') || '',
        h1Count: $('h1').length, h2Count: $('h2').length, totalHeadings: headings.length,
        paragraphCount: $('p').length, wordCount: wordCount, sentenceCount: sentences,
        avgWordsPerSentence: Math.round(wordCount / Math.max(sentences, 1)),
        linkCount: $('a').length, links: links,
        imageCount: $('img').length,
        images: $('img').map((i, img) => ({ alt: $(img).attr('alt'), hasAlt: !!$(img).attr('alt'), lazyLoaded: $(img).attr('loading') === 'lazy' })).get(),
        formsCount: $('form').length,
        hasNewsletter: /newsletter|subscribe|signup/i.test($('body').text()),
        hasSearchBox: $('input[type="search"]').length > 0,
        hasBreadcrumbs: $('nav[aria-label="breadcrumb"], .breadcrumbs').length > 0,
        hasSitemap: /sitemap\.xml/i.test(htmlContent),
        hasRobots: /robots\.txt/i.test(htmlContent),
        hasPrivacyPolicy: /privacy/i.test($('body').text()),
        hasCookiePolicy: /cookie/i.test($('body').text()),
        hasTerms: /terms/i.test($('body').text()),
        hasAbout: /about/i.test($('body').text()),
        hasContact: /contact/i.test($('body').text()),
        hasSSL: this.url.startsWith('https://'),
        viewport: $('meta[name="viewport"]').attr('content'),
        canonical: $('link[rel="canonical"]').attr('href'),
        hasSchemaOrg: htmlContent.includes('schema.org') || $('script[type="application/ld+json"]').length > 0,
        hasOpenGraph: $('meta[property^="og:"]').length > 0,
        hasTwitterCard: $('meta[name^="twitter:"]').length > 0,
        hasFavicon: $('link[rel="icon"]').length > 0,
        hasAnalytics: /google-analytics|gtag|ga4/i.test(htmlContent),
        hasAdsense: /adsbygoogle|googlesyndication/i.test(htmlContent),
        language: $('html').attr('lang') || 'not specified',
        hasMixedContent: /http:\/\//i.test(htmlContent),
        htmlSize: htmlContent.length,
        lazyLoading: htmlContent.includes('loading="lazy"'),
        cdnUsage: /cdn|cloudflare/i.test(htmlContent),
        internalLinks: links.internal.length,
        externalLinks: links.external.length,
        socialLinks: links.social.length,
        outboundLinks: outboundLinks.length,
        totalPosts, avgWordsPerPost, longestPost, shortestPost
      }
    };
  }

  countWords(text) {
    if (!text || !text.trim()) return 0;
    const cleanText = text.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
    if (!cleanText) return 0;
    
    // CJK detection
    if (/[\u4e00-\u9fa5\u3000-\u303f\u3040-\u309f\u30a0-\u30ff\uac00-\ud7af\u1100-\u11ff]/.test(cleanText)) {
      return Math.round(cleanText.length / 2.5);
    }
    // Arabic
    if (/[\u0600-\u06ff\u0750-\u077f\u08a0-\u08ff]/.test(cleanText)) {
      return Math.round(cleanText.length / 4.5);
    }
    return cleanText.split(/\s+/).filter(w => w.length > 0).length;
  }

  async analyzeContentDepth(html, metadata) {
    const details = [], issues = [], tips = [];
    let score = 0;

    if (metadata.totalPosts > 0) {
      details.push(`Posts/articles: ${metadata.totalPosts}`);
      details.push(`Avg words/post: ${metadata.avgWordsPerPost}`);
    }

    if (metadata.wordCount >= 3000) { score += 15; details.push(`Excellent: ${metadata.wordCount.toLocaleString()} words`); }
    else if (metadata.wordCount >= 2000) { score += 12; details.push(`Great: ${metadata.wordCount.toLocaleString()} words`); }
    else if (metadata.wordCount >= 1000) { score += 8; details.push(`Good: ${metadata.wordCount.toLocaleString()} words`); }
    else if (metadata.wordCount >= 500) { score += 4; details.push(`Moderate: ${metadata.wordCount.toLocaleString()} words`); }
    else { score += 1; issues.push('Low word count'); tips.push('Aim for 1500+ words'); }

    if (metadata.h1Count >= 1 && metadata.h1Count <= 2) { score += 6; details.push('Proper H1 structure'); }
    else if (metadata.h1Count > 2) { score += 3; issues.push('Multiple H1 tags'); }
    else { issues.push('Missing H1'); tips.push('Add H1 heading'); }

    if (metadata.totalHeadings >= 15) { score += 8; details.push('Excellent heading structure'); }
    else if (metadata.totalHeadings >= 8) { score += 6; details.push('Good hierarchy'); }
    else if (metadata.totalHeadings >= 4) { score += 3; details.push('Basic structure'); }
    else { issues.push('Limited headings'); tips.push('Add more subheadings'); }

    if (metadata.paragraphCount >= 30) { score += 6; details.push('Rich paragraphs'); }
    else if (metadata.paragraphCount >= 15) { score += 4; details.push('Moderate paragraphs'); }
    else { issues.push('Low paragraph count'); }

    const imagesWithAlt = metadata.images.filter(img => img.hasAlt).length;
    if (metadata.imageCount >= 8) { score += 5; details.push(`Good images: ${metadata.imageCount}`); }
    else if (metadata.imageCount >= 4) { score += 3; details.push('Some images'); }
    else { issues.push('Few images'); tips.push('Add relevant images'); }

    if (metadata.internalLinks >= 8) { score += 4; details.push('Strong internal linking'); }
    else if (metadata.internalLinks >= 4) { score += 2; details.push('Basic internal links'); }
    else { issues.push('Limited internal links'); tips.push('Add internal links'); }

    if (metadata.outboundLinks >= 5) { score += 3; details.push('Good external references'); }
    else if (metadata.outboundLinks >= 2) { score += 1; details.push('Some external links'); }

    this.results.contentDepth = { score: Math.min(score, 50), max: 50, details, issues, tips };
  }

  async analyzeRequiredPages(html) {
    const details = [], issues = [], tips = [];
    let score = 0;

    if (/privacy/i.test(html)) { score += 10; details.push('Privacy Policy found'); }
    else { issues.push('Privacy Policy MISSING'); tips.push('Required for AdSense'); }

    if (/contact/i.test(html)) { score += 6; details.push('Contact info found'); }
    else { issues.push('Contact not found'); tips.push('Add contact information'); }

    if (/terms/i.test(html)) { score += 5; details.push('Terms of Service found'); }
    else { tips.push('Consider adding Terms'); }

    if (/about/i.test(html)) { score += 4; details.push('About page found'); }
    else { tips.push('Consider adding About page'); }

    if (/cookie/i.test(html)) { score += 3; details.push('Cookie Policy found'); }
    else { tips.push('Consider adding Cookie Policy'); }

    if (/faq/i.test(html)) { score += 2; details.push('FAQ section found'); }
    else { tips.push('Consider adding FAQ'); }

    this.results.requiredPages = { score: Math.min(score, 30), max: 30, details, issues, tips };
  }

  async analyzePolicyCompliance(html, metadata) {
    const details = [], issues = [], tips = [];
    let score = 0;

    if (metadata.hasSSL) { score += 8; details.push('SSL/HTTPS enabled'); }
    else { issues.push('SSL/HTTPS not detected'); tips.push('Enable HTTPS'); }

    if (/cookie/i.test(html)) { score += 4; details.push('Cookie Policy present'); }

    if (metadata.hasAdsense) { score += 5; details.push('AdSense code detected'); }
    else { details.push('No AdSense code yet'); }

    const hasAdsTxt = await this.checkAdsTxt();
    if (hasAdsTxt) { score += 6; details.push('ads.txt file present'); }
    else { details.push('ads.txt not present'); tips.push('Add ads.txt'); }

    const problematicTerms = ['adult', 'gambling', 'illegal', 'pirated', 'warez'];
    const foundIssues = problematicTerms.filter(term => html.toLowerCase().includes(term));
    if (foundIssues.length === 0) { score += 5; details.push('No problematic content'); }
    else { score += 1; issues.push('Problematic content detected'); }

    this.results.policyCompliance = { score: Math.min(score, 30), max: 30, details, issues, tips };
  }

  async checkAdsTxt() {
    try {
      const adsTxtUrl = this.url.replace(/\/$/, '') + '/ads.txt';
      const response = await axios.head(adsTxtUrl, { timeout: 10000 });
      return response.status === 200;
    } catch { return false; }
  }

  async analyzeTechnicalSEO(html, metadata) {
    const details = [], issues = [], tips = [];
    let score = 0;

    if (metadata.metaDescription && metadata.metaDescription.length >= 120) { score += 6; details.push('Excellent meta description'); }
    else if (metadata.metaDescription) { score += 3; details.push('Meta description present'); }
    else { issues.push('Missing meta description'); tips.push('Add meta description'); }

    if (metadata.title && metadata.title.length >= 30 && metadata.title.length <= 60) { score += 6; details.push('Optimal title length'); }
    else if (metadata.title) { score += 3; details.push('Title present'); }
    else { issues.push('Missing title tag'); tips.push('Add title tag'); }

    if (metadata.viewport) { score += 5; details.push('Viewport meta tag'); }
    else { issues.push('No viewport tag'); }

    if (metadata.hasSchemaOrg) { score += 6; details.push('Schema.org structured data'); }
    else { details.push('No structured data'); tips.push('Add Schema.org markup'); }

    if (metadata.hasOpenGraph && metadata.hasTwitterCard) { score += 5; details.push('Open Graph & Twitter Cards'); }
    else if (metadata.hasOpenGraph || metadata.hasTwitterCard) { score += 3; details.push('Social meta tags'); }
    else { details.push('No social meta tags'); tips.push('Add Open Graph tags'); }

    if (metadata.canonical) { score += 3; details.push('Canonical URL set'); }
    else { details.push('No canonical URL'); }

    if (metadata.hasSitemap) { score += 4; details.push('Sitemap.xml detected'); }
    else { tips.push('Consider adding sitemap.xml'); }

    this.results.technicalSEO = { score: Math.min(score, 40), max: 40, details, issues, tips };
  }

  async analyzeContentQuality(html, metadata) {
    const details = [], issues = [], tips = [];
    let score = 0;

    if (metadata.totalHeadings >= 10) { score += 6; details.push('Well-structured content'); }
    else if (metadata.totalHeadings >= 5) { score += 3; details.push('Basic structure'); }

    if (metadata.hasBreadcrumbs) { score += 5; details.push('Breadcrumb navigation'); }
    else { tips.push('Consider adding breadcrumbs'); }

    if (metadata.hasSearchBox) { score += 4; details.push('Search functionality'); }
    else { tips.push('Consider adding search'); }

    if (metadata.hasNewsletter) { score += 5; details.push('Newsletter signup'); }
    else { tips.push('Consider adding newsletter signup'); }

    if (/faq/i.test(html)) { score += 4; details.push('FAQ section'); }

    if (metadata.socialLinks.length >= 3) { score += 3; details.push('Social media links'); }
    else { tips.push('Add more social media links'); }

    this.results.contentQuality = { score: Math.min(score, 30), max: 30, details, issues, tips };
  }

  async analyzeMobileOptimization(html, metadata) {
    const details = [], issues = [], tips = [];
    let score = 0;

    if (metadata.viewport && /width=device-width/i.test(metadata.viewport)) { score += 8; details.push('Mobile viewport configured'); }
    else { issues.push('Mobile viewport not configured'); tips.push('Add viewport meta tag'); }

    if (html.includes('@media') && html.includes('max-width')) { score += 6; details.push('Responsive CSS present'); }
    else { details.push('No responsive CSS detected'); tips.push('Add responsive design'); }

    if (html.includes('touch') || html.includes('mobile')) { score += 5; details.push('Mobile-friendly elements'); }

    this.results.mobileOptimization = { score: Math.min(score, 25), max: 25, details, issues, tips };
  }

  async analyzePerformanceMetrics(html, metadata) {
    const details = [], issues = [], tips = [];
    let score = 0;

    if (metadata.lazyLoading) { score += 6; details.push('Lazy loading enabled'); }
    else { details.push('Lazy loading not detected'); tips.push('Add lazy loading to images'); }

    if (metadata.cdnUsage) { score += 5; details.push('CDN usage detected'); }
    else { tips.push('Consider using CDN'); }

    if (metadata.htmlSize < 500000) { score += 5; details.push('Optimized page size'); }
    else if (metadata.htmlSize < 1000000) { score += 3; details.push('Moderate page size'); }
    else { issues.push('Large page size'); tips.push('Optimize page load time'); }

    this.results.performanceMetrics = { score: Math.min(score, 25), max: 25, details, issues, tips };
  }

  async analyzeSecurity(html, metadata) {
    const details = [], issues = [], tips = [];
    let score = 0;

    if (metadata.hasSSL) { score += 8; details.push('SSL/HTTPS enabled'); }
    else { issues.push('No HTTPS'); tips.push('Enable HTTPS'); }

    if (!metadata.hasMixedContent) { score += 5; details.push('No mixed content'); }
    else { issues.push('Mixed content detected'); tips.push('Fix mixed content issues'); }

    if (html.includes('content-security-policy')) { score += 4; details.push('CSP header detected'); }
    else { tips.push('Consider adding CSP header'); }

    this.results.securityScore = { score: Math.min(score, 20), max: 20, details, issues, tips };
  }

  async analyzeUXDesign(html, metadata) {
    const details = [], issues = [], tips = [];
    let score = 0;

    if (metadata.hasBreadcrumbs) { score += 5; details.push('Breadcrumb navigation'); }
    else { tips.push('Add breadcrumbs'); }

    if (metadata.hasSearchBox) { score += 5; details.push('Search functionality'); }
    else { tips.push('Add search box'); }

    if (metadata.formsCount >= 1) { score += 4; details.push('Contact/Form present'); }

    if (/call[- ]?to[- ]?action|button|cta/i.test(html)) { score += 4; details.push('CTAs detected'); }
    else { tips.push('Add call-to-action buttons'); }

    if (/loading|spinner|skeleton/i.test(html)) { score += 4; details.push('Loading indicators'); }

    this.results.uxDesign = { score: Math.min(score, 25), max: 25, details, issues, tips };
  }

  async analyzeMonetizationReadiness(html, metadata) {
    const details = [], issues = [], tips = [];
    let score = 0;

    if (metadata.hasAdsense) { score += 8; details.push('AdSense code already present'); }
    else { details.push('No AdSense code yet'); tips.push('Add AdSense after approval'); }

    if (metadata.hasAnalytics) { score += 5; details.push('Analytics tracking present'); }
    else { tips.push('Add Google Analytics'); }

    if (metadata.hasPrivacyPolicy && metadata.hasTerms) { score += 4; details.push('Policies in place'); }
    else { tips.push('Ensure all policies are present'); }

    if (/affiliate|partner|sponsor/i.test(html)) { score += 3; details.push('Partner programs detected'); }

    this.results.monetizationReadiness = { score: Math.min(score, 25), max: 25, details, issues, tips };
  }

  calculateOverallScore() {
    const totalScore = this.results.contentDepth.score + this.results.requiredPages.score +
      this.results.policyCompliance.score + this.results.technicalSEO.score +
      this.results.contentQuality.score + this.results.mobileOptimization.score +
      this.results.performanceMetrics.score + this.results.securityScore.score +
      this.results.uxDesign.score + this.results.monetizationReadiness.score;
    const maxTotal = 50 + 30 + 30 + 40 + 30 + 25 + 25 + 20 + 25 + 25;
    this.results.overallScore = Math.round((totalScore / maxTotal) * 100);
  }

  calculatePercentile() {
    const benchmarks = { excellent: 85, good: 70, average: 50, poor: 30 };
    if (this.results.overallScore >= benchmarks.excellent) this.results.percentile = 90;
    else if (this.results.overallScore >= benchmarks.good) this.results.percentile = 70;
    else if (this.results.overallScore >= benchmarks.average) this.results.percentile = 50;
    else if (this.results.overallScore >= benchmarks.poor) this.results.percentile = 25;
    else this.results.percentile = 10;
  }

  assignGrade() {
    if (this.results.overallScore >= 90) this.results.grade = 'A+';
    else if (this.results.overallScore >= 85) this.results.grade = 'A';
    else if (this.results.overallScore >= 80) this.results.grade = 'A-';
    else if (this.results.overallScore >= 75) this.results.grade = 'B+';
    else if (this.results.overallScore >= 70) this.results.grade = 'B';
    else if (this.results.overallScore >= 65) this.results.grade = 'B-';
    else if (this.results.overallScore >= 60) this.results.grade = 'C+';
    else if (this.results.overallScore >= 55) this.results.grade = 'C';
    else if (this.results.overallScore >= 50) this.results.grade = 'C-';
    else if (this.results.overallScore >= 40) this.results.grade = 'D';
    else this.results.grade = 'F';
  }

  generateDetailedRecommendations() {
    const recs = [];

    if (this.results.requiredPages.score < 15) recs.push({ priority: 'HIGH', action: 'Add Privacy Policy page - REQUIRED for AdSense', impact: '+10 pts' });
    if (this.results.requiredPages.score < 20 && this.results.requiredPages.score >= 15) recs.push({ priority: 'MEDIUM', action: 'Add Contact page for trust', impact: '+6 pts' });
    if (this.results.contentDepth.score < 25) recs.push({ priority: 'HIGH', action: 'Increase content to 1000+ words', impact: '+15 pts' });
    if (this.results.technicalSEO.score < 25) recs.push({ priority: 'MEDIUM', action: 'Add meta description and title', impact: '+10 pts' });
    if (this.results.performanceMetrics.score < 15) recs.push({ priority: 'MEDIUM', action: 'Enable lazy loading', impact: '+6 pts' });
    if (this.results.monetizationReadiness.score < 15) recs.push({ priority: 'MEDIUM', action: 'Add ads.txt file', impact: '+5 pts' });
    if (this.results.overallScore >= 70) recs.push({ priority: 'INFO', action: 'Great! Your site is well-optimized for AdSense', impact: 'Maintain' });

    this.results.recommendations = recs;
  }

  generateImprovementRoadmap() {
    const roadmap = [];

    roadmap.push({ phase: 'Week 1', tasks: ['Fix critical issues (Privacy Policy, SSL)', 'Add missing meta tags', 'Improve content depth'] });
    roadmap.push({ phase: 'Week 2', tasks: ['Add ads.txt', 'Implement lazy loading', 'Add structured data'] });
    roadmap.push({ phase: 'Week 3', tasks: ['Enhance mobile optimization', 'Add analytics', 'Create FAQ section'] });
    roadmap.push({ phase: 'Week 4', tasks: ['Fine-tune performance', 'Add CTAs', 'Submit for AdSense review'] });

    this.results.improvements = roadmap;
  }

  async getGeminiInsights() {
    if (!process.env.GEMINI_API_KEY) { this.results.geminiInsights = 'Gemini API key not configured'; return; }
    try {
      const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
      const prompt = 'Provide 3 actionable recommendations for improving AdSense eligibility. Current score: ' + this.results.overallScore + '/100. Be specific.';
      const result = await model.generateContent(prompt);
      this.results.geminiInsights = (await result.response).text();
    } catch { this.results.geminiInsights = 'Failed to get Gemini insights'; }
  }

  async getChatGPTInsights() {
    if (!process.env.OPENAI_API_KEY) { this.results.chatgptInsights = 'OpenAI API key not configured'; return; }
    try {
      const completion = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'system', content: 'You are an AdSense expert. Provide specific actionable advice.' }, { role: 'user', content: 'Score: ' + this.results.overallScore + '/100. Top 3 improvements needed with detailed steps?' }],
        max_tokens: 200
      });
      this.results.chatgptInsights = completion.choices[0].message.content;
    } catch { this.results.chatgptInsights = 'Failed to get ChatGPT insights'; }
  }
}

app.post('/api/analyze', async (req, res) => {
  try {
    const { url } = req.body;
    if (!url) return res.status(400).json({ error: 'URL is required' });

    const cacheKey = 'analysis_' + url;
    const cached = cache.get(cacheKey);
    if (cached) return res.json({ success: true, data: cached, cached: true });

    const scorer = new AdvancedScorer(url);
    const results = await scorer.analyze();

    cache.set(cacheKey, results, 300);

    if (supabase) {
      await supabase.from('analysis_results').insert({
        url, overall_score: results.overallScore, grade: results.grade,
        content_depth_score: results.contentDepth.score,
        required_pages_score: results.requiredPages.score,
        policy_compliance_score: results.policyCompliance.score,
        technical_seo_score: results.technicalSEO.score,
        gemini_insights: results.geminiInsights, chatgpt_insights: results.chatgptInsights,
        recommendations: JSON.stringify(results.recommendations),
        created_at: new Date().toISOString()
      });
    }

    res.json({ success: true, data: results });
  } catch (error) {
    res.status(500).json({ error: error.message || 'Analysis failed' });
  }
});

app.get('/api/analyze/batch', async (req, res) => {
  const urls = (req.query.urls || '').split(',').filter(Boolean);
  if (!urls.length) return res.status(400).json({ error: 'URLs required' });

  const results = [];
  for (const url of urls.slice(0, 10)) {
    try {
      const scorer = new AdvancedScorer(url);
      const data = await scorer.analyze();
      results.push({ url, score: data.overallScore, grade: data.grade, success: true });
    } catch (e) {
      results.push({ url, error: e.message, success: false });
    }
  }
  res.json({ success: true, data: results });
});

app.get('/api/history', async (req, res) => {
  if (!supabase) return res.json({ data: [] });
  try {
    const { data } = await supabase.from('analysis_results').select('*').order('created_at', { ascending: false }).limit(20);
    res.json({ success: true, data });
  } catch (e) {
    res.json({ data: [] });
  }
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log('CheckAdSense server running on http://localhost:' + PORT);
});
