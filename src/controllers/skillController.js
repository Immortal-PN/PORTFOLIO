const supabase = require('../config/supabase');

// GET /api/skills
exports.getSkills = async (req, res, next) => {
  try {
    const { data, error } = await supabase
      .from('skills')
      .select('*')
      .order('category');

    if (error) throw error;
    res.json({ success: true, data });
  } catch (err) {
    next(err);
  }
};

// PUT /api/skills  [protected]
// Upsert a single category row — insert if category doesn't exist, update if it does
exports.upsertSkill = async (req, res, next) => {
  try {
    const { category, items } = req.body;

    // Check existing row for this category
    const { data: existing, error: findErr } = await supabase
      .from('skills')
      .select('id')
      .eq('category', category)
      .maybeSingle();

    if (findErr) throw findErr;

    let result;
    if (existing) {
      result = await supabase
        .from('skills')
        .update({ items })
        .eq('id', existing.id)
        .select()
        .single();
    } else {
      result = await supabase
        .from('skills')
        .insert([{ category, items }])
        .select()
        .single();
    }

    if (result.error) throw result.error;
    res.json({ success: true, data: result.data });
  } catch (err) {
    next(err);
  }
};
