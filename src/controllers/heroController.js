const supabase = require('../config/supabase');

// ─── Helper: get first row or null ───────────────────────────────────────────
async function getSingleton(table) {
  const { data, error } = await supabase.from(table).select('*').limit(1).maybeSingle();
  if (error) throw error;
  return data;
}

// GET /api/hero
exports.getHero = async (req, res, next) => {
  try {
    const data = await getSingleton('hero');
    res.json({ success: true, data });
  } catch (err) {
    next(err);
  }
};

// PUT /api/hero  — upsert (create if empty, update if exists)
exports.updateHero = async (req, res, next) => {
  try {
    const { name, tagline, subline, avatar_url } = req.body;
    const existing = await getSingleton('hero');

    let result;
    if (existing) {
      result = await supabase
        .from('hero')
        .update({ name, tagline, subline, avatar_url, updated_at: new Date().toISOString() })
        .eq('id', existing.id)
        .select()
        .single();
    } else {
      result = await supabase
        .from('hero')
        .insert([{ name, tagline, subline, avatar_url }])
        .select()
        .single();
    }

    if (result.error) throw result.error;
    res.json({ success: true, data: result.data });
  } catch (err) {
    next(err);
  }
};
