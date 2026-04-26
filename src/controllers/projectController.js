const supabase = require('../config/supabase');

// GET /api/projects
exports.getProjects = async (req, res, next) => {
  try {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    res.json({ success: true, data });
  } catch (err) {
    next(err);
  }
};

// GET /api/projects/:id
exports.getProject = async (req, res, next) => {
  try {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('id', req.params.id)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return res.status(404).json({ success: false, error: 'Project not found' });
      }
      throw error;
    }

    res.json({ success: true, data });
  } catch (err) {
    next(err);
  }
};

// POST /api/projects  [protected]
exports.createProject = async (req, res, next) => {
  try {
    const { title, description, tech_stack, images, video_url, live_link, featured } = req.body;

    const { data, error } = await supabase
      .from('projects')
      .insert([{ title, description, tech_stack, images, video_url, live_link, featured }])
      .select()
      .single();

    if (error) throw error;
    res.status(201).json({ success: true, data });
  } catch (err) {
    next(err);
  }
};

// PUT /api/projects/:id  [protected]
exports.updateProject = async (req, res, next) => {
  try {
    const { title, description, tech_stack, images, video_url, live_link, featured } = req.body;

    const { data, error } = await supabase
      .from('projects')
      .update({ title, description, tech_stack, images, video_url, live_link, featured })
      .eq('id', req.params.id)
      .select()
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return res.status(404).json({ success: false, error: 'Project not found' });
      }
      throw error;
    }

    res.json({ success: true, data });
  } catch (err) {
    next(err);
  }
};

// DELETE /api/projects/:id  [protected]
exports.deleteProject = async (req, res, next) => {
  try {
    const { error } = await supabase
      .from('projects')
      .delete()
      .eq('id', req.params.id);

    if (error) throw error;
    res.json({ success: true, message: 'Project deleted' });
  } catch (err) {
    next(err);
  }
};
