/**
 * Seed script — populates Supabase tables with sample portfolio data
 * Usage: npm run seed
 *
 * Requires .env with SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY
 */

require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { autoRefreshToken: false, persistSession: false } }
);

async function seed() {
  console.log('🌱 Starting seed...\n');

  // ─── Hero ────────────────────────────────────────────────────────────────
  const { error: heroErr } = await supabase.from('hero').insert([
    {
      name: 'Pratham',
      tagline: 'Creative Designer & Web Developer',
      subline: 'I craft immersive digital experiences that live at the intersection of design and code.',
      avatar_url: 'https://placehold.co/400x400/111/fff?text=Pratham',
    },
  ]);
  if (heroErr) console.error('hero:', heroErr.message);
  else console.log('✅ hero seeded');

  // ─── About ───────────────────────────────────────────────────────────────
  const { error: aboutErr } = await supabase.from('about').insert([
    {
      bio: 'I am a creative designer and developer passionate about building products that feel as good as they look. With a focus on motion, typography, and interaction design, I bring digital ideas to life.',
      ambition: 'To work with ambitious brands and studios building the next generation of digital experiences.',
    },
  ]);
  if (aboutErr) console.error('about:', aboutErr.message);
  else console.log('✅ about seeded');

  // ─── Projects ────────────────────────────────────────────────────────────
  const { error: projErr } = await supabase.from('projects').insert([
    {
      title: 'Veloura Luxury',
      description: 'Premium women's jewellery e-commerce platform with custom checkout flow, admin panel, and Supabase backend.',
      tech_stack: ['Next.js', 'Supabase', 'Framer Motion', 'Tailwind CSS'],
      images: [
        'https://placehold.co/800x500/0a0a0a/fff?text=Veloura+Hero',
        'https://placehold.co/800x500/0a0a0a/fff?text=Veloura+Products',
      ],
      video_url: null,
      live_link: 'https://veloura.vercel.app',
      featured: true,
    },
    {
      title: 'Portfolio Backend API',
      description: 'Production-ready REST API with Express, Supabase (PostgreSQL), JWT auth, RLS, and Vercel serverless deployment.',
      tech_stack: ['Node.js', 'Express', 'Supabase', 'JWT', 'Vercel'],
      images: ['https://placehold.co/800x500/0a0a0a/fff?text=API'],
      video_url: null,
      live_link: null,
      featured: false,
    },
  ]);
  if (projErr) console.error('projects:', projErr.message);
  else console.log('✅ projects seeded');

  // ─── Media ───────────────────────────────────────────────────────────────
  const { error: mediaErr } = await supabase.from('media').insert([
    {
      type: 'video',
      url: 'https://www.youtube.com/watch?v=example1',
      platform: 'youtube',
      metrics: { views: '12K+', tag: 'motion design' },
    },
    {
      type: 'video',
      url: 'https://www.instagram.com/reel/example1',
      platform: 'instagram',
      metrics: { views: '1.7M+', tag: 'client work' },
    },
    {
      type: 'image',
      url: 'https://placehold.co/800x800/111/fff?text=Design+Work',
      platform: 'local',
      metrics: { views: '0', tag: 'brand identity' },
    },
  ]);
  if (mediaErr) console.error('media:', mediaErr.message);
  else console.log('✅ media seeded');

  // ─── Skills ──────────────────────────────────────────────────────────────
  const { error: skillErr } = await supabase.from('skills').insert([
    { category: 'design', items: ['Figma', 'Adobe Illustrator', 'After Effects', 'Premiere Pro', 'Blender'] },
    { category: 'dev',    items: ['React', 'Next.js', 'Node.js', 'Express', 'Supabase', 'PostgreSQL', 'TypeScript'] },
    { category: 'tools',  items: ['Git', 'Vercel', 'Framer Motion', 'Postman', 'VS Code'] },
  ]);
  if (skillErr) console.error('skills:', skillErr.message);
  else console.log('✅ skills seeded');

  // ─── Contact ─────────────────────────────────────────────────────────────
  const { error: contactErr } = await supabase.from('contact').insert([
    {
      email: 'hello@pratham.dev',
      instagram: 'https://instagram.com/pratham',
      github: 'https://github.com/pratham',
      linkedin: 'https://linkedin.com/in/pratham',
    },
  ]);
  if (contactErr) console.error('contact:', contactErr.message);
  else console.log('✅ contact seeded');

  console.log('\n🎉 Seed complete!');
}

seed().catch((err) => {
  console.error('❌ Seed failed:', err.message);
  process.exit(1);
});
