const supabase = require('../config/supabase');

async function getSingleton(table) {
  const { data, error } = await supabase.from(table).select('*').limit(1).maybeSingle();
  if (error) throw error;
  return data;
}

// GET /api/about
exports.getAbout = async (req, res, next) => {
  try {
    const data = await getSingleton('about');
    res.json({ success: true, data });
  } catch (err) {
    next(err);
  }
};

// PUT /api/about
exports.updateAbout = async (req, res, next) => {
  try {
    const { bio, ambition } = req.body;
    const existing = await getSingleton('about');

    let result;
    if (existing) {
      result = await supabase
        .from('about')
        .update({ bio, ambition, updated_at: new Date().toISOString() })
        .eq('id', existing.id)
        .select()
        .single();
    } else {
      result = await supabase
        .from('about')
        .insert([{ bio, ambition }])
        .select()
        .single();
    }

    if (result.error) throw result.error;
    res.json({ success: true, data: result.data });
  } catch (err) {
    next(err);
  }
};
