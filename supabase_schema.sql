-- CheckAdSense Supabase Database Schema
-- Run this SQL in your Supabase SQL Editor

-- Create analysis_results table
CREATE TABLE IF NOT EXISTS analysis_results (
  id BIGSERIAL PRIMARY KEY,
  url TEXT NOT NULL,
  overall_score INTEGER NOT NULL,
  content_depth_score INTEGER NOT NULL,
  required_pages_score INTEGER NOT NULL,
  policy_compliance_score INTEGER NOT NULL,
  technical_seo_score INTEGER NOT NULL,
  gemini_insights TEXT,
  chatgpt_insights TEXT,
  recommendations JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_analysis_results_url ON analysis_results(url);
CREATE INDEX IF NOT EXISTS idx_analysis_results_created_at ON analysis_results(created_at DESC);

-- Enable Row Level Security (RLS)
ALTER TABLE analysis_results ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access (for demo purposes)
CREATE POLICY "Enable read access for all users" ON analysis_results
  FOR SELECT USING (true);

-- Create policy for insert access (for authenticated users)
CREATE POLICY "Enable insert for authenticated users" ON analysis_results
  FOR INSERT WITH CHECK (true);
