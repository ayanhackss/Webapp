# CheckAdSense v2.0

Advanced Neo-Brutalist AdSense Eligibility Analyzer with AI-powered insights.

![CheckAdSense](https://img.shields.io/badge/CheckAdSense-v2.0-blue)

## ✨ What's New in v2.0

- **6-Category Scoring System** - Content Depth, Required Pages, Policy Compliance, Technical SEO, Content Quality, Mobile Optimization
- **Letter Grades (A+ to F)** - Easy-to-understand grading system
- **Batch Analysis** - Analyze up to 10 URLs at once
- **Rate Limiting** - Protection against API abuse
- **Response Caching** - 5-minute cache for faster repeated analysis
- **Critical Issues Detection** - Highlight blockers for AdSense approval

## Features

- 🔍 **Website Analysis** - Comprehensive AdSense eligibility check
- 📊 **6 Scoring Categories** with detailed breakdowns
- 🤖 **AI Insights** - Gemini and ChatGPT integration
- 📈 **Data Visualization** - Radar & Bar charts
- 💾 **History Storage** - Supabase persistence
- 🎨 **Neo-Brutalist Design** - Bold, unique UI

## Scoring Categories

| Category | Max Points | Description |
|----------|------------|-------------|
| Content Depth | 35 | Word count, headings, images, links |
| Required Pages | 25 | Privacy Policy, Contact, Terms, About |
| Policy Compliance | 25 | SSL, ads.txt, content policies |
| Technical SEO | 25 | Meta tags, structured data, lazy loading |
| Content Quality | 20 | Structure, FAQ, CTAs, navigation |
| Mobile Optimization | 15 | Responsive design, viewport, CSS |

**Total: 145 points → Converted to 0-100 score with A+ to F grade**

## Quick Start

```bash
cd WebApp
npm install
cp .env.example .env
# Edit .env with your API keys
npm start
```

## API Keys Required

- **Supabase** - Database for history
- **Gemini API** - Google AI Studio
- **OpenAI API** - ChatGPT insights

## API Endpoints

### Single Analysis
```bash
POST /api/analyze
Body: { "url": "https://example.com" }
```

### Batch Analysis
```bash
GET /api/analyze/batch?urls=https://a.com,https://b.com
```

### History
```bash
GET /api/history
```

## Batch Analysis UI

New feature! Enter multiple URLs (one per line) to analyze up to 10 websites simultaneously with comparison results.

## Rate Limiting

- General: 100 requests per 15 minutes
- Analysis: 10 requests per minute per IP

## Caching

Repeated analyses within 5 minutes return cached results instantly.

## License

MIT
