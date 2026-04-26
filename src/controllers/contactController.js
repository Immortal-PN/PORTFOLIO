const supabase = require('../config/supabase');

async function getSingleton(table) {
  const { data, error } = await supabase.from(table).select('*').limit(1).maybeSingle();
  if (error) throw error;
  return data;
}

// GET /api/contact
exports.getContact = async (req, res, next) => {
  try {
    const data = await getSingleton('contact');
    res.json({ success: true, data });
  } catch (err) {
    next(err);
  }
};

// PUT /api/contact  [protected]
exports.updateContact = async (req, res, next) => {
  try {
    const { email, instagram, github, linkedin } = req.body;
    const existing = await getSingleton('contact');

    let result;
    if (existing) {
      result = await supabase
        .from('contact')
        .update({ email, instagram, github, linkedin })
        .eq('id', existing.id)
        .select()
        .single();
    } else {
      result = await supabase
        .from('contact')
        .insert([{ email, instagram, github, linkedin }])
        .select()
        .single();
    }

    if (result.error) throw result.error;
    res.json({ success: true, data: result.data });
  } catch (err) {
    next(err);
  }
};
