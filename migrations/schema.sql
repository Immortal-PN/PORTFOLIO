-- ============================================================
-- Portfolio Backend — Supabase Schema + RLS Policies
-- Run this once in the Supabase SQL Editor
-- ============================================================

-- ─── HERO (singleton) ────────────────────────────────────────
CREATE TABLE IF NOT EXISTS hero (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name       TEXT NOT NULL,
  tagline    TEXT,
  subline    TEXT,
  avatar_url TEXT,
  updated_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE hero ENABLE ROW LEVEL SECURITY;

CREATE POLICY "hero_public_read"
  ON hero FOR SELECT
  USING (true);

-- ─── ABOUT (singleton) ────────────────────────────────────────
CREATE TABLE IF NOT EXISTS about (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  bio        TEXT,
  ambition   TEXT,
  updated_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE about ENABLE ROW LEVEL SECURITY;

CREATE POLICY "about_public_read"
  ON about FOR SELECT
  USING (true);

-- ─── PROJECTS ────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS projects (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title       TEXT NOT NULL,
  description TEXT,
  tech_stack  TEXT[]          DEFAULT '{}',
  images      TEXT[]          DEFAULT '{}',
  video_url   TEXT,
  live_link   TEXT,
  featured    BOOLEAN         DEFAULT false,
  created_at  TIMESTAMPTZ     DEFAULT now()
);

ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

CREATE POLICY "projects_public_read"
  ON projects FOR SELECT
  USING (true);

-- ─── MEDIA ───────────────────────────────────────────────────
-- metrics JSONB: { "views": "1.7M+", "tag": "client work" }
CREATE TABLE IF NOT EXISTS media (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  type       TEXT             CHECK (type IN ('video', 'image')),
  url        TEXT NOT NULL,
  platform   TEXT             CHECK (platform IN ('instagram', 'youtube', 'local')),
  metrics    JSONB            DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ      DEFAULT now()
);

ALTER TABLE media ENABLE ROW LEVEL SECURITY;

CREATE POLICY "media_public_read"
  ON media FOR SELECT
  USING (true);

-- ─── SKILLS ──────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS skills (
  id       UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category TEXT             CHECK (category IN ('design', 'dev', 'tools')),
  items    TEXT[]           DEFAULT '{}'
);

ALTER TABLE skills ENABLE ROW LEVEL SECURITY;

CREATE POLICY "skills_public_read"
  ON skills FOR SELECT
  USING (true);

-- ─── CONTACT (singleton) ─────────────────────────────────────
CREATE TABLE IF NOT EXISTS contact (
  id        UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email     TEXT,
  instagram TEXT,
  github    TEXT,
  linkedin  TEXT
);

ALTER TABLE contact ENABLE ROW LEVEL SECURITY;

CREATE POLICY "contact_public_read"
  ON contact FOR SELECT
  USING (true);
