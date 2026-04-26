const supabase = require('../config/supabase');

// GET /api/media
exports.getMedia = async (req, res, next) => {
  try {
    const { data, error } = await supabase
      .from('media')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    res.json({ success: true, data });
  } catch (err) {
    next(err);
  }
};

// POST /api/media  [protected]
// metrics shape: { "views": "1.7M+", "tag": "client work" }
exports.createMedia = async (req, res, next) => {
  try {
    const { type, url, platform, metrics } = req.body;

    const { data, error } = await supabase
      .from('media')
      .insert([{ type, url, platform, metrics: metrics || {} }])
      .select()
      .single();

    if (error) throw error;
    res.status(201).json({ success: true, data });
  } catch (err) {
    next(err);
  }
};

// PUT /api/media/:id  [protected]
exports.updateMedia = async (req, res, next) => {
  try {
    const { type, url, platform, metrics } = req.body;

    const { data, error } = await supabase
      .from('media')
      .update({ type, url, platform, metrics })
      .eq('id', req.params.id)
      .select()
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return res.status(404).json({ success: false, error: 'Media not found' });
      }
      throw error;
    }

    res.json({ success: true, data });
  } catch (err) {
    next(err);
  }
};

// DELETE /api/media/:id  [protected]
exports.deleteMedia = async (req, res, next) => {
  try {
    const { error } = await supabase
      .from('media')
      .delete()
      .eq('id', req.params.id);

    if (error) throw error;
    res.json({ success: true, message: 'Media deleted' });
  } catch (err) {
    next(err);
  }
};
